class PopupScrollbars extends Popup {
  connectedCallback() {
    super.connectedCallback()
    this.appendChild(MozXULElement.parseXULToFragment(`
      <scrollbox class="popup-internal-box" flex="1" orient="vertical" style="overflow: auto;">
        <children></children>
      </scrollbox>
    `));
    this.AUTOSCROLL_INTERVAL = 25;

    this.NOT_DRAGGING = 0;

    this.DRAG_OVER_BUTTON = -1;

    this.DRAG_OVER_POPUP = 1;

    this._draggingState = this.NOT_DRAGGING;

    this._scrollTimer = 0;

    this._setupEventListeners();
  }

  enableDragScrolling(overItem) {
    if (!this._draggingState) {
      this.setCaptureAlways();
      this._draggingState = overItem ? this.DRAG_OVER_POPUP : this.DRAG_OVER_BUTTON;
    }
  }

  _clearScrollTimer() {
    if (this._scrollTimer) {
      this.ownerGlobal.clearInterval(this._scrollTimer);
      this._scrollTimer = 0;
    }
  }

  _setupEventListeners() {
    this.addEventListener("popupshown", (event) => {
      // Enable drag scrolling even when the mouse wasn't used. The mousemove
      // handler will remove it if the mouse isn't down.
      this.enableDragScrolling(false);
    });

    this.addEventListener("popuphidden", (event) => {
      this._draggingState = this.NOT_DRAGGING;
      this._clearScrollTimer();
      this.releaseCapture();
    });

    this.addEventListener("mousedown", (event) => {
      if (this.state == "open" &&
        (event.target.localName == "menuitem" ||
          event.target.localName == "menu" ||
          event.target.localName == "menucaption")) {
        this.enableDragScrolling(true);
      }
    });

    this.addEventListener("mouseup", (event) => {
      this._draggingState = this.NOT_DRAGGING;
      this._clearScrollTimer();
    });

    this.addEventListener("mousemove", (event) => {
      if (!this._draggingState) {
        return;
      }

      this._clearScrollTimer();

      // If the user released the mouse before the popup opens, we will
      // still be capturing, so check that the button is still pressed. If
      // not, release the capture and do nothing else. This also handles if
      // the dropdown was opened via the keyboard.
      if (!(event.buttons & 1)) {
        this._draggingState = this.NOT_DRAGGING;
        this.releaseCapture();
        return;
      }

      // If dragging outside the top or bottom edge of the popup, but within
      // the popup area horizontally, scroll the list in that direction. The
      // _draggingState flag is used to ensure that scrolling does not start
      // until the mouse has moved over the popup first, preventing scrolling
      // while over the dropdown button.
      let popupRect = this.getOuterScreenRect();
      if (event.screenX >= popupRect.left && event.screenX <= popupRect.right) {
        if (this._draggingState == this.DRAG_OVER_BUTTON) {
          if (event.screenY > popupRect.top && event.screenY < popupRect.bottom) {
            this._draggingState = this.DRAG_OVER_POPUP;
          }
        }

        if (this._draggingState == this.DRAG_OVER_POPUP &&
          (event.screenY <= popupRect.top || event.screenY >= popupRect.bottom)) {
          let scrollAmount = event.screenY <= popupRect.top ? -1 : 1;
          this.scrollBox.scrollByIndex(scrollAmount);

          let win = this.ownerGlobal;
          this._scrollTimer = win.setInterval(() => {
            this.scrollBox.scrollByIndex(scrollAmount);
          }, this.AUTOSCROLL_INTERVAL);
        }
      }
    });

  }
}