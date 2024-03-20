def test_read_main(client):
    response = client.get("/api/v1/check-alive")
    assert response.status_code == 200
    assert response.json() == {"msg": "I'm alive"}
