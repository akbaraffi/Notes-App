class AppBar extends HTMLElement {
  static observedAttributes = ['title'];

  constructor() {
    super();
    this._title = this.getAttribute('title');
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <style>
        app-bar {
          display: block;
          width: 100%;
          color: white;
          background-color: black;
        }

        app-bar div {
          padding: 24px 20px;
          text-align: center;
        }

        app-bar h1 {
          margin: 0;
          font-size: 1.7em;
        }

        @media screen and (max-width: 550px) {
          app-bar h1 {
            font-size: 1.5em;
          }
        }
      </style>
      
      <div>
        <h1>${this._title}</h1>
      </div>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[`_${name}`] = newValue;
    this.render();
  }
}

customElements.define("app-bar", AppBar);