
document.body.addEventListener('keypress', onKeyPress);
const record = document.querySelector('#recordBtn').addEventListener('click', onRecordBtn);
const play = document.querySelector('#playBtn').addEventListener('click', onPlayBtn);

let recordedSound = [];
let recordStartTime;
function onKeyPress(ev){
    console.log(ev);
    let sound;
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
            soundId = 'tom';a
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


function onRecordBtn(){   
    recordStartTime = Date.now();
    document.querySelector('#recordBtn').className = "disabled";
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
    document.querySelector('#playBtn').className = "disabled";
}

function playSound(soundId){
    sound = document.querySelector('#' + soundId);
    sound.play();  
}

function prevMultipleClicking(evt){
    if (record || play) {
        evt.preventDefault();
    }
}
