class NoteInput extends HTMLElement {
  connectedCallback() {
    this.render();

    const form = this.querySelector('form');

    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
      }
    });

    form.addEventListener('invalid', this.handleInvalid.bind(this), true);
    form.addEventListener('input', this.handleInput.bind(this));
    form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  handleInvalid(e) {
    e.preventDefault();

    const field = e.target;
    const errorElement = field.nextElementSibling;

    errorElement.textContent =
      field.id === 'title'
        ? 'Title cannot be empty!'
        : 'Content cannot be empty!';

    field.classList.add('invalid');
  }

  handleInput(e) {
    const field = e.target;
    const errorElement = field.nextElementSibling;

    if (field.checkValidity()) {
      errorElement.textContent = '';
      field.classList.remove('invalid');
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    if (!form.checkValidity()) return;

    const titleInput = this.querySelector('#title');
    const bodyInput = this.querySelector('#body');

    const newNote = {
      id: `notes-${crypto.randomUUID()}`,
      title: titleInput.value,
      body: bodyInput.value,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    this.dispatchEvent(new CustomEvent('note-submit', {
      detail: newNote,
      bubbles: true,
      composed: true,
    }));

    form.reset();
  }

  render() {
    this.innerHTML = `
      <style>
        note-input {
          display: block;
        }

        note-input form {
          background-color: white;
          padding: 24px;
          border-radius: 8px;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        }

        note-input .form-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 16px;
        }

        note-input label {
          margin-bottom: 8px;
          font-weight: bold;
        }

        note-input input, note-input textarea {
          padding: 12px;
          border: 1px solid lightgray;
          border-radius: 4px;
          font-size: 1rem;
          width: 100%;
          box-sizing: border-box;
          resize: none;
        }

        note-input input.invalid, note-input textarea.invalid {
          border-color: red;
        }

        note-input .validation-message {
          color: red;
          font-size: 0.8rem;
          margin-top: 4px;
        }

        note-input button {
          background-color: black;
          color: white;
          padding: 12px;
          border: none;
          border-radius: 4px;
          width: 100%;
          font-weight: bold;
          cursor: pointer;
        }

        note-input button:hover {
          opacity: 0.8;
        }
      </style>

      <form autocomplete="off" novalidate>
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" id="title" name="title" required>
          <span class="validation-message"></span>
        </div>
        <div class="form-group">
          <label for="body">Content</label>
          <textarea id="body" name="body" required rows="5"></textarea>
          <span class="validation-message"></span>
        </div>

        <div class="form-group">
        <button type="submit">Add Note</button>
        </div>
      </form>
    `;
  }
}

customElements.define('note-input', NoteInput);