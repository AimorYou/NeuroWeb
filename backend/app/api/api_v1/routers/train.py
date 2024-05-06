from fastapi import WebSocket, WebSocketDisconnect, APIRouter
# from fastapi.responses import HTMLResponse
# from draw import draw, add_bounding_boxes
from db.schemas import JSONValidation
from computer_vision.trainable_models.classification import train_model, predict, _predict
from computer_vision.trainable_models.faces_recognition import Recognizer
import pickle
import json

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


@r.post("/classification/train-model")
async def train(json_data: dict, user_id: str):
    class_mapping = train_model(json_data=json_data, user_id=user_id)
    return {200: "OK", "class_mapping": class_mapping}


@r.post("/classification/predict")
async def train(json_data: dict, user_id: str):
    prediction = predict(image=json_data["image"], user_id=user_id)
    return {200: "OK", "prediction": prediction}


@r.websocket("/ws/classification/predict/{user_id}")
async def classification(websocket: WebSocket, user_id):
    await manager.connect(websocket)
    try:
        with open(f"./app/computer_vision/resources/user_{user_id}/classification_{user_id}.sav", "rb") as f:
            model = pickle.load(f)
        with open(f"./app/computer_vision/resources/user_{user_id}/classification_mapping_{user_id}.json", "r") as f:
            class_mapping = json.load(f)
        while True:
            data = await websocket.receive_text()
            data = json.loads(data)
            print(f"data = {data}")
            img = data['data']['image'].split(',')[1]
            # class_mapping = data['data']["class_mapping"]

            clf_prediction = _predict(model, img, class_mapping)

            await manager.send_json(clf_prediction, websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)


@r.post("/face-recognition/train-model")
async def train(json_data: dict, user_id: str):
    recognizer = Recognizer(json_data=json_data)
    if recognizer.success:
        recognizer.dump_model(user_id=user_id)
        return {
            "status": 200,
            "message": "OK"
            }
    else:
        return {
            "status": 400,
            "message": f"Лицо класса {recognizer.failed_on} не было обнаружено\n Сделайте фотографию, где будет лучше видно лицо"
            }


@r.websocket("/ws/face-recognition/predict/{user_id}")
async def classification(websocket: WebSocket, user_id):
    await manager.connect(websocket)
    try:
        with open(f"./app/computer_vision/resources/user_{user_id}/model_rec.pkl", "rb") as f:
            recognizer = pickle.load(f)
        while True:
            data = await websocket.receive_text()
            data = json.loads(data)
            print(f"data = {data}")
            img = data['data']['image'].split(',')[1]
            # class_mapping = data['data']["class_mapping"]

            clf_prediction = recognizer.recognize(img)

            await manager.send_json(clf_prediction, websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
