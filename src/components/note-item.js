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
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
          }

          note-item .card {
            display: flex;
            flex-direction: column;
            padding: 16px 24px;
            height: 100%;
            box-sizing: border-box;
          }

          note-item .title {
            font-size: 1.2rem;
            margin-top: 10px;
            margin-bottom: 10px;
            font-weight: bold;
            word-break: normal;
            overflow-wrap: break-word;
          }

          note-item .body {
            font-size: 1rem;
            margin-top: 0;
            white-space: pre-wrap;
            word-break: normal;
            overflow-wrap: break-word;
            flex-grow: 1;
          }

          note-item .created-at {
            font-size: 0.8rem;
            margin-top: 16px;
            color: gray;
          }
        </style>
        
        <div class="card">
          <h2 class="title">${this.noteData.title}</h2>
          <p class="body">${this.noteData.body}</p>
          <p class="created-at">Created At ${date} at ${time}</p>
        </div>
      `;
    }
  }
}

customElements.define('note-item', NoteItem);