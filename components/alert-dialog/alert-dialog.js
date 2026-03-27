(function () {
  var trigger = document.getElementById("alert-dialog-trigger");
  var overlay = document.getElementById("alert-dialog-overlay");
  var dialog = document.getElementById("alert-dialog");
  var cancelBtn = overlay ? overlay.querySelector("[data-alert-cancel]") : null;
  var confirmBtn = overlay ? overlay.querySelector("[data-alert-confirm]") : null;
  var status = document.getElementById("alert-dialog-status");

  if (!trigger || !overlay || !dialog) return;

  var FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function getFocusableElements() {
    return Array.prototype.slice.call(dialog.querySelectorAll(FOCUSABLE_SELECTOR));
  }

  function setBackgroundInert(inert) {
    var children = Array.prototype.slice.call(document.body.children);
    children.forEach(function (child) {
      if (child === overlay || child.contains(overlay)) return;
      if (inert) {
        child.setAttribute("aria-hidden", "true");
        child.setAttribute("inert", "");
      } else {
        child.removeAttribute("aria-hidden");
        child.removeAttribute("inert");
      }
    });
  }

  function openDialog() {
    overlay.hidden = false;
    setBackgroundInert(true);

    var focusable = getFocusableElements();
    if (focusable.length > 0) {
      focusable[0].focus();
    } else {
      dialog.setAttribute("tabindex", "-1");
      dialog.focus();
    }

    document.addEventListener("keydown", handleKeyDown);
  }

  function closeDialog(result) {
    overlay.hidden = true;
    setBackgroundInert(false);
    document.removeEventListener("keydown", handleKeyDown);
    trigger.focus();

    if (status) {
      if (result === "confirm") {
        status.textContent = "Item deleted.";
      } else {
        status.textContent = "Deletion cancelled.";
      }
    }
  }

  function trapFocus(e) {
    var focusable = getFocusableElements();
    if (focusable.length === 0) return;

    var firstEl = focusable[0];
    var lastEl = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      }
    } else {
      if (document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      closeDialog("cancel");
      return;
    }
    if (e.key === "Tab") {
      trapFocus(e);
    }
  }

  trigger.addEventListener("click", openDialog);

  if (cancelBtn) {
    cancelBtn.addEventListener("click", function () {
      closeDialog("cancel");
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener("click", function () {
      closeDialog("confirm");
    });
  }
})();
