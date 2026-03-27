(function () {
  var buttons = document.querySelectorAll('.product-card__add-btn');
  var liveRegion = document.querySelector('.product-card__live-region');

  if (!buttons.length || !liveRegion) return;

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var productName = btn.getAttribute('data-product');
      liveRegion.textContent = productName + ' added to cart';

      // Clear the live region after a short delay so repeated adds are announced
      setTimeout(function () {
        liveRegion.textContent = '';
      }, 3000);
    });
  });
})();
