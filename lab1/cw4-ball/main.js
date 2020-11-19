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
    if (( speedX < 180 && speedX  > -180 )) {
        
        ball.style.left = 230 - (speedX * 5) + 'px';        
    }
        
    if  (speedY < 100 && speedY > -100) {
        ball.style.top = 160 - (speedY * 5) + 'px';       
    }
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
        holeNumber.id = holeNumber.innerHTML;
        hole.appendChild(holeNumber);

        hole.style.left = 80 * i + Math.random() * 50 + 'px';
        hole.style.top = Math.random() * (window.innerHeight - 100) + 'px';

        holes.push(hole);
        document.body.appendChild(hole);
    }

}

