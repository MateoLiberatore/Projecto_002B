from pydantic import BaseModel, Field
from typing import List

# validacion de series 
class SeriesCreate(BaseModel):
    title: str = Field(min_length=1, max_length=120)
    numbers: List[int] = Field(min_length=1)


class SeriesOut(BaseModel):
    id: str
    title: str
    numbers: List[int]
