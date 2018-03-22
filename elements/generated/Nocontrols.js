class FirefoxNocontrols extends XULElement {
  connectedCallback() {

    this.innerHTML = `
      <div anonid="controlsContainer" class="controlsContainer" role="none" hidden="true">
        <div class="controlsOverlay stackItem">
          <div class="controlsSpacerStack">
            <div anonid="clickToPlay" class="clickToPlay"></div>
          </div>
        </div>
      </div>
    `;

    this.randomID = 0;
    this.Utils = {
      randomID: 0,
      videoEvents: ["play",
        "playing"
      ],
      controlListeners: [],
      terminateEventListeners() {
        for (let event of this.videoEvents) {
          try {
            this.video.removeEventListener(event, this, { mozSystemGroup: true });
          } catch (ex) {}
        }

        for (let element of this.controlListeners) {
          try {
            element.item.removeEventListener(element.event, element.func, { mozSystemGroup: true });
          } catch (ex) {}
        }

        delete this.controlListeners;
      },

      hasError() {
        return (this.video.error != null || this.video.networkState == this.video.NETWORK_NO_SOURCE);
      },

      handleEvent(aEvent) {
        // If the binding is detached (or has been replaced by a
        // newer instance of the binding), nuke our event-listeners.
        if (this.videocontrols.randomID != this.randomID) {
          this.terminateEventListeners();
          return;
        }

        switch (aEvent.type) {
          case "play":
            this.noControlsOverlay.hidden = true;
            break;
          case "playing":
            this.noControlsOverlay.hidden = true;
            break;
        }
      },

      blockedVideoHandler() {
        if (this.videocontrols.randomID != this.randomID) {
          this.terminateEventListeners();
          return;
        } else if (this.hasError()) {
          this.noControlsOverlay.hidden = true;
          return;
        }
        this.noControlsOverlay.hidden = false;
      },

      clickToPlayClickHandler(e) {
        if (this.videocontrols.randomID != this.randomID) {
          this.terminateEventListeners();
          return;
        } else if (e.button != 0) {
          return;
        }

        this.noControlsOverlay.hidden = true;
        this.video.play();
      },

      init(binding) {
        this.videocontrols = binding;
        this.randomID = Math.random();
        this.videocontrols.randomID = this.randomID;
        this.video = binding.parentNode;
        this.controlsContainer = document.getAnonymousElementByAttribute(binding, "anonid", "controlsContainer");
        this.clickToPlay = document.getAnonymousElementByAttribute(binding, "anonid", "clickToPlay");
        this.noControlsOverlay = document.getAnonymousElementByAttribute(binding, "anonid", "controlsContainer");

        this.videocontrols.isTouchControls =
          navigator.appVersion.includes("Android");
        if (this.videocontrols.isTouchControls) {
          this.controlsContainer.classList.add("touch");
        }

        let self = this;

        function addListener(elem, eventName, func) {
          let boundFunc = func.bind(self);
          self.controlListeners.push({ item: elem, event: eventName, func: boundFunc });
          elem.addEventListener(eventName, boundFunc, { mozSystemGroup: true });
        }
        addListener(this.clickToPlay, "click", this.clickToPlayClickHandler);
        addListener(this.video, "MozNoControlsBlockedVideo", this.blockedVideoHandler);

        for (let event of this.videoEvents) {
          this.video.addEventListener(event, this, { mozSystemGroup: true });
        }
      }
    };
    this.Utils.init(this);
    this.Utils.video.dispatchEvent(new CustomEvent("MozNoControlsVideoBindingAttached"));

    this._setupEventListeners();
  }

  disconnectedCallback() {
    this.Utils.terminateEventListeners();
    // randomID used to be a <field>, which meant that the XBL machinery
    // undefined the property when the element was unbound. The code in
    // this file actually depends on this, so now that randomID is an
    // expando, we need to make sure to explicitly delete it.
    delete this.randomID;
  }

  _setupEventListeners() {

  }
}