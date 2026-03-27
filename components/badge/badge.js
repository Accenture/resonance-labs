(function () {
  var live = document.getElementById("badge-live");

  window.__initComponent = function () {
    var group = document.querySelector(".badge-group");
    if (!group) return;

    group.addEventListener("click", function (e) {
      var button = e.target.closest(".badge__remove");
      if (!button) return;

      var badge = button.closest(".badge");
      if (!badge) return;

      var label = badge.querySelector(".badge__label").textContent.trim();
      var badges = Array.from(group.querySelectorAll(".badge"));
      var index = badges.indexOf(badge);

      badge.remove();

      if (live) {
        live.textContent = "";
        setTimeout(function () {
          live.textContent = label + " filter removed.";
        }, 50);
      }

      var remaining = group.querySelectorAll(".badge__remove");
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
