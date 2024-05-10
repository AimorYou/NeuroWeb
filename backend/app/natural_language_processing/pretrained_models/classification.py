# from natural_language_processing.trainable_models.text_classification import TextClassification
from s3.storage import storage
import pickle
import dill

# model_eng = pickle.loads(storage.get_object("text_classification_model.pkl"))
# model_ru = pickle.loads(storage.get_object("rusentitweet_model.pkl"))
# model_eng = dill.loads(storage.get_object("text_classification_model.pkl"))
# model_ru = dill.loads(storage.get_object("rusentitweet_model.pkl"))
#
# models = {
#     "EN": model_eng,
#     "RU": model_ru
# }


def predict(model, txt, lang="EN"):
    # model = models[lang]
    prediction = model.predict(txt)
    return prediction
