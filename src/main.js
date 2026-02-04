import './components/app-bar.js';
import './components/note-input.js';
import './components/note-list.js';
import './components/note-item.js';

import { notesData } from './data/sample-notes.js';

const noteListElement = document.querySelector('note-list');
const noteInputElement = document.querySelector('note-input');

noteListElement.notes = notesData;

noteInputElement.addEventListener('note-submit', e => {
    const newNote = e.detail;

    notesData.push(newNote);

    noteListElement.notes = notesData;
});

document.getElementById("year").textContent = new Date().getFullYear();
