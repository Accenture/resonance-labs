(function () {
  "use strict";

  var steppers = document.querySelectorAll("[data-stepper]");
  var liveRegion = document.querySelector("[data-stepper-announce]");

  if (!steppers.length) return;

  function announce(message) {
    if (liveRegion) {
      liveRegion.textContent = "";
      // Brief delay ensures screen readers register the change
      setTimeout(function () {
        liveRegion.textContent = message;
      }, 50);
    }
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function updateStepper(stepper, newValue) {
    var input = stepper.querySelector("[data-stepper-input]");
    var decrementBtn = stepper.querySelector("[data-stepper-decrement]");
    var incrementBtn = stepper.querySelector("[data-stepper-increment]");
    var min = parseInt(stepper.getAttribute("data-min"), 10);
    var max = parseInt(stepper.getAttribute("data-max"), 10);

    var clamped = clamp(newValue, min, max);

    input.value = clamped;
    input.setAttribute("aria-valuenow", String(clamped));

    // Manage aria-disabled on boundary buttons
    if (clamped <= min) {
      decrementBtn.setAttribute("aria-disabled", "true");
    } else {
      decrementBtn.removeAttribute("aria-disabled");
    }

    if (clamped >= max) {
      incrementBtn.setAttribute("aria-disabled", "true");
    } else {
      incrementBtn.removeAttribute("aria-disabled");
    }

    // Announce the change via live region
    var label = stepper.querySelector(".quantity-stepper__label");
    var productName = label ? label.textContent.replace("Quantity for ", "") : "item";
    announce("Quantity for " + productName + ": " + clamped);
  }

  steppers.forEach(function (stepper) {
    var input = stepper.querySelector("[data-stepper-input]");
    var decrementBtn = stepper.querySelector("[data-stepper-decrement]");
    var incrementBtn = stepper.querySelector("[data-stepper-increment]");
    var min = parseInt(stepper.getAttribute("data-min"), 10);
    var max = parseInt(stepper.getAttribute("data-max"), 10);

    // Decrement button click
    decrementBtn.addEventListener("click", function () {
      if (decrementBtn.getAttribute("aria-disabled") === "true") return;
      var current = parseInt(input.value, 10) || min;
      updateStepper(stepper, current - 1);
    });

    // Increment button click
    incrementBtn.addEventListener("click", function () {
      if (incrementBtn.getAttribute("aria-disabled") === "true") return;
      var current = parseInt(input.value, 10) || min;
      updateStepper(stepper, current + 1);
    });

    // Arrow keys on input
    input.addEventListener("keydown", function (event) {
      var current = parseInt(input.value, 10) || min;

      if (event.key === "ArrowUp") {
        event.preventDefault();
        updateStepper(stepper, current + 1);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        updateStepper(stepper, current - 1);
      }
    });

    // Direct text entry - validate on change
    input.addEventListener("change", function () {
      var value = parseInt(input.value, 10);
      if (isNaN(value)) {
        value = min;
      }
      updateStepper(stepper, value);
    });

    // Validate on blur as well
    input.addEventListener("blur", function () {
      var value = parseInt(input.value, 10);
      if (isNaN(value)) {
        value = min;
      }
      updateStepper(stepper, value);
    });
  });
})();
