FROM python:3.12-slim

WORKDIR /app

# Dependencias mínimas para instalar Poetry y compilar wheels si hiciera falta
RUN pip install --no-cache-dir poetry

# Evitar crear venv dentro del contenedor
RUN poetry config virtualenvs.create false

# Copiamos solo metadata primero para aprovechar cache
COPY pyproject.toml poetry.lock* /app/

# Instalar deps (sin dev en prod)
RUN poetry install --only main --no-interaction --no-ansi

# Copiar código
COPY app /app/app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
