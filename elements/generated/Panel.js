class XblPanel extends XblPopupBase {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    console.log(this, "connected");

    let comment = document.createComment("Creating xbl-panel");
    this.prepend(comment);

    try {
      if (this.getAttribute("backdrag") == "true" && !this._draggableStarted) {
        this._draggableStarted = true;
        try {
          let tmp = {};
          Components.utils.import(
            "resource://gre/modules/WindowDraggingUtils.jsm",
            tmp
          );
          let draghandle = new tmp.WindowDraggingElement(this);
          draghandle.mouseDownCheck = function() {
            return this._dragBindingAlive;
          };
        } catch (e) {}
      }
    } catch (e) {}
  }
  disconnectedCallback() {}
}
customElements.define("xbl-panel", XblPanel);
