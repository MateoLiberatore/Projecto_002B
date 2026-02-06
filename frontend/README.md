# 📊 Analizador de Series Numéricas

Proyecto técnico Full Stack para administrar y analizar conjuntos de números enteros.

El sistema permite almacenar series numéricas, listarlas y calcular métricas matemáticas avanzadas sobre cada una, utilizando un backend en Python (FastAPI), una base de datos MongoDB y un frontend en React (generado con v0.dev).

---

## 🧩 Tecnologías utilizadas

### Backend
- Python 3.11
- FastAPI
- Poetry
- MongoDB
- Pytest

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS v4
- UI generada con v0.dev (estilo shadcn)

### Infraestructura
- Docker
- Docker Compose
- MongoDB (imagen oficial)

---

## 📁 Estructura del proyecto
```
/
├── backend/
│ ├── app/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── services/
│ │ ├── models/
│ │ ├── middlewares/
│ │ └── main.py
│ ├── tests/
│ ├── pyproject.toml
│ ├── poetry.lock
│ └── Dockerfile
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── lib/
│ │ ├── AppContainer.tsx
│ │ └── main.tsx
│ ├── index.html
│ ├── tailwind.config.ts
│ ├── postcss.config.mjs
│ ├── Dockerfile
│ └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## 🚀 Levantar el proyecto con Docker

### Requisitos previos
- Docker
- Docker Compose

### Ejecución

Desde la raíz del repositorio:

```bash
docker compose up --build
```
Esto levanta automáticamente:

MongoDB
Backend (FastAPI)
Frontend (React)

## 🌐 Accesos
# Frontend:
http://localhost:5173

# Backend (API):
http://localhost:8000

# MongoDB (Compass):
mongodb://localhost:27017

## 🔌 Variables de entorno
# Backend
```
Definidas en docker-compose.yml:
MONGO_URI=mongodb://mongo:27017
MONGO_DB=series_db
```

# Frontend
```
Inyectada en build:
VITE_API_URL=http://localhost:8000
```
### 📡 Endpoints del Backend

## POST /series
```
{
  "title": "Serie prueba",
  "numbers": [12, 15, 21, 30]
}
Respuesta:

{
  "id": "69863f275a2a5087a0f4d179",
  "title": "Serie prueba",
  "numbers": [12, 15, 21, 30]
}
```
## 📄 Listar series

## GET /series
```
Respuesta:

[
  {
    "id": "69863f275a2a5087a0f4d179",
    "title": "Serie prueba",
    "numbers": [12, 15, 21, 30]
  }
]
```
## 📐 Analizar una serie
GET /series/{id}/analyze
```
Respuesta:

{
  "id": "69863f275a2a5087a0f4d179",
  "title": "Serie prueba",
  "numbers": [12, 15, 21, 30],
  "gcd_all": 3,
  "mean": 19.5,
  "std_dev": 6.873864,
  "primes": []
}
```
### 🧪 Ejemplos de requests (PowerShell)
Crear serie:
```
Invoke-RestMethod `
  -Method POST `
  -Uri http://127.0.0.1:8000/series `
  -ContentType "application/json" `
  -Body '{"title":"Serie 1","numbers":[12,15,21,30]}'
Listar series:

Invoke-RestMethod http://127.0.0.1:8000/series
Analizar serie:

Invoke-RestMethod http://127.0.0.1:8000/series/{id}/analyze
```
