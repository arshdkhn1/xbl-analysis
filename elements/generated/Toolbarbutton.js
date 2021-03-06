class Toolbarbutton extends ButtonBase {
  connectedCallback() {
    super.connectedCallback()
    this.appendChild(MozXULElement.parseXULToFragment(`
      <children includes="observes|template|menupopup|panel|tooltip"></children>
      <image class="toolbarbutton-icon" inherits="validate,src=image,label,type,consumeanchor,triggeringprincipal=iconloadingprincipal"></image>
      <label class="toolbarbutton-text" crop="right" flex="1" inherits="value=label,accesskey,crop,dragover-top,wrap"></label>
      <label class="toolbarbutton-multiline-text" flex="1" inherits="text=label,accesskey,wrap"></label>
      <children includes="box"></children>
      <dropmarker anonid="dropmarker" type="menu" class="toolbarbutton-menu-dropmarker" inherits="disabled,label"></dropmarker>
    `));

    this._setupEventListeners();
  }

  _setupEventListeners() {

  }
}