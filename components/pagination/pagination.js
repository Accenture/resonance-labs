(function () {
  "use strict";

  var demo = document.querySelector("[data-pagination-demo]");
  if (!demo) return;

  var totalPages = 5;
  var pageLinks = demo.querySelectorAll(".rlb-pagination-link[data-page]");
  var prevLink = demo.querySelector('[data-page="prev"]');
  var nextLink = demo.querySelector('[data-page="next"]');

  function getPageLinks() {
    var links = [];
    pageLinks.forEach(function (link) {
      var page = link.getAttribute("data-page");
      if (page !== "prev" && page !== "next") {
        links.push(link);
      }
    });
    return links;
  }

  function getCurrentPage() {
    var current = demo.querySelector('[aria-current="page"]');
    if (current) {
      return parseInt(current.getAttribute("data-page"), 10);
    }
    return 1;
  }

  function setCurrentPage(pageNum) {
    var numbered = getPageLinks();

    // Update aria-current on page links
    numbered.forEach(function (link) {
      var p = parseInt(link.getAttribute("data-page"), 10);
      if (p === pageNum) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    // Update prev/next disabled state
    updatePrevNext(pageNum);
  }

  function updatePrevNext(pageNum) {
    if (pageNum <= 1) {
      prevLink.setAttribute("aria-disabled", "true");
    } else {
      prevLink.removeAttribute("aria-disabled");
    }

    if (pageNum >= totalPages) {
      nextLink.setAttribute("aria-disabled", "true");
    } else {
      nextLink.removeAttribute("aria-disabled");
    }
  }

  // Attach click handlers
  pageLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      var page = link.getAttribute("data-page");
      var current = getCurrentPage();

      if (page === "prev") {
        if (current > 1) {
          setCurrentPage(current - 1);
        }
        return;
      }

      if (page === "next") {
        if (current < totalPages) {
          setCurrentPage(current + 1);
        }
        return;
      }

      var pageNum = parseInt(page, 10);
      if (!isNaN(pageNum)) {
        setCurrentPage(pageNum);
      }
    });
  });

  // Initialize prev/next state based on current page
  updatePrevNext(getCurrentPage());
})();
