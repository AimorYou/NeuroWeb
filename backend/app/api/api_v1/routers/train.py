from fastapi import FastAPI, WebSocket, WebSocketDisconnect, APIRouter
# from fastapi.responses import HTMLResponse
# from draw import draw, add_bounding_boxes
from computer_vision.classification import get_clf_prediction
from computer_vision.detection import get_bbox_prediction
from computer_vision.emotions import get_bbox_prediction_tf
from computer_vision.train import train_model, predict
from PIL import Image
import numpy as np
import base64
import json
import cv2
import io

train_router = r = APIRouter()


# class ConnectionManager:
#     def __init__(self):
#         self.active_connections = []

#     async def connect(self, websocket: WebSocket):
#         await websocket.accept()
#         self.active_connections.append(websocket)

#     def disconnect(self, websocket: WebSocket):
#         self.active_connections.remove(websocket)

#     async def send_text(self, message: str, websocket: WebSocket):
#         await websocket.send_text(message)

#     async def send_json(self, message: dict, websocket: WebSocket):
#         await websocket.send_json(message)


# manager = ConnectionManager()


@r.get("/")
async def get():
    return {200: "OK"}

@r.post("/train")
async def train(json_data: dict, user_id: str):
    class_mapping = train_model(json_data=json_data, user_id=user_id)
    return {200: "OK", "class_mapping": class_mapping}

@r.post("/predict")
async def train(json_data: dict, class_mapping: dict, user_id: str):
    prediction = predict(image=json_data["image"], class_mapping=class_mapping, user_id=user_id)
    return {200: "OK", "prediction": prediction}
