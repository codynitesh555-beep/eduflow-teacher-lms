from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.dependencies.auth import get_current_teacher
from app.models import Teacher
from app.schemas.auth import LoginRequest, TokenResponse
from app.schemas.teacher import TeacherResponse
from app.services.auth_service import authenticate_teacher, issue_login_token, teacher_payload

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    teacher = authenticate_teacher(db, payload.phone, payload.password)
    return issue_login_token(teacher)

@router.get("/me", response_model=TeacherResponse)
def me(current_teacher: Teacher = Depends(get_current_teacher)):
    return teacher_payload(current_teacher)
