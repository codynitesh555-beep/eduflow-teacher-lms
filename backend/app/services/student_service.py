from sqlalchemy.orm import Session
from app.models import Student

def list_students(db: Session) -> list[Student]:
    return db.query(Student).order_by(Student.roll_no).all()
