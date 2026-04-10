(function() {
  const openBtn = document.getElementById("modal-open");
  const dialog = document.getElementById("modal-dialog");
  const closeBtn = document.getElementById("modal-close");
  const backdrop = dialog?.querySelector("[data-backdrop]");
  let lastFocused = null;

  function getFocusable(container) {
    return Array.from(container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ));
  }

  // Inert all body children outside the modal to trap virtual cursor for
  // mobile screen readers (VoiceOver/TalkBack swipe navigation)
  function setSiblingsInert(inert) {
    Array.from(document.body.children).forEach(child => {
      if (!child.contains(dialog) && child !== dialog) {
        inert ? child.setAttribute("inert", "") : child.removeAttribute("inert");
      }
    });
  }

  function open() {
    lastFocused = document.activeElement;
    dialog.hidden = false;
    setSiblingsInert(true);
    const focusables = getFocusable(dialog);
    (focusables[0] || dialog.querySelector(".modal__panel")).focus();
    document.addEventListener("keydown", onKeyDown);
  }

  function close() {
    dialog.hidden = true;
    setSiblingsInert(false);
    document.removeEventListener("keydown", onKeyDown);
    lastFocused?.focus?.();
  }

  function trapFocus(e) {
    if (e.key !== "Tab") return;
    const focusables = getFocusable(dialog);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function onKeyDown(e) {
    if (e.key === "Escape") { e.preventDefault(); close(); return; }
    trapFocus(e);
  }

  openBtn?.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);
})();
