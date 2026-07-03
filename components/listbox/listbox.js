(function () {
  "use strict";

  var listboxes = document.querySelectorAll("[data-listbox]");

  listboxes.forEach(function (listbox) {
    var isMulti = listbox.getAttribute("data-listbox") === "multi";
    var options = Array.from(listbox.querySelectorAll('[role="option"]'));
    var focusIndex = -1;
    var anchorIndex = -1;

    function getEnabledOptions() {
      return options.filter(function (opt) {
        return opt.getAttribute("aria-disabled") !== "true";
      });
    }

    function setFocus(index, preventScroll) {
      // Remove previous focus
      options.forEach(function (opt) {
        opt.classList.remove("rlb-listbox__option--focused");
      });

      if (index < 0 || index >= options.length) return;

      focusIndex = index;
      var option = options[focusIndex];
      option.classList.add("rlb-listbox__option--focused");
      listbox.setAttribute("aria-activedescendant", option.id);

      // Scroll into view
      if (!preventScroll) {
        option.scrollIntoView({ block: "nearest" });
      }
    }

    function selectOption(index) {
      if (index < 0 || index >= options.length) return;
      var option = options[index];
      if (option.getAttribute("aria-disabled") === "true") return;

      if (isMulti) {
        // Toggle selection
        var selected = option.getAttribute("aria-selected") === "true";
        option.setAttribute("aria-selected", selected ? "false" : "true");
      } else {
        // Single-select: deselect all, select this one
        options.forEach(function (opt) {
          opt.setAttribute("aria-selected", "false");
        });
        option.setAttribute("aria-selected", "true");
      }
    }

    function selectOnly(index) {
      if (index < 0 || index >= options.length) return;
      var option = options[index];
      if (option.getAttribute("aria-disabled") === "true") return;

      options.forEach(function (opt) {
        opt.setAttribute("aria-selected", "false");
      });
      option.setAttribute("aria-selected", "true");
    }

    function selectRange(fromIndex, toIndex) {
      var start = Math.min(fromIndex, toIndex);
      var end = Math.max(fromIndex, toIndex);
      for (var i = start; i <= end; i++) {
        if (options[i].getAttribute("aria-disabled") !== "true") {
          options[i].setAttribute("aria-selected", "true");
        }
      }
    }

    function selectAll() {
      options.forEach(function (opt) {
        if (opt.getAttribute("aria-disabled") !== "true") {
          opt.setAttribute("aria-selected", "true");
        }
      });
    }

    function findNextEnabled(current, direction) {
      var idx = current + direction;
      while (idx >= 0 && idx < options.length) {
        if (options[idx].getAttribute("aria-disabled") !== "true") {
          return idx;
        }
        idx += direction;
      }
      return current;
    }

    // Focus the listbox: set initial focus to first option
    listbox.addEventListener("focus", function () {
      if (focusIndex < 0) {
        // Try to focus first selected, else first enabled
        var firstSelected = options.findIndex(function (opt) {
          return opt.getAttribute("aria-selected") === "true";
        });
        if (firstSelected >= 0) {
          focusIndex = firstSelected;
        } else {
          focusIndex = options.findIndex(function (opt) {
            return opt.getAttribute("aria-disabled") !== "true";
          });
          if (focusIndex < 0) focusIndex = 0;
        }
      }
      setFocus(focusIndex);
    });

    listbox.addEventListener("blur", function () {
      options.forEach(function (opt) {
        opt.classList.remove("rlb-listbox__option--focused");
      });
      listbox.removeAttribute("aria-activedescendant");
    });

    // Keyboard handling
    listbox.addEventListener("keydown", function (e) {
      var handled = true;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          var nextDown = findNextEnabled(focusIndex, 1);
          if (nextDown !== focusIndex) {
            setFocus(nextDown);
            if (!isMulti) {
              selectOnly(nextDown);
            } else if (e.shiftKey) {
              if (anchorIndex < 0) anchorIndex = focusIndex;
              // Clear and re-select range
              options.forEach(function (opt) {
                opt.setAttribute("aria-selected", "false");
              });
              selectRange(anchorIndex, nextDown);
            }
          }
          break;

        case "ArrowUp":
          e.preventDefault();
          var nextUp = findNextEnabled(focusIndex, -1);
          if (nextUp !== focusIndex) {
            setFocus(nextUp);
            if (!isMulti) {
              selectOnly(nextUp);
            } else if (e.shiftKey) {
              if (anchorIndex < 0) anchorIndex = focusIndex;
              options.forEach(function (opt) {
                opt.setAttribute("aria-selected", "false");
              });
              selectRange(anchorIndex, nextUp);
            }
          }
          break;

        case "Home":
          e.preventDefault();
          var firstEnabled = options.findIndex(function (opt) {
            return opt.getAttribute("aria-disabled") !== "true";
          });
          if (firstEnabled >= 0) {
            setFocus(firstEnabled);
            if (!isMulti) {
              selectOnly(firstEnabled);
            }
          }
          break;

        case "End":
          e.preventDefault();
          var lastEnabled = -1;
          for (var i = options.length - 1; i >= 0; i--) {
            if (options[i].getAttribute("aria-disabled") !== "true") {
              lastEnabled = i;
              break;
            }
          }
          if (lastEnabled >= 0) {
            setFocus(lastEnabled);
            if (!isMulti) {
              selectOnly(lastEnabled);
            }
          }
          break;

        case " ":
          e.preventDefault();
          if (isMulti) {
            selectOption(focusIndex);
            anchorIndex = focusIndex;
          }
          break;

        case "a":
          if (isMulti && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            selectAll();
          } else {
            handled = false;
          }
          break;

        default:
          handled = false;
          break;
      }

      if (!handled) return;
    });

    // Click handling
    listbox.addEventListener("click", function (e) {
      var target = e.target.closest('[role="option"]');
      if (!target) return;
      if (target.getAttribute("aria-disabled") === "true") return;

      var index = options.indexOf(target);
      if (index < 0) return;

      setFocus(index);

      if (isMulti) {
        if (e.shiftKey && anchorIndex >= 0) {
          options.forEach(function (opt) {
            opt.setAttribute("aria-selected", "false");
          });
          selectRange(anchorIndex, index);
        } else {
          selectOption(index);
          anchorIndex = index;
        }
      } else {
        selectOnly(index);
      }

      listbox.focus();
    });
  });
})();
