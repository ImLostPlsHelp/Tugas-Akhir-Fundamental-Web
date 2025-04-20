class FooterBar extends HTMLElement {
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
                .footer-bar {
                    background-color: #007bff;
                    color: white;
                    padding: 16px 24px;
                    font-size: 16px;
                    font-weight: bold;
                    text-align: center;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    }
            </style>
            <footer class="footer-bar">
                <p>
                Made by Maurits | @copy 2025
                </p>
            </footer>
        `;
  }
}

customElements.define("footer-bar", FooterBar);
