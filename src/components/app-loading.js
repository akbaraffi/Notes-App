class AppLoading extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <style>
        .loading-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          color: black;
          padding: 30px;
          font-size: 24px;
          font-weight: bold;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
          border-radius: 8px;
        }
      </style>
      <div class="loading-container">
        Loading
      </div>
    `;
  }
}

customElements.define('app-loading', AppLoading); 