const lsNotesKey = 'notes';
// 4. get value from html forms
document.querySelector('#newNoteBtn').addEventListener('click', onNewNote);
const notes = [];
const notesContainer = document.querySelector('main');
if (notes.length == 0) {    
    document.body.style.backgroundImage = 'url(\'images/no-notes.png\')';
}


function removeNote(e) {
    let noteToRemove = e.target.parentNode;
    noteToRemove.parentNode.removeChild(noteToRemove);
}

function onNewNote() {
    document.body.style.backgroundImage = 'initial';
    const title = document.querySelector('#noteTitle').value;
    const content = document.querySelector('#noteContent').value;
    const color = document.querySelector('#selected').value;
    
    const note = {
        title: title,
        content: content,
        colour: color,
        pinned: false,
        createDate: new Date(),
    };
    notes.push(note);

    notesContainer.innerHTML = '';

    localStorage.setItem(lsNotesKey, JSON.stringify(notes));

    // 2. read the notes from local storage 
    const notesFromLocalStorage = JSON.parse(localStorage.getItem(lsNotesKey));

    const convertedNotes = notesFromLocalStorage.map( note => {
        note.createDate = new Date(note.createDate);
        return note;
    });
   

    for (const note of convertedNotes) {
        
        const htmlNote = document.createElement('section');
        const htmlTitle = document.createElement('h3');
        const htmlContent = document.createElement('p');
        const htmlTime = document.createElement('time');
        const htmlButton = document.createElement('button');
        // const htmlPinnedBtn = document.createElement ('i');

        htmlNote.classList.add('note');
        htmlTitle.innerHTML = note.title;
        htmlContent.innerHTML = note.content;
        htmlTime.innerHTML = note.createDate.toLocaleString();
        htmlButton.innerHTML = 'Remove';
        htmlButton.classList.add('removeBtn');
        // htmlPinnedBtn.classList.add('fas fa-thumbtack');

        htmlNote.style.borderBottomColor = note.colour;
        // htmlPinnedBtn.addEventListener('click', pinNote);
        htmlButton.addEventListener('click', removeNote);
        htmlNote.appendChild(htmlTitle);
        htmlNote.appendChild(htmlContent);
        htmlNote.appendChild(htmlTime);
        htmlNote.appendChild(htmlButton);
        // htmlNote.appendChild(htmlPinnedBtn);
        notesContainer.appendChild(htmlNote);

    }

    document.querySelector('#noteTitle').value = '';
    document.querySelector('#noteContent').value = '';
}