(function () {
  "use strict";

  var demo = document.querySelector("[data-popover-demo]");
  if (!demo) return;

  var triggers = demo.querySelectorAll(".rl-popover-trigger");

  triggers.forEach(function (trigger) {
    var panelId = trigger.getAttribute("aria-controls");
    var panel = document.getElementById(panelId);
    if (!panel) return;

    var isInteractive = panel.classList.contains("rl-popover-panel--interactive");

    function open() {
      trigger.setAttribute("aria-expanded", "true");
      panel.hidden = false;

      if (isInteractive) {
        var firstFocusable = panel.querySelector("a, button, input, textarea, select, [tabindex]");
        if (firstFocusable) {
          firstFocusable.focus();
        }
      }
    }

    function close(returnFocus) {
      trigger.setAttribute("aria-expanded", "false");
      panel.hidden = true;

      if (returnFocus !== false) {
        trigger.focus();
      }
    }

    function isOpen() {
      return trigger.getAttribute("aria-expanded") === "true";
    }

    // Toggle on click
    trigger.addEventListener("click", function () {
      if (isOpen()) {
        close();
      } else {
        closeAllPopovers();
        open();
      }
    });

    // Escape to close
    panel.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    });

    trigger.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) {
        e.preventDefault();
        close();
      }
    });
  });

  // Close all open popovers (helper)
  function closeAllPopovers() {
    triggers.forEach(function (t) {
      var pId = t.getAttribute("aria-controls");
      var p = document.getElementById(pId);
      if (p && !p.hidden) {
        t.setAttribute("aria-expanded", "false");
        p.hidden = true;
      }
    });
  }

  // Light dismiss – click outside closes open popovers
  document.addEventListener("click", function (e) {
    triggers.forEach(function (trigger) {
      var panelId = trigger.getAttribute("aria-controls");
      var panel = document.getElementById(panelId);
      if (!panel || panel.hidden) return;

      var clickedInsidePanel = panel.contains(e.target);
      var clickedTrigger = trigger.contains(e.target);

      if (!clickedInsidePanel && !clickedTrigger) {
        trigger.setAttribute("aria-expanded", "false");
        panel.hidden = true;
      }
    });
  });
})();
