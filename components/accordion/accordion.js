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

  document.addEventListener('click', function (event) {
    var button = event.target.closest('.accordion-trigger');
    if (button) toggleAccordion(button);
  });
})();
