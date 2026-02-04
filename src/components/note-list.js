import './note-item.js';

class NoteList extends HTMLElement {
  constructor() {
    super();
  }

  set notes(value) {
    this.noteData = value;
    this.render();
  }

  render() {
    this.innerHTML = `
      <style>
        note-list {
          display: block;
          width: 100%;
        }

        note-list .list {
          display: grid;
          grid-template-columns: repeat(3, minmax(200px, 1fr));
          grid-auto-rows: minmax(min-content, max-content);
          gap: 1rem;
        }

        @media screen and (max-width: 768px) {
          note-list .list {
            grid-template-columns: repeat(2, minmax(200px, 1fr));
          }
        }
          
        @media screen and (max-width: 550px) {
          note-list .list {
            grid-template-columns: minmax(200px, 1fr);
          }
        }
      </style>
      <div class="list"></div>
    `;

    const listContainer = this.querySelector('.list');

    if (this.noteData) {
      this.noteData.forEach((note) => {
        const noteItemElement = document.createElement('note-item');
        noteItemElement.note = note;
        listContainer.appendChild(noteItemElement);
      });
    }
  }
}

customElements.define('note-list', NoteList);