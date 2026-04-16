(function () {
  var triggers = document.querySelectorAll('[data-disclosure-demo] .rlb-disclosure__trigger');

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      var panelId = this.getAttribute('aria-controls');
      var panel = document.getElementById(panelId);

      if (!panel) return;

      // Toggle the expanded state
      this.setAttribute('aria-expanded', String(!expanded));

      // Toggle the panel visibility
      if (expanded) {
        panel.setAttribute('hidden', '');
      } else {
        panel.removeAttribute('hidden');
      }

      // Focus remains on the trigger (default behavior for buttons)
    });
  });
})();
