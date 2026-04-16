(function () {
  var live = document.getElementById("badge-live");

  window.__initComponent = function () {
    var group = document.querySelector(".rlb-badge-group");
    if (!group) return;

    group.addEventListener("click", function (e) {
      var button = e.target.closest(".rlb-badge__remove");
      if (!button) return;

      var badge = button.closest(".rlb-badge");
      if (!badge) return;

      var label = badge.querySelector(".rlb-badge__label").textContent.trim();
      var badges = Array.from(group.querySelectorAll(".rlb-badge"));
      var index = badges.indexOf(badge);

      badge.remove();

      if (live) {
        live.textContent = "";
        setTimeout(function () {
          live.textContent = label + " filter removed.";
        }, 50);
      }

      var remaining = group.querySelectorAll(".rlb-badge__remove");
      if (remaining.length > 0) {
        var nextIndex = index < remaining.length ? index : remaining.length - 1;
        remaining[nextIndex].focus();
      } else {
        group.focus();
        group.setAttribute("tabindex", "-1");
      }
    });
  };
})();
