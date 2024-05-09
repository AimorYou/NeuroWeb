#!/usr/bin/env python
# -*- coding: utf-8 -*-
import pickle

import boto3


class Storage:
    def __init__(self):
        self.session = boto3.session.Session()
        self.s3 = self.session.client(
            service_name='s3',
            endpoint_url='https://storage.yandexcloud.net'
        )
        self.bucket_name = "neuro-web"

    def get_object(self, key):
        get_object_response = self.s3.get_object(Bucket=self.bucket_name, Key=key)
        return get_object_response['Body'].read()

    def put_object(self, _object, key):
        self.s3.put_object(Bucket=self.bucket_name, Key=key, Body=_object)


storage = Storage()

# # Создать новый бакет
# s3.create_bucket(Bucket='bucket-name')

# # Загрузить объекты в бакет
#
# ## Из строки
# s3.put_object(Bucket='bucket-name', Key='object_name', Body='TEST', StorageClass='COLD')
#
# ## Из файла
# s3.upload_file('this_script.py', 'bucket-name', 'py_script.py')
# s3.upload_file('this_script.py', 'bucket-name', 'script/py_script.py')

# # Получить список объектов в бакете
# for key in s3.list_objects(Bucket='neuro-web')['Contents']:
#     print(key['Key'])

# # Удалить несколько объектов
# forDeletion = [{'Key':'object_name'}, {'Key':'script/py_script.py'}]
# response = s3.delete_objects(Bucket='bucket-name', Delete={'Objects': forDeletion})

# # Получить объект
# get_object_response = s3.get_object(Bucket='neuro-web', Key='rusentitweet_model.pkl')
# print(get_object_response['Body'].read())

# model = pickle.loads(storage.get_object("test-model"))
# print(model)
# model.eval()
# with open(f"../computer_vision/resources/user_{1}/classification_{1}.sav", "rb") as f:
#     model = pickle.load(f)
# obj = pickle.dumps(model)
# storage.put_object(obj, "test/test-model.pt")
