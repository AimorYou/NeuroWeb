from natural_language_processing.trainable_models.text_classification import TextClassification
from fastapi import WebSocket, WebSocketDisconnect, APIRouter, UploadFile, Form, Query
from s3.storage import storage
from typing import Any, List
from io import StringIO
import pandas as pd
import pickle
import json

train_nlp_router = r = APIRouter()


class ConnectionManager:
    def __init__(self):
        self.active_connections = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_text(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def send_json(self, message: dict, websocket: WebSocket):
        await websocket.send_json(message)


manager = ConnectionManager()


@r.get("/")
async def get():
    return {200: "OK"}


@r.post("/classification/train-model")
async def train(
        file: UploadFile = Form(),
        user_id: str = Query()
):
    
    s = str(file.file.read(), 'utf-8')
    data = StringIO(s)
    df = pd.read_csv(data)

    text_clf = TextClassification(gpu_flg=True, language="EN")
    X_train, X_test, y_train, y_test = text_clf.prepare_data(df,
                                                             text_col="text",
                                                             target_col="label",
                                                             train_size=0.2)
    test_accuracy = text_clf.fit(X_train, X_test, y_train, y_test)
    print(test_accuracy)
    # storage.put_object(pickle.dumps(text_clf), f"user_{user_id}/text_clf.pt")
    with open(f"./app/natural_language_processing/resources/user_{user_id}/text_clf.pt", "wb") as f:
        pickle.dump(text_clf, f)

    return {
        200: "OK",
        "test_accuracy": test_accuracy
    }


@r.post("/classification/predict")
async def predict_classification(json_data: dict, user_id: str):
    txt = json_data["text"]
    # text_clf = pickle.loads(storage.get_object(f"user_{user_id}/text_clf.pt"))
    with open(f"./app/natural_language_processing/resources/user_{user_id}/text_clf.pt", "rb") as f:
        text_clf = pickle.load(f)
    prediction = text_clf.predict(txt)
    print(prediction)
    return {
        200: "OK",
        "result": prediction,
        }


@r.websocket("/ws/classification/{user_id}")
async def classification(websocket: WebSocket, user_id):
    await manager.connect(websocket)
    print("connected")
    try:
        text_clf = pickle.loads(storage.get_object(f"user_{user_id}/text_clf.pt"))
        while True:
            data = await websocket.receive_text()
            data = json.loads(data)
            print(f"data = {data}")
            txt = data.get("text", "")
            prediction = text_clf.predict(txt)
            print(prediction)

            await manager.send_json(prediction, websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
