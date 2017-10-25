class FirefoxDownloadToolbarbutton extends FirefoxToolbarbuttonBadged {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.innerHTML = `
      <xul:stack class="toolbarbutton-badge-stack">
        <children></children>
        <xul:image class="toolbarbutton-icon" inherits="validate,src=image,label,consumeanchor"></xul:image>
        <xul:label class="toolbarbutton-badge" inherits="value=badge" top="0" end="0" crop="none"></xul:label>
      </xul:stack>
      <xul:label class="toolbarbutton-text" crop="right" flex="1" inherits="value=label,accesskey,crop,wrap"></xul:label>
      <xul:label class="toolbarbutton-multiline-text" flex="1" inherits="text=label,accesskey,wrap"></xul:label>
    `;
  }
}
customElements.define(
  "firefox-download-toolbarbutton",
  FirefoxDownloadToolbarbutton
);
