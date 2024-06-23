import json
import os

def normalizeData() -> list:
    dirPath = os.getcwd()
    filePath = dirPath + "/playlist[76].json"
    f = open(filePath)
    rawJson = json.load(f)

    data = {}
    dataList = []
    cols = [{"field": "title"}, {"field": "rating", "editable": "true"}, {"field":"index"}]
    # process json and convert into dict of id -> all_props
    for (seq, title) in tuple(rawJson['title'].items()):
        data[title] = {
            "index": seq
        }

    for key in rawJson:
        if key != "title":
            for (seq, value) in tuple(rawJson[key].items()):
                data[rawJson['title'][seq]][key] = value
            if key != "key":
                cols.append({"field": key})

    for key in data:
        data[key]['rating'] = 0
        data[key]['title'] = key

        dataList.append(data[key])

    dataList = sorted(dataList, key = lambda record: int(record['index']))
    return [dataList, cols]