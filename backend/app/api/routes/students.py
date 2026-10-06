from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.dependencies.auth import get_current_teacher
from app.models import Teacher
from app.schemas.student import StudentResponse
from app.services.student_service import list_students

router = APIRouter(prefix="/students", tags=["Students"])

@router.get("", response_model=list[StudentResponse])
def students(db: Session = Depends(get_db), current_teacher: Teacher = Depends(get_current_teacher)):
    return list_students(db)
