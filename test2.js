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

    let barWidht = 10; // 10 
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

function drawEffect(bufferLenght, x, barWidht, barHeight, dataArray){
    let w = Math.random() * canvas.width;
    let speedW = Math.random() * 3 - 2.5;
    w += speedW
    let size = Math.random() * 15 / 2+4;
    if (this.size > 0.2) this.size -= 0.1;
    for (let i = 0; i < bufferLenght; i++){
        barHeight = dataArray[i] * 1.8;
        ctx.save();
        ctx.fillStyle = 'blue';
        ctx.beginPath();                    
        ctx.arc(x, -barHeight + 500, size, 0, Math.PI * 2);
        ctx.fill();
        x += barWidht;
        ctx.restore();
    }
}