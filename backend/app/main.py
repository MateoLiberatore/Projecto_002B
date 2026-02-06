from fastapi import FastAPI

app = FastAPI(title="Analizador de Series Numéricas")

@app.get("/health")
def health():
    return {"status": "ok"}
