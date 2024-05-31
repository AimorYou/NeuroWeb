from fastapi import FastAPI, Depends
from starlette.requests import Request
import uvicorn

from api.api_v1.routers.users import users_router
from api.api_v1.routers.auth import auth_router
from api.api_v1.routers.pre_trained import cv_router
from api.api_v1.routers.train import train_router
from api.api_v1.routers.train_nlp import train_nlp_router
from api.api_v1.routers.pre_trained_nlp import nlp_router
from api.api_v1.routers.downloads import download_router
from core import config
from db.session import SessionLocal
from core.auth import get_current_active_user
from db.schemas import JSONValidation

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title=config.PROJECT_NAME, docs_url="/api/docs", openapi_url="/api"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    request.state.db = SessionLocal()
    response = await call_next(request)
    request.state.db.close()
    return response


@app.get("/api/v1")
async def root():
    return {"message": "Hello World"}


# Routers
app.include_router(
    users_router,
    prefix="/api/v1",
    tags=["users"],
    dependencies=[Depends(get_current_active_user)],
)
app.include_router(auth_router, prefix="/api", tags=["auth"])
app.include_router(cv_router, prefix="/api/cv", tags=["cv"])
app.include_router(nlp_router, prefix="/api/nlp", tags=["nlp"])
app.include_router(train_router, prefix="/api/cv/train", tags=["train"])
app.include_router(train_nlp_router, prefix="/api/nlp/train", tags=["train"])
app.include_router(download_router, prefix="/api/download", tags=["downloads"])


@app.post("/api/test-json")
def test_json(req: JSONValidation):
    return {"status": "200 OK"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8888, ws_ping_interval=300, ws_ping_timeout=300)