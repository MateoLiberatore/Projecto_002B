from pydantic import BaseModel
from typing import List


class SeriesAnalysisOut(BaseModel):
    id: str
    title: str
    numbers: List[int]
    gcd_all: int
    mean: float
    std_dev: float
    primes: List[int]
