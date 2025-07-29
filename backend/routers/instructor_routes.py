from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas

router = APIRouter(prefix="/instructors", tags=["Instructors"])

# Create
@router.post("/", response_model=schemas.InstructorResponse)
def create_instructor(instructor: schemas.InstructorCreate, db: Session = Depends(get_db)):
    db_instructor = models.Instructor(**instructor.dict())
    db.add(db_instructor)
    db.commit()
    db.refresh(db_instructor)
    return db_instructor

# Get all
@router.get("/", response_model=list[schemas.InstructorResponse])
def get_instructors(db: Session = Depends(get_db)):
    return db.query(models.Instructor).all()

# Get one
@router.get("/{instructor_id}", response_model=schemas.InstructorResponse)
def get_instructor(instructor_id: int, db: Session = Depends(get_db)):
    instructor = db.query(models.Instructor).filter(models.Instructor.id == instructor_id).first()
    if not instructor:
        raise HTTPException(status_code=404, detail="Instructor not found")
    return instructor

# Update
@router.put("/{instructor_id}", response_model=schemas.InstructorResponse)
def update_instructor(instructor_id: int, instructor: schemas.InstructorCreate, db: Session = Depends(get_db)):
    db_instructor = db.query(models.Instructor).filter(models.Instructor.id == instructor_id).first()
    if not db_instructor:
        raise HTTPException(status_code=404, detail="Instructor not found")
    for key, value in instructor.dict().items():
        setattr(db_instructor, key, value)
    db.commit()
    db.refresh(db_instructor)
    return db_instructor

# Delete
@router.delete("/{instructor_id}")
def delete_instructor(instructor_id: int, db: Session = Depends(get_db)):
    db_instructor = db.query(models.Instructor).filter(models.Instructor.id == instructor_id).first()
    if not db_instructor:
        raise HTTPException(status_code=404, detail="Instructor not found")
    db.delete(db_instructor)
    db.commit()
    return {"detail": "Instructor deleted successfully"}
