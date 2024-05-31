from fastapi import WebSocket, WebSocketDisconnect, APIRouter, UploadFile, Form, Query
# from fastapi.responses import HTMLResponse
# from draw import draw, add_bounding_boxes
from db.schemas import JSONValidation
from s3.storage import storage
from typing import List
from computer_vision.trainable_models.classification import train_model, predict, _predict
from computer_vision.trainable_models.image_classification import ImageClassification
from computer_vision.trainable_models.faces_recognition import Recognizer
from computer_vision.trainable_models.image_detection import Detector
import pickle
import shutil
import json
import yaml
import os

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


# @r.post("/classification/train-model")
# async def train_classification(json_data: dict, user_id: str):
#     class_mapping = train_model(json_data=json_data, user_id=user_id)
#     return {200: "OK", "class_mapping": class_mapping}

@r.post("/classification/train-model")
async def train_classification(json_data: dict, user_id: str):
    hyperparameters = json_data.get("hyperparameters", {})
    image_clf = ImageClassification(json_data, **hyperparameters)
    image_clf.fit(max_epochs=10)
    with open(f"./app/computer_vision/resources/user_{user_id}/classification_{user_id}.pkl", "wb") as f:
        pickle.dump(image_clf, f)
    # storage.put_object(pickle.dumps(image_clf), f"user_{user_id}/classification/classification_{user_id}.pkl")
    return {200: "OK"}


@r.post("/classification/predict")
async def predict_classification(json_data: dict, user_id: str):
    prediction = predict(image=json_data["image"], user_id=user_id)
    return {200: "OK", "prediction": prediction}


@r.websocket("/ws/classification/predict/{user_id}")
async def predict_classification_ws(websocket: WebSocket, user_id):
    await manager.connect(websocket)
    try:
        # image_clf = pickle.loads(storage.get_object(f"user_{user_id}/classification/classification_{user_id}.pkl"))
        # class_mapping = json.loads(storage.get_object(f"user_{user_id}/classification/classification_mapping_{user_id}.json"))
        # with open(f"./app/computer_vision/resources/user_{user_id}/classification_{user_id}.sav", "rb") as f:
        #     model = pickle.load(f)
        # model = pickle.loads(storage.get_object(f"user_{user_id}/classification/classification_{user_id}.pt"))
        # class_mapping = json.loads(storage.get_object(f"user_{user_id}/classification/classification_mapping_{user_id}.json"))
        with open(f"./app/computer_vision/resources/user_{user_id}/classification_{user_id}.pkl", "rb") as f:
            image_clf = pickle.load(f)

        # with open(f"./app/computer_vision/resources/user_{user_id}/classification_mapping_{user_id}.json", "r") as f:
        #     class_mapping = json.load(f)
        while True:
            data = await websocket.receive_text()
            data = json.loads(data)
            print(f"data = {data}")
            img = data['data']['image'].split(',')[1]
            # class_mapping = data['data']["class_mapping"]

            # clf_prediction = _predict(model, img, class_mapping)
            pred_class_mapped, cls_probs_mapped = image_clf.predict(img)
            print(cls_probs_mapped)
            await manager.send_json(cls_probs_mapped, websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)


@r.post("/face-recognition/train-model")
async def train_recognizer(json_data: dict, user_id: str):
    hyperparameters = json_data.get("hyperparameters", {})
    recognizer = Recognizer(json_data=json_data, **hyperparameters)
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
async def recognize_face(websocket: WebSocket, user_id):
    await manager.connect(websocket)
    try:
        # with open(f"./app/computer_vision/resources/user_{user_id}/model_rec.pkl", "rb") as f:
        #     recognizer = pickle.load(f)
        recognizer = pickle.loads(storage.get_object(f"user_{user_id}/face-recognition/model_rec.pkl"))
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


@r.post("/detection/train-model")
async def train_detection(
        files: List[UploadFile] = Form(),
        user_id: str = Query(),
        names: list[str] = Query()
):
    # _create_directories(user_id, names)
    # _fill_directories(files, user_id, train_size)

    hyperparameters = {
        "model_size": "nano",  # nano/small/medium,
        "train_size": 0.7,
        "batch_size": 16,
        "n_epochs": 35
    }

    # detector = Detector(names=names, uid=user_id, mode="train", **hyperparameters)


@r.websocket("/ws/detection/predict/{user_id}")
async def detect(websocket: WebSocket, user_id):
    await manager.connect(websocket)
    try:
        hyperparameters = {
            "model_size": "nano",  # nano/small/medium,
            "train_size": 0.7,
            "batch_size": 16,
            "n_epochs": 35
        }  # Научиться получать из запроса
        detector = Detector(names=[], uid=user_id, mode="inference", **hyperparameters)
        while True:
            data = await websocket.receive_text()
            data = json.loads(data)
            print(f"data = {data}")
            img = data['data']['image'].split(',')[1]
            # class_mapping = data['data']["class_mapping"]

            prediction = detector.predict(img)

            await manager.send_json(prediction, websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)


def _create_directories(user_id: str, names: list[str]):
    if not os.path.exists(f"./app/computer_vision/resources/user_{user_id}"):
        os.mkdir(f"./app/computer_vision/resources/user_{user_id}")

    # clear existing directories
    if os.path.exists(f"./app/computer_vision/resources/user_{user_id}/yolo_data"):
        shutil.rmtree(f"./app/computer_vision/resources/user_{user_id}/yolo_data")
        for _dir in os.listdir(f"./app/computer_vision/resources/user_{user_id}"):
            if "train" in _dir:
                shutil.rmtree(f"./app/computer_vision/resources/user_{user_id}/{_dir}")


    try:
        os.mkdir(f"./app/computer_vision/resources/user_{user_id}/yolo_data")
        os.mkdir(f"./app/computer_vision/resources/user_{user_id}/yolo_data/train")
        os.mkdir(f"./app/computer_vision/resources/user_{user_id}/yolo_data/val")
        os.mkdir(f"./app/computer_vision/resources/user_{user_id}/yolo_data/train/labels")
        os.mkdir(f"./app/computer_vision/resources/user_{user_id}/yolo_data/train/images")
        os.mkdir(f"./app/computer_vision/resources/user_{user_id}/yolo_data/val/labels")
        os.mkdir(f"./app/computer_vision/resources/user_{user_id}/yolo_data/val/images")
    except:
        pass

    data_yaml = {
        "path": f"{os.getcwd()}/app/computer_vision/resources/user_{user_id}/yolo_data/",
        "train": f"{os.getcwd()}/app/computer_vision/resources/user_{user_id}/yolo_data/train/images",
        "val": f"{os.getcwd()}/app/computer_vision/resources/user_{user_id}/yolo_data/val/images",
        "nc": len(names),
        "names": names
    }

    with open(f"./app/computer_vision/resources/user_{user_id}/yolo_data/data.yaml", "w") as file:
        yaml.dump(data_yaml, file)


def _fill_directories(files: list[UploadFile], user_id: str, train_size: float):
    if len(files) % 2 != 0:
        print("Кол-во изображений не соответствует кол-ву labels")
        raise Exception
    data_len = len(files) // 2
    train_len = round(data_len * train_size)
    images, labels = _divide_files(files)

    for i in range(train_len):
        # Сохраняем картинки
        image_file = images[i]
        data = image_file.file.read()
        save_to = f"./app/computer_vision/resources/user_{user_id}/yolo_data/train/images/" + image_file.filename
        with open(save_to, "wb") as f:
            f.write(data)

        # Сохраняем labels
        label_file = labels[i]
        data = label_file.file.read()
        save_to = f"./app/computer_vision/resources/user_{user_id}/yolo_data/train/labels/" + label_file.filename
        with open(save_to, "wb") as f:
            f.write(data)

    for i in range(train_len, data_len):
        # Сохраняем картинки
        image_file = images[i]
        data = image_file.file.read()
        save_to = f"./app/computer_vision/resources/user_{user_id}/yolo_data/val/images/" + image_file.filename
        with open(save_to, "wb") as f:
            f.write(data)

        # Сохраняем labels
        label_file = labels[i]
        data = label_file.file.read()
        save_to = f"./app/computer_vision/resources/user_{user_id}/yolo_data/val/labels/" + label_file.filename
        with open(save_to, "wb") as f:
            f.write(data)


def _divide_files(files: list[UploadFile]):
    images = []
    labels = []
    for file in files:
        if "txt" in file.filename:
            labels.append(file)
        elif file.filename.split(".")[1] in {"jpg", "jpeg"}:
            images.append(file)
        else:
            raise Exception("Unknown file extention")

    return sorted(images, key=lambda f: f.filename), sorted(labels, key=lambda f: f.filename)
