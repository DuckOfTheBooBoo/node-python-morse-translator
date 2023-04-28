from flask import Flask, request, render_template
from flask_cors import CORS
from src.play_morse import play_morse
from src.morse_code import text_to_morse, morse_to_text
from src.morse_code_error import MorseCodeError, MorseCodeNotFound
from io import BytesIO
import json, base64

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/texttomorse", methods=['GET'])
def api_text_to_morse():

    args = request.args

    try:
        data = args["data"]

        if data != '':
            try:
                result = text_to_morse(data)

                return json.dumps({
                    "status": "success",
                    "data": result
                }), 200

            except MorseCodeNotFound as not_found_error:
                return json.dumps({
                    "message": not_found_error
                }), 400

    # Return 400 if no data query provided
    except KeyError:
        return json.dumps({
            "message": "Error, no data query provided."
        }), 400

@app.route("/api/morsetotext", method=['GET'])
def api_morse_to_text():

    args = request.args

    try:
        data = args["data"]

        if data != '':
            try:
                result = morse_to_text(data)

                return json.dumps({
                    "status": "success",
                    "data": result
                }), 200

            except MorseCodeError as morse_error:
                return json.dumps({
                    "message": morse_error
                }), 400

    # Return 400 if no data query provided
    except KeyError:
        return json.dumps({
            "message": "Error, no data query provided."
        }), 400


@app.route("/generateMorseTone", methods=['GET'])
def generate_morse_tone():

    # Query Parameters
    args = request.args
    if 'data' in args.keys() and args['data'] != '':
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
    app.run(host='localhost', port=5000, debug=True)
