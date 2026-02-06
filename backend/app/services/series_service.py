from bson import ObjectId
from app.db.mongo import series_collection


def create_series(title: str, numbers: list[int]) -> dict | None:
    doc = {"title": title, "numbers": numbers}
    res = series_collection.insert_one(doc)
    return series_collection.find_one({"_id": res.inserted_id})


def list_series() -> list[dict]:
    return list(series_collection.find().sort("_id", -1))


def get_series_by_id(series_id: str) -> dict | None:
    if ObjectId.is_valid(series_id) is False:
        return None
    return series_collection.find_one({"_id": ObjectId(series_id)})
