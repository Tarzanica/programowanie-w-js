let canvas = document.querySelector('#snowField');
let ctx = canvas.getContext('2d');
let numberOfFlakes = 700;
let flakes = [];
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return min = Math.random() * (max - min);
};


function createSnowflakes() {
    for (let i = 0; i < numberOfFlakes; i++) {
        flakes.push({
            x: Math.random() * w,
            y: Math.random() * h,
            speedX: random(-10, 10),
            speedY: random(5, 17),
            radius: random(0.5, 7),
        })        
    }
};

function drawSnowflakes() {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < flakes.length; i++) {    
        ctx.beginPath();
        ctx.arc(
        flakes[i].x,
        flakes[i].y,
        flakes[i].radius,
        0,
        Math.PI * 2,
        );
        ctx.fillStyle = "white";
        ctx.fill();
    };
};

function moveSnowflakes() {
    for (let i = 0; i < flakes.length; i++) {
        flakes[i].x += flakes[i].speedX;
        flakes[i].y += flakes[i].speedY;         


    }  
};

function animateSnowflakes() {  
    drawSnowflakes();
    moveSnowflakes();
    requestAnimationFrame(animateSnowflakes);
};
createSnowflakes();
animateSnowflakes()

//setInterval(updateSnowFall, 50); nie uzywa się do animacji (setTimeOut też)



