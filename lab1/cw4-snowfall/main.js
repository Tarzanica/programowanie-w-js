let canvas = document.querySelector('#snowField');
let ctx = canvas.getContext('2d');
let mouseXPosition = window.screen.width/2;
let mouseYPosition = window.screen.height/2;
let numberOfFlakes = 600;
let flakes = [];
let w = window.innerWidth;
let h = window.innerHeight;
canvas.width = w;
canvas.height = h;
let gravityRadius = 100;
let img = document.querySelector('img');

window.addEventListener('mousemove', updatePosition);

window.addEventListener('mousemove', function (e) {
	img.style.top = (e.pageY || e.clientY) - 50 + 'px';
	img.style.left = (e.pageX || e.clientX ) - 50 + 'px';
}, false);

function random(min, max) {
	return min = Math.random() * (max - min);
}

function createSnowflakes() {    
	for (let i = 0; i < numberOfFlakes; i++) {
		flakes.push({
			x: Math.random() * w ,
			y: 0,
			speedX: random(-5, 5),
			speedY: random(1, 10),
			radius: random(0.5, 7),
		});        
	}
}

function drawSnowflakes() {
	ctx.clearRect(0, 0, w, h);

	for (let i = 0; i < flakes.length; i++) {    
		ctx.beginPath();
		ctx.arc(
			flakes[i].x,
			flakes[i].y,
			flakes[i].radius,
			0,
			Math.PI * 2,
		);
		ctx.fillStyle = 'white';
		ctx.fill();
	}
}

function moveSnowflakes() {
	for (let i = 0; i < flakes.length; i++) {
		let distance = calculateDistanceToMouse(flakes[i]);
		if(distance <= gravityRadius){
			updateSpeed(flakes[i]);
		} 
		else{
			flakes[i].speedX += calculateXDis(flakes[i]);
		}
		flakes[i].x += flakes[i].speedX;
		flakes[i].y += flakes[i].speedY;  
        
		if (flakes[i].y > h || flakes[i].x > w || flakes[i].x < 0) {
			flakes[i].y = 0;
			flakes[i].x = Math.random() * w ;
			flakes[i].speedX = random(-5, 5);
			flakes[i].speedY = random(1, 10);
		}
	}  
}


function updatePosition(evt) {
	mouseXPosition = evt.clientX;
	mouseYPosition = evt.clientY;
}

function updateSpeed(flakes){
	flakes.speedX += calculateXDir(flakes);
	flakes.speedY += calculateYDir(flakes);
}

function calculateXDir(flake) { 
	let dir = mouseXPosition - flake.x;
	if (dir > 0){
		return 1;
	}
	else if(dir < 0){
		return -1;
	}
	else{
		return 0;
	}
}

function calculateYDir(flake) { 
	let dir = mouseYPosition - flake.y;
	if (dir > 0){
		return 1;
	}
	else if(dir < 0){
		return -1;
	}
	else{
		return 0;
	}
}

function calculateXDis(flakes){
	let disX = mouseXPosition - flakes.x;
	if (disX > 0){
		return 0.2;
	}
	else if(disX < 0){
		return -0.2;
	}
	else{
		return random(-0.2,0.2);
	}
}

function calculateDistanceToMouse(flake){
	let dirX = Math.abs(mouseXPosition - flake.x);
	let dirY = Math.abs(mouseYPosition - flake.y);
	return Math.sqrt(dirX*dirX+dirY*dirY);
}


function animateSnowflakes() {  
	drawSnowflakes();
	moveSnowflakes();
	requestAnimationFrame(animateSnowflakes);
}
createSnowflakes();
animateSnowflakes();


// function calculateYDir(flake) { 
// 	let dir = flake.y - mouseYPosition;
// 	if (dir > 0){
// 		return 0.2;
// 	}
// 	else if(dir < 0){
// 		return -0.2;
// 	}
// 	else{
// 		return random(-0.2,0.2);
// 	}
// }




