#!/usr/bin/env python3

from db.session import get_db
from db.crud import create_user
from db.schemas import UserCreate
from db.session import SessionLocal


def init() -> None:
    db = SessionLocal()

    create_user(
        db,
        UserCreate(
            email="pivovarovsenya@gmail.com",
            password="superuser",
            is_active=True,
            is_superuser=True,
        ),
    )


if __name__ == "__main__":
    print("Creating superuser pivovarovsenya@gmail.com")
    init()
    print("Superuser created")
