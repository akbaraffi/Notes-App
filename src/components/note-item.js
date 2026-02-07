class NoteItem extends HTMLElement {
  constructor() {
    super();
  }

  set note(value) {
    this.noteData = value;
    this.render();
  }

  render() {
    if (this.noteData) {
      const createdAt = new Date(this.noteData.createdAt);

      const date = createdAt.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      const time = createdAt.toLocaleTimeString('en-US', {
        minute: '2-digit',
        hour: '2-digit',
        hour12: true
      });

      this.innerHTML = `
        <style>
          note-item {
            display: block;
            border-radius: 8px;
            background: white;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            overflow: hidden;
            margin-bottom: 1rem;
          }

          note-item .card {
            padding: 16px 24px;
            height: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
          }

          note-item .title {
            font-size: 1.2rem;
            margin-top: 10px;
            margin-bottom: 10px;
            font-weight: bold;
          }

          note-item .body {
            font-size: 1rem;
            margin-top: 0;
            white-space: pre-wrap;
            flex-grow: 1;
          }

          note-item .created-at {
            font-size: 0.8rem;
            color: gray;
            margin-bottom: 10px;
          }

          note-item .action-buttons {
            display: flex;
            gap: 10px;
            margin-top: auto;
          }

          note-item button {
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
            color: white;
            flex: 1;
          }

          note-item .button-delete {
            background-color: red;
          }

          note-item .button-archive {
            background-color: darkorange;
          }

          note-item button:hover {
            opacity: 0.8;
          }
        </style>
        
        <div class="card">
          <h2 class="title">${this.noteData.title}</h2>
          <p class="created-at">Created At ${date} at ${time}</p>
          <p class="body">${this.noteData.body}</p>
          
          <div class="action-buttons">
            <button class="button-archive" id="${this.noteData.id}">
              ${this.noteData.archived ? 'Unarchive' : 'Archive'}
            </button>
            <button class="button-delete" id="${this.noteData.id}">Delete</button>
          </div>
        </div>
      `;

      this.querySelector('.button-delete').addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('delete-note', {
          detail: this.noteData.id,
          bubbles: true
        }));
      });

      this.querySelector('.button-archive').addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('toggle-archive', {
          detail: {
            id: this.noteData.id,
            archived: this.noteData.archived
          },
          bubbles: true
        }));
      });
    }
  }
}

customElements.define('note-item', NoteItem);