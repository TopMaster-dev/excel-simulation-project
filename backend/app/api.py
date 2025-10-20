from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "localhost:5173",
    "127.0.0.1:5173"
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

def _to_float(value, default: float = 0.0) -> float:
    try:
        if value is None:
            return default
        if isinstance(value, (int, float)):
            return float(value)
        value_str = str(value).strip()
        if value_str == "":
            return default
        return float(value_str)
    except Exception:
        return default


@app.post('/api/simulation', tags=["simulation"])
async def read_simulation(request: Request):
    body = await request.json()
    input_data = json.loads(body) if isinstance(body, str) else body

    data = {
        "customer_name": input_data.get("入力!E4"),
        "age": _to_float(input_data.get("入力!E5")),
        "property_name": input_data.get("入力!E7"),
        "purchase_year": _to_float(input_data.get("入力!E8")),
        "purchase_month": _to_float(input_data.get("入力!G8")),
        "property_price": _to_float(input_data.get("入力!E9")),
    }

    print(data)

    response = {
        "ok": True,
        "message": "Simulation parameters received",
        "inputsCount": len(input_data) if isinstance(input_data, dict) else 0,
        "echo": input_data,
    }

    return response