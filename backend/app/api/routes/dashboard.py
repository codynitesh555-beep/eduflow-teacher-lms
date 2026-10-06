from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.dependencies.auth import get_current_teacher
from app.models import Teacher
from app.services.attendance_service import attendance_summary

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/summary")
def dashboard_summary(db: Session = Depends(get_db), current_teacher: Teacher = Depends(get_current_teacher)):
    return attendance_summary(db)
