(function () {
  "use strict";

  var demos = document.querySelectorAll("[data-slider-demo]");

  demos.forEach(function (demo) {
    var thumb = demo.querySelector("[data-slider-thumb]");
    var track = demo.querySelector("[data-slider-track]");
    var fill = demo.querySelector("[data-slider-fill]");
    var output = demo.querySelector("[data-slider-output]");

    if (!thumb || !track) return;

    var min = parseFloat(thumb.getAttribute("aria-valuemin"));
    var max = parseFloat(thumb.getAttribute("aria-valuemax"));
    var step = parseFloat(thumb.getAttribute("data-step")) || 1;
    var largeStep = parseFloat(thumb.getAttribute("data-large-step")) || 10;
    var prefix = thumb.getAttribute("data-value-prefix") || "";
    var hasValueText = prefix.length > 0;

    function clamp(value) {
      return Math.min(max, Math.max(min, value));
    }

    function roundToStep(value) {
      return Math.round(value / step) * step;
    }

    function getPercent(value) {
      return ((value - min) / (max - min)) * 100;
    }

    function updateVisual(value) {
      var pct = getPercent(value);
      thumb.style.left = pct + "%";
      fill.style.width = pct + "%";
    }

    function setValue(value) {
      value = clamp(roundToStep(value));
      thumb.setAttribute("aria-valuenow", value);

      var displayText = prefix + value;
      if (hasValueText) {
        thumb.setAttribute("aria-valuetext", displayText);
      }
      if (output) {
        output.textContent = displayText;
      }

      updateVisual(value);
    }

    function getCurrentValue() {
      return parseFloat(thumb.getAttribute("aria-valuenow"));
    }

    // Initialize visual position
    updateVisual(getCurrentValue());

    // ── Keyboard support ──
    thumb.addEventListener("keydown", function (e) {
      var current = getCurrentValue();
      var handled = true;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          setValue(current + step);
          break;

        case "ArrowLeft":
        case "ArrowDown":
          setValue(current - step);
          break;

        case "PageUp":
          setValue(current + largeStep);
          break;

        case "PageDown":
          setValue(current - largeStep);
          break;

        case "Home":
          setValue(min);
          break;

        case "End":
          setValue(max);
          break;

        default:
          handled = false;
          break;
      }

      if (handled) {
        e.preventDefault();
      }
    });

    // ── Mouse / pointer drag support ──
    var dragging = false;

    function getValueFromPointer(clientX) {
      var rect = track.getBoundingClientRect();
      var ratio = (clientX - rect.left) / rect.width;
      ratio = Math.min(1, Math.max(0, ratio));
      return min + ratio * (max - min);
    }

    function onPointerMove(e) {
      if (!dragging) return;
      e.preventDefault();
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      setValue(getValueFromPointer(clientX));
    }

    function onPointerUp() {
      if (!dragging) return;
      dragging = false;
      document.removeEventListener("mousemove", onPointerMove);
      document.removeEventListener("mouseup", onPointerUp);
      document.removeEventListener("touchmove", onPointerMove);
      document.removeEventListener("touchend", onPointerUp);
    }

    thumb.addEventListener("mousedown", function (e) {
      e.preventDefault();
      dragging = true;
      thumb.focus();
      document.addEventListener("mousemove", onPointerMove);
      document.addEventListener("mouseup", onPointerUp);
    });

    thumb.addEventListener("touchstart", function (e) {
      e.preventDefault();
      dragging = true;
      thumb.focus();
      document.addEventListener("touchmove", onPointerMove, { passive: false });
      document.addEventListener("touchend", onPointerUp);
    });

    // Click on track to jump to value
    track.addEventListener("click", function (e) {
      if (e.target === thumb) return;
      setValue(getValueFromPointer(e.clientX));
      thumb.focus();
    });
  });
})();
