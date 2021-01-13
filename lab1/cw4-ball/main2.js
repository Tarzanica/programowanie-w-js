// próba z canvas
let canvas = document.querySelector('.canvas');
let hole = canvas.getContext('2d');
const info = document.querySelector('.info');
const body = document.body;
let cw = canvas.width = window.innerWidth;
let ch = canvas.height = window.innerHeight;
let gameIsOn = false;
let scoreCount = 0;
let minute = 0;
let second = 0;

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
	gameIsOn = true;
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
	hole.clearRect(0, 0, window.innerWidth, innerHeight);
	createBall();
	moveBall();
	checkForCollision();
}

function onDeviceOrientationChange(e) {
	speedX = e.gamma/45; //alpha nie 
	speedY = e.beta/45;
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
	gameIsOn = false;
	scoreCount = 0;
	holes = [];
	minute = 0;
	second = 0;	
}

function createBall(){
	hole.beginPath();
	hole.fillStyle=' rgb(206, 36, 6)';
	hole.arc(
		x,
		y, 
		ballR, 
		0, 
		2 * Math.PI
	);
	hole.stroke();
	hole.fill();
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
	let rad = (ballR + radius) * (ballR + radius);

	if (dist <= rad) {
		scoreCount++;

		console.log('super!', );
	}

	
	// for (let i = 0; i < holes.length; i++) {
	// 	let currentHole = holes[i];         
	// 	let ball = document.querySelector('.ball');
        
	// 	currentHole = {radius: radius, x: Math.random() * canvas.width, y: Math.random() * canvas.height};
	// 	ball = {radius: 15, x: x, y: y };

	// 	var dx = currentHole.x - ball.x;
	// 	var dy = currentHole.y - ball.y;
	// 	var distance = Math.sqrt(dx * dx + dy * dy);

	// 	if (distance < currentHole.radius + ball.radius) {
	// 		scoreCount++;
	// 	}
	// }
}


