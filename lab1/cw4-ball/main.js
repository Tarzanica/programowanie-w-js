let holes = [];
let speedX = 0;
let speedY = 0;

const ball =  {
    x: 0,
    y: 0
}


window.addEventListener('deviceorientation', onDeviceOrientationChange);

document.querySelector('.start').addEventListener('click', onStartClick);
// document.querySelectorAll('.restart').addEventListener('click', onRestart);






function onStartClick() {
    let scoreCount = 0;
    const btn = document.querySelector('.start');
    btn.classList.add('remove');

    makeHoles();
    moveBall();

    const score = document.createElement('span');
    score.classList.add('score');
    score.innerHTML = "SCORE: " + scoreCount;
    document.body.appendChild(score);

    const ball = document.createElement('div');
    ball.classList.add('ball');
    document.body.appendChild(ball);



    gameInit();
}

function gameInit() {

    const ballStartXPos = Math.random() * innerWidth;
    const ballStartYPos = Math.random() * innerHeight;

    ball.x = ballStartXPos;
    ball.y = ballStartYPos;

    
    
}

function onDeviceOrientationChange(ev) {
    speedX = ev.gamma/60;
    speedY = ev.beta/60;
}


// function onRestart() {
//     window.onStartClick()
// }

function makeHoles() {
    for (let i = 5; i < window.innerWidth/60; i++) {
        let hole = document.createElement('div');
        hole.classList.add('hole');
        let holeNumber = document.createElement('span');
        holeNumber.innerHTML = i - 5;
        hole.appendChild(holeNumber);

        hole.style.left = 80 * i+Math.random() * 70 - 95 + 'px';
        hole.style.top = Math.random() * (window.innerHeight-95) + 'px';

        holes.push(hole);
        document.body.appendChild(hole);
    }

}



function moveBall() {

}