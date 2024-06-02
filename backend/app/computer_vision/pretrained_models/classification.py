import json
import os
import io

import torch
import base64
from PIL import Image
import torchvision.transforms as transforms
from torchvision.transforms import InterpolationMode
from torchvision.models import efficientnet_v2_l, EfficientNet_V2_L_Weights


img_clf_model = efficientnet_v2_l(weights=EfficientNet_V2_L_Weights.IMAGENET1K_V1)
img_clf_model.eval()

with open(os.path.join(os.path.dirname(__file__), "../resources/imagenet_cls_mapping.json"), "r") as f:
    imagenet_cls_mapping = json.loads(f.read())


def get_clf_prediction(image_b64):
    preprocess = transforms.Compose([
            transforms.Resize(480, interpolation=InterpolationMode.BICUBIC),
            transforms.CenterCrop(480),
            transforms.ToTensor(),
            transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
    ])

    image_transformed = preprocess(Image.open(io.BytesIO(base64.b64decode(image_b64)))).unsqueeze(0)
    with torch.no_grad():
        predicted_class = torch.argmax(img_clf_model(image_transformed))

    return imagenet_cls_mapping[str(predicted_class.item())]


if __name__ == "__main__":
    with open(os.path.join(os.path.dirname(__file__), "imageToSave.jpg"), "rb") as f:
        raw_img = f.read()
    img_b64 = base64.b64encode(raw_img)

    print(get_clf_prediction(img_b64))
