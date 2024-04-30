from fastapi import FastAPI, WebSocket, WebSocketDisconnect, APIRouter
# from fastapi.responses import HTMLResponse
# from draw import draw, add_bounding_boxes
from torchvision.transforms import Compose
from computer_vision.classification import get_clf_prediction
from computer_vision.detection import get_bbox_prediction
from computer_vision.emotions import get_bbox_prediction_tf
from computer_vision.train import train_model, predict, _predict
from PIL import Image
import numpy as np
import pickle
import base64
import json
import cv2
import io

train_router = r = APIRouter()


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


@r.post("/train-model")
async def train(json_data: dict, user_id: str):
    class_mapping = train_model(json_data=json_data, user_id=user_id)
    return {200: "OK", "class_mapping": class_mapping}


@r.post("/predict")
async def train(json_data: dict, class_mapping: dict, user_id: str):
    prediction = predict(image=json_data["image"], class_mapping=class_mapping, user_id=user_id)
    return {200: "OK", "prediction": prediction}


@r.websocket("/ws/predict/{user_id}")
async def classification(websocket: WebSocket, user_id):
    await manager.connect(websocket)
    try:
        with open(f"./app/computer_vision/resources/classification_{user_id}.sav", "rb") as f:
            model = pickle.load(f)
        while True:
            data = await websocket.receive()
            _, img = data.get("text").split(",")
            class_mapping = data.get("class_mapping")

            clf_prediction = _predict(model, img)

            await manager.send_json(clf_prediction, websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)

