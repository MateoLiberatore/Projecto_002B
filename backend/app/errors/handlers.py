from fastapi import Request, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.middlewares.logger import setup_logger

"""
Manejadores de errores 
"""

logger = setup_logger()

#excepciones http
def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": {"type": "http_error", "message": exc.detail}},
    )

#erroes de validacion
def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={
            "error": {
                "type": "validation_error",
                "message": "Invalid request payload",
                "details": exc.errors(),
            }
        },
    )

#capturador de errores no manejados 
def unhandled_exception_handler(request: Request, exc: Exception):
    logger.error("Unhandled error", exc_info=exc)
    return JSONResponse(
        status_code=500,
        content={"error": {"type": "internal_error", "message": "Internal server error"}},
    )
