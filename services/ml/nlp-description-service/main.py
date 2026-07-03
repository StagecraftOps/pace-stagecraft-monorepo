from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="nlp-description-service", description="NLP for listing description analysis", version="1.0.0")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.get("/health")
def health(): return {"status": "ok", "service": "nlp-description-service"}

@app.get("/api/v1")
def info(): return {"service": "nlp-description-service", "version": "1.0.0", "description": "NLP for listing description analysis"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8000)))
