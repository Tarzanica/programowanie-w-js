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
    onDeviceOrientationChange(event);
}

function onDeviceOrientationChange(event) {
    let ball = document.querySelector('.ball');
    speedX = event.alpha; //alpha nie 
    speedY = event.beta;
    console.log(speedX);
    console.log(speedY);
    if (( speedX + x < innerWidth && speedX  +x > 0 )) {
        x += speedX;
        ball.style.left = x + 'px';        
    }
        
    if  (speedY < window.innerHeight && speedY > 0) {
        y += speedY;
        ball.style.top = y + 'px';       
    }
}

// function onRestart() {
//     window.onStartClick()
// }

function makeHoles() {
    for (let i = 1; i < window.innerWidth/100; i++) {
        let hole = document.createElement('div');

        hole.classList.add('hole');
        let holeNumber = document.createElement('span');
        holeNumber.innerHTML = i - 1;
        holeNumber.id = holeNumber.innerHTML;
        hole.appendChild(holeNumber);

        hole.style.left = 100 * i + Math.random() * 80 + 'px';
        hole.style.top = Math.random() * (window.innerHeight - 100) + 'px';

        holes.push(hole);
        document.body.appendChild(hole);
    }

}

