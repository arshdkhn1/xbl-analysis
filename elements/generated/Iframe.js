class XblIframe extends BaseElement {
  constructor() {
    super();
  }
  connectedCallback() {
    console.log(this, "connected");

    let comment = document.createComment("Creating xbl-iframe");
    this.prepend(comment);
  }
  disconnectedCallback() {}

  get docShell() {
    let frameLoader = this.QueryInterface(
      Components.interfaces.nsIFrameLoaderOwner
    ).frameLoader;
    return frameLoader ? frameLoader.docShell : null;
  }

  get contentWindow() {
    return this.docShell
      .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
      .getInterface(Components.interfaces.nsIDOMWindow);
  }

  get webNavigation() {
    return this.docShell.QueryInterface(Components.interfaces.nsIWebNavigation);
  }

  get contentDocument() {
    return this.webNavigation.document;
  }
}
customElements.define("xbl-iframe", XblIframe);
