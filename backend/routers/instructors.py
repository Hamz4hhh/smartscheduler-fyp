from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Instructor
import schemas

router = APIRouter(tags=["Instructors"])

@router.post("/", response_model=schemas.InstructorResponse)
def create_instructor(instructor: schemas.InstructorCreate, db: Session = Depends(get_db)):
    new_instructor = Instructor(**instructor.dict())
    db.add(new_instructor)
    db.commit()
    db.refresh(new_instructor)
    return new_instructor

@router.get("/", response_model=list[schemas.InstructorResponse])
def get_instructors(db: Session = Depends(get_db)):
    instructors = db.query(Instructor).all()
    return instructors

@router.get("/{instructor_id}", response_model=schemas.InstructorResponse)
def get_instructor(instructor_id: int, db: Session = Depends(get_db)):
    instructor = db.query(Instructor).filter(Instructor.id == instructor_id).first()
    if not instructor:
        raise HTTPException(status_code=404, detail="Instructor not found")
    return instructor

@router.put("/{instructor_id}", response_model=schemas.InstructorResponse)
def update_instructor(instructor_id: int, updated: schemas.InstructorCreate, db: Session = Depends(get_db)):
    instructor = db.query(Instructor).filter(Instructor.id == instructor_id).first()
    if not instructor:
        raise HTTPException(status_code=404, detail="Instructor not found")
    for key, value in updated.dict().items():
        setattr(instructor, key, value)
    db.commit()
    db.refresh(instructor)
    return instructor

@router.delete("/{instructor_id}")
def delete_instructor(instructor_id: int, db: Session = Depends(get_db)):
    instructor = db.query(Instructor).filter(Instructor.id == instructor_id).first()
    if not instructor:
        raise HTTPException(status_code=404, detail="Instructor not found")
    db.delete(instructor)
    db.commit()
    return {"detail": "Instructor deleted"}
