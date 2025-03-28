class NoteInput extends HTMLCollection {
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
    this._shadowRoot.innerHTML = `
      <style>
        
      </style>
    `;
  }
}