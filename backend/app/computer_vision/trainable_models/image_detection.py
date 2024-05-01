import os
import io
import yaml
import base64
from typing import List

import numpy as np
from PIL import Image
from ultralytics import YOLO


class Detector:
    def __init__(self, json_data: dict, uid: str) -> None:
        """
        Constructor parses input json containing data in YOLOv8 format and creates dir for training
        Input json format:
        {
            "classes": {
                "names": ["face_with_mask", "face_without_mask"],
                "data": {
                    "labels": [label_1, label_2, label_3], # strings
                    "images": [image_1, image_2, image_3]  # base 64 encoded images
                }
            },
            "hyperparameters": {
                "model": "nano", # nano/small/medium,
                "train_size": 0.7,
                "batch_size": 16,
                "n_epochs": 35
            }
        }

        :param json_data: input json from backend
        """
        self.data = json_data["classes"]["data"]
        self.hyperparams = json_data["hyperparameters"]
        self.model = None

        self._handle_json(json_data, uid)
        self.train_model()

    def _handle_json(self, json_in: dict, uid: str) -> None:
        """
        Method handles input json and creates YOLOv8 format dir for training

        :param json_data: input json from backend
        """
        # 1. Create dir with user id and move there
        try:
            os.mkdir(uid)
        except:
            pass
        os.chdir(uid)

        # 2. Creating data dir in YOLOv8 format
        os.mkdir("data")

        data_yaml = {
            "train": "../train/images",
            "val": "../val/images",
            "nc": len(json_in["classes"]["names"]),
            "names": json_in["classes"]["names"]
        }
        with open(os.path.abspath(f"{os.curdir}/data/data.yaml"), "w") as file:
            yaml.dump(data_yaml, file)

        # 3. Filling train and val directories
        os.mkdir(os.path.abspath(f"{os.curdir}/data/train"))
        os.mkdir(os.path.abspath(f"{os.curdir}/data/val"))
        os.mkdir(os.path.abspath(f"{os.curdir}/data/train/labels"))
        os.mkdir(os.path.abspath(f"{os.curdir}/data/train/images"))
        os.mkdir(os.path.abspath(f"{os.curdir}/data/val/labels"))
        os.mkdir(os.path.abspath(f"{os.curdir}/data/val/images"))

        if len(self.data["labels"]) != len(self.data["images"]):
            raise Exception("Provided labels don't match images")

        data_len = len(self.data["labels"])
        train_len = round(data_len * self.hyperparams["train_size"])

        for i in range(train_len):
            image_b64 = self.data["images"][i]
            img_bytes = base64.b64decode(image_b64)
            img_pil = Image.open(io.BytesIO(img_bytes))
            img_pil.save(os.path.abspath(f"{os.curdir}/data/train/images/{i}.jpg"))

        with open(os.path.abspath(f"{os.curdir}/data/train/labels/{i}.txt"), "w") as f:
            f.write(self.data["labels"][i])

        for i in range(train_len, data_len):
            image_b64 = self.data["images"][i]
            img_bytes = base64.b64decode(image_b64)
            img_pil = Image.open(io.BytesIO(img_bytes))
            img_pil.save(os.path.abspath(f"{os.curdir}/data/val/images/{i}.jpg"))

        with open(os.path.abspath(f"{os.curdir}/data/val/labels/{i}.txt"), "w") as f:
            f.write(self.data["labels"][i])

    def train_model(self) -> None:
        """
        Method trains the specified yolo model (nano/small/medium)
        """
        YOLO_models_mapping = {
            "nano": "yolov8n.pt",
            "small": "yolov8s.pt",
            "medium": "yolov8m.pt"
        }
        model_name = YOLO_models_mapping[self.hyperparams["model"]]
        self.model = YOLO(os.path.abspath(f"{os.curdir}/../{model_name}"))

        self.model.train(data=os.path.abspath(f"{os.curdir}/data/data.yaml"),
                         batch=self.hyperparams["batch_size"],
                         epochs=self.hyperparams["n_epochs"])

    def predict(self, image_b64: str):
        """
        Method downloads trained face recognition model to the specified path

        :param image_b64: base64 image
        """
        img_bytes = base64.b64decode(image_b64)
        img_pil = Image.open(io.BytesIO(img_bytes))
        img_np = np.array(img_pil)

        res = self.model.predict(img_np)  # TODO: Handle result

        return res
