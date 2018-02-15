class FirefoxTabbrowserArrowscrollbox extends FirefoxArrowscrollboxClicktoscroll {
  connectedCallback() {
    super.connectedCallback()

    this.addEventListener("underflow", (event) => {
      if (event.originalTarget != this._scrollbox)
        return;

      // Ignore vertical events
      if (event.detail == 0)
        return;

      var tabs = document.getBindingParent(this);
      tabs.removeAttribute("overflow");

      if (tabs._lastTabClosedByMouse)
        tabs._expandSpacerBy(this._scrollButtonDown.clientWidth);

      for (let tab of Array.from(tabs.tabbrowser._removingTabs))
        tabs.tabbrowser.removeTab(tab);

      tabs._positionPinnedTabs();
    }, true);

    this.addEventListener("overflow", (event) => {
      if (event.originalTarget != this._scrollbox)
        return;

      // Ignore vertical events
      if (event.detail == 0)
        return;

      var tabs = document.getBindingParent(this);
      tabs.setAttribute("overflow", "true");
      tabs._positionPinnedTabs();
      tabs._handleTabSelect(true);
    });

  }

  _getScrollableElements() {
    return Array.filter(document.getBindingParent(this).childNodes,
      this._canScrollToElement, this);
  }
  _canScrollToElement(tab) {
    return !tab.pinned && !tab.hidden;
  }
}