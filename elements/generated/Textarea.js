class FirefoxTextarea extends FirefoxTextbox {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    console.log(this, "connected");

    this.innerHTML = `<hbox class="textbox-input-box" flex="1" inherits="context,spellcheck">
<textarea class="textbox-textarea" anonid="input" inherits="text=value,disabled,tabindex,rows,cols,readonly,wrap,placeholder,mozactionhint,spellcheck">
<children>
</children>
</textarea>
</hbox>`;
    let comment = document.createComment("Creating firefox-textarea");
    this.prepend(comment);
  }
  disconnectedCallback() {}
}
customElements.define("firefox-textarea", FirefoxTextarea);
