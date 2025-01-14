from flask import Flask, request, jsonify
# from aimodel import model
from PIL import Image
from keras.models import load_model
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = load_model("model.h5")
# Functia asta evaluate_photo ia ca parametru o poza si vreau sa returneze
# 'green' daca esti bine
# 'yellow' daca ai mild signs of anxiety
# 'red' daca ai severe signs of depression
def evaluate_photo(photo):
    image = convert_to_correct_format(photo)
    # model = load_model("model.h5")
    model_predict_result = model.predict(image)
    # predicted_class = np.argmax(model_predict_result, axis=-1)[0]
    predicted_class = 2 if model_predict_result[0, 2] > 0.75 else 0 if model_predict_result[0, 2] < 0.45 else 1
    class_to_color = {
        0: 'red',
        1: 'yellow',
        2: 'green',
    }
    print('model_predict_result', model_predict_result)
    predicted_color = class_to_color[predicted_class]
    return predicted_color


# Converts photo to 48x48 greyscale pillow image
def convert_to_correct_format(photo):
    image = Image.open(photo.stream)
    image = image.convert('L')
    image = image.resize((48, 48))
    # Convert the grayscale image to RGB by stacking the single channel
    image_rgb = Image.merge("RGB", (image, image, image))  # Create 3-channel RGB

    # Convert the RGB image to a NumPy array
    image_array = np.array(image_rgb)

    # Reshape the array to include the batch dimension
    # Final shape should be (1, 48, 48, 3)
    image_array = np.expand_dims(image_array, axis=0)

    # Normalize the pixel values to range [0, 1] (if required by your model)
    image_array = image_array.astype('float32') / 255.0
    return image_array


@app.route('/evaluate', methods=['POST'])
def evaluate_post():
    if 'photo' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    photo = request.files['photo']

    if photo.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    evaluation_result = evaluate_photo(photo)

    return jsonify({'result': evaluation_result}), 200


@app.route('/hello', methods=['GET'])
def hello_world():
    return jsonify({'message': 'hello world'}), 200


# if __name__ == '__main__':
    # app.run(host="0.0.0.0", port=8000, debug=True)
# app.run(host="0.0.0.0", port=8000, debug=True)
