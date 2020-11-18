let holes = [];
let speedX = 0;
let speedY = 0;
let x = 200;
let y = 200;
let ball = document.querySelector('ball');



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


}


function onDeviceOrientationChange(ev) {
    console.log(ev);
    speedX = ev.alfa/45;
    speedY = ev.beta/45;

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
//error cannot read property of null ??
     if ( speedX + x < window.innerWidth-200 && speedX + x > 0 ) {
         x += speedX;
         ball.style.left = speedX + 'px';
     }
        
     if ( speedY + y < window.innerWidth-200 && speedY + y > 0 ) {
        y += speedY;
        ball.style.left = speedY + 'px';
    }
 }