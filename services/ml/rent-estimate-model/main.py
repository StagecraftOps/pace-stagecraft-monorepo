from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="rent-estimate-model", description="Rent Zestimate ML model service", version="1.0.0")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.get("/health")
def health(): return {"status": "ok", "service": "rent-estimate-model"}

@app.get("/api/v1")
def info(): return {"service": "rent-estimate-model", "version": "1.0.0", "description": "Rent Zestimate ML model service"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8000)))
