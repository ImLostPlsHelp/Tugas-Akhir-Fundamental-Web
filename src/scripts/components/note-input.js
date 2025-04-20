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

    const title = this.shadowRoot.querySelector("#title");
    const body = this.shadowRoot.querySelector("#body");

    [title, body].forEach((input) => {
      input.addEventListener("input", this._customValidationHandler.bind(this));
      input.addEventListener(
        "invalid",
        this._customValidationHandler.bind(this),
      );
      input.addEventListener("blur", this._handleValidationMessage.bind(this));
    });
  }

  _customValidationHandler(e) {
    const input = e.target;
    input.setCustomValidity("");

    if (input.validity.valueMissing) {
      input.setCustomValidity("This cannot be empty!");
    }
  }

  _handleValidationMessage(e) {
    const input = e.target;
    const isValid = input.validity.valid;
    const errorMessage = input.validationMessage;
    const errorId = input.getAttribute("aria-describedby");
    const errorElement = this.shadowRoot.getElementById(errorId);

    if (errorElement) {
      errorElement.textContent = isValid ? "" : errorMessage;
    }
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

      .error {
      color: red;
      }
    `;

    this.shadowRoot.appendChild(this._style);
  }

  render() {
    this.updateStyle();

    this.shadowRoot.innerHTML += `
      <form id="note-input">
        <input 
        type="text" 
        id="title" 
        placeholder="Title" 
        required minlength="1" maxlength="50"
        aria-describedby="title-error"
      />
      <div id="title-error" class="error"></div>

      <textarea 
        id="body" 
        rows="4" 
        placeholder="Write your note here..." 
        required minlength="1" maxlength="500"
        aria-describedby="body-error"
      ></textarea>
      <div id="body-error" class="error"></div>

      <button type="submit">Add Note</button>
      </form>

    `;
  }
}

customElements.define("note-input", NoteInput);
