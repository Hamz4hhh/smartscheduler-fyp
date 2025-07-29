from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime, time

class BatchBase(BaseModel):
    code: str
    name: str
    academic_year: str
    session_type: str
    start_date: date
    end_date: date

class BatchCreate(BatchBase):
    pass

class BatchUpdate(BatchBase):
    pass

class BatchResponse(BatchBase):
    id: int

    class Config:
        from_attributes = True

class RoomBase(BaseModel):
    room_number: str
    name: str
    capacity: int
    room_type: int
    is_active: Optional[bool] = True

class RoomCreate(RoomBase):
    pass

class RoomUpdate(BaseModel):
    room_number: Optional[str] = None
    name: Optional[str] = None
    capacity: Optional[int] = None
    room_type: Optional[int] = None
    is_active: Optional[bool] = None

class RoomResponse(RoomBase):
    id: int

    class Config:
        orm_mode = True

class InstructorBase(BaseModel):
    employee_id: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    dept_id: Optional[int] = None
    position: Optional[str] = None
    max_hours_per_week: Optional[int] = None
    is_active: Optional[bool] = True

class InstructorCreate(InstructorBase):
    pass

class InstructorResponse(InstructorBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
        

class SlotBase(BaseModel):
    name: str
    start_time: time
    end_time: time
    duration_minutes: int
    is_active: bool = True

class SlotCreate(SlotBase):
    pass

class SlotResponse(SlotBase):
    id: int

    class Config:
        from_attributes = True

class CourseBase(BaseModel):
    dept_id: int
    course_code: str
    course_name: str
    credit_hours: int
    hours_per_week: int
    course_type: str

class CourseCreate(CourseBase):
    pass

class CourseUpdate(CourseBase):
    pass

class CourseResponse(CourseBase):
    id: int

    class Config:
        from_attributes = True  # Use orm_mode=True if you're using Pydantic v1
