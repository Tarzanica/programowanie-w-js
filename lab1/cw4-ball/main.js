window.addEventListener('deviceorientation', onDeviceOrientationChange);

document.querySelector('.start').addEventListener('click', onStartClick);

const ballCoordinates =  {
    x: 0,
    y: 0
}

function onStartClick() {
    const btn = document.querySelector('.start');
     btn.classList.add('remove');

    const ball = document.createElement('div');
    ball.classList.add('ball');
    document.body.appendChild(ball);
    const hole = document.createElement('div');
    hole.classList.add('hole');
    document.body.appendChild(hole);

    const ballStartXPos = Math.random() * innerWidth;
    const ballStartYPos = Math.random() * innerHeight;

    ballCoordinates.x = ballStartXPos;
    ballCoordinates.y = ballStartYPos;
}



function gameInit() {
    
    
}

function onDeviceOrientationChange(ev) {
    console.log(ev.alpha, ev.beta, ev.gamma);
}
