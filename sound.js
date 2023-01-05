const file = document.getElementById('fileInput');
// const beforeBtn = document.getElementById('before');
// const afterBtn = document.getElementById('after');
const canvas = document.getElementById('effects');
const ctx = canvas.getContext('2d');
console.log(ctx)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let source;
let analyser;
let hue = 0;

container.addEventListener('click' , function(){
    const sounds = document.getElementById('sounds');
    const audioContext = new AudioContext();
    
    source = audioContext.createMediaElementSource(sounds);
    analyser = audioContext.createAnalyser();
    
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 512;

    const bufferLenght = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLenght);

    let barWidht = 2; // 10 
    let barHeight;

    function animation(){
        let x = 0;
        hue+=0.05;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        drawVisualiser(bufferLenght, x, barWidht, barHeight, dataArray);
        requestAnimationFrame(animation);
    }
    animation();
});

file.addEventListener('change', function(){
    const files = this.files;
    const sounds = document.getElementById('sounds');

    sounds.src = URL.createObjectURL(files[0]);
    sounds.load();
    sounds.play();

    // source = audioContext.createMediaElementSource(sounds);
    // analyser = audioContext.createAnalyser();
    // analyser.connect(analyser);
    // analyser.fftSize = 128;

    // const bufferLenght = analyser.frequencyBinCount;
    // const dataArray = new Uint8Array(bufferLenght);
   
    animation();
});


function drawVisualiser(bufferLenght, x, barWidht, barHeight, dataArray){

    for (let i = 0; i < bufferLenght; i++){
        barHeight = dataArray[i] * 1.5;
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(i + Math.PI * 8 / bufferLenght);
        const hue = i * 15; //hsl hue,saturation,lightness
        // ctx.fillStyle = 'blueviolet';
        // ctx.fillRect(10, 5, barWidht/2, barHeight*2);
        ctx.fillStyle = 'hsl(' + hue + ',100%, 50%)';
        ctx.fillRect(0, 0, barWidht, barHeight); //(8, 5, barWidht/2, barHeight*2)
        x += barWidht;
        ctx.restore();
    }
}

// function drawVisualiser(bufferLenght, x, barWidht, barHeight, dataArray){
//     for (let i = 0; i < bufferLenght; i++){
//         barHeight = dataArray[i] * 1;
//         ctx.save();
//         ctx.translate(canvas.width/2, canvas.height/2);
//         ctx.rotate(i * Math.PI * 5 / bufferLenght);
//         const hue = i * 80; //hsl hue,saturation,lightness 'i * 2'
//         ctx.fillStyle = 'hsl(' + hue + ',100%, 50%)';
//         ctx.fillRect(0, 0, barWidht, -barHeight);//(5, 5, barWidht, barHeight)
//         // x += barWidht;
//         ctx.restore();
//     }
// }

// function drawVisualiser(bufferLenght, x, barWidht, barHeight, dataArray){
//     for (let i = 0; i < bufferLenght; i++){
//         barHeight = dataArray[i] * -2;
//         // const red = barHeight/2;
//         // const green = i/2;
//         // const blue = i * barHeight/20;
        
//         ctx.fillStyle = 'hsl(' + hue + ', 100%, 70%)';
//         ctx.beginPath();                    
//         ctx.arc(x,  barHeight + 480, 15, 0, Math.PI * 2);
//         ctx.fill();
//         // ctx.fillStyle = 'white';
//         // ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight - 30, barWidht, 15); 
//         // ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
//         // ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight, barWidht, barHeight);
//         x += barWidht * 5;
//     }
// }

// function drawVisualiser(bufferLenght, x, barWidht, barHeight, dataArray){
//     for (let i = 0; i < bufferLenght; i++){
//         barHeight = dataArray[i] * 1.8;
//         // ctx.save();
//         // ctx.translate(canvas.width/2, canvas.height/2);
//         // ctx.rotate(i * Math.PI * 10 / bufferLenght);
//         const hue = i * 6; //hsl hue,saturation,lightness 'i * 2'
//         ctx.fillStyle = 'hsl(' + hue + ',100%, 50%)';
//         ctx.beginPath();                    
//         ctx.arc(x,  barHeight + 100, 13, 3, Math.PI * 2);
//         ctx.fill();
//         x += barWidht * 5;
//         ctx.restore();
//     }
// }

// function drawVisualiser(bufferLenght, x, barWidht, barHeight, dataArray){
//     for (let i = 0; i < bufferLenght; i++){
//         barHeight = dataArray[i] * 1.5;
//         ctx.save();
//         ctx.translate(canvas.width/2, canvas.height/2);
//         ctx.rotate(i + Math.PI * 2 / bufferLenght);
//         const hue = i * 2; //hsl hue,saturation,lightness 'i * 2'
//         ctx.fillStyle = 'hsl(' + hue + ', 100%, 45%)';
//         ctx.beginPath();                    
//         ctx.arc(barWidht, barHeight, 15, 0, Math.PI * 2);//-x/4
//         ctx.fill();
//         x += barWidht;
//         ctx.restore();
//     }
// }

const optionsVisu = [drawVisuOp1, drawVisuOp2, drawVisuOp3, drawVisuOp4]

document.getElementById('after').addEventListener('click', () => {
    drawVisuOp1();
    
})