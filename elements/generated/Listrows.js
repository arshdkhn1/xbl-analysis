class Listrows extends MozXULElement {
  connectedCallback() {

    this._setupEventListeners();
  }

  _setupEventListeners() {
    this.addEventListener("DOMMouseScroll", (event) => {
      if (event.axis == event.HORIZONTAL_AXIS)
        return;

      var listBox = this.parentNode.listBoxObject;
      var rows = event.detail;
      if (rows == UIEvent.SCROLL_PAGE_UP)
        rows = -listBox.getNumberOfVisibleRows();
      else if (rows == UIEvent.SCROLL_PAGE_DOWN)
        rows = listBox.getNumberOfVisibleRows();

      listBox.scrollByLines(rows);
      event.preventDefault();
    }, true);

    this.addEventListener("MozMousePixelScroll", (event) => {
      if (event.axis == event.HORIZONTAL_AXIS)
        return;

      // shouldn't be scrolled by pixel scrolling events before a line/page
      // scrolling event.
      event.preventDefault();
    }, true);

  }
}