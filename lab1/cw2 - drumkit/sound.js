class Sound {
    constructor (){       
        this.db = new Db();
        this.soundUI = new this.soundUI();
        this.recordStartTime = Date.now();
    }

    onKeyPress(ev){
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

    onRecordBtn(){   
        this.recordStartTime;
        document.querySelector('#recordBtn').className = "disabled";
    }
    
    onPlayBtn(){
        this.soundUI.
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
    
    playSound(soundId){
        sound = document.querySelector('#' + soundId);
        sound.play();  
    }
    
    prevMultipleClicking(evt){
        if (record || play) {
            evt.preventDefault();
        }
    }
}