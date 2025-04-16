import "./scripts/components/utils.js";

import "./scripts/components/app-bar.js"
import "./scripts/components/footer-bar.js";

import "./scripts/components/note-list.js";
import './scripts/components/note-item.js';
import Notes from './scripts/notes.js';

// import "./components/note-input.js";

const noteList = document.querySelector('note-list');

function renderNotes() {
    const notes = Notes.getAll();
    noteList.innerHTML = '';

    notes.forEach(note => {
        const noteItem = document.createElement('note-item');
        noteItem.noteData = note;

        noteList.appendChild(noteItem);
    })
}

renderNotes();

import "./scripts/components/note-input.js";
