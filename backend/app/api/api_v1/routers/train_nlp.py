from natural_language_processing.trainable_models.text_classification import TextClassification
from fastapi import WebSocket, WebSocketDisconnect, APIRouter, UploadFile, Form, Query
from s3.storage import Storage
from typing import Any, List
from io import StringIO
import pandas as pd
import pickle

train_nlp_router = r = APIRouter()
storage = Storage()


@r.get("/")
async def get():
    return {200: "OK"}


@r.post("/classification/train-model")
async def train(
        file: UploadFile,
        user_id: str = Query()
):
    s = str(file.file.read(), 'utf-8')
    data = StringIO(s)
    df = pd.read_csv(data)

    text_clf = TextClassification(gpu_flg=True, language="EN")
    X_train, X_test, y_train, y_test = text_clf.prepare_data(df,
                                                             text_col="text",
                                                             target_col="label",
                                                             test_size=0.2)
    test_accuracy = text_clf.fit(X_train, X_test, y_train, y_test)
    print(test_accuracy)
    storage.put_object(pickle.dumps(text_clf), f"user_{user_id}/text_clf.pt")

    return {
        200: "OK",
        "test_accuracy": test_accuracy
    }


@r.post("/classification/predict")
async def predict_classification(json_data: dict, user_id: str):
    txt = json_data["text"]
    text_clf = pickle.loads(storage.get_object(f"user_{user_id}/text_clf.pt"))
    return text_clf.predict(txt)

