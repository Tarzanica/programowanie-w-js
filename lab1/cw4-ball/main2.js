// próba z canvas
let canvas = document.querySelector('.canvas');
let hole = canvas.getContext('2d');
const info = document.querySelector('.info');
let cw = canvas.width = window.innerWidth;
let ch = canvas.height = window.innerHeight;
let scoreCount = 0;
let minute = 0;
let second = 0;

let ball;
let holes = [];
let hx, hy;
let ballR = 15;
let radius = 25;
let speedX = 0;
let speedY = 0;
let x = 200;
let y = 200;

window.addEventListener('deviceorientation', onDeviceOrientationChange);

const restart = document.querySelector('.restart');
restart.addEventListener('click', resetGame());
document.querySelector('.start').addEventListener('click', onStartClick);

function onStartClick() {
	timeCounter();

	play();
	makeHoles();

	const btn = document.querySelector('.start');
	btn.classList.add('remove');
	restart.classList.remove('remove');

	const score = document.createElement('span');
	score.classList.add('score');
	score.innerHTML = 'SCORE: ' + scoreCount;
	info.appendChild(score);

	const timer = document.createElement('span');
	timer.classList.add('timer');
	timer.innerHTML = '00:00';
	info.appendChild(timer);
}
function play(){
	requestAnimationFrame(play);

	createBall();
	moveBall();
	checkForCollision();
}

function onDeviceOrientationChange(e) {
	speedX = e.gamma/35; //alpha nie 
	speedY = e.beta/35;
}

function timeCounter(){
	setInterval(addTime,1000);
}

function addTime(){
	second++;
	if(second > 60){
		second = 0;
		minute++;
	}
	document.querySelector('.timer').innerHTML = (minute ? (minute > 9 ? minute : '0' + minute) : '00') + ':' +
	(second ? (second > 9 ? second : '0' + second) : '00');
}
function resetGame() {
	scoreCount = 0;
	holes = [];
	minute = 0;
	second = 0;	
}

function createBall(){
	ball = hole;
	ball.beginPath();
	ball.fillStyle=' rgb(206, 36, 6)';
	ball.arc(
		x,
		y, 
		ballR, 
		0, 
		2 * Math.PI
	);
	ball.stroke();
	ball.fill();
}

function moveBall(){
	if(x + speedX < cw - 30 && x + speedX > 20){ 
		x += speedX;      
	}
	if(y + speedY < ch - 30 && y + speedY > 20){
		y += speedY;       
	}
}

function makeHoles() {
	for (let i = 1; i < canvas.width/80; i++) {	
		hx =  Math.floor(Math.random() * (canvas.width - radius * 2 + 1)) ;
		hy =  Math.floor(Math.random() * (canvas.height - radius * 2 +1));
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

function checkForCollision() {  

	let dist = Math.sqrt(Math.pow((x - hx),2) + Math.pow((y - hy),2));
	let rad = ballR + radius;

	if (dist <= rad) {
		scoreCount++;
		console.log(scoreCount);
		
	}

	// if (ball.x == window.screenTop || ball.y == window.screeY){
	// 	window.alert('O nie!');
	// }
}


