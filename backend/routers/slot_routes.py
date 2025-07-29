from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Slot

router = APIRouter(prefix="/slots", tags=["Slots"])

# Get all slots
@router.get("/", response_model=List[dict])
def get_slots(db: Session = Depends(get_db)):
    slots = db.query(Slot).all()
    return [
        {
            "id": slot.id,
            "name": slot.name,
            "start_time": slot.start_time.strftime("%H:%M"),
            "end_time": slot.end_time.strftime("%H:%M"),
            "duration_minutes": slot.duration_minutes,
            "is_active": slot.is_active,
        }
        for slot in slots
    ]

# Create new slot
@router.post("/", response_model=dict)
def create_slot(slot_data: dict, db: Session = Depends(get_db)):
    new_slot = Slot(
        name=slot_data["name"],
        start_time=slot_data["start_time"],
        end_time=slot_data["end_time"],
        duration_minutes=slot_data["duration_minutes"],
        is_active=slot_data.get("is_active", 1)
    )
    db.add(new_slot)
    db.commit()
    db.refresh(new_slot)
    return {
        "id": new_slot.id,
        "name": new_slot.name,
        "start_time": new_slot.start_time.strftime("%H:%M"),
        "end_time": new_slot.end_time.strftime("%H:%M"),
        "duration_minutes": new_slot.duration_minutes,
        "is_active": new_slot.is_active,
    }
