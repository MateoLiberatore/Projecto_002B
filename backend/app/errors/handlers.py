from fastapi import Request, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.middlewares.logger import setup_logger

logger = setup_logger()


def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": {"type": "http_error", "message": exc.detail}},
    )


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


def unhandled_exception_handler(request: Request, exc: Exception):
    logger.error("Unhandled error", exc_info=exc)
    return JSONResponse(
        status_code=500,
        content={"error": {"type": "internal_error", "message": "Internal server error"}},
    )
