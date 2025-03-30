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

      <div class="note-input">
        <form>
          <input type="text" id="title" placeholder="Title..." required />
          <textarea id="body" placeholder="Write your note here..." required></textarea>
          <button type="submit">Add Note</button>
        </form>
    `;
  }
}

customElements.define("note-input", NoteInput);