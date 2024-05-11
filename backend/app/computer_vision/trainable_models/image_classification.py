import base64
import io

from torch.utils.data import Dataset, DataLoader
import torchvision.transforms as transforms
from torch.nn.functional import softmax
import pytorch_lightning as pl
from PIL import Image
from torch import nn
import torch


class ImageClassification:
    def __init__(self,
                 json_data,
                 batch_size=2,
                 model_size="small",
                 train_strategy="last_layer",
                 augmentation_flg=False,
                 gpu_flg=False):

        self.device = torch.device("cuda" if torch.cuda.is_available() and gpu_flg else "cpu")
        self.cls_mapping = dict(enumerate(json_data["classes"].keys()))
        self.num_classes = len(self.cls_mapping)

        self.model_params = models_params[model_size]
        self.dataloader = self.json_to_dataloader(json_data, batch_size, augmentation_flg)
        self.model = self.prepare_model(train_strategy)

        self.trained_model = None

    def fit(self, max_epochs=10):
        self.trained_model = CvModule(self.model, self.num_classes).to(self.device)

        trainer = pl.Trainer(
            accelerator=device,
            max_epochs=max_epochs
        )

        trainer.fit(self.trained_model, train_dataloaders=self.dataloader)

    def predict(self, image_b64):

        if self.trained_model is None:
            raise Exception("You need to train your model first")

        inference_transfrom = transforms.Compose([
            transforms.Resize(self.model_params["resize_size"], interpolation=self.model_params["interpolation"]),
            transforms.CenterCrop(self.model_params["crop_size"]),
            transforms.ToTensor(),
            transforms.Normalize(self.model_params["mean"], self.model_params["std"]),
        ])
        image = inference_transfrom(Image.open(io.BytesIO(base64.b64decode(image_b64)))).unsqueeze(0)

        self.trained_model.eval()
        with torch.no_grad():
            pred = self.trained_model.forward(image)
            pred_class = torch.argmax(pred, dim=-1)[0]
            pred_class_mapped = self.cls_mapping[int(pred_class)]

            cls_probs = softmax(pred, dim=1)[0]
            cls_probs_mapped = {k: round(float(v), 3) for k, v in zip(self.cls_mapping.values(), cls_probs)}

        return pred_class_mapped, cls_probs_mapped

    def json_to_dataloader(self, json_data, batch_size=2, augmentation_flg=False):
        """
        :param json_data:
        :param batch_size:
        :param augmentation_flg:

        :return DataLoader:
        """
        tranformations = [
            transforms.RandomRotation(degrees=15),
            transforms.RandomVerticalFlip(),
            transforms.RandomHorizontalFlip(),

            transforms.Resize(self.model_params["resize_size"], interpolation=self.model_params["interpolation"]),
            transforms.CenterCrop(self.model_params["crop_size"]),
            transforms.ToTensor(),
            transforms.Normalize(self.model_params["mean"], self.model_params["std"]),
        ]

        if not augmentation_flg:
            tranformations = tranformations[3:]

        final_transform = transforms.Compose(tranformations)
        reversed_cls_mapping = {v: k for k, v in self.cls_mapping.items()}
        dataset = CustomDataset(json_data, reversed_cls_mapping, transform=final_transform)

        return DataLoader(dataset, batch_size=batch_size, shuffle=True)

    def prepare_model(self, train_strategy="last_layer"):
        model = copy.deepcopy(self.model_params["model"])
        last_layer_name = self.model_params["last_layer_name"]

        for param in model.parameters():
            param.requires_grad = False

        model.classifier[1] = nn.Linear(1280, self.num_classes, bias=True, device=self.device)

        if train_strategy == "last_block":
            for layer_name, layer_param in model.named_parameters():
                if last_layer_name in layer_name:
                    layer_param.requires_grad = True
        elif train_strategy == "last_layer":
            model.classifier[1].weight.requires_grad = True
            model.classifier[1].bias.requires_grad = True
        elif train_strategy == "whole_network":
            for _, layer_param in model.named_parameters():
                layer_param.requires_grad = True
        else:
            raise Exception(
                "Incorrect train_strategy. There are three options: last_layer and last_block, whole_network")

        return model


if __name__ == "__main__":
    import json

    with open("sample_image_clf.json", "r") as f:
        json_sample = json.loads(f.read())

    image_clf = ImageClassification(json_data=json_sample,
                                    batch_size=2,
                                    model_size="small",
                                    train_strategy="last_layer",
                                    augmentation_flg=False,
                                    gpu_flg=False)

    image_clf.fit(max_epochs=10)

    cat_b64_image = open("cat.txt", "r").read()
    dog_b64_image = open("dog.txt", "r").read()

    image_clf.predict(cat_b64_image), image_clf.predict(dog_b64_image)
