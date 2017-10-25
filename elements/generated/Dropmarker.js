class FirefoxDropmarker extends XULElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
      <xul:image class="dropmarker-icon"></xul:image>
    `;
  }
}
customElements.define("firefox-dropmarker", FirefoxDropmarker);
