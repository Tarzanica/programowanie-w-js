class NotesUI {
    constructor(containerSelector = 'main') {
        this.notesContainer = document.querySelector(containerSelector);
    }

    addNote(note) {
        const htmlNote = this.createNote(note);
        const container = this.getNotesContainer();
        container.appendChild(htmlNote);
    }
    createNote(note) {
        const htmlNote = document.createElement('section');
        const htmlTitle = document.createElement('h3');
        const htmlContent = document.createElement('p');
        const htmlTime = document.createElement('time');
        const htmlButton = document.createElement('button');

        htmlNote.classList.add('note');
        htmlTitle.innerHTML = note.title;
        htmlContent.innerHTML = note.content;
        htmlTime.innerHTML = note.createDate.toLocaleString();
        htmlButton.innerHTML = 'Remove';
        htmlButton.classList.add('removeBtn');

        htmlButton.addEventListener('click', removeNote);
        htmlNote.appendChild(htmlTitle);
        htmlNote.appendChild(htmlContent);
        htmlNote.appendChild(htmlTime);
        htmlNote.appendChild(htmlButton);
    }
    removeNote(id) {
        const note = this.getNote(id);
        const container = this.getNotesContainer();
        container.removeChild(note);
    }
    getNote(id) {
        return document.querySelector('#' + id);
    }
    getNotesContainer() {
        return this.notesContainer;
    }
    clearNoteTitleAndContent(){
        document.querySelector('#noteTitle').value = "";
        document.querySelector('#noteContent').value = "";
    }
}

export {addNote, createNote, removeNote, getNote, getNotesContainer};