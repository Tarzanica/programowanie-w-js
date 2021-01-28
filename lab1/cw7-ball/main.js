// event listeners
document.querySelector('.start').addEventListener('click', startGame);
document.querySelector('.restart').addEventListener('click', restartGame);
window.addEventListener('deviceorientation', onDeviceOrientationChange, true);

// properties and objects

let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext('2d');
let speedX = 0;
let speedY = 0;
let minute = 0;
let second = 0;
const holes = [];
let gameIsOn = false;
let cw = canvas.width;
let ch = canvas.height;
const score = document.querySelectorAll('.score');
let color;
const ball = {
	x: 20,
	y: 20,
	r: 10,
	speedX: 0,
	speedY: 0
};

const hole = {
	x: 0,
	y: 0,
	r: 25
};
const winingHoleX = Math.floor(Math.random() * (canvas.width - hole.r * 2 + 1));
const winingHoleY = Math.floor(Math.random() * (canvas.height - hole.r * 2 +1));

// functions

function startGame(){
	timeCounter();
	gameIsOn = true;
	function play(){
		ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
		// drawHoles();
		drawWinningHole(); // redraw holes
		drawBall(); // draw ball with new position
		checkForWinnningHole();
		checkForLosingHole();
	}           
	setInterval(play, 16);
        
}


function restartGame(){
	document.querySelector('.timer').innerHTML = '00:00';
}

function drawBall(){
	ctx.beginPath();
	ctx.fillStyle = ' rgb(206, 36, 6)';
	ctx.arc(
		ball.x,
		ball.y, 
		ball.r, 
		0, 
		2 * Math.PI,
		false
	);
	ctx.fill();
	ctx.closePath();
    
	moveBall();
}



// function drawHoles(){
// 	color = 'rgb(84, 93, 139)';
// 	for (let i = 1; i < canvas.width/80; i++) {	
// 		let hx =  Math.floor(Math.random() * (canvas.width - hole.r * 2 + 1)) ;
// 		let hy =  Math.floor(Math.random() * (canvas.height - hole.r * 2 +1));
// 		ctx.beginPath();
// 		ctx.arc(
// 			hx,
// 			hy,
// 			hole.r,
// 			0,
// 			2 * Math.PI,
// 			false
// 		);
// 		ctx.fillStyle = color;
// 		ctx.fill();
// 		ctx.closePath();
// 		holes.push({
// 			h: ctx,
// 			c: color
// 		});
// 	}   

// }

function drawWinningHole(){
	color = 'rgb(255, 255, 0)';
	ctx.beginPath();
	ctx.arc(
		winingHoleX,
		winingHoleY,
		hole.r,
		0,
		2 * Math.PI,
		false
	);
	ctx.fillStyle = 'rgb(255, 255, 0)';
	ctx.fill();
	ctx.closePath();
	holes.push({
		h: ctx,
		c: color
	});
	//console.log(holes);
}

function moveBall(){
	if(ball.x + speedX < cw - 30 && ball.x + speedX > 20){ 
		ball.x += speedX;      
	}
	if(ball.y + speedY < ch - 30 && ball.y + speedY > 20){
		ball.y += speedY;       
	}
}

function onDeviceOrientationChange(ev){
	speedX = ev.gamma/35; 
	speedY = ev.beta/35;
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

function checkForWinnningHole(){

	if(ctx.isPointInPath(ball, ctx.x, ctx.y))
	{
		alert('you won!');
	}
	// holes.forEach(({
	// 	ctx, 
	// 	color
	// }) => {
	// 	if (color === 'rgb(255, 255, 0)' && ball.x >= ctx.x && ball.y >= ctx.y
    //                 && ball.y <= ctx.y + hole.r * 2 && ball.x <= ctx.x + hole.r * 2)  
	// 	{
	// 		alert('you won!');
	// 		gameIsOn = false;
	// 		ball.speedX = 0;
	// 		ball.speedY = 0;
	// 		ball.x = 0;
	// 		score.innerHTML = '1';
	// 	}		
	// });
}

// function checkForLosingHole(){
// 	holes.forEach(({
// 		ctx, 
// 		color
// 	}) => {
// 		if (color === 'rgb(84, 93, 139)' && ball.x >= ctx.x && ball.y >= ctx.y && ball.y <= ctx.y + hole.r * 2 && ball.x <= ctx.x + hole.r * 2) 
// 		{
// 			alert('you lost!');
// 			gameIsOn = false;
// 			ball.speedX = 0;
// 			ball.speedY = 0;
// 			ball.x = 0;
// 			ball.y = 0;
// 		}
// 	});
// }
