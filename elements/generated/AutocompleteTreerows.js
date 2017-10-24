class FirefoxAutocompleteTreerows extends BaseElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `<xul:hbox flex="1" class="tree-bodybox">
<children>
</children>
</xul:hbox>
<xul:scrollbar inherits="collapsed=hidescrollbar" orient="vertical" class="tree-scrollbar">
</xul:scrollbar>`;
  }
  disconnectedCallback() {}
}
customElements.define(
  "firefox-autocomplete-treerows",
  FirefoxAutocompleteTreerows
);
