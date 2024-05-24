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
    stream = io.BytesIO(image_clf)
    return FileResponse(bytes(stream))
  else:
    return {500: "error"}
