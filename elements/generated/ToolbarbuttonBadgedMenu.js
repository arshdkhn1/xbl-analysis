class FirefoxToolbarbuttonBadgedMenu extends FirefoxToolbarbutton {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    console.log(this, "connected");

    this.innerHTML = `<children includes="observes|template|menupopup|panel|tooltip">
</children>
<stack class="toolbarbutton-badge-stack">
<image class="toolbarbutton-icon" inherits="validate,src=image,label,consumeanchor">
</image>
<firefox-text-label class="toolbarbutton-badge" inherits="value=badge" top="0" end="0" crop="none">
</firefox-text-label>
</stack>
<firefox-text-label class="toolbarbutton-text" crop="right" flex="1" inherits="value=label,accesskey,crop,dragover-top,wrap">
</firefox-text-label>
<firefox-text-label class="toolbarbutton-multiline-text" flex="1" inherits="text=label,accesskey,wrap">
</firefox-text-label>
<dropmarker anonid="dropmarker" type="menu" class="toolbarbutton-menu-dropmarker" inherits="disabled,label">
</dropmarker>`;
    let comment = document.createComment(
      "Creating firefox-toolbarbutton-badged-menu"
    );
    this.prepend(comment);
  }
  disconnectedCallback() {}
}
customElements.define(
  "firefox-toolbarbutton-badged-menu",
  FirefoxToolbarbuttonBadgedMenu
);
