from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas
from database import get_db

router = APIRouter(tags=["Slots"])


@router.get("/", response_model=list[schemas.SlotResponse])
def get_slots(db: Session = Depends(get_db)):
    slots = db.query(models.Slot).all()
    return slots

@router.post("/", response_model=schemas.SlotResponse)
def create_slot(slot: schemas.SlotCreate, db: Session = Depends(get_db)):
    db_slot = models.Slot(**slot.dict())
    db.add(db_slot)
    db.commit()
    db.refresh(db_slot)
    return db_slot

@router.get("/{slot_id}", response_model=schemas.SlotResponse)
def get_slot(slot_id: int, db: Session = Depends(get_db)):
    slot = db.query(models.Slot).filter(models.Slot.id == slot_id).first()
    if not slot:
        raise HTTPException(status_code=404, detail="Slot not found")
    return slot

@router.put("/{slot_id}", response_model=schemas.SlotResponse)
def update_slot(slot_id: int, slot_update: schemas.SlotCreate, db: Session = Depends(get_db)):
    slot = db.query(models.Slot).filter(models.Slot.id == slot_id).first()
    if not slot:
        raise HTTPException(status_code=404, detail="Slot not found")
    for key, value in slot_update.dict().items():
        setattr(slot, key, value)
    db.commit()
    db.refresh(slot)
    return slot

@router.delete("/{slot_id}")
def delete_slot(slot_id: int, db: Session = Depends(get_db)):
    slot = db.query(models.Slot).filter(models.Slot.id == slot_id).first()
    if not slot:
        raise HTTPException(status_code=404, detail="Slot not found")
    db.delete(slot)
    db.commit()
    return {"detail": "Slot deleted successfully"}
