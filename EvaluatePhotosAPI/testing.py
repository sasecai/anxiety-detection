# from PIL import Image
# from keras.models import load_model
# import numpy as np
#
#
# model = load_model("model.h5")
# def evaluate_photo(photo):
#     image = convert_to_correct_format(photo)
#     # model = load_model("model.h5")
#     model_predict_result = model.predict(image)
#     predicted_class = np.argmax(model_predict_result, axis=-1)[0]
#     class_to_color = {
#         0: 'green',
#         1: 'yellow',
#         2: 'red',
#     }
#     predicted_color = class_to_color[predicted_class]
#     return predicted_color
#
#
# # Converts photo to 48x48 greyscale pillow image
# def convert_to_correct_format(photo):
#     # image = Image.open(photo)
#     image = photo.convert('L')
#     image = image.resize((48, 48))
#     # Convert the grayscale image to RGB by stacking the single channel
#     image_rgb = Image.merge("RGB", (image, image, image))  # Create 3-channel RGB
#
#     # Convert the RGB image to a NumPy array
#     image_array = np.array(image_rgb)
#
#     # Reshape the array to include the batch dimension
#     # Final shape should be (1, 48, 48, 3)
#     image_array = np.expand_dims(image_array, axis=0)
#
#     # Normalize the pixel values to range [0, 1] (if required by your model)
#     image_array = image_array.astype('float32') / 255.0
#     return image_array
#
#
# def test():
#     happy_photo = Image.open("happy.png")
#     sad_photo = Image.open("sad.png")
#     print("in test")
#     print("rezultat poza happy: ", evaluate_photo(happy_photo))
#     print("rezultat poza sad: ", evaluate_photo(sad_photo))
#     print("finished test")
#
#
# if __name__ == '__main__':
#     test()
#     # app.run()
