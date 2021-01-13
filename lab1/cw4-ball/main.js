/* eslint-disable no-mixed-spaces-and-tabs */
let holes = [];
const main = document.querySelector('main');
const restart = document.querySelector('restart');
//const hole = document.querySelectorAll('.hole');
const body = document.body;
let gameIsOn = false;
//let dist;
let speedX = 0;
let speedY = 0;
let x = 100;
let y = 100;
let minute = 0;
let second = 0;

window.addEventListener('deviceorientation', onDeviceOrientationChange);
document.querySelector('.start').addEventListener('click', onStartClick);
document.querySelector('.restart').addEventListener('click', restartGame);

function onStartClick() {
	gameIsOn = true;
	let scoreCount = 0;
	timeCounter();

	const btn = document.querySelector('.start');
	btn.classList.add('remove');
	//restart.remove = 'remove'

	const score = document.createElement('span');
	score.classList.add('score');
	score.innerHTML = 'SCORE: ' + scoreCount;
	body.appendChild(score);

	let ball = document.createElement('div');
	ball.classList.add('ball');
	main.appendChild(ball);

	const timer = document.createElement('span');
	timer.classList.add('timer');
	timer.innerHTML = '00:00';
	body.appendChild(timer);

	makeHoles();
	onDeviceOrientationChange();
	//checkCollision();
}

function onDeviceOrientationChange(event) {
	speedX = event.alpha; //alpha nie 
	speedY = event.beta;

	if ((innerWidth > speedX  + x + 100> 0 )) {
		x += speedX;   
		document.querySelector('.ball').style.left = x + 'px';  
	}
        
	if  (window.innerHeight > speedY + y + 100> 0) {
		y += speedY;  
		document.querySelector('.ball').style.top = y + 'px';    
	}
}

function makeHoles() {
	for (let i = 1; i < window.innerWidth/120; i++) {
		let hole = document.createElement('div');

		hole.classList.add('hole');
		let holeNumber = document.createElement('span');
		holeNumber.innerHTML = i - 1;
		holeNumber.id = holeNumber.innerHTML;
		hole.appendChild(holeNumber);

		hole.style.left =  Math.floor(Math.random() * main.offsetWidth + 70) + 'px';
		hole.style.top = Math.floor(Math.random() * (main.offsetHeight) +50) + 'px';

		if(hole.style.left >= main.offsetWidth)
			hole.style.transform = 'translateX(-100px)';
		if(hole.style.top >= main.offsetHeight)
			hole.style.top = 'translateY(-50px)';
		holes.push(hole);
		main.appendChild(hole);
	}

}

function restartGame(){
	gameIsOn = false;

}

// function checkCollision(){

// 	if (calculateDistance().dist >= 40)
// 		return;
// 	else{
// 		scoreCount++;
// 	}
// }

// function getCoords(el){
// 	const rect = el.getBoundingClientRect();
// 	let y =  rect.left + window.scrollX;
// 	let x =	 rect.top + window.scrollY;
// }

// function calculateDistance(){
// 	getCoords(ball);
// 	getCoords(hole);
// 	dist = Math.sqrt(Math.Pow((ball.x - hole.x),2) + Math.pow((ball.y - hole.y)));
// }

