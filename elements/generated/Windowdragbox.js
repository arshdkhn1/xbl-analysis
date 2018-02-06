class FirefoxWindowdragbox extends XULElement {
  connectedCallback() {
    Object.defineProperty(this, "_dragBindingAlive", {
      configurable: true,
      enumerable: true,
      get() {
        delete this._dragBindingAlive;
        return (this._dragBindingAlive = true);
      },
      set(val) {
        delete this._dragBindingAlive;
        return (this._dragBindingAlive = val);
      }
    });

    if (!this._draggableStarted) {
      this._draggableStarted = true;
      try {
        let tmp = {};
        ChromeUtils.import(
          "resource://gre/modules/WindowDraggingUtils.jsm",
          tmp
        );
        let draghandle = new tmp.WindowDraggingElement(this);
        draghandle.mouseDownCheck = function() {
          return this._dragBindingAlive;
        };
      } catch (e) {}
    }
  }
}
customElements.define("firefox-windowdragbox", FirefoxWindowdragbox);
