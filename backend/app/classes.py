from pydantic import Field, BaseModel
from typing import Any, Dict, List


class RequestCVModel(BaseModel):
    classes_names: Dict[str, List[bytes]]
    hyperparameters: Dict[str, int]


class RequestNLPModel(BaseModel):
    classes_names: Dict[str, List[bytes]]
    hyperparameters: Dict[str, int]


class RequestMLModel(BaseModel):
    data: Dict[str, Dict[str, Any]]  # str - название столбца, Dict[str, Any] - столбец: значение

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "Duration": {
                        "0": 60,
                        "1": 60,
                        "2": 60,
                        "3": 45,
                        "4": 45,
                        "5": 60
                    },
                    "Pulse": {
                        "0": 110,
                        "1": 117,
                        "2": 103,
                        "3": 109,
                        "4": 117,
                        "5": 102
                    },
                    "Max_pulse": {
                        "0": 130,
                        "1": 145,
                        "2": 135,
                        "3": 175,
                        "4": 148,
                        "5": 127
                    },
                    "Calories": {
                        "0": 409.1,
                        "1": 479.0,
                        "2": 340.0,
                        "3": 282.4,
                        "4": 406.0,
                        "5": 300.5
                    }
                }
            ]
        }
    }
