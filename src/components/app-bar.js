import { animate, stagger, splitText } from 'animejs';

class AppBar extends HTMLElement {
  static observedAttributes = ['title'];

  constructor() {
    super();
    this._title = this.getAttribute('title');
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[`_${name}`] = newValue;
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
          letter-spacing: 0.1em;
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

    const { chars } = splitText('h1', { words: false, chars: true });

    animate(chars, {
      y: [
        { to: '-2.75rem', ease: 'outExpo', duration: 600 },
        { to: 0, ease: 'outBounce', duration: 800, delay: 100 },
      ],

      rotate: {
        from: '-1turn',
        delay: 0,
      },
      delay: stagger(50),
      ease: 'inOutCirc',
      loopDelay: 30000,
      loop: true,
    });
  }
}

customElements.define('app-bar', AppBar);
