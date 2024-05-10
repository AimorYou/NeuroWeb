from io import StringIO, BytesIO

from natural_language_processing.trainable_models.text_classification import TextClassification
from natural_language_processing.pretrained_models.classification import predict
from s3.storage import storage
from fastapi import APIRouter
import pickle
import torch

nlp_router = r = APIRouter()

# txt_clf = TextClassification()
# print(txt_clf)
# # __main__.TextClassification

# model_eng = torch.load(BytesIO(storage.get_object("text_classification_model.pkl")), map_location=torch.device('cpu'))
# model_ru = torch.load(BytesIO(storage.get_object("rusentitweet_model.pkl")), map_location=torch.device('cpu'))

model_eng = pickle.loads(storage.get_object("text_classification_model.pkl"))
model_ru = pickle.loads(storage.get_object("rusentitweet_model.pkl"))

models = {
    "EN": model_eng,
    "RU": model_ru
}


@r.get("/")
async def get():
    return {200: "OK"}


@r.get("/predict")
def classification(json_data: dict, lang: str = "EN"):
    text = json_data["text"]
    model = models[lang]
    prediction = predict(model, text, lang)
    return prediction
