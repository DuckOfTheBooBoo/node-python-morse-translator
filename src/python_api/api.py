import json
from flask import Flask

app = Flask(__name__)

@app.route("/generateMorseTone")
def generateMorseTone():
    return '<h1>Hello from Flask'

app.run(host='localhost', port=9001)