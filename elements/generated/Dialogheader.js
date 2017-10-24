class FirefoxDialogheader extends BaseElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `<xul:label class="dialogheader-title" inherits="value=title,crop" crop="right" flex="1">
</xul:label>
<xul:label class="dialogheader-description" inherits="value=description">
</xul:label>`;
  }
  disconnectedCallback() {}
}
customElements.define("firefox-dialogheader", FirefoxDialogheader);
