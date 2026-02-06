from fastapi import APIRouter
from app.models.series_model import SeriesCreate, SeriesOut
from app.models.analysis_model import SeriesAnalysisOut
from app.controllers.series_controller import (
    create_series_controller,
    list_series_controller,
)
from app.controllers.analysis_controller import analyze_series_controller

#prefix 
router = APIRouter(prefix="/series", tags=["series"])

#mapper para no mezclar mongo con contrato. (mongo usa "_id" y la api "id")
def _series_out(doc: dict) -> dict:
    return {"id": str(doc["_id"]), "title": doc["title"], "numbers": doc["numbers"]}


@router.post("", response_model=SeriesOut, status_code=201)
def create_series(payload: SeriesCreate):
    doc = create_series_controller(payload.title, payload.numbers)
    return _series_out(doc)


@router.get("", response_model=list[SeriesOut])
def list_all():
    docs = list_series_controller()
    return [_series_out(d) for d in docs]


@router.get("/{id}/analyze", response_model=SeriesAnalysisOut)
def analyze(id: str):
    doc = analyze_series_controller(id)
    base = _series_out(doc)
    return {
        **base,
        "gcd_all": doc["gcd_all"],
        "mean": doc["mean"],
        "std_dev": doc["std_dev"],
        "primes": doc["primes"],
    }
