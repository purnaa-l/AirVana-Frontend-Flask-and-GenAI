from flask import Flask, request, jsonify
import joblib
import os
from flask_cors import CORS

app = Flask(__name__)

# Allow only the frontend's origin (adjust for your setup)
CORS(app, resources={r"/predict": {"origins": "http://localhost:5173"}})

# Load model and scaler with proper absolute paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model = joblib.load(os.path.join(BASE_DIR, "model", "model.pkl"))
scaler = joblib.load(os.path.join(BASE_DIR, "model", "scaler.pkl"))

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        features = [
            data["temperature_celsius"],
            data["wind_kph"],
            data["pressure_mb"],
            data["humidity"],
            data["cloud"],
            data["uv_index"]
        ]

        # Scale and predict
        scaled_features = scaler.transform([features])
        prediction = model.predict(scaled_features)[0]
        return jsonify({"prediction": round(prediction, 2)})

    except Exception as e:
        print("🔥 Error during prediction:", e)
        return jsonify({"error": "Prediction failed. Try again."}), 500

if __name__ == "__main__":
    app.run(debug=True)
