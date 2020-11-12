class Notes {
    constructor (containerSelector) {
        this.notes = [];
        this.db = new Db();
        this.notesUI = new NotesUI(containerSelector);
    }

    addNote(note) {
        this.notes.push(note);
        db.saveNotes(this.notes);
        ui.addNote(note);
        ui.clearNoteTitleAndContent(note);
    }
    removeNote(id) {
        this.notes = this.notes.filter(el => el.id !== id);

        db.saveNotes(this.notes);
        ui.removeNote(id);
    }
    getNote(id) {
        return this.notes.find(el => el.id === id);
    } 
    getNotes() {
        return [...this.notes];
    }
}


import * as db from './db';
import * as ui from './notes-ui';


export {addNote, removeNote, getNote, getNotes};
