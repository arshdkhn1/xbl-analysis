class XblRootElement extends BaseElement {
  constructor() {
    super();
  }
  connectedCallback() {
    console.log(this, "connected");

    let comment = document.createComment("Creating xbl-root-element");
    this.prepend(comment);

    try {
      if (this.hasAttribute("lightweightthemes")) {
        let temp = {};
        Components.utils.import(
          "resource://gre/modules/LightweightThemeConsumer.jsm",
          temp
        );
        this._lightweightTheme = new temp.LightweightThemeConsumer(
          this.ownerDocument
        );
      }
    } catch (e) {}
  }
  disconnectedCallback() {}
}
customElements.define("xbl-root-element", XblRootElement);
