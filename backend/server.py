# from typing import Union
from utils import normalizeData
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = [
    "*"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# maintain the json data in memory in a list
[dataList, cols] = normalizeData()

class RatingUpdateModel(BaseModel):
    rating: int

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/api/records/")
def getRecords(start: int = 0):
    return {"rows":dataList[start:start+10:], "total": len(dataList), "cols": cols}

@app.get("/api/scatterChartData/")
def getScatterChartData():
    scatterChartData = list(map(lambda song: {"danceability": song['danceability'], "id": song['id']}, dataList))
    return {"data": scatterChartData, "status": 200}

@app.get("/api/record/{title}")
def getRecordFromTitle(title: str):
    for record in dataList:
        if record['title'].strip().lower() == title.strip().lower():
            return {"data": record, "status": 200}
        
    return {"data": {}, "status": 404}

@app.put("/api/record/{id}")
def updateRecord(id: str, rating: RatingUpdateModel):
    for record in dataList:
        if record['id'] == id:
            record['rating'] = rating.rating
            return {"data": record, "status": 200}
        
    return {"data": {}, "status": 404}
