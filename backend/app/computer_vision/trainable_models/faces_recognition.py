import io
import json
import base64
import pickle
from typing import List, Union

import numpy as np
from PIL import Image
import face_recognition


class Recognizer:
    face_images: List[np.ndarray]
    face_names: List[str]
    face_encodings: List[np.ndarray]

    def __init__(self, json_data: dict) -> None:
        """
        Constructor parses input json containing known faces and generates encodings for them

        :param json_data: input json from backend
        """
        self.face_images = []
        self.face_names = []
        self.face_encodings = []
        for face_image in self.face_images:
            # Take only first face occurance
            face_encoding = face_recognition.face_encodings(face_image,
                                                            num_jitters=1,
                                                            # How many times to re-sample the face when calculating encoding
                                                            model='small')[0]  # which model to use. “large” or “small”
            self.face_encodings.append(face_encoding)

    def _handle_json(self, json_data: dict):
        """
        Method handles input json and fills in faces_images and face_names lists

        :param json_data: input json from backend
        """
        for class_name, images in json_data["classes"].items():
            for img_base64 in images:
                img_bytes = base64.b64decode(img_base64)
                img_pil = Image.open(io.BytesIO(img_bytes))
                img_np = np.array(img_pil)

                self.face_names.append(class_name)
                self.face_images.append(img_np)

    def recognize(self, frame: np.ndarray) -> dict[str, Union[bool, list]]:
        """
        Method recognizes known people from the given frame

        :param frame: cv2 Image
        :return: final answer
        """
        json_out = {
            "recognized_flg": False,
            "recognized_people": []
        }

        encodings = face_recognition.face_encodings(frame)
        for enc in encodings:
            matches = face_recognition.compare_faces(self.face_encodings, enc, tolerance=0.6)

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
        with open(path, "wb") as model_rec:
            pickle.dump(self, model_rec)  # TODO: Implement sending to the frontend


if __name__ == "__main__":
    with open("sample_face_rec.json", "r") as f:
        face_rec_json = json.loads(f.read())  # same json structure as classification one

    rec = Recognizer(face_rec_json)

    test_image = "base64_image"
    img_bytes = base64.b64decode(test_image)
    img_pil = Image.open(io.BytesIO(img_bytes))
    img_np = np.array(img_pil)

    print(rec.recognize(img_np))  # {'recognized_flg': True, 'recognized_people': ['Арсений Пивоваров', 'Софья Мосина']}
