from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError

from app.routes.series_routes import router as series_router
from app.errors.handlers import (
    http_exception_handler,
    validation_exception_handler,
    unhandled_exception_handler,
)

from fastapi.middleware.cors import CORSMiddleware

"""
Registro de handlers
inlusion de router
creacion de la app
"""

app = FastAPI(title="Analizador de Series Numéricas")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(series_router)

app.add_exception_handler(HTTPException, http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(Exception, unhandled_exception_handler)
