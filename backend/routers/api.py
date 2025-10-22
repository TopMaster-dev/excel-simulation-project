from fastapi import APIRouter, Request
from simulation_data.excel_graph import graph_All_cell
import json
result_data = {}
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

@router.post("/display")
async def read_display():
    data = graph_All_cell()
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
    # body = await request.json()
    # input_data = json.loads(body) if isinstance(body, str) else body

    # data = {
    #     "入力!E4": input_data.get("入力!E4"),
    #     "入力!E5": int(input_data.get("入力!E5")),
    #     "入力!E7": input_data.get("入力!E7"),
    #     "入力!E8": int(input_data.get("入力!E8")),
    #     "入力!G8": int(input_data.get("入力!G8")),
    #     "入力!E9": float(input_data.get("入力!E9")),
    #     "入力!E10": float(input_data.get("入力!E10")),
    #     "入力!E12": float(input_data.get("入力!E12")),
    #     "入力!E13": int(input_data.get("入力!E13")),
    #     "入力!E14": float(input_data.get("入力!E14")),
    #     "入力!E15": int(input_data.get("入力!E15")),
    #     "入力!G15": float(input_data.get("入力!G15")),
    #     "入力!E17": int(input_data.get("入力!E17")),
    #     "入力!G17": float(input_data.get("入力!G17")),
    #     "入力!E16": int(input_data.get("入力!E16")),
    #     "入力!G16": int(input_data.get("入力!G16")),
    #     "入力!E18": int(input_data.get("入力!E18")),
    #     "入力!E20": float(input_data.get("入力!E20")),
    #     "入力!E21": int(input_data.get("入力!E21")),
    #     "入力!G21": float(input_data.get("入力!G21")),
    #     "入力!E22": int(input_data.get("入力!E22")),
    #     "入力!G22": int(input_data.get("入力!G22")),
    #     "入力!E23": int(input_data.get("入力!E23")),
    #     "入力!G23": float(input_data.get("入力!G23")),
    #     "入力!E24": int(input_data.get("入力!E24")),
    #     "入力!G24": int(input_data.get("入力!G24")),
    #     "入力!E25": float(input_data.get("入力!E25")),
    #     "入力!E26": float(input_data.get("入力!E26")),
    #     "入力!E27": int(input_data.get("入力!E27")),
    #     "入力!G27": float(input_data.get("入力!G27")),
    #     "入力!E29": float(input_data.get("入力!E29")),
    #     "入力!E28": int(input_data.get("入力!E28")),
    #     "入力!G28": int(input_data.get("入力!G28")),
    #     "入力!E30": int(input_data.get("入力!E30")),
    #     "入力!G30": float(input_data.get("入力!G30")),
    #     "入力!E31": int(input_data.get("入力!E31")),
    #     "入力!G31": int(input_data.get("入力!G31")),
    #     "入力!E32": int(input_data.get("入力!E32")),
    #     "入力!G32": float(input_data.get("入力!G32")),
    #     "入力!E33": float(input_data.get("入力!E33")),
    #     "入力!E34": float(input_data.get("入力!E34")),
    #     "入力!E35": float(input_data.get("入力!E35")),
    #     "入力!E36": float(input_data.get("入力!E36")),
    #     "入力!G36": float(input_data.get("入力!G36")),
    #     "入力!E37": float(input_data.get("入力!E37")),
    #     "入力!E39": float(input_data.get("入力!E39")),
    #     "入力!G39": float(input_data.get("入力!G39")),
    #     "入力!E40": int(input_data.get("入力!E40")),
    #     "入力!G40": float(input_data.get("入力!G40")),
    #     "入力!E41": int(input_data.get("入力!E41")),
    #     "入力!G41": int(input_data.get("入力!G41")),
    #     "入力!E43": float(input_data.get("入力!E43")),
    #     "入力!E44": float(input_data.get("入力!E44")),
    #     "入力!E45": float(input_data.get("入力!E45")),
    #     "入力!E47": float(input_data.get("入力!E47")),
    # }
    result = graph_All_cell()
    # print(data)
    response = {
        "ok": True,
        "message": "Simulation parameters received",
    }

    return response