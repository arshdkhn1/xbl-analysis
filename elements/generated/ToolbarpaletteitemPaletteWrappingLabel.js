class FirefoxToolbarpaletteitemPaletteWrappingLabel extends FirefoxToolbarpaletteitem {
  connectedCallback() {
    super.connectedCallback()
    this.innerHTML = `
      <xul:hbox class="toolbarpaletteitem-box" inherits="type,place">
        <children></children>
      </xul:hbox>
      <xul:label inherits="text=title"></xul:label>
    `;

    this._setupEventListeners();
  }

  _setupEventListeners() {

  }
}