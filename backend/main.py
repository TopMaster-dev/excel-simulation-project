import uvicorn
from fastapi import FastAPI
from routers import api

app = FastAPI()
app.include_router(api.router)
@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI app!"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)