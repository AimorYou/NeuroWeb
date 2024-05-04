import os
import io
import yaml
import base64

import numpy as np
from PIL import Image
from ultralytics import YOLO


class Detector:
    colors = [
        "RGB(255, 0, 0)",     # Red
        "RGB(0, 255, 0)",     # Green
        "RGB(0, 0, 255)",     # Blue
        "RGB(255, 255, 0)",   # Yellow
        "RGB(255, 0, 255)",   # Magenta
        "RGB(0, 255, 255)",   # Cyan
        "RGB(128, 0, 128)",   # Purple
        "RGB(0, 128, 128)",   # Teal
        "RGB(128, 128, 0)",   # Olive
        "RGB(128, 128, 128)"  # Gray
    ]

    def __init__(self, json_data: dict, uid: str, mode: str = "train") -> None:
        """
        This class works in two modes:
            train: Constructor parses input json containing data in YOLOv8 format and creates dir for training.
            Next, the model immediately starts training on the stored data
            inference: Model loads according to the best weights on given uid dir.

        Input json format (json_data):
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

        :param json_data: input json with data for training from the backend
        :param uid: name of the user directory
        :param mode: inference/train
        """
        if len(json_data["classes"]["names"]) > len(self.colors):
            raise Exception(f"Classes number exceeds the limit in {len(self.colors)}")

        if mode == "train":
            self.data = json_data["classes"]["data"]
            self.class_names = json_data["classes"]["names"]
            self.hyperparams = json_data["hyperparameters"]
            self.model = None

            self._handle_json(json_data, uid)
            self._train_model()
        elif mode == "inference":
            self.model = YOLO(f"{uid}/runs/detect/train/weights/best.pt")  # FIXME: Fix path
            self.class_names = json_data["classes"]["names"]
        else:
            raise Exception("Unknown mode! Avialable modes are train and inference")

    def _handle_json(self, json_in: dict, uid: str) -> None:
        """
        Method handles input json and creates YOLOv8 format dir for training

        :param json_in: input json from backend
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

    def _train_model(self) -> None:
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

    def predict(self, image_b64: str, debug: bool = False):
        """
        Method makes prediction on given base64 image

        :param image_b64: base64 image
        :param debug: logging lavel
        """
        img_bytes = base64.b64decode(image_b64)
        img_pil = Image.open(io.BytesIO(img_bytes))
        img_np = np.array(img_pil)

        yolo_results = self.model.predict(img_np, verbose=debug)
        structured_result = {}

        boxes_info = yolo_results[0].boxes
        for idx, cls_prediction in enumerate(boxes_info.cls):
            bbox_info = {
                "cls": self.class_names[int(cls_prediction.item())][0],
                "conf": round(boxes_info.conf[idx].item(), 2),
                "coordinates": boxes_info.xyxy[idx].tolist(),
                "color": self.colors[int(cls_prediction.item())]
            }
            structured_result[idx] = bbox_info

        return structured_result
