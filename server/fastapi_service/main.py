from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import json
import os
import time

app = FastAPI()

# Set up CORS
origins = [
    "http://localhost:3000",  # Allow local development originy
    # "https://yourfrontend.com",  # Add production origins as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # This is very permissive; you should adjust this in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/fastapi-endpoint")
def read_root():
    return {"Hello": "from FastAPI"}

@app.get("/status")
def get_status():
    return {"status": "FastAPI is up and running!"}

@app.get("/items/{item_id}")
async def read_item(item_id):
    return {"item_id": item_id}

@app.get("/directory")
async def getDirectory():
    return {"directory": os.listdir("./server/fastapi_service/")}

@app.get("/medical-term/{word_id}")
def getMedicalTerm(word_id):
    savedData = {}
    cmds = ["php", "./server/fastapi_service/request.php", word_id]
    p = subprocess.Popen(cmds)
    time.sleep(0.4) #Wait for php command to finish
    file = open('./server/fastapi_service/data.json')
    data = json.load(file)
    print(data)
    if len(data) > 0 and type(data[0]) == dict: #Make sure was able to collect data
        for i in data:
            define = i["shortdef"]
            name = i["meta"]["id"]
            if name not in savedData:
                savedData[name] = define
    else:
        print("Unable to find term.")
        if len(data) > 0: 
            print("Did you mean any of the following terms?") 
            print(data)
    jsonData = json.dumps(savedData, indent=4)
    with open("./server/fastapi_service/results.json", "w") as f:
        f.write(jsonData)
    print("Results saved to results.json")
    return jsonData

"""
@app.get("/medical-term")
def getMedicalTerm():
    savedData = {}
    while True:
        word = input("Input a Word (Q to exit):")
        if word == "Q": 
            break
        subprocess.call("php ./request.php " + word)
        file = open('data.json')
        data = json.load(file)
        if len(data) > 0 and type(data[0]) == dict:
            for i in data:
                define = i["shortdef"]
                name = i["meta"]["id"]
                if name not in savedData:
                    savedData[name] = define
                print(define)
        else:
            print("Unable to find term.")
            if len(data) > 0: 
                print("Did you mean any of the following terms?")
                print(data)
    jsonData = json.dumps(savedData, indent=4)
    with open("results.json", "w") as f:
        f.write(jsonData)
    print("Results saved to results.json")
    return jsonData
"""
# set up routes below