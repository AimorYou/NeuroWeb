import json
import os

from PIL import Image
from ultralytics import YOLO


yolo_model = YOLO(os.path.join(os.path.dirname(__file__), "resources/yolov8n.pt"))
yolo_mapping = [("person", (67, 161, 255)), ("bicycle", (19, 222, 24)), ("car", (186, 55, 2)),
                ("motorcycle", (167, 146, 11)), ("airplane", (190, 76, 98)), ("bus", (130, 172, 179)),
                ("train", (115, 209, 128)), ("truck", (204, 79, 135)), ("boat", (136, 126, 185)),
                ("traffic light", (209, 213, 45)), ("fire hydrant", (44, 52, 10)), ("stop sign", (101, 158, 121)),
                ("parking meter", (179, 124, 12)), ("bench", (25, 33, 189)), ("bird", (45, 115, 11)),
                ("cat", (73, 197, 184)), ("dog", (62, 225, 221)), ("horse", (32, 46, 52)), ("sheep", (20, 165, 16)),
                ("cow", (54, 15, 57)), ("elephant", (12, 150, 9)), ("bear", (10, 46, 99)), ("zebra", (94, 89, 46)),
                ("giraffe", (48, 37, 106)), ("backpack", (42, 10, 96)), ("umbrella", (7, 164, 128)),
                ("handbag", (98, 213, 120)), ("tie", (40, 5, 219)), ("suitcase", (54, 25, 150)),
                ("frisbee", (251, 74, 172)), ("skis", (0, 236, 196)), ("snowboard", (21, 104, 190)),
                ("sports ball", (226, 74, 232)), ("kite", (120, 67, 25)), ("baseball bat", (191, 106, 197)),
                ("baseball glove", (8, 15, 134)), ("skateboard", (21, 2, 1)), ("surfboard", (142, 63, 109)),
                ("tennis racket", (133, 148, 146)), ("bottle", (187, 77, 253)), ("wine glass", (155, 22, 122)),
                ("cup", (218, 130, 77)), ("fork", (164, 102, 79)), ("knife", (43, 152, 125)),
                ("spoon", (185, 124, 151)), ("bowl", (95, 159, 238)), ("banana", (128, 89, 85)),
                ("apple", (228, 6, 60)), ("sandwich", (6, 41, 210)), ("orange", (11, 1, 133)),
                ("broccoli", (30, 96, 58)), ("carrot", (230, 136, 109)), ("hot dog", (126, 45, 174)),
                ("pizza", (164, 63, 165)), ("donut", (32, 111, 29)), ("cake", (232, 40, 70)), ("chair", (55, 31, 198)),
                ("couch", (148, 211, 129)), ("potted plant", (10, 186, 211)), ("bed", (181, 201, 94)),
                ("dining table", (55, 35, 92)), ("toilet", (129, 140, 233)), ("tv", (70, 250, 116)),
                ("laptop", (61, 209, 152)), ("mouse", (216, 21, 138)), ("remote", (100, 0, 176)),
                ("keyboard", (3, 42, 70)), ("cell phone", (151, 13, 44)), ("microwave", (216, 102, 88)),
                ("oven", (125, 216, 93)), ("toaster", (171, 236, 47)), ("sink", (253, 127, 103)),
                ("refrigerator", (205, 137, 244)), ("book", (193, 137, 224)), ("clock", (36, 152, 214)),
                ("vase", (17, 50, 238)), ("scissors", (154, 165, 67)), ("teddy bear", (114, 129, 60)),
                ("hair drier", (119, 24, 48)), ("toothbrush", (73, 8, 110))]


def get_bbox_prediction(image, debug=False):
    yolo_results = yolo_model.predict(image, verbose=debug)
    structured_result = {}

    boxes_info = yolo_results[0].boxes
    for idx, cls_prediction in enumerate(boxes_info.cls):
        bbox_info = {
            "cls": yolo_mapping[int(cls_prediction.item())][0],
            "conf": round(boxes_info.conf[idx].item(), 2),
            "coordinates": boxes_info.xyxy[idx].tolist(),
            "color": yolo_mapping[int(cls_prediction.item())][1]
        }
        structured_result[idx] = bbox_info

    return structured_result


if __name__ == "__main__":
    img = Image.open(os.path.join(os.path.dirname(__file__), "imageToSave.png"))
    results = get_bbox_prediction(img, debug=True)

    print(json.dumps(results, indent=4))
