from fastapi.testclient import TestClient
from utils import get_db, prepare_db_to_test
from main import app

db = next(get_db())
client = TestClient(app)
test_email = "test@test.com"
test_password = "test_password"
test_username = "test_user"


def test_test():
    response = client.get("/api/v1/check-alive")
    assert response.status_code == 200
    assert response.json() == {"msg": "I'm alive"}


def test_protected():
    response = client.get("/protected-route")
    assert response.status_code == 401


def test_unprotected():
    response = client.get("/unprotected-route")
    assert response.status_code == 200
    assert response.json() == {"msg": f"Hello, anonym"}


def test_registration():
    prepare_db_to_test(email=test_email, db=db)
    data = {
        "email": test_email,
        "password": test_password,
        "is_active": True,
        "is_superuser": True,
        "is_verified": False,
        "username": test_username,
    }
    response = client.post("/auth/register", json=data)
    assert response.status_code == 201
