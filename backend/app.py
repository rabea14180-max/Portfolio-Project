from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask("flexsight")
CORS(app)

readings = []

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Flex Sight Backend API is running"
    })

@app.route("/api/readings", methods=["POST"])
def add_reading():
    data = request.get_json()

    if not data or "temperature" not in data:
        return jsonify({
            "error": "temperature is required"
        }), 400

    temperature = float(data["temperature"])
    device_id = data.get("device_id", "ESP32-01")
    location = data.get("location", "Server Room")

    alert = temperature >= 50

    reading = {
        "device_id": device_id,
        "temperature": temperature,
        "location": location,
        "alert": alert,
        "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

    readings.append(reading)

    return jsonify({
        "message": "Reading received successfully",
        "reading": reading
    }), 201

@app.route("/api/readings", methods=["GET"])
def get_readings():
    return jsonify(readings)

@app.route("/api/alerts", methods=["GET"])
def get_alerts():
    alerts = [reading for reading in readings if reading["alert"]]
    return jsonify(alerts)

app.run(debug=True, host="0.0.0.0", port=5001)
