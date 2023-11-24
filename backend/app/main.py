from fastapi_users import FastAPIUsers

from fastapi import FastAPI, Depends
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import ValidationException
from fastapi.responses import JSONResponse

from backend.app.core.auth.auth import auth_backend
from core.auth.database import User
from core.auth.manager import get_user_manager
from core.auth.schemas import UserRead, UserCreate

from classes import RequestCVModel, RequestMLModel, RequestNLPModel

app = FastAPI(
    title="Neuro Web"
)

fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [auth_backend],
)

app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)

current_user = fastapi_users.current_user()


@app.get("/protected-route")
def protected_route(user: User = Depends(current_user)):
    return f"Hello, {user.username}"


@app.get("/unprotected-route")
def unprotected_route():
    return {"msg": f"Hello, anonym"}


@app.post("/api/v1/cv/train/{model_name}")
def cv_train_model(model_name: str, request_train_model: RequestCVModel) -> bytes:
    ...


@app.post("/api/v1/ml/train/{model_name}")
def ml_train_model(model_name: str, request_train_model: RequestMLModel) -> bytes:
    ...


@app.post("/api/v1/nlp/train/{model_name}")
def nlp_train_model(model_name: str, request_train_model: RequestNLPModel) -> bytes:
    ...


@app.get("/api/v1/cv/test/{model_name}")
def cv_train_model(model_name: str) -> bytes:
    ...


@app.get("/api/v1/ml/test/{model_name}")
def ml_train_model(model_name: str) -> bytes:
    ...


@app.get("/api/v1/nlp/test/{model_name}")
def nlp_train_model(model_name: str) -> bytes:
    ...


@app.get("/api/v1/check-alive")
def check_alive():
    return {"msg": "I'm alive"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8888)