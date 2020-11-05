document.querySelector('#newNoteBtn').addEventListener('click', onNewNote);

if (notes.length == 0) {    
    document.body.style.backgroundImage = "url('images/no-notes.png')";
}

    document.querySelector('#noteTitle').value = "";
    document.querySelector('#noteContent').value = "";

    
import './notes-ui';
import './notes';
import './note';
import './db';
