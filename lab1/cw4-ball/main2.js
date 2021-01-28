// próba z canvas
let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext('2d');
const info = document.querySelector('.info');
let cw = canvas.width = window.innerWidth;
let ch = canvas.height = window.innerHeight;
let scoreCount = 0;
let minute = 0;
let second = 0;
let gameIsOn = false;
let myreq;
//const coords = [ 128, 268, 282, 798, 1264, 1265, 162, 368, 510, 1008, 1348, 154, 615, 730, 1230, 1334];
let ball;
let holes = [];
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
	initHoles();
	timeCounter();
	play();

	const message = document.createElement('span');
	message.classList.add('message');
	message.classList.add('remove');
	info.appendChild(message);
	const bg = document.querySelector('.backGroundGame');
	bg.classList.add('remove');

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
	myreq = requestAnimationFrame(play);
	// hole.beginPath();
	// hole.clearRect(x - ballR - 10, y - ballR - 10, ballR * 2 + 20 , ballR * 2 + 20);
	// hole.closePath();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawHoles();
	createBall();
	moveBall();
	checkForCollisions();
}
myreq = requestAnimationFrame(play);
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
	ball = ctx;
	ball.beginPath();
	ball.fillStyle=' rgb(206, 36, 6)';
	ball.arc(
		x,
		y, 
		ballR, 
		0, 
		2 * Math.PI
	);
	ball.closePath();
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

function initHoles(){
	for (let i = 0; i < 15; i++) {
		let hole ={};
		hole.hx =  Math.floor(Math.random() * (canvas.width - radius * 2 + 1));
		hole.hy = Math.floor(Math.random() * (canvas.height - radius * 2 +1));
		holes.push(hole);		
	}
}

function drawHoles() {
	for (let i = 0; i < holes.length; i++) {				
		drawHole(holes[i]);		
	}	
}

function drawHole(hole){
	ctx.beginPath();
	ctx.arc(
		hole.hx,
		hole.hy,
		radius,
		0,
		2 * Math.PI,
		false
	);
	ctx.fillStyle = 'rgb(84, 93, 139)';
	ctx.fill();
	ctx.stroke();
	ctx.closePath();

}
function checkForCollisions() {
	for (let i = 0; i < holes.length; i++) {
		checkForCollision(holes[i]);
	}
}	

function checkForCollision(hole) {  

	let dist = Math.sqrt(Math.pow((x - hole.hx), 2) + Math.pow((y - hole.hy), 2));
	let rad = ballR + radius;

	if (dist <= rad) {
		gameIsOn = false;
		document.querySelector('.timer').innerHTML = '00:00';
		window.cancelAnimationFrame(myreq);
		document.querySelector('.backGroundGame').classList.remove('remove');
		document.querySelector('.start').classList.remove('remove');

		document.querySelector('.message').classList.remove('remove');
		document.querySelector('.message').innerHTML = 'You lost! You touched the ball!';
		document.querySelector('.start').addEventListener('click', function(){
			location.reload();
			return false;
		});
		
		//alert('You touched the ball! You lost! :(');
		// scoreCount++;
		// console.log(scoreCount);
		// document.querySelector('.score').innerHTML = 'SCORE: ' + scoreCount;	
	}

	// if (scoreCount == 16){
	// 	alert('you won!');
	// }

	// if (ball.x == window.screenTop || ball.y == window.screeY){
	// 	window.alert('O nie!');
	// }
}


