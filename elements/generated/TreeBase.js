class XblTreeBase extends XblBasecontrol {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    console.log(this, "connected");

    let comment = document.createComment("Creating xbl-tree-base");
    this.prepend(comment);
  }
  disconnectedCallback() {}
  _isAccelPressed(aEvent) {
    return aEvent.getModifierState("Accel");
  }
}
customElements.define("xbl-tree-base", XblTreeBase);
