import { notesData } from '../data/sample-notes.js'; 

function main() {
    const noteListElement = document.querySelector('note-list');
    const noteInputElement = document.querySelector('note-input');

    noteListElement.notes = notesData;

    noteInputElement.addEventListener('note-submit', e => {
        const newNote = e.detail;

        notesData.push(newNote);

        noteListElement.notes = notesData;
    });

    document.getElementById("year").textContent = new Date().getFullYear();
}

export default main;