from fastapi import HTTPException
from app.controllers.series_controller import get_series_controller
from app.services.analysis_service import analyze_numbers


def analyze_series_controller(series_id: str) -> dict:
    doc = get_series_controller(series_id)

    nums = doc.get("numbers", [])
    if len(nums) == 0:
        raise HTTPException(status_code=400, detail="series has no numbers")

    metrics = analyze_numbers(nums)
    return {**doc, **metrics}
