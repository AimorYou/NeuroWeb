import json
import os

import torch
from PIL import Image
from torchvision.models import resnet18, ResNet18_Weights
from torchvision.models import resnet152, ResNet152_Weights


with open(os.path.join(os.path.dirname(__file__), "resources/imagenet_cls_mapping.json"), "r") as f:
    imagenet_cls_mapping = json.loads(f.read())


def get_clf_prediction(image, torch_model=resnet152, torch_weights=ResNet152_Weights.DEFAULT):

    # Apply transforms to the input image
    preprocess = torch_weights.transforms()
    image_transformed = preprocess(image).unsqueeze(0)

    # Initialize the model
    model = torch_model(weights=torch_weights)
    model.eval()

    predicted_class = torch.argmax(model(image_transformed))

    return imagenet_cls_mapping[str(predicted_class.item())][1]


if __name__ == "__main__":

    img = Image.open(os.path.join(os.path.dirname(__file__), "imageToSave.png"))

    print(get_clf_prediction(img, resnet18, ResNet18_Weights.DEFAULT))
    print(get_clf_prediction(img, resnet152, ResNet152_Weights.DEFAULT))
