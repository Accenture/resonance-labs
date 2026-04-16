(function () {
  "use strict";

  var FILLED_STAR = "\u2605"; // ★
  var EMPTY_STAR = "\u2606";  // ☆

  function initStarRating() {
    var containers = document.querySelectorAll('[data-star-rating-demo]');

    containers.forEach(function (container) {
      var group = container.querySelector('[role="radiogroup"]');
      if (!group) return;

      var stars = Array.prototype.slice.call(
        group.querySelectorAll('[role="radio"]')
      );
      var status = container.querySelector('.rlb-star-rating__status');
      var currentIndex = -1;

      function selectStar(index) {
        stars.forEach(function (star, i) {
          var isSelected = i <= index;
          star.setAttribute('aria-checked', isSelected ? 'true' : 'false');
          star.textContent = isSelected ? FILLED_STAR : EMPTY_STAR;
          star.setAttribute('tabindex', i === index ? '0' : '-1');
        });

        currentIndex = index;
        var value = index + 1;

        if (status) {
          status.textContent = value + ' of 5 star' + (value !== 1 ? 's' : '') + ' selected';
        }
      }

      function focusStar(index) {
        stars[index].focus();
      }

      stars.forEach(function (star, index) {
        star.addEventListener('click', function () {
          selectStar(index);
        });

        star.addEventListener('keydown', function (e) {
          var newIndex = currentIndex === -1 ? 0 : currentIndex;

          switch (e.key) {
            case 'ArrowRight':
            case 'ArrowUp':
              e.preventDefault();
              newIndex = index < stars.length - 1 ? index + 1 : 0;
              selectStar(newIndex);
              focusStar(newIndex);
              break;

            case 'ArrowLeft':
            case 'ArrowDown':
              e.preventDefault();
              newIndex = index > 0 ? index - 1 : stars.length - 1;
              selectStar(newIndex);
              focusStar(newIndex);
              break;

            case ' ':
            case 'Enter':
              e.preventDefault();
              selectStar(index);
              break;
          }
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStarRating);
  } else {
    initStarRating();
  }
})();
