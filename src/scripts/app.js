import "./components/app-bar.js";
import "./components/footer-bar.js";

import './components/note-item.js';
import { notesData } from './notes.js';

const container = document.getElementById('notes-container');

notesData.forEach(note => {
  const el = document.createElement('note-item');
  el.noteData = note;
  container.appendChild(el);
});
