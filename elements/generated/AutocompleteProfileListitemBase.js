class AutocompleteProfileListitemBase extends Richlistitem {
  connectedCallback() {
    super.connectedCallback()

    /**
     * For form autofill, we want to unify the selection no matter by
     * keyboard navigation or mouseover in order not to confuse user which
     * profile preview is being shown. This field is set to true to indicate
     * that selectedIndex of popup should be changed while mouseover item
     */
    this.selectedByMouseOver = true;

    this._setupEventListeners();
  }

  get _stringBundle() {
    /* global Services */
    if (!this.__stringBundle) {
      this.__stringBundle = Services.strings.createBundle("chrome://formautofill/locale/formautofill.properties");
    }
    return this.__stringBundle;
  }

  _cleanup() {
    this.removeAttribute("formautofillattached");
    if (this._itemBox) {
      this._itemBox.removeAttribute("size");
    }
  }

  _onOverflow() {}

  _onUnderflow() {}

  handleOverUnderflow() {}

  _adjustAutofillItemLayout() {
    let outerBoxRect = this.parentNode.getBoundingClientRect();

    // Make item fit in popup as XUL box could not constrain
    // item's width
    this._itemBox.style.width = outerBoxRect.width + "px";
    // Use two-lines layout when width is smaller than 150px or
    // 185px if an image precedes the label.
    let oneLineMinRequiredWidth = this.getAttribute("ac-image") ? 185 : 150;

    if (outerBoxRect.width <= oneLineMinRequiredWidth) {
      this._itemBox.setAttribute("size", "small");
    } else {
      this._itemBox.removeAttribute("size");
    }
  }

  _setupEventListeners() {

  }
}