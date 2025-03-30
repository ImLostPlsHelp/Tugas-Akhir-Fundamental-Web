import "../utils.js";

import "./components/app-bar.js";
import "./components/footer-bar.js";

import "./components/note-list.js";
import './components/note-item.js';
import Notes from './notes.js';

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

import "./components/note-input.js";
