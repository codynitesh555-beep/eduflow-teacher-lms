from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.core.database import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    roll_no = Column(String(50), unique=True, nullable=False, index=True)
    grade = Column(String(50), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)

    attendance_records = relationship("Attendance", back_populates="student", cascade="all, delete-orphan")
