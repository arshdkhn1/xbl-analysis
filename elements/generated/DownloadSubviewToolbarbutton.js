class FirefoxDownloadSubviewToolbarbutton extends FirefoxMenuButtonBase {
  connectedCallback() {
    super.connectedCallback()
    this.innerHTML = `
      <children includes="observes|template|menupopup|panel|tooltip"></children>
      <xul:image class="toolbarbutton-icon" inherits="validate,src=image,label,consumeanchor"></xul:image>
      <xul:vbox class="toolbarbutton-text" flex="1">
        <xul:label crop="end" inherits="value=label,accesskey,crop,wrap"></xul:label>
        <xul:label class="status-text status-full" crop="end" inherits="value=fullStatus"></xul:label>
        <xul:label class="status-text status-open" crop="end" inherits="value=openLabel"></xul:label>
        <xul:label class="status-text status-retry" crop="end" inherits="value=retryLabel"></xul:label>
        <xul:label class="status-text status-show" crop="end" inherits="value=showLabel"></xul:label>
      </xul:vbox>
      <xul:toolbarbutton anonid="button" class="action-button"></xul:toolbarbutton>
    `;

    this._setupEventListeners();
  }

  _setupEventListeners() {

  }
}