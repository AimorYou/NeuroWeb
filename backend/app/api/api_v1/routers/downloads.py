from fastapi import APIRouter, Response
from fastapi.responses import FileResponse
from s3.storage import storage

import pickle
import io

download_router = r = APIRouter()

@r.get("/cv/classification/{user_id}")
def download_cv_classification(user_id: str):
  image_clf = storage.get_object(f"user_{user_id}/classification/classification_{user_id}.pkl")
  if image_clf:
    return Response(image_clf)
  else:
    return {500: "error"}


@r.get("/cv/face-recognition/{user_id}")
def download_cv_face_recognition(user_id: str):
  model_rec = storage.get_object(f"user_{user_id}/face-recognition/model_rec.pkl")
  if model_rec:
    # stream = io.BytesIO(model_rec)
    return Response(model_rec)
  else:
    return {500: "error"}
