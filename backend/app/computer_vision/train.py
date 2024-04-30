import random
import math
import sys
import os

from torchvision.transforms import Compose, Normalize, Resize, ToTensor
from torchvision.models import resnet152, ResNet152_Weights
from torchvision.models import resnet18, ResNet18_Weights
from torch.utils.data import Dataset, DataLoader
from torchmetrics.functional import accuracy
from torchvision.datasets import ImageFolder
import torchvision.transforms as transforms
from torch.utils.data import DataLoader
from torch.nn import functional as F
import matplotlib.pyplot as plt
import pytorch_lightning as pl
from PIL import Image
from tqdm import tqdm
from torch import nn
import torchvision
import numpy as np
import base64
import pickle
import torch
import io

LAST_BLOCK_MAPPING = {
    resnet18: "layer4.1",
    resnet152: "layer4.2"
}


def get_gpu_flag():
    return torch.cuda.is_available()


def seed_everything(seed):
    # Фискирует максимум сидов.
    # Это понадобится, чтобы сравнение оптимизаторов было корректным
    random.seed(seed)
    os.environ["PYTHONHASHSEED"] = str(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed(seed)
    torch.backends.cudnn.deterministic = True


def prepare_model(torch_model=resnet18,
                  torch_weights=ResNet18_Weights,
                  num_classes=2,
                  train_strategy="last_layer"):
    model = torch_model(weights=torch_weights, num_classes=1000)

    for param in model.parameters():
        param.requires_grad = False

    model.fc = nn.Linear(512, num_classes)

    if train_strategy == "last_block":
        for layer_name, layer_param in model.named_parameters():
            last_layer_name = LAST_BLOCK_MAPPING[torch_model]
            if last_layer_name in layer_name:
                layer_param.requires_grad = True
    elif train_strategy == "last_layer":
        model.fc.requires_grad = True
    elif train_strategy == "whole_network":
        for _, layer_param in model.named_parameters():
            layer_param.requires_grad = True
    else:
        raise Exception("Incorrect train_strategy. There are three options: last_layer and last_block, whole_network")

    return model


class CvModule(pl.LightningModule):
    def __init__(self, model) -> None:
        super().__init__()
        self.model = model

        self.optimizer = torch.optim.Adam(self.model.parameters(), lr=1e-4)
        self.loss = nn.CrossEntropyLoss()

    def forward(self, x) -> torch.Tensor:
        preds = self.model(x)
        return preds

    def configure_optimizers(self):
        scheduler = torch.optim.lr_scheduler.ExponentialLR(self.optimizer, gamma=0.975)
        return [self.optimizer], [scheduler]

    def training_step(self, train_batch, batch_idx) -> torch.Tensor:
        images, target = train_batch
        preds = self.forward(images)
        loss = self.loss(preds, target)
        acc = accuracy(torch.argmax(preds, dim=-1).long(), target.long(), task="binary")
        self.log("train_accuracy", acc, prog_bar=True)
        self.log("train_loss", loss, prog_bar=True)
        return loss


def transform_to_dataloader(param_1, param_2, param_3):
    """
    :param param_1:
    :param param_2:
    :param param_3:
    :return int:
    """

    train_transform = Compose(
        [
            transforms.RandomRotation(degrees=15),
            transforms.RandomVerticalFlip(),
            transforms.RandomHorizontalFlip(),
            ToTensor(),
            Normalize((0.485, 0.456, 0.406), (0.229, 0.224, 0.225)),
        ])
    val_transform = Compose(
        [
            ToTensor(),
            Normalize((0.485, 0.456, 0.406), (0.229, 0.224, 0.225)),
        ])

    return 123


class CustomDataset(Dataset):
    def __init__(self, json_data, transform=None):
        self.data = []
        self.transform = transform
        self.class_mapping = {
            "cats": 0,
            "dogs": 1
        }
        for class_name, images in json_data["classes"].items():
            for img_base64 in images:
                img_bytes = base64.b64decode(img_base64)
                img = Image.open(io.BytesIO(img_bytes))
                self.data.append((img, class_name))

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        img, class_name = self.data[idx]
        if self.transform:
            img = self.transform(img)
        return img, self.class_mapping[class_name]


def transform_data(data):
    pass


def train_model(json_data: dict, user_id: str):
    transform = Compose(
        [
            #         transforms.RandomRotation(degrees=15),
            #         transforms.RandomVerticalFlip(),
            #         transforms.RandomHorizontalFlip(),
            transforms.Resize((224, 224)),
            ToTensor(),
            Normalize((0.485, 0.456, 0.406), (0.229, 0.224, 0.225)),
        ])

    # Create Dataset and DataLoader
    dataset = CustomDataset(json_data, transform=transform)
    dataloader = DataLoader(dataset, batch_size=2, shuffle=True)

    test_model = prepare_model(resnet18, ResNet18_Weights)

    torch.cuda.empty_cache()
    device = "cuda:0" if torch.cuda.is_available() else "cpu"

    model = CvModule(test_model).to(device)  # YOUR CODE HERE
    trainer = pl.Trainer(
        accelerator=device,
        max_epochs=20
    )
    trainer.fit(model, train_dataloaders=dataloader)

    class_mapping = {k: v for k, v in enumerate(json_data["classes"].keys())}
    print(class_mapping)

    with open(f"computer_vision/resources/classification_{user_id}.sav", "wb") as f:
        pickle.dump(model, f)

    return class_mapping


def predict(image: str, class_mapping: dict, user_id: str):
    transform = Compose(
        [
            #         transforms.RandomRotation(degrees=15),
            #         transforms.RandomVerticalFlip(),
            #         transforms.RandomHorizontalFlip(),
            transforms.Resize((224, 224)),
            ToTensor(),
            Normalize((0.485, 0.456, 0.406), (0.229, 0.224, 0.225)),
        ])

    with open(f"computer_vision/resources/classification_{user_id}.sav", "rb") as f:
        model = pickle.load(f)

    image = transform(Image.open(io.BytesIO(base64.b64decode(image)))).unsqueeze(0)

    model.eval()
    with torch.no_grad():
        pred = model.forward(image)
        pred_classes = torch.argmax(pred, dim=-1)
        print(pred)
        print(class_mapping[str(int(pred_classes[0]))])
        return class_mapping[str(int(pred_classes[0]))]
