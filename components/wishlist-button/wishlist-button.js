(function () {
  "use strict";

  var buttons = document.querySelectorAll(".wishlist-btn");
  if (!buttons.length) return;

  buttons.forEach(function (btn) {
    // Set initial visual state for buttons that start as pressed
    updateVisual(btn);

    btn.addEventListener("click", function () {
      var isPressed = btn.getAttribute("aria-pressed") === "true";
      var newState = !isPressed;
      var product = btn.getAttribute("data-product");

      // Toggle aria-pressed
      btn.setAttribute("aria-pressed", String(newState));

      // Update aria-label for icon-only buttons
      if (btn.classList.contains("wishlist-btn--icon")) {
        if (newState) {
          btn.setAttribute("aria-label", "Remove " + product + " from wishlist");
        } else {
          btn.setAttribute("aria-label", "Save " + product + " to wishlist");
        }
      }

      // Update visible label text for text variant
      var label = btn.querySelector(".wishlist-btn__label");
      if (label) {
        label.textContent = newState ? "Saved to wishlist" : "Save to wishlist";
      }

      updateVisual(btn);

      // Focus remains on the button (native behavior, but explicit for clarity)
      btn.focus();
    });
  });

  /**
   * Updates the visual appearance to match the aria-pressed state.
   * The filled vs outline heart is handled by CSS via the
   * [aria-pressed] attribute selectors, so no JS DOM changes
   * are needed for the icon shape itself.
   */
  function updateVisual(btn) {
    // CSS handles fill/stroke/border via [aria-pressed="true"] selectors.
    // This function is a hook for any future visual enhancements.
  }
})();
