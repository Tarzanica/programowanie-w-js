const lsNotesKey = 'notes';
document.querySelector('#newNoteBtn').addEventListener('click', onNewNote);
const notes = [];
let convertedNotes;
const notesContainer = document.querySelector('main');
if (notes.length == 0) {    
	document.body.style.backgroundImage = 'url(\'images/no-notes.png\')';
}
const pinnedContainer = document.querySelector('.pinned-notes');

function removeNote(e) {
	let noteToRemove = e.target.parentNode;
	noteToRemove.parentNode.removeChild(noteToRemove);
	notes.splice(noteToRemove, 1);
	createlocalStorage();
	createNote();
}

function onNewNote() {
	document.body.style.backgroundImage = 'initial';
	const title = document.querySelector('#noteTitle').value;
	const content = document.querySelector('#noteContent').value;
	const color = document.querySelector('#selected').value;
	let pinned = false;
	if((document.querySelector('.pinnedBtn').checked == true)) pinned = true;
	const note = {
		title: title,
		content: content,
		colour: color,
		pinned: pinned,
		createDate: new Date(),
	};
		
	notes.push(note);
	notesContainer.innerHTML = '';
	createlocalStorage();
	createNote();
}
function createlocalStorage(){
	localStorage.setItem(lsNotesKey, JSON.stringify(notes));
	const notesFromLocalStorage = JSON.parse(localStorage.getItem(lsNotesKey));
	
	convertedNotes = notesFromLocalStorage.map( note => {
		note.createDate = new Date(note.createDate);
		return note;
	});
}
	
function createNote(){
	let notes = document.querySelectorAll('.note');
    
	for(let i = 0; i < notes.length; i++){
		notes[i].parentNode.removeChild(notes[i]);
	}
	
	for (const note of convertedNotes) {
        
		const htmlNote = document.createElement('section');
		const htmlTitle = document.createElement('h3');
		const htmlContent = document.createElement('p');
		const htmlTime = document.createElement('time');
		const htmlButton = document.createElement('button');
		const htmlPinnedBtn = document.createElement ('input');
		const htmlLabel = document.createElement('label');

		htmlNote.classList.add('note');
		htmlTitle.innerHTML = note.title;
		htmlContent.innerHTML = note.content;
		htmlTime.innerHTML = note.createDate.toLocaleString();
		htmlButton.innerHTML = 'Remove';
		htmlButton.classList.add('removeBtn');
		htmlPinnedBtn.type = 'checkbox';
		htmlPinnedBtn.id = 'check';
		htmlLabel.htmlFor = 'check';

		htmlNote.style.borderBottomColor = note.colour;
		htmlPinnedBtn.addEventListener('click', function() {
			if (htmlNote.parentNode == pinnedContainer) {
				notesContainer.appendChild(htmlNote);
			}else if(htmlNote.parentNode == notesContainer){
				pinnedContainer.appendChild(htmlNote);
			}			
		});
		htmlButton.addEventListener('click', removeNote);
		htmlNote.appendChild(htmlTitle);
		htmlNote.appendChild(htmlContent);
		htmlNote.appendChild(htmlTime);
		htmlNote.appendChild(htmlButton);
		htmlNote.appendChild(htmlPinnedBtn);
		htmlNote.appendChild(htmlLabel);

		if(note.pinned == false){
			notesContainer.appendChild(htmlNote);
			htmlPinnedBtn.checked = false;
		}
		else{
			pinnedContainer.appendChild(htmlNote);
			htmlPinnedBtn.checked = true;
		}
	}

	document.querySelector('#noteTitle').value = '';
	document.querySelector('#noteContent').value = '';
	
}

	