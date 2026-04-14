(function () {
  var root = document.querySelector('[data-alert-demo]');
  if (!root) return;

  var liveRegion = root.querySelector('[data-live-region]');
  var triggerBtn = root.querySelector('[data-action="trigger-alert"]');
  var alertCount = 0;

  var alertTypes = [
    {
      type: 'info',
      iconSrc: '../../assets/images/alert-information.svg',
      label: 'Info:',
      message: 'A new notification has arrived.'
    },
    {
      type: 'success',
      iconSrc: '../../assets/images/alert-success.svg',
      label: 'Success:',
      message: 'Operation completed successfully.'
    },
    {
      type: 'warning',
      iconSrc: '../../assets/images/alert-warning.svg',
      label: 'Warning:',
      message: 'Please review before continuing.'
    },
    {
      type: 'error',
      iconSrc: '../../assets/images/alert-error.svg',
      label: 'Error:',
      message: 'Something went wrong. Please retry.'
    }
  ];

  function createAlert(config) {
    var el = document.createElement('div');
    el.className = 'alert alert--' + config.type + ' alert--dismissible';
    el.setAttribute('role', 'rl-alert');

    var icon = document.createElement('img');
    icon.className = 'rl-alert__icon';
    icon.src = config.iconSrc;
    icon.alt = '';
    icon.width = 20;
    icon.height = 20;
    icon.setAttribute('aria-hidden', 'true');

    var content = document.createElement('div');
    content.className = 'rl-alert__content';

    var label = document.createElement('strong');
    label.className = 'rl-alert__label';
    label.textContent = config.label;

    var message = document.createElement('span');
    message.className = 'rl-alert__message';
    message.textContent = ' ' + config.message;

    var dismiss = document.createElement('button');
    dismiss.type = 'button';
    dismiss.className = 'rl-alert__dismiss';
    dismiss.setAttribute('aria-label', 'Dismiss ' + config.type + ' alert');
    var closeImg = document.createElement('img');
    closeImg.src = '../../assets/images/close.svg';
    closeImg.alt = '';
    closeImg.width = 16;
    closeImg.height = 16;
    closeImg.setAttribute('aria-hidden', 'true');
    dismiss.appendChild(closeImg);

    content.appendChild(label);
    content.appendChild(message);
    el.appendChild(icon);
    el.appendChild(content);
    el.appendChild(dismiss);

    dismiss.addEventListener('click', function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    });

    return el;
  }

  // Dismiss handlers for static alerts
  root.addEventListener('click', function (e) {
    var btn = e.target.closest('.rl-alert__dismiss');
    if (!btn) return;
    var alert = btn.closest('.rl-alert');
    if (alert) alert.parentNode.removeChild(alert);
  });

  if (triggerBtn && liveRegion) {
    triggerBtn.addEventListener('click', function () {
      var config = alertTypes[alertCount % alertTypes.length];
      alertCount++;

      var alertEl = createAlert(config);
      liveRegion.appendChild(alertEl);

      setTimeout(function () {
        if (alertEl.parentNode) alertEl.parentNode.removeChild(alertEl);
      }, 6000);
    });
  }
})();
