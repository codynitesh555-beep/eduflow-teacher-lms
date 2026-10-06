from datetime import date
from pydantic import BaseModel, Field

class AttendanceEntry(BaseModel):
    student_id: int
    class_name: str = Field(min_length=1, max_length=120)
    is_present: bool

class AttendanceResponse(BaseModel):
    id: int
    student_id: int
    student_name: str
    class_name: str
    date: date
    is_present: bool

class AttendanceSummary(BaseModel):
    total_attendance_records: int
    overall_attendance_pct: float
