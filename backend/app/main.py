from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError

from app.routes.series_routes import router as series_router
from app.errors.handlers import (
    http_exception_handler,
    validation_exception_handler,
    unhandled_exception_handler,
)

app = FastAPI(title="Analizador de Series Numéricas")

app.include_router(series_router)

app.add_exception_handler(HTTPException, http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(Exception, unhandled_exception_handler)
