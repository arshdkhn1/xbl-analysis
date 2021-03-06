class WizardButtons extends MozXULElement {
  connectedCallback() {

    this.appendChild(MozXULElement.parseXULToFragment(`
      <vbox class="wizard-buttons-box-1" flex="1">
        <separator class="wizard-buttons-separator groove"></separator>
        <hbox class="wizard-buttons-box-2">
          <button class="wizard-button" dlgtype="extra1" hidden="true"></button>
          <button class="wizard-button" dlgtype="extra2" hidden="true"></button>
          <spacer flex="1" anonid="spacer"></spacer>
          <button label="FROM-DTD.button-back-win.label;" accesskey="FROM-DTD.button-back-win.accesskey;" class="wizard-button" dlgtype="back" icon="go-back"></button>
          <deck class="wizard-next-deck" anonid="WizardButtonDeck">
            <hbox>
              <button label="FROM-DTD.button-finish-win.label;" class="wizard-button" dlgtype="finish" default="true" flex="1"></button>
            </hbox>
            <hbox>
              <button label="FROM-DTD.button-next-win.label;" accesskey="FROM-DTD.button-next-win.accesskey;" class="wizard-button" dlgtype="next" icon="go-forward" default="true" flex="1"></button>
            </hbox>
          </deck>
          <button label="FROM-DTD.button-cancel-win.label;" class="wizard-button" dlgtype="cancel" icon="cancel"></button>
        </hbox>
      </vbox>
    `));
    this._wizardButtonDeck = document.getAnonymousElementByAttribute(this, "anonid", "WizardButtonDeck");

    this._setupEventListeners();
  }

  get defaultButton() {
    const kXULNS =
      "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
    var buttons = this._wizardButtonDeck.selectedPanel
      .getElementsByTagNameNS(kXULNS, "button");
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].getAttribute("default") == "true" &&
        !buttons[i].hidden && !buttons[i].disabled)
        return buttons[i];
    }
    return null;
  }

  onPageChange() {
    if (this.getAttribute("lastpage") == "true") {
      this._wizardButtonDeck.setAttribute("selectedIndex", 0);
    } else {
      this._wizardButtonDeck.setAttribute("selectedIndex", 1);
    }
  }

  _setupEventListeners() {

  }
}