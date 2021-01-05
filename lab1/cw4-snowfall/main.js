let canvas = document.querySelector('#snowField');
let ctx = canvas.getContext('2d');
let numberOfFlakes = 400;
let flakes = [];
let w = window.innerWidth;
let h = window.innerHeight;
canvas.width = w;
canvas.height = h;


function random(min, max) {
	return min = Math.random() * (max - min);
}

function createSnowflakes() {    
	for (let i = 0; i < numberOfFlakes; i++) {
		flakes.push({
			x: Math.random() * w ,
			y: Math.random() * h,
			speedX: random(-5, 5),
			speedY: random(0, 10),
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
		flakes[i].x += flakes[i].speedX - 5;
		flakes[i].y += flakes[i].speedY ;  
        
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

//setInterval(updateSnowFall, 50); nie uzywa się do animacji (setTimeOut też)



