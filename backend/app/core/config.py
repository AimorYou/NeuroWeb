import os

PROJECT_NAME = "NeuroWeb"

SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL") or "postgresql://postgres:password@localhost:5432/postgres"

API_V1_STR = "/api/v1"
