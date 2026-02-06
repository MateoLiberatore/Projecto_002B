import os
import pytest

#configuracion de entorno y limpieza de db
#limpia la coleccion antes y despues de cada test
os.environ.setdefault("MONGO_URI", "mongodb://localhost:27017")
os.environ.setdefault("MONGO_DB", "series_db_test")


@pytest.fixture(autouse=True)
def clean_db():
    # Limpieza antes de cada test (aislamiento)
    from app.db.mongo import series_collection

    series_collection.delete_many({})
    yield
    series_collection.delete_many({})


@pytest.fixture()
def client():
    from fastapi.testclient import TestClient
    from app.main import app

    return TestClient(app)
