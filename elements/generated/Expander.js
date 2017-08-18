class FirefoxExpander extends BaseElement {
  constructor() {
    super();
  }
  connectedCallback() {
    console.log(this, "connected");

    this.innerHTML = `<hbox align="center">
<button type="disclosure" class="expanderButton" anonid="disclosure" inherits="disabled" mousethrough="always">
</button>
<firefox-text-label class="header expanderButton" anonid="label" inherits="value=label,disabled" mousethrough="always" flex="1">
</firefox-text-label>
<button anonid="clear-button" inherits="label=clearlabel,disabled=cleardisabled,hidden=clearhidden" mousethrough="always" icon="clear">
</button>
</hbox>
<vbox flex="1" anonid="settings" class="settingsContainer" collapsed="true" inherits="align">
<children>
</children>
</vbox>`;
    let comment = document.createComment("Creating firefox-expander");
    this.prepend(comment);

    try {
      var settings = document.getAnonymousElementByAttribute(
        this,
        "anonid",
        "settings"
      );
      var expander = document.getAnonymousElementByAttribute(
        this,
        "anonid",
        "disclosure"
      );
      var open = this.getAttribute("open") == "true";
      settings.collapsed = !open;
      expander.open = open;
    } catch (e) {}
  }
  disconnectedCallback() {}

  set open(val) {
    var settings = document.getAnonymousElementByAttribute(
      this,
      "anonid",
      "settings"
    );
    var expander = document.getAnonymousElementByAttribute(
      this,
      "anonid",
      "disclosure"
    );
    settings.collapsed = !val;
    expander.open = val;
    if (val) this.setAttribute("open", "true");
    else this.setAttribute("open", "false");
    return val;
  }

  get open() {
    undefined;
  }
  onCommand(aEvent) {
    var element = aEvent.originalTarget;
    var button = element.getAttribute("anonid");
    switch (button) {
      case "disclosure":
      case "label":
        if (this.open == "true") this.open = false;
        else this.open = true;
        break;
      case "clear-button":
        var event = document.createEvent("Events");
        event.initEvent("clear", true, true);
        this.dispatchEvent(event);
        break;
    }
  }
}
customElements.define("firefox-expander", FirefoxExpander);
