class NoteItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _noteData = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
    archived: null,
  };

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  set noteData(value) {
    this._noteData = value;
    this.render();
  }

  get noteData() {
    return this._noteData;
  }

  _updateStyle() {
    this._style.textContent = `
            :host {
                display: block;
                border-radius: 8px;
                box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
                overflow: hidden;
            }
                
            .note-item {
                padding: 16px 24px;
            }

            .note-item__title h2 {
                font-weight: lighter;
            }

            .note-item__body p {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
            }

            .note-item__createdAt {
                font-size: 12px;
                color: #888;
            }

            .note-item__archived {
                font-size: 12px;
                color: #888;
            }

            .note-item__archived::before {
                content: 'Archived';
                font-weight: bold;
                color: #888;
            }

            .note-item__archived::after {
                content: 'Archived';
                font-weight: bold;
                color: #888;
            }
        `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
            <div class="note-item">
                <div class="note-item__title">
                    <h2>${this.noteData.title}</h2>
                </div>
                <div class="note-item__body">
                    <p>${this.noteData.body}</p>
                </div>
                <div class="note-item__createdAt">${this.noteData.createdAt}</div>
                ${this.noteData.archived ? '<div class="note-item__archived"></div>' : ""}
                <button class="note-item__delete" id="delete">Delete</button>
            </div>
        `;

    this._shadowRoot.querySelector("#delete").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("note-delete", {
          detail: { id: this.noteData.id },
          bubbles: true,
          composed: true,
        }),
      );
    });
  }
}

customElements.define("note-item", NoteItem);
