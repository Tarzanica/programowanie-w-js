class Note {
	constructor (title, content, color, pinned = false) {
		this.title = title;
		this.content = content;
		this.color = color;
		this.pinned = pinned;
		this.createDate = new Date();
		this.id = Date.now();
	}
}

class Notes {
	constructor (containerSelector) {
		this.note = new Note();
		this.notes = [];
		this.db = new Db();
		this.notesUI = new NotesUI(containerSelector);
	}
	
	addNote(note) {
		this.notes.push(note);
		this.db.saveNotes(this.notes);
		this.notesUI.addNote(note);
		this.notesUI.clearNoteTitleAndContent(note);
	}
	removeNote(id) {
		this.notes = this.notes.filter(el => el.id !== id);
		this.db.saveNotes(this.notes);
		this.notesUI.removeNote(id); 
		this.notes.splice(id,1);  
	}
	getNote(id) {
		return this.notes.find(el => el.id === id);
	} 
	getNotes() {
		return [...this.notes];
	}
}

class NotesUI {
	constructor(containerSelector = 'main') {
		this.notes = new Notes();
		this.notesContainer = document.querySelector(containerSelector);
		this.pinnedContainer = document.querySelector('pinned-notes');
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
			if (htmlNote.parentNode == this.pinnedContainer) {
				this.notesContainer.appendChild(htmlNote);
			}else if(htmlNote.parentNode == this.notesContainer){
				this.pinnedContainer.appendChild(htmlNote);
			}			
		});
        
		htmlNote.appendChild(htmlTitle);
		htmlNote.appendChild(htmlContent);
		htmlNote.appendChild(htmlTime);
		htmlNote.appendChild(htmlButton);
		htmlNote.appendChild(htmlPinnedBtn);
		htmlNote.appendChild(htmlLabel);

		if(note.pinned == false){
			this.notesContainer.appendChild(htmlNote);
			htmlPinnedBtn.checked = false;
		}
		else{
			this.pinnedContainer.appendChild(htmlNote);
			htmlPinnedBtn.checked = true;
		}
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
		document.querySelector('#noteTitle').value = '';
		document.querySelector('#noteContent').value = '';
	}
}

class Db {
	constructor() {
		this.lsNotesKey = 'notes';
	}

	saveNotes(notes) {
		localStorage.setItem(this.lsNotesKey, JSON.stringify(notes));
	}
	getNotes() {
		if (localStorage.getItem(this.lsNotesKey) != null) {
			return JSON.parse(localStorage.getItem(this.lsNotesKey));
		}

	}
}
