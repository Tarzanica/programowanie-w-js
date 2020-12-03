class Db {
    constructor() {
        this.lsNotesKey = 'notes';
    }

    saveNotes(notes) {
        localStorage.setItem(this.lsNotesKey, JSON.stringify(notes));
    }
    getNotes() {
        if (localStorage != null) {
            return JSON.parse(localStorage.getItem(this.lsNotesKey));
        }

    }
}

