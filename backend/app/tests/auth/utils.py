from sqlalchemy.orm import Session
import models
from tests.auth.db_manager import SessionLocal




def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def delete_user(db: Session, user_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    return db.delete(user)


def prepare_db_to_test(email: str, db: Session):
    user = get_user_by_email(db, email)
    if not user:
        print("Такого пользователя не существует")
        return
    else:
        print(user.id)
        db.delete(user)
        db.commit()
        print("Пользователь успешно удален")
    return
