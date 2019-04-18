# Simple Object Recognition

## Goals of this project

- Train a custom object recognition model
- Have a demo running in the browser

## Installation - To create/train the model

```sh
    # Create a virtual environment to install the required packages
    # python3.7 is not supported by tensorflow
    python3.6 -m venv .venv
    # Activate the virtual enviroment
    source .venv/bin/activate
    # Upgrade pip
    pip install --upgrade pip
    pip install tensorflow==2.0.0-alpha0 jupyter matplotlib
    # (Maybe in the future I'll add a requirements file)
```  

## Instalation - To convert the model to tensorflowjs

Because package 'tensorflowjs' installs other versions of the same packages, I install it on another virtual env. After installing it take a look at the file 'src/convert_model_to_js.sh' to convert it.

```sh
    # Create a virtual environment to install the required packages
    python3.6 -m venv .venv2
    # Activate the virtual enviroment
    source .venv2/bin/activate
    # Upgrade pip
    pip install --upgrade pip
    # Install the requirements
    #pip install -r requirements.txt
    pip install tensorflowjs tensorflow
    pip install numpy --upgrade
    # To make sure it works:
    tensorflowjs_converter --version
```  
