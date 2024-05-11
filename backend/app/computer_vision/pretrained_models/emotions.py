import base64
import json
import os

from fer import FER
import numpy as np
import warnings
import cv2


warnings.filterwarnings("ignore")
detector = FER()


def get_fer_prediction(image_b64, debug=False):
    """
    Getting emotional analysis of face on the given image (in case of few faces, algorithm takes first one)

    :param bytes image_b64: image in base64 format
    :param bool debug: not yet implemented
    :returns str fer_results: emotions with relative probs
    """
    np_arr = np.fromstring(base64.b64decode(image_b64), np.uint8)
    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    fer_results = detector.detect_emotions(image)[0]
    fer_results["box"] = fer_results["box"].tolist()
    fer_results["emotion"] = max(fer_results["emotions"], key=fer_results["emotions"].get)

    return fer_results


if __name__ == "__main__":
    with open(os.path.join(os.path.dirname(__file__), "resources/happy.jpg"), "rb") as f:
        raw_img = f.read()
    img_b64 = base64.b64encode(raw_img)

    results = get_fer_prediction(img_b64)
    print(json.dumps(results, default=float, indent=4))
