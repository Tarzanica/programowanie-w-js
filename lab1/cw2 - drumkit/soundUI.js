class soundUI {
    constructor(){
        this.recordedSound = [];
    }

    recordSound(){
        for (let index = 0; index < recordedSound.length; index++) {
            const soundObj = recordedSound[index];
            setTimeout(() =>{
                playSound(soundObj.soundId);  
            },
            soundObj.time
            );  
        }
    }

}