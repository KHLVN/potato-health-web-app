# app.py
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import io
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow Node.js or frontend to access

# Load your trained model
model = load_model("best_mobilenetv2_potato.keras")

# Define label names
labels = ["bacterial", "fungal", "healthy"]

@app.route("/predict", methods=["POST"])  # fixed: must start with "/"
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    img = Image.open(io.BytesIO(file.read())).resize((224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    label = labels[np.argmax(prediction)]
    confidence = float(np.max(prediction))

    return jsonify({
        "prediction": label,
        "confidence": confidence
    })

if __name__ == "__main__":
    app.run(debug=True, port=2000)

