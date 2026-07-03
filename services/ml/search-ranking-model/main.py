from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="search-ranking-model", description="Search result ranking model", version="1.0.0")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.get("/health")
def health(): return {"status": "ok", "service": "search-ranking-model"}

@app.get("/api/v1")
def info(): return {"service": "search-ranking-model", "version": "1.0.0", "description": "Search result ranking model"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8000)))
