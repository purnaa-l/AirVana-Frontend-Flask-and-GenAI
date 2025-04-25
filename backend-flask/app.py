

# # from flask import Flask, request, jsonify
# # import joblib
# # import os
# # from flask_cors import CORS
# # import google.generativeai as genai  # Gemini
# # import dotenv

# # dotenv.load_dotenv()  # Load your .env file with API key

# # app = Flask(__name__)
# # CORS(app)
# # # Load model and scaler
# # BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# # model = joblib.load(os.path.join(BASE_DIR, "model", "model.pkl"))
# # scaler = joblib.load(os.path.join(BASE_DIR, "model", "scaler.pkl"))

# # # Initialize Gemini API
# # GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")  # Make sure your .env contains this
# # genai.configure(api_key=GOOGLE_API_KEY)
# # chat_model = genai.GenerativeModel("gemini-1.5-pro")

# # @app.route("/predict", methods=["POST", "OPTIONS"])
# # def predict():
# #     if request.method == 'OPTIONS':
# #         return '', 200
# #     try:
# #         if request.is_json:
# #             data = request.get_json()
# #             features = [
# #                 data.get("temperatureCelsius", 0.0),
# #                 data.get("windKph", 0.0),
# #                 data.get("pressureMb", 0.0),
# #                 data.get("humidity", 0.0),
# #                 data.get("cloud", 0.0),
# #                 data.get("uvIndex", 0.0)
# #             ]
# #             scaled_features = scaler.transform([features])
# #             prediction = model.predict(scaled_features)[0]
# #             return jsonify({"prediction": round(prediction, 2)})
# #         else:
# #             return jsonify({"error": "Request must be JSON"}), 415
# #     except Exception as e:
# #         print("🔥 Error during prediction:", e)
# #         return jsonify({"error": "Prediction failed. Try again."}), 500





# # if __name__ == "__main__":
# #     app.run(debug=True)
from flask import Flask, request, jsonify
import joblib
import os
from flask_cors import CORS
app = Flask(__name__)
import google.generativeai as genai  # Gemini

# Allow only the frontend's origin (adjust for your setup)
CORS(app, resources={r"/predict": {"origins": "http://localhost:5173", "methods": ["POST"], "allow_headers": ["Content-Type"]}})
CORS(app)
# Load model and scaler with proper absolute paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model = joblib.load(os.path.join(BASE_DIR, "model", "model.pkl"))
scaler = joblib.load(os.path.join(BASE_DIR, "model", "scaler.pkl"))


# Initialize Gemini API
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")  # Make sure your .env contains this
genai.configure(api_key=GOOGLE_API_KEY)
chat_model = genai.GenerativeModel("gemini-1.5-pro")

@app.route("/predict", methods=["POST", "OPTIONS"])
def predict():
    if request.method == 'OPTIONS':
        # This is a preflight request, return a 200 response.
        return '', 200

    try:
        # Ensure the request has JSON data
        if request.is_json:
            data = request.get_json()
              # Parse the JSON body
            
            temperatureCelsius = data.get('temperatureCelsius', 0.0) or data.get('temperature_celsius', 0.0)
            windKph = data.get('windKph', 0.0) or data.get('wind_kph', 0.0)
            pressureMb = data.get('pressureMb', 0.0) or data.get('pressure_mb', 0.0)
            humidity = data.get('humidity', 0.0)
            cloud = data.get('cloud', 0.0)
            uvIndex = data.get('uvIndex', 0.0) or data.get('uv_index', 0.0)
            features = [
                data["temperatureCelsius"],
                data["windKph"],
                data["pressureMb"],
                data["humidity"],
                data["cloud"],
                data["uvIndex"]
            ]

            # Scale and predict
            scaled_features = scaler.transform([features])
            prediction = model.predict(scaled_features)[0]
            return jsonify({"prediction": round(prediction, 2)})

        else:
            return jsonify({"error": "Request must be JSON"}), 415

    except Exception as e:
        print("🔥 Error during prediction:", e)
        return jsonify({"error": "Prediction failed. Try again."}), 500
    
@app.route("/", methods=["POST", "OPTIONS"])
def chat():
    if request.method == 'OPTIONS':
        return '', 200
    try:
        data = request.get_json()
        print("📥 Received data:", data)

        user_input = data.get("query", "")
        print("🗣️ User input:", user_input)

        if not user_input:
            return jsonify({"response": "Please provide a valid query."})

        # response = chat_model.generate_content(user_input)
        # print("🤖 Gemini response:", response)

        # reply = response.text.strip() 
        # reply = "\n".join([line.strip() for line in reply.splitlines() if line.strip()])
        

        response = chat_model.generate_content(user_input)

        # Clean and format the response
        if hasattr(response, "text"):
            reply = response.text.strip()
            # Remove excessive newlines (optional: keep at most 2)
            reply = "\n\n\n".join([line.strip() for line in reply.splitlines() if line.strip()])
        else:
            reply = "Sorry, I couldn't generate a reply."

        return jsonify({"response": reply})


        # print("📝 Cleaned reply:", reply)

        # return jsonify({"response": reply})

    except Exception as e:
        print("🛑 Gemini Error:", e)
        return jsonify({"response": "Something went wrong with the chatbot."}), 500



if __name__ == "__main__":
    app.run(debug=True)