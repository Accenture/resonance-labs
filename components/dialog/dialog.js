(function () {
  var trigger = document.getElementById("dialog-trigger");
  var dialog = document.getElementById("info-dialog");
  var closeBtn = document.getElementById("dialog-close");
  var status = document.getElementById("dialog-status");

  if (!trigger || !dialog || !closeBtn) return;

  function open() {
    dialog.hidden = false;
    updateStatus("Dialog opened");

    // Move focus into the dialog (to the heading)
    var heading = dialog.querySelector("h2");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus();
    }

    document.addEventListener("keydown", onKeyDown);
  }

  function close() {
    dialog.hidden = true;
    updateStatus("Dialog closed");
    document.removeEventListener("keydown", onKeyDown);

    // Return focus to the trigger
    trigger.focus();
  }

  function onKeyDown(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
    // No focus trapping — Tab moves freely to background content
  }

  function updateStatus(message) {
    status.textContent = "";
    // Brief delay so screen readers re-announce the live region
    setTimeout(function () {
      status.textContent = message;
    }, 50);
  }

  trigger.addEventListener("click", function () {
    if (dialog.hidden) {
      open();
    } else {
      close();
    }
  });

  closeBtn.addEventListener("click", close);
})();
