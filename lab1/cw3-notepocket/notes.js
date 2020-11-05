class Notes {
    constructor (containerSelector) {
        this.notes = [];
        this.db = new Db();
        this.notesUI = new NotesUI(containerSelector);
    }

    addNote(note) {
        this.notes.push(note);
        this.db.saveNotes(this.notes);
        this.notesUI.addNote(note);
    }
    removeNote(id) {
        this.notes = this.notes.filter(el => el.id !== id);

        this.db.saveNotes(this.notes);
        this.notesUI.removeNote(id);
    }
    getNote(id) {
        return this.notes.find(el => el.id === id);
    } 
    getNotes() {
        return [...this.notes];
    }
}

export {addNote, removeNote, getNote, getNotes};