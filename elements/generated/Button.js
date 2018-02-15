class FirefoxButton extends FirefoxButtonBase {
  connectedCallback() {
    super.connectedCallback()
    this.innerHTML = `
      <children includes="observes|template|menupopup|panel|tooltip"></children>
      <xul:hbox class="box-inherit button-box" inherits="align,dir,pack,orient" align="center" pack="center" flex="1" anonid="button-box">
        <xul:image class="button-icon" inherits="src=image"></xul:image>
        <xul:label class="button-text" inherits="value=label,accesskey,crop,highlightable"></xul:label>
        <xul:label class="button-highlightable-text" inherits="text=label,accesskey,crop,highlightable"></xul:label>
      </xul:hbox>
    `;

  }

}