import random
from datetime import date, timedelta
from sqlalchemy import select
from app.core.database import Base, SessionLocal, engine
from app.core.security import hash_password
from app.models import Attendance, Student, Teacher

DEFAULT_PASSWORD = "teacher123"

TEACHERS = [
    {"name": "Amit Sharma", "subject": "Mathematics", "email": "amit@school.com", "phone": "9876543210"},
    {"name": "Priya Verma", "subject": "Physics", "email": "priya@school.com", "phone": "9876543211"},
    {"name": "Ravi Kumar", "subject": "Chemistry", "email": "ravi@school.com", "phone": "9876543212"},
    {"name": "Sunita Rao", "subject": "Biology", "email": "sunita@school.com", "phone": "9876543213"},
    {"name": "Deepak Nair", "subject": "English", "email": "deepak@school.com", "phone": "9876543214"},
    {"name": "Kavita Singh", "subject": "History", "email": "kavita@school.com", "phone": "9876543215"},
    {"name": "Manoj Joshi", "subject": "Geography", "email": "manoj@school.com", "phone": "9876543216"},
    {"name": "Anjali Patel", "subject": "Computer Sc", "email": "anjali@school.com", "phone": "9876543217"},
    {"name": "Suresh Iyer", "subject": "Hindi", "email": "suresh@school.com", "phone": "9876543218"},
    {"name": "Neha Gupta", "subject": "Economics", "email": "neha@school.com", "phone": "9876543219"},
]

FIRST_NAMES = ["Arjun","Priya","Rohan","Sneha","Karthik","Ananya","Vikram","Meera","Aditya","Divya","Rahul","Pooja","Sanjay","Neha","Akash","Ritika","Mohan","Swati","Rajesh","Kavya","Suresh","Lakshmi","Nikhil","Shreya","Arun","Pallavi","Vivek","Aarti","Manish","Deepika","Vishal","Preeti","Gaurav","Smita","Hemant","Roshni","Abhishek","Sonali","Dinesh","Bhavna","Yash","Tanvi","Tushar","Nandita","Hardik","Swara","Varun","Bhumi","Jayesh","Jhanvi"]
LAST_NAMES = ["Mehta","Nair","Gupta","Iyer","Kumar","Singh","Rao","Patel","Joshi","Reddy","Sharma","Verma","Shah","Pillai","Bose","Chatterjee","Menon","Agarwal","Tiwari","Malhotra"]
GRADES = ["Grade 9A","Grade 9B","Grade 10A","Grade 10B","Grade 11A","Grade 11B","Grade 12A","Grade 12B"]

def seed():
    print("Resetting database...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        teachers = []
        for data in TEACHERS:
            teacher = Teacher(**data, password_hash=hash_password(DEFAULT_PASSWORD))
            db.add(teacher)
            teachers.append(teacher)
        db.flush()

        students = []
        for i in range(1, 101):
            student = Student(name=f"{FIRST_NAMES[(i-1)%len(FIRST_NAMES)]} {LAST_NAMES[(i-1)%len(LAST_NAMES)]}", roll_no=f"STU{i:03d}", grade=GRADES[(i-1)%len(GRADES)], email=f"student{i}@school.com")
            db.add(student)
            students.append(student)
        db.flush()

        start_date = date(2026, 1, 1)
        count = 0
        for teacher in teachers:
            teacher_students = random.sample(students, random.randint(30, 40))
            for day_offset in range(10):
                class_date = start_date + timedelta(days=day_offset * 3)
                for student in teacher_students:
                    db.add(Attendance(teacher_id=teacher.id, student_id=student.id, class_name=teacher.subject, date=class_date, is_present=random.choice([True, True, True, False])))
                    count += 1
        db.commit()
        print(f"Seeded {len(teachers)} teachers, {len(students)} students and {count} attendance records.")
        print(f"Demo login: {TEACHERS[0]['phone']} / {DEFAULT_PASSWORD}")
    finally:
        db.close()

if __name__ == "__main__":
    seed()
