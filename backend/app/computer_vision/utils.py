import base64
import sys
import io

from torchvision.models import efficientnet_v2_s, EfficientNet_V2_S_Weights
from torchvision.models import efficientnet_v2_m, EfficientNet_V2_M_Weights
from torchvision.models import efficientnet_v2_l, EfficientNet_V2_L_Weights
from torch.utils.data import Dataset, DataLoader
from torchmetrics.functional import accuracy
from PIL import Image
from torch import nn
import torch


class CustomDataset(Dataset):
    def __init__(self, json_data, class_mapping, transform=None):
        self.data = []
        self.transform = transform
        self.class_mapping = class_mapping

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


class CvModule(pl.LightningModule):
    def __init__(self, model, num_classes) -> None:
        super().__init__()
        self.model = model
        self.num_classes = num_classes

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
        acc = accuracy(torch.argmax(preds, dim=-1).long(),
                       target.long(), task="multiclass",
                       num_classes=self.num_classes)

        self.log("train_accuracy", acc, prog_bar=True)
        self.log("train_loss", loss, prog_bar=True)
        self.log("batch_idx", batch_idx, prog_bar=True)

        return loss


image_clf_models_params = {
    "small": {
        "model": efficientnet_v2_s(weights=EfficientNet_V2_S_Weights.IMAGENET1K_V1, num_classes=1000),
        "last_layer_name": "features.7",
        "resize_size": 384,
        "crop_size": 384,
        "mean": (0.485, 0.456, 0.406),
        "std": (0.229, 0.224, 0.225),
        "interpolation": InterpolationMode.BILINEAR
    },
    "medium": {
        "model": efficientnet_v2_m(weights=EfficientNet_V2_M_Weights.IMAGENET1K_V1, num_classes=1000),
        "last_layer_name": "features.8",
        "resize_size": 480,
        "crop_size": 480,
        "mean": (0.485, 0.456, 0.406),
        "std": (0.229, 0.224, 0.225),
        "interpolation": InterpolationMode.BILINEAR
    },
    "large": {
        "model": efficientnet_v2_l(weights=EfficientNet_V2_L_Weights.IMAGENET1K_V1, num_classes=1000),
        "last_layer_name": "features.8",
        "resize_size": 480,
        "crop_size": 480,
        "mean": (0.5, 0.5, 0.5),
        "std": (0.5, 0.5, 0.5),
        "interpolation": InterpolationMode.BICUBIC
    }
}
