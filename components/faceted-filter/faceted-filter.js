(function () {
  "use strict";

  var TOTAL_RESULTS = 48;

  // Simulated result counts per filter value
  var filterData = {
    category: { shirts: 14, pants: 10, shoes: 16, accessories: 8 },
    color: { blue: 12, red: 9, black: 15, white: 12 },
    price: { "under-25": 18, "25-50": 14, "50-100": 10, "over-100": 6 }
  };

  var container = document.querySelector(".faceted-filter");
  if (!container) return;

  var toggleButtons = container.querySelectorAll("[data-toggle]");
  var checkboxes = container.querySelectorAll('input[type="checkbox"]');
  var clearButton = container.querySelector("[data-clear-all]");
  var liveRegion = container.querySelector("[data-result-count]");

  // Toggle group expand/collapse
  toggleButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var groupName = button.getAttribute("data-toggle");
      var options = container.querySelector('[data-group="' + groupName + '"]');
      var isExpanded = button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", String(!isExpanded));

      if (isExpanded) {
        options.setAttribute("hidden", "");
      } else {
        options.removeAttribute("hidden");
      }
    });
  });

  // Update result count when filters change
  function updateResultCount() {
    var activeFilters = {};

    checkboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
        var group = checkbox.name;
        if (!activeFilters[group]) {
          activeFilters[group] = [];
        }
        activeFilters[group].push(checkbox.value);
      }
    });

    var activeGroups = Object.keys(activeFilters);
    var resultCount;

    if (activeGroups.length === 0) {
      resultCount = TOTAL_RESULTS;
    } else {
      // Simulate filtering: for each active group, sum checked values,
      // then take the minimum across groups to simulate intersection
      var groupTotals = activeGroups.map(function (group) {
        return activeFilters[group].reduce(function (sum, value) {
          return sum + (filterData[group][value] || 0);
        }, 0);
      });

      resultCount = Math.min.apply(null, groupTotals);
    }

    liveRegion.textContent = "Showing " + resultCount + " result" + (resultCount !== 1 ? "s" : "");
  }

  // Listen for checkbox changes
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      updateResultCount();
    });
  });

  // Clear all filters
  clearButton.addEventListener("click", function () {
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = false;
    });

    updateResultCount();

    // Move focus to the first toggle button (logical location after clearing)
    var firstToggle = container.querySelector(".faceted-filter__toggle");
    if (firstToggle) {
      firstToggle.focus();
    }
  });

  // Keyboard support: Space and Enter already work natively on checkboxes and buttons.
  // Ensure toggle buttons respond to Enter (native) and Space (native for buttons).
})();
