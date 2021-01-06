let canvas = document.querySelector('#snowField');
let ctx = canvas.getContext('2d');
let mousePosition = window.screen.width/2;
let numberOfFlakes = 400;
let flakes = [];
let w = window.innerWidth;
let h = window.innerHeight;
canvas.width = w;
canvas.height = h;
window.addEventListener('mousemove',updatePosition);


function random(min, max) {
	return min = Math.random() * (max - min);
}

function createSnowflakes() {    
	for (let i = 0; i < numberOfFlakes; i++) {
		flakes.push({
			x: Math.random() * w ,
			y: Math.random() * h,
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
		flakes[i].speedX += calculateXDir(flakes[i]);
		// flakes[i].speedY += calculateYDir[flakes[i]];
		flakes[i].x += flakes[i].speedX;
		flakes[i].y += flakes[i].speedY;  
        
		if (flakes[i].y > h || flakes[i].x > w || flakes[i].x < 0) {
			flakes[i].y = 0;
			flakes[i].x = Math.random() * w ;        
		}
		

	}  
}

function animateSnowflakes() {  
	drawSnowflakes();
	moveSnowflakes();
	requestAnimationFrame(animateSnowflakes);
}
createSnowflakes();
animateSnowflakes();


function updatePosition(evt) {
	mousePosition = evt.clientX;
}

function calculateXDir(flake) { 
	let dirX = mousePosition - flake.x;
	if (dirX > 0){
		return 0.2;
	}
	else if(dirX < 0){
		return -0.2;
	}
	else{
		return random(-0.2,0.2);
	}
}

// function calculateYDir(flake){
// 	let dirY = mousePosition - flake.y;
// 	if (dirY > 0){
		
// 	}else if (dirY < 0)
		
// 	else	
// 		return random(0, 0.2);
// }




