"""
Shared simulation state.

This module exposes a single mutable mapping `data` that holds all input
parameters for the Excel-simulation pipeline. Other modules import
`simulation_data.state.data` to read the latest inputs.

You can replace the entire dict (e.g., in an API endpoint) to inject
user-provided parameters before running calculations.
"""

# Default sample data (same shape/keys as existing modules used).
data = {
    "入力!E4": "サンプル",
    "入力!E5": 30,
    "入力!E7": "ミラージュ",
    "入力!E8": 2025,
    "入力!G8": 9,
    "入力!E9": 43800000,
    "入力!E10": "",
    "入力!E12": 43800000,
    "入力!E13": 35,
    "入力!E14": 1.675,
    "入力!E15": 5,
    "入力!G15": 0.1,
    "入力!E16": 2026,
    "入力!G16": 2040,
    "入力!E17": 2,
    "入力!G17": 350000,
    "入力!E18": 1,
    "入力!E20": 210000,
    "入力!E21": 5,
    "入力!G21": 0.5,
    "入力!E22": 2026,
    "入力!G22": 2040,
    "入力!E23": 4,
    "入力!G23": 140000,
    "入力!E24": "",
    "入力!G24": "",
    "入力!E25": 8920,
    "入力!E26": 12090,
    "入力!E27": 2,
    "入力!G27": 0.5,
    "入力!E28": 2026,
    "入力!G28": 2036,
    "入力!E29": 0,
    "入力!E30": 10,
    "入力!G30": 150000,
    "入力!E31": 4,
    "入力!G31": 2,
    "入力!E32": 4,
    "入力!G32": 150000,
    "入力!E33": 126758716,
    "入力!E34": 21126452,
    "入力!E35": 42242905,
    "入力!E36": 5376,
    "入力!G36": 321776,
    "入力!E37": 5501100,
    "入力!E39": 43800000,
    "入力!G39": 100,
    "入力!E40": 3,
    "入力!G40": 1,
    "入力!E41": 2026,
    "入力!G41": 2040,
    "入力!E43": 3,
    "入力!E44": 1.4,
    "入力!E45": 0.3,
    "入力!E47": 15,
    "Log1!D6": 0,
}


