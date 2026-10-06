from pydantic import BaseModel, ConfigDict

class TeacherResponse(BaseModel):
    id: int
    name: str
    subject: str
    email: str
    phone: str
    initials: str
    department: str

    model_config = ConfigDict(from_attributes=True)
