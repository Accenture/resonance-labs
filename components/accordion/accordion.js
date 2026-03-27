(function () {
  function toggleAccordion(button) {
    var expanded = button.getAttribute('aria-expanded') === 'true';
    var panel = document.getElementById(button.getAttribute('aria-controls'));
    if (!panel) return;

    button.setAttribute('aria-expanded', String(!expanded));

    if (expanded) {
      panel.setAttribute('hidden', '');
    } else {
      panel.removeAttribute('hidden');
    }
  }

  document.querySelectorAll('.accordion-trigger').forEach(function (button) {
    button.addEventListener('click', function () {
      toggleAccordion(this);
    });

    button.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleAccordion(this);
      }
    });
  });
})();
