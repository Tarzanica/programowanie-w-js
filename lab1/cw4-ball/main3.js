// próba z canvas

const canvas = document.querySelector('.canvas');
let hole = canvas.getContext('2d');
let scoreCount = 0;

var hx =  Math.random() * canvas.width ;
var hy =  Math.random() * canvas.height ;
var radius = 25;
var sAngle = 0;
var eAngle = 2 * Math.PI;

let speedX = 0;
let speedY = 0;
let x = 200;
let y = 200;

window.addEventListener('deviceorientation', onDeviceOrientationChange);

const restart = document.querySelector('.restart');

document.querySelector('.start').addEventListener('click', onStartClick);
// document.querySelectorAll('.restart').addEventListener('click', onRestart);

function onStartClick() {
	const btn = document.querySelector('.start');
	btn.classList.add('remove');
	restart.classList.remove('remove');

	const score = document.createElement('span');
	score.classList.add('score');
	score.innerHTML = 'SCORE: ' + scoreCount;
	document.body.appendChild(score);

	let ball = document.createElement('div');
	ball.classList.add('ball');
	document.body.appendChild(ball);

    for (let i = 1; i < canvas.width/100; i++){
        hole.beginPath();
	hole.beginPath();
	hole.arc(
		hx,
		hy,
		radius,
		sAngle,
		eAngle,
	);
	hole.fillStyle = 'rgb(84, 93, 139)';
	hole.fill();
	hole.stroke();
	hole.closePath();
    }
	
    
	onDeviceOrientationChange();
	checkForCollision();
}

function onDeviceOrientationChange(e) {
	let ball = document.querySelector('.ball');
	speedX = e.alpha/60; //alpha nie 
	speedY = e.beta/60;

	if ((innerWidth > speedX  + x > 0 )) {
		x += speedX;
		ball.style.left = x + 'px';        
	}
        
	if  (window.innerHeight > speedY + y > 0) {
		y += speedY;
		ball.style.top = y + 'px';       
	}
}

// function onRestart() {
//     window.onStartClick()
// }

function checkForCollision() {
        
	let ball = document.querySelector('.ball');
        
	hole = {radius: radius, x: hx, y: hy};
	ball = {radius: 15, x: x, y: y };

	var dx = hole.x - ball.x;
	var dy = hole.y - ball.y;
	var distance = Math.sqrt(dx * dx + dy * dy);

	if (distance < hole.radius + ball.radius) {
		scoreCount++;
	}
}
