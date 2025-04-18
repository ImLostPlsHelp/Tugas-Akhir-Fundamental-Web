import "./styles/style.css";

import "./scripts/components/utils.js";

import "./scripts/components/app-bar.js"
import "./scripts/components/footer-bar.js";

import "./scripts/components/note-list.js";
import './scripts/components/note-item.js';
import './scripts/components/note-input.js';
// import Notes from './scripts/notes.js';

// import "./components/note-input.js";

const noteList = document.querySelector('note-list');

async function createNotes(noteData) {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noteData),
        };
        const response = await fetch('https://notes-api.dicoding.dev/v2/notes', options);
        console.log(response);
        // const responseJson = await response.json();
    } catch (error) {
        console.error('Error creating note:', error);
    }
    renderNotes();
}

async function renderNotes() {
    noteList.innerHTML = '';
    
    try {
        const response = await fetch('https://notes-api.dicoding.dev/v2/notes');
        const notes = await response.json();

        if(notes.status === 'success') {
            notes.data.forEach(note => {
                const noteItem = document.createElement('note-item');
                noteItem.noteData = {
                    id: note.id,
                    title: note.title,
                    body: note.body,
                    createdAt: note.createdAt,
                    archived: note.archived
                };
                noteList.appendChild(noteItem);
            });
        } else {
            noteList.innerHTML = '<p>Gagal memuat catatan.</p>';
        }
    } catch (error) {
        noteList.innerHTML = '<p>Gagal memuat catatan.</p>';

    }
}

renderNotes();

document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.querySelector('note-input');
    const shadowForm = noteInput.shadowRoot.querySelector('#note-input')
    const shadowTitle = noteInput.shadowRoot.querySelector('#title');
    const shadowBody = noteInput.shadowRoot.querySelector('#body');

    shadowForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const noteData = {
            title: shadowTitle.value,
            body: shadowBody.value,
        };

        createNotes(noteData)
    });
});
