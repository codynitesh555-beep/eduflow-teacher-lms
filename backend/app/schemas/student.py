from pydantic import BaseModel, ConfigDict

class StudentResponse(BaseModel):
    id: int
    name: str
    roll_no: str
    grade: str
    email: str

    model_config = ConfigDict(from_attributes=True)
