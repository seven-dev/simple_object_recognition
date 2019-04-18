let net;
let canv, ctx;

async function app() {
    canv = document.getElementById('canv');
    ctx = canv.getContext('2d');
    console.log('Loading coco-ssd..');

    // Load the model.
    net = await cocoSsd.load();
    console.log('Sucessfully loaded model');

    await setupWebcam();
    while (true) {
        const result = await net.detect(webcamElement);
        //console.log(result);
        const prediction = result[0];
        if (prediction !== undefined) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            result.forEach(draw);
            //draw(prediction);
            document.getElementById('console').innerText = `
          prediction: ${result.map(a => a.class)}
        `;
        }

        // Give some breathing room by waiting for the next animation frame to
        // fire.
        await tf.nextFrame();
    }
}

function draw(prediction) {
    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const x = prediction.bbox[0];
    const y = prediction.bbox[1];
    const width = prediction.bbox[2];
    const height = prediction.bbox[3];
    // Draw the bounding box.
    ctx.strokeStyle = "#00FFFF";
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, width, height);
}

const webcamElement = document.getElementById('webcam');

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