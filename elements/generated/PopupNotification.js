class PopupNotification extends MozXULElement {
  connectedCallback() {

    this.appendChild(MozXULElement.parseXULToFragment(`
      <hbox align="start" class="popup-notification-body-container">
        <image class="popup-notification-icon" inherits="popupid,src=icon,class=iconclass"></image>
        <vbox flex="1" pack="start" class="popup-notification-body" inherits="popupid">
          <hbox align="start">
            <vbox flex="1">
              <label class="popup-notification-origin header" inherits="value=origin,tooltiptext=origin" crop="center"></label>
              <description class="popup-notification-description" inherits="popupid">
                <html:span inherits="text=label,popupid"></html:span>
                <html:b inherits="text=name,popupid"></html:b>
                <html:span inherits="text=endlabel,popupid"></html:span>
              </description>
            </vbox>
            <toolbarbutton anonid="closebutton" class="messageCloseButton close-icon popup-notification-closebutton tabbable" inherits="oncommand=closebuttoncommand,hidden=closebuttonhidden" tooltiptext="FROM-DTD.closeNotification.tooltip;"></toolbarbutton>
          </hbox>
          <children includes="popupnotificationcontent"></children>
          <label class="text-link popup-notification-learnmore-link" inherits="onclick=learnmoreclick,href=learnmoreurl"></label>
          <checkbox anonid="checkbox" inherits="hidden=checkboxhidden,checked=checkboxchecked,label=checkboxlabel,oncommand=checkboxcommand"></checkbox>
          <description class="popup-notification-warning" inherits="hidden=warninghidden,text=warninglabel"></description>
        </vbox>
      </hbox>
      <hbox class="popup-notification-button-container">
        <children includes="button"></children>
        <button anonid="secondarybutton" class="popup-notification-button" inherits="oncommand=secondarybuttoncommand,label=secondarybuttonlabel,accesskey=secondarybuttonaccesskey,hidden=secondarybuttonhidden"></button>
        <toolbarseparator inherits="hidden=dropmarkerhidden"></toolbarseparator>
        <button anonid="menubutton" type="menu" class="popup-notification-button popup-notification-dropmarker" inherits="onpopupshown=dropmarkerpopupshown,hidden=dropmarkerhidden">
          <menupopup anonid="menupopup" position="after_end" inherits="oncommand=menucommand">
            <children></children>
          </menupopup>
        </button>
        <button anonid="button" class="popup-notification-button" default="true" label="FROM-DTD.defaultButton.label;" accesskey="FROM-DTD.defaultButton.accesskey;" inherits="oncommand=buttoncommand,label=buttonlabel,accesskey=buttonaccesskey,highlight=buttonhighlight,disabled=mainactiondisabled"></button>
      </hbox>
    `));
    this.checkbox = document.getAnonymousElementByAttribute(this, "anonid", "checkbox");

    this.closebutton = document.getAnonymousElementByAttribute(this, "anonid", "closebutton");

    this.button = document.getAnonymousElementByAttribute(this, "anonid", "button");

    this.secondaryButton = document.getAnonymousElementByAttribute(this, "anonid", "secondarybutton");

    this.menubutton = document.getAnonymousElementByAttribute(this, "anonid", "menubutton");

    this.menupopup = document.getAnonymousElementByAttribute(this, "anonid", "menupopup");

    this._setupEventListeners();
  }

  _setupEventListeners() {

  }
}