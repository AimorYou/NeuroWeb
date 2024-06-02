import io
import json
import base64
import pickle
from typing import List, Union

from s3.storage import storage

import numpy as np
from PIL import Image
import face_recognition


class Recognizer:
    face_images: List[np.ndarray]
    face_names: List[str]
    face_encodings: List[np.ndarray]

    def __init__(self,
                 json_data: dict,
                 num_jitters: int = 1,
                 tolerance: float = 0.6,
                 model_size: str = "small") -> None:
        """
        Constructor parses input json containing known faces and generates encodings for them

        :param json_data: input json from backend
        :param num_jitters: how many times to re-sample the face when calculating encoding
        :param model_size: which model to use. “large” or “small”
        :param tolerance: threshold for matching a person to a particular person (from 0 to 1)
        """
        self.num_jitters = num_jitters
        self.model_size = model_size
        self.tolerance = tolerance

        self.face_images = []
        self.face_names = []
        self.success = True
        self.failed_on = ""

        self._handle_json(json_data=json_data)
        self.face_encodings = []
        self._encode_faces()

    def _handle_json(self, json_data: dict):
        """
        Method handles input json and fills in faces_images and face_names lists

        :param json_data: input json from backend
        """
        for class_name, images in json_data["classes"].items():
            for img in images:
                img_base64 = img.split(',')[1]
                img_bytes = base64.b64decode(img_base64)
                img_pil = Image.open(io.BytesIO(img_bytes))
                img_np = np.array(img_pil)

                self.face_names.append(class_name)
                self.face_images.append(img_np)

    def _encode_faces(self) -> None:
        """
        Method encodes faces and fills self.face_encodings list
        """
        for face_image, face_name in zip(self.face_images, self.face_names):
            # Take only first face occurance
            face_encoding = face_recognition.face_encodings(face_image,
                                                            num_jitters=self.num_jitters,
                                                            model=self.model_size)
            if face_encoding:
                self.face_encodings.append(face_encoding[0])
            else:
                self.success = False
                self.failed_on = face_name
                break

    def recognize(self, image_b64: str) -> dict[str, Union[bool, list]]:
        """
        Method recognizes known people from the given frame

        :param image_b64: image in base64 format
        :return: final answer
        """
        json_out = {
            "recognized_flg": False,
            "recognized_people": []
        }

        img_bytes = base64.b64decode(image_b64)
        img_pil = Image.open(io.BytesIO(img_bytes))
        frame = np.array(img_pil)

        encodings = face_recognition.face_encodings(frame)
        for enc in encodings:
            matches = face_recognition.compare_faces(self.face_encodings, enc, tolerance=self.tolerance)

            match_idx = None
            for idx, match in enumerate(matches):
                if match:
                    match_idx = idx
                    break

            if match_idx is not None:
                json_out["recognized_flg"] = True
                json_out["recognized_people"].append(self.face_names[match_idx])

        return json_out

    def dump_model(self, user_id: str, path: str = "model_rec.pkl"):
        """
        Method downloads trained face recognition model to the specified path

        :param user_id: user id for identifying user directory
        :param path: desired path for saving model
        """
        path = f"./app/computer_vision/resources/user_{user_id}/" + path
        # with open(path, "wb") as model_rec:
        #     pickle.dump(self, model_rec)
        storage.put_object(pickle.dumps(self), f"user_{user_id}/face-recognition/model_rec.pkl")


if __name__ == "__main__":
    with open("sample_face_rec.json", "r") as f:
        face_rec_json = json.loads(f.read())  # same json structure as classification one

    rec = Recognizer(face_rec_json)

    test_image = "base64_image"
    print(rec.recognize(test_image))  # {'recognized_flg': True, 'recognized_people': ['Арсений П', 'Софья М']}
