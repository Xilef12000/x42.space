// credit: Franks Laboratory: https://www.youtube.com/watch?v=d620nV6bp0A

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// get mous eposition
let mouse = {
    x: undefined,
    y: undefined,
    radius: (canvas.height/120) * (canvas.width/120)
};

window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y + window.scrollY;
    }
);

// create particle
class Particle {
    constructor(x, y, directionX, directionY, size, color){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    // method to draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        if (this.color != 255){
            ctx.fillStyle = 'rgb('+this.color+','+this.color+','+this.color+')';
        }
        else {
            ctx.fillStyle = '#0950cd';
        }
        ctx.fill();
    }
    // check particle position, check mous eposition, move the particle, draw the particle
    update() {
        //check if particle is still within canvas
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        //ckeck collision detection - mouse position / particle position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }
        //move particle
        this.x += this.directionX;
        this.y += this.directionY;
    }
}

// create particle array
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles*2; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 2) - 1;
        let directionY = (Math.random() * 2) - 1;
        let color = (Math.random() * 255) - 1;

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
    //special particles
    for (let i = 0; i < numberOfParticles/100; i++) {
        let size = (Math.random() * 5) + 7.5;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 4) - 2;
        let directionY = (Math.random() * 4) - 2;
        particlesArray.push(new Particle(x, y, directionX, directionY, size, 255));
    }
}

// animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    //update position
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    //draw lines
    connect();
    //draw particle
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
    }
}

// check if particle are close enough to draw line between them
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++){
        for (let b = a; b < particlesArray.length; b++){
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
            + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width/7) * (canvas.height/7)) {
                opacityValue = 1 - (distance/20000);
                if (particlesArray[a].color != 255 && particlesArray[b].color != 255){
                    var color = (particlesArray[a].color + particlesArray[b].color)/2
                    ctx.strokeStyle='rgba('+color+', '+color+', '+color+','+opacityValue+')';
                }
                else {
                    ctx.strokeStyle='rgba(9, 60, 205,'+opacityValue+')';
                }
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}
// resize event
window.addEventListener('resize',
    function() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = (canvas.height/120) * (canvas.width/120);
        init();
    }
);

// mouse out event
window.addEventListener('mouseout',
    function(){
        mouse.x = undefined;
        mouse.y = undefined;
    }
)

init();
animate();