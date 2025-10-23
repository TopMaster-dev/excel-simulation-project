from fastapi import APIRouter, Request
from simulation_data.state import data as shared_data
from routers.output import output as output_data
from simulation_data.excel_graph import graph_All_cell
import json
router = APIRouter(prefix="/api", tags=["api"])

@router.get("/")
async def read_users():
    return {"message": "Read all users"}

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

def _to_int(value, default: int = 0) -> int:
    try:
        if value is None:
            return default
        if isinstance(value, bool):  # Prevent True/False → 1/0 confusion
            return default
        if isinstance(value, (int, float)):
            return int(value)
        value_str = str(value).strip()
        if value_str == "":
            return default
        return int(float(value_str))  # Handle "123.0" or "45.67" properly
    except (ValueError, TypeError):
        return default

@router.get("/simulation")
async def read_InputData():
    data = shared_data
    response = {
        "ok": True,
        "message": "Input data received",
        "result": data
    }
    return response

@router.get("/reset")
async def read_reset():
    shared_data.clear()
    response = {
        "ok": True,
        "message": "Reset success"
    }
    return response

@router.post("/display")
async def read_display():
    data = output_data
    result_log_one = {}
    result_log_two = {}
    result_output_one = {}
    result_output_two = {}
    for key, value in data.items():
        if "出力1" in key:
            result_output_one[key] = value
        elif "出力2" in key:
            result_output_two[key] = value
        elif "グラフ1" in key:
            result_log_one[key] = value
        elif "グラフ2" in key:
            result_log_two[key] = value
    response = {
        "ok": True,
        "message": "Display data",
        "result_log_one" : result_log_one,
        "result_log_two" : result_log_two,
        "result_output_one" : result_output_one,
        "result_output_two" : result_output_two
    }
    return response

@router.post("/simulation")
async def read_simulation(request: Request):
    body = await request.json()
    input_data = json.loads(body) if isinstance(body, str) else body
    shared_data.clear()
    shared_data.update({
        "入力!E4": input_data.get("入力!E4"),
        "入力!E5": _to_int(input_data.get("入力!E5")),
        "入力!E7": input_data.get("入力!E7"),
        "入力!E8": _to_int(input_data.get("入力!E8")),
        "入力!G8": _to_int(input_data.get("入力!G8")),
        "入力!E9": _to_float(input_data.get("入力!E9")),
        "入力!E10": _to_float(input_data.get("入力!E10")),
        "入力!E12": _to_float(input_data.get("入力!E12")),
        "入力!E13": _to_int(input_data.get("入力!E13")),
        "入力!E14": _to_float(input_data.get("入力!E14")),
        "入力!E15": _to_int(input_data.get("入力!E15")),
        "入力!G15": _to_float(input_data.get("入力!G15")),
        "入力!E17": _to_int(input_data.get("入力!E17")),
        "入力!G17": _to_float(input_data.get("入力!G17")),
        "入力!E16": _to_int(input_data.get("入力!E16")),
        "入力!G16": _to_int(input_data.get("入力!G16")),
        "入力!E18": _to_int(input_data.get("入力!E18")),
        "入力!E20": _to_float(input_data.get("入力!E20")),
        "入力!E21": _to_int(input_data.get("入力!E21")),
        "入力!G21": _to_float(input_data.get("入力!G21")),
        "入力!E22": _to_int(input_data.get("入力!E22")),
        "入力!G22": _to_int(input_data.get("入力!G22")),
        "入力!E23": _to_int(input_data.get("入力!E23")),
        "入力!G23": _to_float(input_data.get("入力!G23")),
        "入力!E24": _to_int(input_data.get("入力!E24")),
        "入力!G24": _to_int(input_data.get("入力!G24")),
        "入力!E25": _to_float(input_data.get("入力!E25")),
        "入力!E26": _to_float(input_data.get("入力!E26")),
        "入力!E27": _to_int(input_data.get("入力!E27")),
        "入力!G27": _to_float(input_data.get("入力!G27")),
        "入力!E29": _to_float(input_data.get("入力!E29")),
        "入力!E28": _to_int(input_data.get("入力!E28")),
        "入力!G28": _to_int(input_data.get("入力!G28")),
        "入力!E30": _to_int(input_data.get("入力!E30")),
        "入力!G30": _to_float(input_data.get("入力!G30")),
        "入力!E31": _to_int(input_data.get("入力!E31")),
        "入力!G31": _to_int(input_data.get("入力!G31")),
        "入力!E32": _to_int(input_data.get("入力!E32")),
        "入力!G32": _to_float(input_data.get("入力!G32")),
        "入力!E33": _to_float(input_data.get("入力!E33")),
        "入力!E34": _to_float(input_data.get("入力!E34")),
        "入力!E35": _to_float(input_data.get("入力!E35")),
        "入力!E36": _to_float(input_data.get("入力!E36")),
        "入力!G36": _to_float(input_data.get("入力!G36")),
        "入力!E37": _to_float(input_data.get("入力!E37")),
        "入力!E39": _to_float(input_data.get("入力!E39")),
        "入力!G39": _to_float(input_data.get("入力!G39")),
        "入力!E40": _to_int(input_data.get("入力!E40")),
        "入力!G40": _to_float(input_data.get("入力!G40")),
        "入力!E41": _to_int(input_data.get("入力!E41")),
        "入力!G41": _to_int(input_data.get("入力!G41")),
        "入力!E43": _to_float(input_data.get("入力!E43")),
        "入力!E44": _to_float(input_data.get("入力!E44")),
        "入力!E45": _to_float(input_data.get("入力!E45")),
        "入力!E47": _to_float(input_data.get("入力!E47")),
    })
    result = graph_All_cell()
    output_data.clear()
    output_data.update(result)
    response = {
        "ok": True,
        "message": "Simulation parameters received"
    }

    return response