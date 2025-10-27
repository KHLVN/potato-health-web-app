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
model = load_model("weather_model.h5")

# Define label names
labels = ["healthy", "bacterial", "fungal"]

@app.route("/predict", methods=["POST"])  # fixed: must start with "/"
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    img = Image.open(io.BytesIO(file.read())).resize((28, 28))
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


# from flask import Flask, request, jsonify
# from tensorflow.keras.models import load_model
# from tensorflow.keras.preprocessing import image
# import numpy as np
# import os
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # Load your .keras model
# model = load_model("weather_model.h5")

# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         img_file = request.files["file"]
#         img_path = os.path.join("uploads", img_file.filename)
#         img_file.save(img_path)

#         # Load and preprocess image
#         img = image.load_img(img_path, target_size=(28, 28))  # use your model’s training size
#         img_array = image.img_to_array(img) / 255.0

#         # Flatten if model expects 1D input (e.g. Dense input)
#         img_array = img_array.reshape(1, -1)  # shape (1, 2352)
#         prediction = model.predict(img_array)

#         predicted_class = np.argmax(prediction, axis=1)[0]
#         confidence = float(np.max(prediction))

#         return jsonify({
#             "predicted_class": int(predicted_class),
#             "confidence": confidence
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True, port=2000)
