/* eslint-disable indent */

document.body.addEventListener('keypress', onKeyPress);
const recordBtn = document.querySelector('#recordBtn').addEventListener('click', onRecordBtn);
const playBtn = document.querySelector('#playBtn').addEventListener('click', onPlayBtn);

let recordedSound = [];
let recordStartTime;
function onKeyPress(ev){
	console.log(ev);
	let soundId;
	switch(ev.code){
	case 'KeyA':
		soundId = 'boom';
		break;
	case 'KeyS':
		soundId = 'clap';
		break;
	case 'KeyD':
		soundId = 'kick';
		break;
	case 'KeyF':
		soundId = 'openhat';
		break;     
	case 'KeyG':
		soundId = 'ride';
		break; 
	case 'KeyH':
		soundId = 'snare';
		break;   
	case 'KeyJ':
		soundId = 'tink';
		break;    
	case 'KeyK':
		soundId = 'tom';
		break;
	case 'KeyL':
		soundId = 'boom';
		break;       
	}
	if (soundId) {
		const soundTime = Date.now() - recordStartTime;        
		const soundObj = {
			soundId: soundId,
			time: soundTime
		};
		playSound(soundId);
		recordedSound.push(soundObj);        
	}
}

function disableAndEnableRecordBtn(){
    recordBtn.className = 'disabled';
	setTimeout(() => {
		recordBtn.remove= 'disabled';
	},2000);
}

function onRecordBtn(){   
	recordStartTime = Date.now();
	disableAndEnableRecordBtn();
}

function onPlayBtn(){
	for (let index = 0; index < recordedSound.length; index++) {
		const soundObj = recordedSound[index];
		setTimeout(() =>{
			playSound(soundObj.soundId);  
		},
		soundObj.time
		);  
	}
	playBtn.className = 'disabled';
	disableAndEnableRecordBtn();
}

function playSound(soundId){
	let sound = document.querySelector('#' + soundId);
	sound.play();  
}

function prevMultipleClicking(){
	setTimeout(() =>{
		if (playBtn) {
			playBtn.className = 'disabled';
		}
	},soundObj.time);
	playBtn.remove = 'disabled';
}

prevMultipleClicking();
