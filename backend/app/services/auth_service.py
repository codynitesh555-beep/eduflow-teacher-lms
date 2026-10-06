from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.core.security import create_access_token, verify_password
from app.models import Teacher

def authenticate_teacher(db: Session, phone: str, password: str) -> Teacher:
    teacher = db.query(Teacher).filter(Teacher.phone == phone).first()
    if not teacher or not teacher.is_active or not verify_password(password, teacher.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid phone number or password")
    return teacher

def teacher_payload(teacher: Teacher) -> dict:
    parts = teacher.name.replace("Ms. ", "").replace("Mr. ", "").split()
    initials = "".join(part[0] for part in parts[:2]).upper() or "T"
    return {
        "id": teacher.id,
        "name": teacher.name,
        "subject": teacher.subject,
        "email": teacher.email,
        "phone": teacher.phone,
        "initials": initials,
        "department": "Science Faculty" if teacher.subject in {"Mathematics", "Physics", "Chemistry", "Biology"} else "Academic Faculty",
    }

def issue_login_token(teacher: Teacher) -> dict:
    return {"access_token": create_access_token(str(teacher.id)), "token_type": "bearer", "teacher": teacher_payload(teacher)}
