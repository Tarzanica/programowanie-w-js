window.addEventListener('deviceorientation', onDeviceMove);

const ball =  {
    x: 0,
    y: 0
}

function gameInit() {
    const 
    ballStartPos = Math.random() * innerHeight;
    ballEndPos = Math.random() * innerWidth;
    ball.x = ballStartPos;
    ball.y = ballEndPos;
}

function onDeviceMove(ev) {
    console.log(ev.alpha, ev.beta, ev.gamma);
}
