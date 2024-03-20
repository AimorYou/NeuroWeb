import math
import os
import random
import sys

import matplotlib.pyplot as plt
import numpy as np
import pytorch_lightning as pl
import torch
import torchvision
import torchvision.transforms as transforms
from PIL import Image
from torch import nn
from torch.nn import functional as F
from torch.utils.data import DataLoader, Dataset
from torchmetrics.functional import accuracy
from torchvision.datasets import ImageFolder
from tqdm import tqdm
from torchvision.transforms import Compose, Normalize, Resize, ToTensor
from torchvision.models import resnet18, ResNet18_Weights
from torchvision.models import resnet152, ResNet152_Weights

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
                  train_strategy="last_block"):

    model = torch_model(weights=torch_weights, num_classes=1000)

    for param in model.parameters():
        param.requires_grad = False

    model.fc = nn.Linear(2048, num_classes)

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
        acc = accuracy(torch.argmax(preds, dim=-1).long(), target.long())
        self.log("train_accuracy", acc, prog_bar=True)
        self.log("train_loss", loss, prog_bar=True)
        return loss

    def validation_step(self, val_batch, batch_idx) -> None:
        images, target = val_batch
        preds = self.forward(images)
        loss = self.loss(preds, target)
        acc = accuracy(torch.argmax(preds, dim=-1).long(), target.long())
        self.log("val_loss", loss, prog_bar=True)
        self.log("accuracy", acc, prog_bar=True)


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

    train_dataset = ImageFolder('/content/dataset/dataset/train', transform=train_transform)
    val_dataset = ImageFolder('/content/dataset/dataset/val', transform=val_transform)
    # REPLACE ./dataset/dataset WITH THE FOLDER WHERE YOU DOWNLOADED AND UNZIPPED THE DATASET

    train_dataloader = DataLoader(train_dataset, batch_size=256, shuffle=True)  # YOUR CODE HERE
    val_dataloader = DataLoader(val_dataset, batch_size=256)  # YOUR CODE HERE

    return 123


if __name__ == "__main__":
    test_model = prepare_model(resnet18, ResNet18_Weights)

    torch.cuda.empty_cache()
    device = "cuda:0" if torch.cuda.is_available() else "cpu"

    model2 = CvModule(test_model).to(device)  # YOUR CODE HERE
    trainer2 = pl.Trainer(
        accelerator="cpu",
        max_epochs=20
    )
    trainer2.fit(model2, train_dataloader, val_dataloader)

    print(seed_everything(123456))
    print(torch.cuda.is_available())
