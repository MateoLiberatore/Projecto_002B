from fastapi import HTTPException
from app.services.series_service import create_series, list_series, get_series_by_id
from bson import ObjectId

"""
Validaciones extras ademas de pydantic, textos vacios 
si por alguna razón "saved" no existe → 500
"""


def create_series_controller(title: str, numbers: list[int]) -> dict:
    clean_title = title.strip()
    if clean_title == "":
        raise HTTPException(status_code=400, detail="title cannot be blank")
    if len(numbers) == 0:
        raise HTTPException(status_code=400, detail="numbers must not be empty")

    saved = create_series(clean_title, numbers)
    if saved is None:
        raise HTTPException(status_code=500, detail="could not save series")

    return saved


def list_series_controller() -> list[dict]:
    return list_series()

# separacion de errores
def get_series_controller(series_id: str) -> dict:
    if series_id.strip() == "":
        raise HTTPException(status_code=400, detail="id cannot be blank")

    if ObjectId.is_valid(series_id) is False:
        raise HTTPException(status_code=400, detail="invalid id format")

    doc = get_series_by_id(series_id)
    if doc is None:
        raise HTTPException(status_code=404, detail="series not found")

    return doc
