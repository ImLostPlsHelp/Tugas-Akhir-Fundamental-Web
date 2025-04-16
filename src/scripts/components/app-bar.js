class AppBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .app-bar {
          background-color: #007bff;
          color: white;
          padding: 16px 24px;
          font-size: 1.5rem;
          font-weight: bold;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
      </style>
      <header class="app-bar">
        Notes App 📒
      </header>
    `;
  }
}

customElements.define("app-bar", AppBar);
