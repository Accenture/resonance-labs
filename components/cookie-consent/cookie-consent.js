(function () {
  "use strict";

  var STORAGE_KEY = "cookie-consent-choice";

  function initCookieConsent() {
    var containers = document.querySelectorAll('[data-cookie-consent-demo]');

    containers.forEach(function (container) {
      var banner = container.querySelector('#cookie-banner');
      var acceptBtn = container.querySelector('#cookie-accept-btn');
      var rejectBtn = container.querySelector('#cookie-reject-btn');
      var preferencesBtn = container.querySelector('#cookie-preferences-btn');
      var preferencesPanel = container.querySelector('#cookie-preferences-panel');
      var saveBtn = container.querySelector('#cookie-save-btn');
      var resetBtn = container.querySelector('#cookie-reset-btn');
      var triggerElement = null;

      function showBanner() {
        banner.removeAttribute('hidden');
        // Move focus to the banner for accessibility
        banner.setAttribute('tabindex', '-1');
        banner.focus();
      }

      function hideBanner() {
        banner.setAttribute('hidden', '');
        preferencesPanel.setAttribute('hidden', '');
        // Return focus to logical location
        if (triggerElement && document.body.contains(triggerElement)) {
          triggerElement.focus();
        } else if (resetBtn) {
          resetBtn.focus();
        }
      }

      function storeChoice(choice) {
        try {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
        } catch (e) {
          // sessionStorage may be unavailable
        }
      }

      function getStoredChoice() {
        try {
          var stored = sessionStorage.getItem(STORAGE_KEY);
          return stored ? JSON.parse(stored) : null;
        } catch (e) {
          return null;
        }
      }

      // Check if a choice was already made this session
      var existingChoice = getStoredChoice();
      if (existingChoice) {
        banner.setAttribute('hidden', '');
      } else {
        showBanner();
      }

      // Accept All
      acceptBtn.addEventListener('click', function () {
        storeChoice({ type: 'accept-all', analytics: true, marketing: true });
        hideBanner();
      });

      // Reject All
      rejectBtn.addEventListener('click', function () {
        storeChoice({ type: 'reject-all', analytics: false, marketing: false });
        hideBanner();
      });

      // Toggle Preferences panel
      preferencesBtn.addEventListener('click', function () {
        var isHidden = preferencesPanel.hasAttribute('hidden');
        if (isHidden) {
          preferencesPanel.removeAttribute('hidden');
          // Focus first interactive element in preferences
          var firstCheckbox = preferencesPanel.querySelector('input[type="checkbox"]:not(:disabled)');
          if (firstCheckbox) {
            firstCheckbox.focus();
          }
        } else {
          preferencesPanel.setAttribute('hidden', '');
          preferencesBtn.focus();
        }
      });

      // Save Preferences
      saveBtn.addEventListener('click', function () {
        var analyticsCheckbox = container.querySelector('#cookie-analytics');
        var marketingCheckbox = container.querySelector('#cookie-marketing');

        storeChoice({
          type: 'custom',
          analytics: analyticsCheckbox ? analyticsCheckbox.checked : false,
          marketing: marketingCheckbox ? marketingCheckbox.checked : false
        });

        hideBanner();
      });

      // Reset button for demo purposes
      resetBtn.addEventListener('click', function () {
        triggerElement = resetBtn;
        try {
          sessionStorage.removeItem(STORAGE_KEY);
        } catch (e) {
          // sessionStorage may be unavailable
        }
        // Reset checkbox states
        var analyticsCheckbox = container.querySelector('#cookie-analytics');
        var marketingCheckbox = container.querySelector('#cookie-marketing');
        if (analyticsCheckbox) analyticsCheckbox.checked = false;
        if (marketingCheckbox) marketingCheckbox.checked = false;

        showBanner();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
  } else {
    initCookieConsent();
  }
})();
