from datetime import date
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.models import Attendance, Student

def attendance_summary(db: Session) -> dict:
    total = db.query(func.count(Attendance.id)).scalar() or 0
    present = db.query(func.count(Attendance.id)).filter(Attendance.is_present.is_(True)).scalar() or 0
    return {
        "total_attendance_records": total,
        "overall_attendance_pct": round((present / total) * 100, 1) if total else 0,
    }

def list_attendance(db: Session, teacher_id: int | None = None) -> list[dict]:
    query = db.query(Attendance, Student.name).join(Student, Attendance.student_id == Student.id)
    if teacher_id is not None:
        query = query.filter(Attendance.teacher_id == teacher_id)
    return [
        {"id": att.id, "student_id": att.student_id, "student_name": name, "class_name": att.class_name, "date": att.date, "is_present": att.is_present}
        for att, name in query.order_by(Attendance.date.desc(), Attendance.id.desc()).all()
    ]

def mark_attendance(db: Session, teacher_id: int, records: list) -> int:
    student_ids = {record.student_id for record in records}
    valid_ids = {row.id for row in db.query(Student.id).filter(Student.id.in_(student_ids)).all()}
    invalid = student_ids - valid_ids
    if invalid:
        raise ValueError(f"Unknown student IDs: {sorted(invalid)}")
    for record in records:
        db.add(Attendance(teacher_id=teacher_id, student_id=record.student_id, class_name=record.class_name, is_present=record.is_present, date=date.today()))
    db.commit()
    return len(records)
