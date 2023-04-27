from flask import Flask, request
from flask_cors import CORS
from play_morse import play_morse
from io import BytesIO
import json, base64

app = Flask(__name__)
CORS(app)

@app.route("/", methods=['GET'])
def generateMorseTone():

    # Query Parameters
    args = request.args
    if 'data' in args.keys():
        audio = play_morse(args["data"])
        audio_stream = base64.b64encode(audio).decode('utf-8')
        return json.dumps({
            'data': "data:audio/wav;base64," + audio_stream,
        }), 200


    else:
        response = json.dumps({
            "message": "Error, no data query provided."
        })

        return response, 400
    
    
if __name__ == '__main__':
    app.run(host='localhost', port=9001)