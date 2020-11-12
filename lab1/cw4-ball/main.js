let holes = [];

window.addEventListener('deviceorientation', onDeviceOrientationChange);

document.querySelector('.start').addEventListener('click', onStartClick);
document.querySelectorAll('.restart').addEventListener('click', onRestart);




const ball =  {
    x: 0,
    y: 0
}

function onStartClick() {
    let scoreCount = 0;
    const btn = document.querySelector('.start');
    btn.classList.add('remove');

    makeHoles();
    moveHoles();

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
    console.log(ev.alpha, ev.beta, ev.gamma);
}


function onRestart() {
    window.onStartClick()
}

function makeHoles() {
    for (let i = 5; i < window.innerWidth/100; i++) {
        let hole = document.createElement('div');
        hole.classList.add('hole');
        hole.style.left = 100*i+Math.random() * 70 - 95 + 'px';
        hole.style.top = Math.random() * (window.innerHeight-95) + 'px';
        holes.push(hole);
        document.body.appendChild(hole);
    }

    for (let i = 5; i < window.innerWidth/100; i++) {
        let hole = document.createElement('div');
        hole.classList.add('hole');
        hole.style.left = 100 * i + Math.random() * 70 - 95 + 'px';
        hole.style.top = Math.random() * (window.innerHeight) + window.innerHeight - 100 + 'px';
        holes.push(hole);
        document.body.appendChild(hole);
    }

}

function moveHoles() {

}