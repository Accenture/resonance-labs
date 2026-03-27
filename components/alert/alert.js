(function () {
  var root = document.querySelector('[data-alert-demo]');
  if (!root) return;

  var liveRegion = root.querySelector('[data-live-region]');
  var triggerBtn = root.querySelector('[data-action="trigger-alert"]');
  var alertCount = 0;

  var alertTypes = [
    {
      type: 'info',
      icon: '\u2139',
      label: 'Info:',
      message: 'A new notification has arrived.'
    },
    {
      type: 'success',
      icon: '\u2713',
      label: 'Success:',
      message: 'Operation completed successfully.'
    },
    {
      type: 'error',
      icon: '\u2717',
      label: 'Error:',
      message: 'Something went wrong. Please retry.'
    }
  ];

  function createAlert(config) {
    var el = document.createElement('div');
    el.className = 'alert alert--' + config.type;
    el.setAttribute('role', 'alert');

    var icon = document.createElement('span');
    icon.className = 'alert__icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = config.icon;

    var content = document.createElement('div');
    content.className = 'alert__content';

    var label = document.createElement('strong');
    label.className = 'alert__label';
    label.textContent = config.label;

    var message = document.createElement('span');
    message.className = 'alert__message';
    message.textContent = ' ' + config.message;

    content.appendChild(label);
    content.appendChild(message);
    el.appendChild(icon);
    el.appendChild(content);

    return el;
  }

  if (triggerBtn && liveRegion) {
    triggerBtn.addEventListener('click', function () {
      var config = alertTypes[alertCount % alertTypes.length];
      alertCount++;

      var alertEl = createAlert(config);
      liveRegion.appendChild(alertEl);

      // Remove the dynamic alert after 6 seconds to keep the demo tidy
      setTimeout(function () {
        if (alertEl.parentNode) {
          alertEl.parentNode.removeChild(alertEl);
        }
      }, 6000);
    });
  }
})();
