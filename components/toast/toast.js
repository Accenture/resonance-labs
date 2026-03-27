(function () {
  var region = document.getElementById("toast-region");
  var triggers = document.querySelectorAll("[data-toast-type]");

  if (!region || !triggers.length) return;

  var queue = [];
  var activeCount = 0;
  var MAX_VISIBLE = 3;

  var messages = {
    success: "Changes saved successfully.",
    info: "A new update is available.",
    warning: "Your session will expire in 5 minutes."
  };

  function createToast(type) {
    if (activeCount >= MAX_VISIBLE) {
      queue.push(type);
      return;
    }

    activeCount++;

    var toast = document.createElement("div");
    toast.className = "toast toast--" + type;
    toast.setAttribute("role", "status");

    var text = document.createElement("span");
    text.className = "toast__text";
    text.textContent = messages[type] || "Notification";

    var dismiss = document.createElement("button");
    dismiss.type = "button";
    dismiss.className = "toast__dismiss";
    dismiss.setAttribute("aria-label", "Dismiss notification");
    dismiss.textContent = "\u00D7";

    toast.appendChild(text);
    toast.appendChild(dismiss);
    region.appendChild(toast);

    // Auto-dismiss timer
    var remaining = 5000;
    var startTime = Date.now();
    var timerId = setTimeout(function () {
      removeToast(toast);
    }, remaining);

    // Pause timer on hover
    toast.addEventListener("mouseenter", function () {
      clearTimeout(timerId);
      remaining -= Date.now() - startTime;
    });

    toast.addEventListener("mouseleave", function () {
      startTime = Date.now();
      timerId = setTimeout(function () {
        removeToast(toast);
      }, remaining);
    });

    // Pause timer on focus within
    toast.addEventListener("focusin", function () {
      clearTimeout(timerId);
      remaining -= Date.now() - startTime;
    });

    toast.addEventListener("focusout", function (e) {
      // Only resume if focus leaves the toast entirely
      if (!toast.contains(e.relatedTarget)) {
        startTime = Date.now();
        timerId = setTimeout(function () {
          removeToast(toast);
        }, remaining);
      }
    });

    // Dismiss button — must not steal focus from the page
    dismiss.addEventListener("click", function () {
      clearTimeout(timerId);
      removeToast(toast);
    });
  }

  function removeToast(toast) {
    if (!toast.parentNode) return;

    toast.classList.add("toast--removing");

    toast.addEventListener("animationend", function () {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
      activeCount--;
      processQueue();
    });
  }

  function processQueue() {
    if (queue.length > 0 && activeCount < MAX_VISIBLE) {
      var next = queue.shift();
      createToast(next);
    }
  }

  triggers.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var type = btn.getAttribute("data-toast-type");
      createToast(type);
    });
  });
})();
