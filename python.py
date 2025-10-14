import tensorflow as tf
import tensorflowjs as tfjs

# Load your Keras model
model = tf.keras.models.load_model('your_model.h5')

# Convert and save the model in TensorFlow.js format
tfjs.converters.save_keras_model(model, 'backend\src\dl\weather_model.h5')