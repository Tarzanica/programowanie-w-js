// próba z canvas
let canvas = document.querySelector('.canvas');
let hole = canvas.getContext('2d');
let ball = document.querySelector('.ball');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let scoreCount = 0;
let holes = [];

var radius = 25;

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
	moveBall();
	checkForCollision();
}

function onDeviceOrientationChange(e) {
	speedX = e.gamma/45; //alpha nie 
	speedY = e.beta/45;
}


// function onRestart() {
//     window.onStartClick()
// }

function makeHoles() {
	for (let i = 1; i < canvas.width/80; i++) {	
		let hx =  Math.random() * canvas.width ;
		let hy =  Math.random() * canvas.height ;
		hole.beginPath();
		hole.arc(
			hx,
			hy,
			radius,
			0,
			2 * Math.PI,
			false
		);
		hole.fillStyle = 'rgb(84, 93, 139)';
		hole.fill();
		hole.stroke();
		hole.closePath();

		holes.push(hole);
	}
}

function moveBall(){
	if(x+speedX<window.innerWidth-50 && x+speedX>0){ 
		x+=speedX;
		ball.style.left=x+'px';        
	}
	if(y+speedY<window.innerHeight-50 && y+speedY>0){
		y+=speedY;
		ball.style.top=y+'px';        
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


