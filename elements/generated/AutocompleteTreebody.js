class FirefoxAutocompleteTreebody extends BaseElement {
  constructor() {
    super();
  }
  connectedCallback() {
    console.log(this, "connected");

    let comment = document.createComment(
      "Creating firefox-autocomplete-treebody"
    );
    this.prepend(comment);
  }
  disconnectedCallback() {}
}
customElements.define(
  "firefox-autocomplete-treebody",
  FirefoxAutocompleteTreebody
);
