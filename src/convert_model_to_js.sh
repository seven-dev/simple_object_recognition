echo "Converting..."
tensorflowjs_converter \
    --input_format=keras \
    /tmp/my_keras_model.h5 \
    /tmp/my_tfjs_model

    --output_format=tfjs_graph_model


    tensorflowjs_converter --input_format=keras --output_format=tfjs_graph_model model/training/model.h5 model/js/jsmodel