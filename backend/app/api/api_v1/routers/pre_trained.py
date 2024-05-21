from fastapi import WebSocket, WebSocketDisconnect, APIRouter=
from computer_vision.pretrained_models.classification import get_clf_prediction
from computer_vision.pretrained_models.detection import get_bbox_prediction
from computer_vision.pretrained_models.emotions import get_fer_prediction
from PIL import Image
import numpy as np
import base64
import json
import cv2
import io

cv_router = r = APIRouter()


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


@r.websocket("/ws/emotions")
async def emotions(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            data = json.loads(data)
            imageByt64 = data['data']['image'].split(',')[1]

            emotions_predictions = get_fer_prediction(imageByt64)
            await manager.send_json(emotions_predictions, websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)


@r.websocket("/ws/detection")
async def detection(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            data = json.loads(data)
            imageByt64 = data['data']['image'].split(',')[1]

            yolo_prediction = get_bbox_prediction(imageByt64)
            await manager.send_json(yolo_prediction, websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)


@r.websocket("/ws/classification")
async def classification(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive()
            _, raw = data.get("text").split(",")

            clf_prediction = get_clf_prediction(raw)
            await manager.send_json(clf_prediction, websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
