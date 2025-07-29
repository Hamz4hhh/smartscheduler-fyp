from sqlalchemy import Column, Integer, String, Date, DateTime, Boolean, Time, func
from database import Base

class Room(Base):
    __tablename__ = "rooms"

    id = Column(Integer, primary_key=True, index=True)
    building_id = Column(Integer)
    room_number = Column(String(50), nullable=False)
    name = Column(String(100))
    capacity = Column(Integer)
    room_type = Column(Integer, nullable=False)
    is_active = Column(Boolean, default=True)


class Instructor(Base):
    __tablename__ = "instructors"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String(50), unique=True, index=True, nullable=False)
    first_name = Column(String(50))
    last_name = Column(String(50))
    email = Column(String(100))
    phone = Column(String(20))
    dept_id = Column(Integer)
    position = Column(String(50))
    max_hours_per_week = Column(Integer)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())

class Batch(Base):
    __tablename__ = "batches"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    academic_year = Column(String(255), nullable=False)
    session_type = Column(String(255), nullable=False)
    start_date = Column(Date)
    end_date = Column(Date)
    is_active = Column(Integer, nullable=False)
    created_at = Column(DateTime)

class Slot(Base):
    __tablename__ = "slots"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)
    duration_minutes = Column(Integer)
    is_active = Column(Boolean, default=True)

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    dept_id = Column(Integer, nullable=False)
    course_code = Column(String, nullable=False)
    course_name = Column(String, nullable=False)
    credit_hours = Column(Integer, nullable=False)
    hours_per_week = Column(Integer, nullable=False)
    course_type = Column(String, nullable=False)
