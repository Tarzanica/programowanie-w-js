const lsNotesKey = 'notes';
document.querySelector('#newNoteBtn').addEventListener('click', createNote);
const notesContainer = document.querySelector('main');
const pinnedContainer = document.querySelector('.pinned-notes');

let notes = [];

getDataFromLocalStorage();
displayNotes();

function removeNote(e) {
	let noteToRemove = e.target.parentNode.parentNode;
	noteToRemove.parentNode.removeChild(noteToRemove);
	notes.splice(noteToRemove, 1);
	localStorage.setItem(lsNotesKey, JSON.stringify(notes));
}

function getNoteData() {
	document.body.style.backgroundImage = 'initial';
	const title = document.querySelector('#noteTitle').value;
	const content = document.querySelector('#noteContent').value;
	const color = document.querySelector('#selected').value;
	let pinned = false;
	if((document.querySelector('.pinnedBtn').checked == true)) pinned = true;
	let note = {
		title: title,
		content: content,
		colour: color,
		pinned: pinned,
		createDate: new Date(),
	};
		
	notes.push(note);
	localStorage.setItem(lsNotesKey, JSON.stringify(notes));
	displayNote(note);
}

function getDataFromLocalStorage(){
	notes = [];
	if(localStorage.getItem(lsNotesKey)==null || localStorage.getItem(lsNotesKey)=='null') return;
	const notesFromLocalStorage = JSON.parse(localStorage.getItem(lsNotesKey));
	if (notesFromLocalStorage.length == 0) return;
	for (let i = 0; i < notesFromLocalStorage.length; i++) {
		notes.push(notesFromLocalStorage[i]);		
	}
	notesFromLocalStorage.map( note => {
		note.createDate = new Date(note.createDate);
		return note;
	});

}

function displayNotes(){
	for (let i = 0; i < notes.length; i++) {
		displayNote(notes[i]);		
	}
}
	
function displayNote(note){        
	const htmlNote = document.createElement('section');
	const htmlTitle = document.createElement('h3');
	const htmlContent = document.createElement('p');
	const htmlBottomDiv = document.createElement('div');
	const htmlTime = document.createElement('time');
	const htmlButton = document.createElement('button');
	const htmlPinnedBtn = document.createElement ('input');
	const htmlLabel = document.createElement('label');

	htmlNote.classList.add('note');
	htmlTitle.innerHTML = note.title;
	htmlContent.innerHTML = note.content;
	htmlBottomDiv.classList.add('bottom-20');
	htmlTime.innerHTML = note.createDate.toLocaleString();
	htmlButton.innerHTML = 'Remove';
	htmlButton.classList.add('removeBtn');
	htmlPinnedBtn.type = 'checkbox';
	htmlPinnedBtn.id = 'check';
	htmlPinnedBtn.className = 'inputBig';
	htmlLabel.htmlFor = 'check';
	htmlLabel.classList.add = 'label-pin';

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
	htmlNote.appendChild(htmlBottomDiv);
	htmlBottomDiv.appendChild(htmlTime);
	htmlBottomDiv.appendChild(htmlButton);
	htmlBottomDiv.appendChild(htmlPinnedBtn);
	htmlBottomDiv.appendChild(htmlLabel);

	if(note.pinned == false){
		notesContainer.appendChild(htmlNote);
		htmlPinnedBtn.checked = false;
	}
	else{
		pinnedContainer.appendChild(htmlNote);
		htmlPinnedBtn.checked = true;
	}

}

function createNote(){
	getNoteData();
	document.querySelector('#noteTitle').value = '';
	document.querySelector('#noteContent').value = '';	
}

	