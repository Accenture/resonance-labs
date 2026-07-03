(function () {
  var skipLink = document.querySelector('[data-skip-nav-demo] .rlb-skip-link');
  if (!skipLink) return;

  skipLink.addEventListener('click', function (event) {
    var targetId = this.getAttribute('href').replace('#', '');
    var target = document.getElementById(targetId);

    if (target) {
      event.preventDefault();

      // Ensure the target is focusable
      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }

      // Move focus to the target element
      target.focus();

      // Scroll the target into view
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
})();
