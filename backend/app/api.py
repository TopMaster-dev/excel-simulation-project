from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

origins = [
    "http://localhost:5173",
    "localhost:5173"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome"}


@app.post('/api/simulation', tags=["simulation"])
async def read_simulation(request: Request):
    data = await request.json()
    if isinstance(data, str):
        input_data = json.loads(data)
    else:
        input_data = data
    print(input_data.get("age"))
    return {"received_age": input_data.get("age")}