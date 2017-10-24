class FirefoxStatusbarpanelIconic extends FirefoxStatusbarpanel {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.innerHTML = `<xul:image class="statusbarpanel-icon" inherits="src,src=image">
</xul:image>`;
  }
  disconnectedCallback() {}
}
customElements.define(
  "firefox-statusbarpanel-iconic",
  FirefoxStatusbarpanelIconic
);
