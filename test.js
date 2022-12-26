const file = document.getElementById('fileInput');
const afterEffect = document.querySelector('.after');
const nextEffect = document.querySelector('.next');

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
        hue+=4;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        drawEffect(bufferLenght, x, barWidht, barHeight, dataArray);
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

    animation();
});

afterEffect.addEventListener('click', function(){
    
});
nextEffect.addEventListener('click', function(){
   
});
function drawEffect(bufferLenght, x, barWidht, barHeight, dataArray){

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

//function drawEffect(bufferLenght, x, barWidht, barHeight, dataArray){
//     for (let i = 0; i < bufferLenght; i++){
//         barHeight = dataArray[i] * 1.5;
//         ctx.save();
//         ctx.translate(canvas.width/2, canvas.height/2);
//         ctx.rotate(i * Math.PI * 10 / bufferLenght);
//         const hue = i * 2; //hsl hue,saturation,lightness 'i * 2'
//         ctx.fillStyle = 'hsl(' + hue + ',100%, 50%)';
//         ctx.fillRect(0, 0, barWidht, barHeight);//(5, 5, barWidht, barHeight)
//         x += barWidht;
//         ctx.restore();
//     }
// }