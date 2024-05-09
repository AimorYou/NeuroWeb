from fastapi import APIRouter
from natural_language_processing.pretrained_models.classification import predict

nlp_router = r = APIRouter()


@r.get("/")
async def get():
    return {200: "OK"}


@r.get("/predict")
def classification(json_data: dict, lang: str = "EN"):
    text = json_data["text"]
    prediction = predict(text, lang)
    return text
