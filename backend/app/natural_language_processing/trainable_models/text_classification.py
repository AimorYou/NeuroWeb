import torch
import numpy as np
import pandas as pd
from datasets import Dataset
from sklearn.model_selection import train_test_split

from transformers import DistilBertModel
from transformers import DistilBertTokenizer
from sklearn.linear_model import LogisticRegression

distilbert_mapping = {
    "EN": "distilbert-base-uncased",
    "RU": "DmitryPogrebnoy/distilbert-base-russian-cased"
}


class TextClassification:
    def __init__(self, gpu_flg=True, language="EN"):
        self.device = torch.device("cuda" if torch.cuda.is_available() and gpu_flg else "cpu")

        available_langs = list(distilbert_mapping.keys())
        if language not in available_langs:
            raise Exception(f"You have been passed unknown language (Only {'/'.join(available_langs)} are available)")

        self.model = DistilBertModel.from_pretrained(distilbert_mapping[language]).to(self.device)
        self.tokenizer = DistilBertTokenizer.from_pretrained(distilbert_mapping[language])

        self.cls_mapping = None
        self.clf = None

    def prepare_data(self, df, text_col="text", target_col="category", test_size=0.2):

        self.cls_mapping = dict(enumerate(df[target_col].astype("category").cat.categories))

        df["label"] = df[target_col].astype("category").cat.codes
        dataset = (Dataset.from_pandas(df[[text_col, "label"]])
                   .train_test_split(test_size=test_size))

        dataset_encoded = dataset.map(self._tokenize, batched=True, batch_size=64)

        dataset_encoded.set_format("torch", columns=["input_ids", "attention_mask", "label"])
        dataset_hidden = dataset_encoded.map(self._extract_hidden_states, batched=True, batch_size=64)

        X_train = np.array(dataset_hidden["train"]["hidden state"])
        X_test = np.array(dataset_hidden["test"]["hidden state"])
        y_train = np.array(dataset_hidden["train"]["label"])
        y_test = np.array(dataset_hidden["test"]["label"])

        return X_train, X_test, y_train, y_test

    def fit(self, X_train, X_test, y_train, y_test):

        lr_clf = LogisticRegression(max_iter=3000)
        lr_clf.fit(X_train, y_train)

        self.clf = lr_clf

        return lr_clf.score(X_test, y_test)

    def predict(self, text: str):

        if self.cls_mapping is None:
            raise Exception("You need to prepare your data first")

        if self.clf is None:
            raise Exception("You need to train your model first")

        text_encoded = self.tokenizer(text, return_tensors="pt")

        model_inputs = {k: v.to(self.device) for k, v in text_encoded.items()}
        with torch.no_grad():
            model_outputs = self.model(**model_inputs).last_hidden_state

        label_pred = self.clf.predict(model_outputs[:, 0].cpu().numpy())[0]
        label_class = self.cls_mapping[label_pred]

        return label_class

    def _tokenize(self, batch):
        return self.tokenizer(batch["text"], padding=True, truncation=True, max_length=512)

    def _extract_hidden_states(self, batch):
        model_inputs = {k: v.to(self.device) for k, v in batch.items() if k in self.tokenizer.model_input_names}
        with torch.no_grad():
            last_hidden_state = self.model(**model_inputs).last_hidden_state

        return {"hidden state": last_hidden_state[:, 0].cpu().numpy()}


if __name__ == "__main__":
    from datasets import load_dataset

    emotions = load_dataset("emotion", trust_remote_code=True)
    emotions.set_format("pandas")
    df_test = emotions["train"][:].head(100)  # Take a small part for testing

    text_clf = TextClassification(gpu_flg=True, language="EN")
    X_train, X_test, y_train, y_test = text_clf.prepare_data(df_test,
                                                             text_col="text",
                                                             target_col="label",
                                                             test_size=0.2)
    test_accuracy = text_clf.fit(X_train, X_test, y_train, y_test)
    print(f"Given accuracy on test part: {test_accuracy}")
    text_clf.predict("I hate everything")
