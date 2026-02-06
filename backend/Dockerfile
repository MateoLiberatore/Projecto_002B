FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Poetry
RUN pip install --no-cache-dir poetry

# Copiamos metadata primero (mejor cache)
COPY pyproject.toml poetry.lock* /app/

# Instalación sin virtualenv dentro del container
RUN poetry config virtualenvs.create false \
  && poetry install --no-interaction --no-ansi

# Copiamos el código
COPY . /app

EXPOSE 8000

# Ajustá app.main:app si tu entrypoint es otro
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
