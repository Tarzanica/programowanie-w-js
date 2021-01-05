// próba z canvas

const canvas = document.querySelector('.canvas');
const hole = canvas.getContext('2d');
let scoreCount = 0;
let holes = [];

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

	makeHoles();
	onDeviceOrientationChange(event);
	checkForCollision();
}

function onDeviceOrientationChange(event) {
	let ball = document.querySelector('.ball');
	speedX = event.alpha/60; //alpha nie 
	speedY = event.beta/60;

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

function makeHoles() {
	for (let i = 1; i < canvas.width/100; i++) {
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

		holes.push(hole);
	}
}
function checkForCollision() {  
	for (let i = 0; i < holes.length; i++) {
		let currentHole = holes[i];         
		let ball = document.querySelector('.ball');
        
		currentHole = {radius: radius, x: hx, y: hy};
		ball = {radius: 15, x: x, y: y };

		var dx = currentHole.x - ball.x;
		var dy = currentHole.y - ball.y;
		var distance = Math.sqrt(dx * dx + dy * dy);

		if (distance < currentHole.radius + ball.radius) {
			scoreCount++;
		}
	}
}
