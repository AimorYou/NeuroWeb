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

# model_eng = torch.load(BytesIO(storage.get_object("text_classification_model.pkl")), map_location=torch.device('cpu'))
# model_ru = torch.load(BytesIO(storage.get_object("rusentitweet_model.pkl")), map_location=torch.device('cpu'))

model_eng = TextClassification()
clf_eng = pickle.loads(storage.get_object("pre-trained-eng.pkl"))
mapping_eng = pickle.loads(storage.get_object("pre-trained-eng-mapping.pkl"))
model_eng.clf = clf_eng
model_eng.cls_mapping = mapping_eng

model_rus = TextClassification(language="RU")
clf_rus = pickle.loads(storage.get_object("pre-trained-rus.pkl"))
mapping_rus = pickle.loads(storage.get_object("pre-trained-rus-mapping.pkl"))
model_rus.clf = clf_rus
model_rus.cls_mapping = mapping_rus

models = {
    "EN": model_eng,
    "RU": model_rus
}


@r.get("/")
async def get():
    return {200: "OK"}


@r.post("/predict")
def classification(json_data: dict, lang: str = "EN"):
    text = json_data["text"]
    model = models[lang]
    prediction = predict(model, text, lang)
    return {"prediction": prediction}
