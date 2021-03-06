class FirefoxControlItem extends FirefoxBasetext {
  connectedCallback() {
    super.connectedCallback();
  }

  set value(val) {
    this.setAttribute("value", val);
    return val;
  }

  get value() {
    return this.getAttribute("value");
  }
}
customElements.define("firefox-control-item", FirefoxControlItem);
