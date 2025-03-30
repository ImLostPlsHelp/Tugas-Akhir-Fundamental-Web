class NoteInput extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 24px;
      }

      input,
      textarea {
        font-family: inherit;
        font-size: 1rem;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 6px;
      }

      button {
        align-self: flex-start;
        padding: 8px 16px;
        font-size: 1rem;
        border: none;
        background-color: #007bff;
        color: white;
        border-radius: 6px;
        cursor: pointer;
      }

      button:hover {
        background-color: #0056b3;
      }
    `;

    this.shadowRoot.appendChild(this._style);
  }

  render() {
    this.updateStyle();

    this.shadowRoot.innerHTML += `
      <form id="note-input">
        <input type="text" id="title" placeholder="Title" required />
        <textarea id="body" rows="4" placeholder="Write your note here..." required></textarea>
        <button type="submit">Add Note</button>
      </form>
    `;

    this.shadowRoot.querySelector("#note-input").addEventListener("submit", (e) => {
      e.preventDefault();
      const title = this.shadowRoot.querySelector("#title").value.trim();
      const body = this.shadowRoot.querySelector("#body").value.trim();

      if (!title || !body) return;

      // Emit custom event
      this.dispatchEvent(new CustomEvent("note-added", {
        bubbles: true,
        composed: true,
        detail: {
          id: "notes-" + +new Date(),
          title,
          body,
          createdAt: new Date().toISOString(),
          archived: false,
        },
      }));

      // Reset form
      e.target.reset();
    });
  }
}

customElements.define("note-input", NoteInput);