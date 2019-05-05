echo "Converting..."
tensorflowjs_converter --input_format=keras model/training/model.h5 model/js/jsmodel
tensorflowjs_converter --input_format=keras model2/training/model.h5 model2/js/jsmodel

tensorflowjs_converter --input_format=tf_saved_model \
                       --output_node_names='Postprocessor/ExpandDims_1,Postprocessor/Slice' \
                       --saved_model_tags=serve \
                       ./saved_model \
                       ./web_model