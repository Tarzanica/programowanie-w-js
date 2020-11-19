let holes = [];
let speedX = 0;
let speedY = 0;
let x = 200;
let y = 200;

window.addEventListener('deviceorientation', onDeviceOrientationChange);

document.querySelector('.start').addEventListener('click', onStartClick);
// document.querySelectorAll('.restart').addEventListener('click', onRestart);

function onStartClick() {
    let scoreCount = 0;
    const btn = document.querySelector('.start');
    btn.classList.add('remove');

    const score = document.createElement('span');
    score.classList.add('score');
    score.innerHTML = "SCORE: " + scoreCount;
    document.body.appendChild(score);

    let ball = document.createElement('div');
    ball.classList.add('ball');
    document.body.appendChild(ball);

    makeHoles();
    moveBall();
}

function onDeviceOrientationChange(ev) {
    speedX = ev.alpha; //gamma nie alfa
    speedY = ev.beta;
    console.log(speedX);
    console.log(speedY);
}

// function onRestart() {
//     window.onStartClick()
// }

function makeHoles() {
    for (let i = 5; i < window.innerWidth/100; i++) {
        let hole = document.createElement('div');

        hole.classList.add('hole');
        let holeNumber = document.createElement('span');
        holeNumber.innerHTML = i - 5;
        hole.appendChild(holeNumber);

        hole.style.left = 80 * i + Math.random() * 50 + 'px';
        hole.style.top = Math.random() * (window.innerHeight - 100) + 'px';

        holes.push(hole);
        document.body.appendChild(hole);
    }

}

 function moveBall() {
    let ball = document.querySelector('.ball');
//error cannot read property of null ??
    
    if ( speedX + x < window.innerWidth && speedX + x > 0 ) {
        x += speedX;
        console.log(x);
        ball.style.left = x + 'px';
    }
        
    if ( speedY + y < window.innerHeight && speedY + y > 0 ) {
        y += speedY;
        console.log(x);
        ball.style.top = y + 'px';
    }
 }