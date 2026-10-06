from datetime import date
from sqlalchemy import Boolean, Column, Date, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from app.core.database import Base

class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    teacher_id = Column(Integer, ForeignKey("teachers.id", ondelete="CASCADE"), nullable=False, index=True)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"), nullable=False, index=True)
    class_name = Column(String(120), nullable=False)
    date = Column(Date, nullable=False, default=date.today)
    is_present = Column(Boolean, nullable=False, default=True)

    teacher = relationship("Teacher", back_populates="attendance_records")
    student = relationship("Student", back_populates="attendance_records")
