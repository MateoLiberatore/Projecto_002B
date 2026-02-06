import logging
import os


def setup_logger() -> logging.Logger:
    level = os.getenv("LOG_LEVEL", "INFO").upper()

    logger = logging.getLogger("api")
    logger.setLevel(level)

    if logger.handlers:
        return logger

    handler = logging.StreamHandler()
    formatter = logging.Formatter("%(asctime)s | %(levelname)s | %(name)s | %(message)s")
    handler.setFormatter(formatter)
    logger.addHandler(handler)

    return logger
