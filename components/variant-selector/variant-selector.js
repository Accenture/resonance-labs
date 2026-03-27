(function () {
  var groups = document.querySelectorAll('.variant-selector__options[role="radiogroup"]');
  var liveRegion = document.querySelector('.variant-selector__live-region');

  if (!groups.length || !liveRegion) return;

  groups.forEach(function (group) {
    var options = Array.prototype.slice.call(
      group.querySelectorAll('[role="radio"]')
    );
    var enabledOptions = options.filter(function (opt) {
      return opt.getAttribute('aria-disabled') !== 'true';
    });

    if (!enabledOptions.length) return;

    // Utility: select an option
    function selectOption(option) {
      if (option.getAttribute('aria-disabled') === 'true') return;

      // Deselect all in this group
      options.forEach(function (opt) {
        opt.setAttribute('aria-checked', 'false');
      });

      // Select the target
      option.setAttribute('aria-checked', 'true');

      // Announce selection
      var groupName = group.getAttribute('aria-label') || '';
      var value = option.getAttribute('data-value');
      liveRegion.textContent = groupName + ': ' + value + ' selected';

      setTimeout(function () {
        liveRegion.textContent = '';
      }, 3000);
    }

    // Utility: move focus via roving tabindex
    function moveFocus(targetOption) {
      options.forEach(function (opt) {
        opt.setAttribute('tabindex', '-1');
      });
      targetOption.setAttribute('tabindex', '0');
      targetOption.focus();
    }

    // Find the next enabled option in a given direction (wrapping)
    function findNextEnabled(currentIndex, direction) {
      var len = options.length;
      var idx = currentIndex;
      for (var i = 0; i < len; i++) {
        idx = (idx + direction + len) % len;
        if (options[idx].getAttribute('aria-disabled') !== 'true') {
          return idx;
        }
      }
      return currentIndex; // all disabled, stay put
    }

    // Click handler
    options.forEach(function (option) {
      option.addEventListener('click', function () {
        if (option.getAttribute('aria-disabled') === 'true') return;
        moveFocus(option);
        selectOption(option);
      });
    });

    // Keyboard handler
    group.addEventListener('keydown', function (e) {
      var currentIndex = options.indexOf(document.activeElement);
      if (currentIndex === -1) return;

      var nextIndex;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          nextIndex = findNextEnabled(currentIndex, 1);
          moveFocus(options[nextIndex]);
          break;

        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          nextIndex = findNextEnabled(currentIndex, -1);
          moveFocus(options[nextIndex]);
          break;

        case ' ':
        case 'Enter':
          e.preventDefault();
          selectOption(options[currentIndex]);
          break;

        default:
          break;
      }
    });
  });
})();
