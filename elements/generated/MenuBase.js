class MenuBase extends MenuitemBase {
  connectedCallback() {
    super.connectedCallback()

    this._setupEventListeners();
  }

  set open(val) {
    this.boxObject.openMenu(val);
    return val;
  }

  get open() {
    return this.hasAttribute('open');
  }

  get openedWithKey() {
    return this.boxObject.openedWithKey;
  }

  get itemCount() {
    var menupopup = this.menupopup;
    return menupopup ? menupopup.childNodes.length : 0;
  }

  get menupopup() {
    const XUL_NS =
      "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";

    for (var child = this.firstChild; child; child = child.nextSibling) {
      if (child.namespaceURI == XUL_NS && child.localName == "menupopup")
        return child;
    }
    return null;
  }

  /**
   * nsIDOMXULContainerElement interface
   */
  appendItem(aLabel, aValue) {
    const XUL_NS =
      "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";

    var menupopup = this.menupopup;
    if (!menupopup) {
      menupopup = this.ownerDocument.createElementNS(XUL_NS, "menupopup");
      this.appendChild(menupopup);
    }

    var menuitem = this.ownerDocument.createElementNS(XUL_NS, "menuitem");
    menuitem.setAttribute("label", aLabel);
    menuitem.setAttribute("value", aValue);

    return menupopup.appendChild(menuitem);
  }

  getIndexOfItem(aItem) {
    var menupopup = this.menupopup;
    if (menupopup) {
      var items = menupopup.childNodes;
      var length = items.length;
      for (var index = 0; index < length; ++index) {
        if (items[index] == aItem)
          return index;
      }
    }
    return -1;
  }

  getItemAtIndex(aIndex) {
    var menupopup = this.menupopup;
    if (!menupopup || aIndex < 0 || aIndex >= menupopup.childNodes.length)
      return null;

    return menupopup.childNodes[aIndex];
  }

  _setupEventListeners() {

  }
}