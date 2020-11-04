const lsNotesKey = 'notes';
document.querySelector('#newNoteBtn').addEventListener('click', onNewNote);
// 1. how to store & save notes in local storage
const notes = [];

function removeNote() {

}
// 4. get value from html forms
document.querySelector('#newNoteBtn').addEventListener('click', onNewNote);

function onNewNote() {

    const title = document.querySelector('#noteTitle').value;
    const content = document.querySelector('#noteContent').value;
    const note = {
        title: title,
        content: content,
        colour: '#ff1455',
        pinned: false,
        createDate: new Date()
    }

    notes.push(note);
    console.log(note);
    // json 

    localStorage.setItem(lsNotesKey, JSON.stringify(notes));

    // 2. read the notes from local storage 
    const notesFromLocalStorage = JSON.parse(localStorage.getItem(lsNotesKey));

    const convertedNotes = notesFromLocalStorage.map( note => {
        note.createDate = new Date(note.createDate);
        return note;
    });
    // 3. html structure modify

    const notesContainer = document.querySelector('main');
    notesContainer.innerHTML = '';

    for (const note of convertedNotes) {
        
        const htmlNote = document.createElement('section');
        const htmlTitle = document.createElement('h1');
        const htmlContent = document.createElement('p');
        const htmlTime = document.createElement('time');
        const htmlButton = document.createElement('button');

        htmlNote.classList.add('note');
        htmlTitle.innerHTML = note.title;
        htmlContent.innerHTML = note.content;
        htmlTime.innerHTML = note.createDate.toLocaleString();
        htmlButton.innerHTML = 'remove';

        htmlButton.addEventListener('click', removeNote);
        htmlNote.appendChild(htmlTitle);
        htmlNote.appendChild(htmlContent);
        htmlNote.appendChild(htmlTime);
        htmlNote.appendChild(htmlButton);
        notesContainer.appendChild(htmlNote);
    }


}

