from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.dependencies.auth import get_current_teacher
from app.models import Teacher
from app.schemas.attendance import AttendanceEntry, AttendanceResponse, AttendanceSummary
from app.services.attendance_service import attendance_summary, list_attendance, mark_attendance

router = APIRouter(prefix="/attendance", tags=["Attendance"])

@router.get("/summary", response_model=AttendanceSummary)
def summary(db: Session = Depends(get_db), current_teacher: Teacher = Depends(get_current_teacher)):
    # Dashboard summary currently shows the teacher's own attendance records.
    records = list_attendance(db, current_teacher.id)
    total = len(records)
    present = sum(1 for record in records if record["is_present"])
    return {"total_attendance_records": total, "overall_attendance_pct": round((present / total) * 100, 1) if total else 0}

@router.get("", response_model=list[AttendanceResponse])
def all_attendance(db: Session = Depends(get_db), current_teacher: Teacher = Depends(get_current_teacher)):
    return list_attendance(db, current_teacher.id)

@router.post("/mark")
def mark(records: list[AttendanceEntry], db: Session = Depends(get_db), current_teacher: Teacher = Depends(get_current_teacher)):
    try:
        count = mark_attendance(db, current_teacher.id, records)
        return {"status": "success", "message": "Records saved", "count": count}
    except ValueError as exc:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(exc))
    except Exception:
        db.rollback()
        raise HTTPException(status_code=500, detail="Unable to save attendance")
