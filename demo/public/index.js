let detector;
const canv = document.getElementById('canv');
const ctx = canv.getContext('2d');
const webcamElement = document.getElementById('webcam');
//const MODEL_PATH = 'file:///tmp/mobilenet/model.json';
//const MODEL_PATH = './my-model/model.json';

const MODEL_PATH = 'https://0.0.0.0:3005/coco-model/model.json';
class ObjectDetector {
    MODEL_PATH; model;
    constructor(MODEL_PATH){
        this.MODEL_PATH = MODEL_PATH;
    }
    async load(){
        this.model = await cocoSsd.load();
        //this.model = await tf.loadGraphModel(MODEL_PATH);
        //console.log('her1e');
        
        //this.model = await tf.loadLayersModel(this.MODEL_PATH);
        //this.model = await tf.loadGraphModel(this.MODEL_PATH);
        //console.log('her2e');

    }
    async detect(frame){
        //console.log(this.detect2(frame));
        //return [{class: 'dog', bbox: [0,0,20,80]}];
        return await this.model.detect(frame);
    }
    async detect2(frame){
        const batched = tf.tidy(() => {
            frame = tf.browser.fromPixels(frame);
            // Reshape to a single-element batch so we can pass it to executeAsync.
            return frame.expandDims(0);
        });
        const height = batched.shape[1];
        const width = batched.shape[2];
        console.log(batched);
        //(const result = await this.model.executeAsync(batched);
        const result = this.model.execute(batched);
        console.log(result);
        return batched;
    }
}


async function main(){
    while (true) {
        const predictions = await detector.detect(webcamElement);
        drawPredictions(predictions);
        document.getElementById('console').innerText = `
          prediction: ${predictions.map(a => a.class)}
        `;
        // Give some breathing room by waiting for the next animation frame to
        // fire.
        await new Promise((resolve, reject)=>{setTimeout(()=>resolve(), 10000)});
        //await tf.nextFrame();
    }
}

async function app() {
    detector = new ObjectDetector(MODEL_PATH);
    console.log('Loading model...');
    await detector.load();
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