import * as notesJS from './notes';
notesJS.getNote(id);
notesJS.getNotes();

const newNotes = new Notes();

document.querySelector('#newNoteBtn').addEventListener('click', notesJS.addNote);
document.querySelector('.removeBtn').addEventListener('click', notesJS.removeNote)
if (notes.length == 0) {    
    document.body.style.backgroundImage = "url('images/no-notes.png')";
}

    

