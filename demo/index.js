let model;
const canv = document.getElementById('canv');
const ctx = canv.getContext('2d');
const webcamElement = document.getElementById('webcam');

async function loadModel(){
    model = await cocoSsd.load();
    //tf.loadGraphModel({ fromTFHub: true })
}

async function main(){
    while (true) {
        const predictions = await model.detect(webcamElement);
        drawPredictions(predictions);
        document.getElementById('console').innerText = `
          prediction: ${predictions.map(a => a.class)}
        `;
        // Give some breathing room by waiting for the next animation frame to
        // fire.
        await tf.nextFrame();
    }
}

async function app() {
    console.log('Loading model...');
    await loadModel();
    console.log('Successfully loaded model');
    await setupWebcam();
    main();
}

function drawPredictions(predictions){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    predictions.forEach(drawPrediction);
}

function drawPrediction(prediction) {
    const x = prediction.bbox[0];
    const y = prediction.bbox[1];
    const width = prediction.bbox[2];
    const height = prediction.bbox[3];
    // Draw the bounding box.
    ctx.strokeStyle = "#00FFFF";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, width, height);
}

async function setupWebcam() {
    return new Promise((resolve, reject) => {
        const navigatorAny = navigator;
        navigator.getUserMedia = navigator.getUserMedia ||
            navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
            navigatorAny.msGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({ video: true },
                stream => {
                    webcamElement.srcObject = stream;
                    webcamElement.addEventListener('loadeddata', () => resolve(), false);
                },
                error => reject());
        } else {
            reject();
        }
    });
}

app();