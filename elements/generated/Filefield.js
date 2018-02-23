class FirefoxFilefield extends FirefoxBasetext {
  connectedCallback() {
    super.connectedCallback()
    this.innerHTML = `
      <xul:stringbundle anonid="bundle" src="chrome://global/locale/filefield.properties"></xul:stringbundle>
      <xul:hbox class="fileFieldContentBox" align="center" flex="1" inherits="disabled">
        <xul:image class="fileFieldIcon" inherits="src=image,disabled"></xul:image>
        <xul:textbox class="fileFieldLabel" inherits="value=label,disabled,accesskey,tabindex,aria-labelledby" flex="1" readonly="true"></xul:textbox>
      </xul:hbox>
    `;
    this._file = null;

    this._setupEventListeners();
  }

  set label(val) {
    this.setAttribute("label", val);
    var elt = document.getAnonymousElementByAttribute(this, "class", "fileFieldLabel");
    return (elt.value = val);
  }

  get label() {
    return this.getAttribute('label');
  }

  set file(val) {
    this._file = val;
    if (val) {
      this.image = this._getIconURLForFile(val);
      this.label = this._getDisplayNameForFile(val);
    } else {
      this.removeAttribute("image");
      var bundle = document.getAnonymousElementByAttribute(this, "anonid", "bundle");
      this.label = bundle.getString("downloadHelperNoneSelected");
    }
    return val;
  }

  get file() {
    return this._file
  }
  _getDisplayNameForFile(aFile) {
    if (/Win/.test(navigator.platform)) {
      var lfw = aFile.QueryInterface(Components.interfaces.nsILocalFileWin);
      try {
        return lfw.getVersionInfoField("FileDescription");
      } catch (e) {
        // fall through to the filename
      }
    } else if (/Mac/.test(navigator.platform)) {
      var lfm = aFile.QueryInterface(Components.interfaces.nsILocalFileMac);
      try {
        return lfm.bundleDisplayName;
      } catch (e) {
        // fall through to the file name
      }
    }
    var ios = Components.classes["@mozilla.org/network/io-service;1"]
      .getService(Components.interfaces.nsIIOService);
    var url = ios.newFileURI(aFile).QueryInterface(Components.interfaces.nsIURL);
    return url.fileName;
  }
  _getIconURLForFile(aFile) {
    if (!aFile)
      return "";
    var ios = Components.classes["@mozilla.org/network/io-service;1"]
      .getService(Components.interfaces.nsIIOService);
    var fph = ios.getProtocolHandler("file")
      .QueryInterface(Components.interfaces.nsIFileProtocolHandler);
    var urlspec = fph.getURLSpecFromFile(aFile);
    return "moz-icon://" + urlspec + "?size=16";
  }

  _setupEventListeners() {

  }
}