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
        "入力!E4": input_data.get("入力!E4"),
        "入力!E5": int(input_data.get("入力!E5")),
        "入力!E7": input_data.get("入力!E7"),
        "入力!E8": int(input_data.get("入力!E8")),
        "入力!G8": int(input_data.get("入力!G8")),
        "入力!E9": _to_float(input_data.get("入力!E9")),
        "入力!E10": _to_float(input_data.get("入力!E10")),
        "入力!E12": _to_float(input_data.get("入力!E12")),
        "入力!E13": int(input_data.get("入力!E13")),
        "入力!E14": _to_float(input_data.get("入力!E14")),
        "入力!E15": int(input_data.get("入力!E15")),
        "入力!G15": _to_float(input_data.get("入力!G15")),
        "入力!E17": int(input_data.get("入力!E17")),
        "入力!G17": _to_float(input_data.get("入力!G17")),
        "入力!E16": int(input_data.get("入力!E16")),
        "入力!G16": int(input_data.get("入力!G16")),
        "入力!E18": int(input_data.get("入力!E18")),
        "入力!E20": _to_float(input_data.get("入力!E20")),
        "入力!E21": int(input_data.get("入力!E21")),
        "入力!G21": _to_float(input_data.get("入力!G21")),
        "入力!E22": int(input_data.get("入力!E22")),
        "入力!G22": int(input_data.get("入力!G22")),
        "入力!E23": int(input_data.get("入力!E23")),
        "入力!G23": _to_float(input_data.get("入力!G23")),
        "入力!E24": int(input_data.get("入力!E24")),
        "入力!G24": int(input_data.get("入力!G24")),
        "入力!E25": _to_float(input_data.get("入力!E25")),
        "入力!E26": _to_float(input_data.get("入力!E26")),
        "入力!E27": int(input_data.get("入力!E27")),
        "入力!G27": _to_float(input_data.get("入力!G27")),
        "入力!E29": _to_float(input_data.get("入力!E29")),
        "入力!E28": int(input_data.get("入力!E28")),
        "入力!G28": int(input_data.get("入力!G28")),
        "入力!E30": int(input_data.get("入力!E30")),
        "入力!G30": _to_float(input_data.get("入力!G30")),
        "入力!E31": int(input_data.get("入力!E31")),
        "入力!G31": int(input_data.get("入力!G31")),
        "入力!E32": int(input_data.get("入力!E32")),
        "入力!G32": _to_float(input_data.get("入力!G32")),
        "入力!E33": _to_float(input_data.get("入力!E33")),
        "入力!E34": _to_float(input_data.get("入力!E34")),
        "入力!E35": _to_float(input_data.get("入力!E35")),
        "入力!E36": _to_float(input_data.get("入力!E36")),
        "入力!G36": _to_float(input_data.get("入力!G36")),
        "入力!E37": _to_float(input_data.get("入力!E37")),
        "入力!E39": _to_float(input_data.get("入力!E39")),
        "入力!G39": _to_float(input_data.get("入力!G39")),
        "入力!E40": int(input_data.get("入力!E40")),
        "入力!G40": _to_float(input_data.get("入力!G40")),
        "入力!E41": int(input_data.get("入力!E41")),
        "入力!G41": int(input_data.get("入力!G41")),
        "入力!E43": _to_float(input_data.get("入力!E43")),
        "入力!E44": _to_float(input_data.get("入力!E44")),
        "入力!E45": _to_float(input_data.get("入力!E45")),
        "入力!E47": _to_float(input_data.get("入力!E47")),
    }
    
    print(data)

    response = {
        "ok": True,
        "message": "Simulation parameters received",
        "inputsCount": len(input_data) if isinstance(input_data, dict) else 0,
        "echo": input_data,
    }

    return response