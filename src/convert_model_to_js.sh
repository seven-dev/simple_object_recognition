echo "Converting..."
tensorflowjs_converter --input_format=keras model/training/model.h5 model/js/jsmodel
tensorflowjs_converter --input_format=keras model2/training/model.h5 model2/js/jsmodel