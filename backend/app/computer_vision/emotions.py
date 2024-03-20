import json
import os

# from fer_pytorch.fer import FER as TorchFer
from fer import FER as TfFer
import warnings
import cv2


warnings.filterwarnings("ignore")
detector_tf = TfFer()

# detector_torch = TorchFer()
# detector_torch.get_pretrained_model("resnet34")


def get_bbox_prediction_tf(image, debug=False):
    tf_fer_results = detector_tf.detect_emotions(image)[0]
    tf_fer_results["box"] = tf_fer_results["box"].tolist()
    tf_fer_results["emotion"] = max(tf_fer_results["emotions"], key=tf_fer_results["emotions"].get)

    return tf_fer_results


def get_bbox_prediction_torch(image, debug=False):
    torch_fer_results = detector_torch.predict_image(image)[0]
    torch_fer_results["emotion"] = max(torch_fer_results["emotions"], key=torch_fer_results["emotions"].get)
    torch_fer_results["emotions"] = {k: round(float(v), 2) for k, v in torch_fer_results["emotions"].items()}

    return torch_fer_results


if __name__ == "__main__":
    # img = Image.open(os.path.join(os.path.dirname(__file__), "resources/happy.jpg"))
    img = cv2.imread(os.path.join(os.path.dirname(__file__), "resources/angry.jpg"))

    tf_version_results = get_bbox_prediction_tf(img)
    print(json.dumps(tf_version_results, default=float, indent=4))

    torch_version_results = get_bbox_prediction_torch(img)
    print(json.dumps(torch_version_results, default=float, indent=4))

