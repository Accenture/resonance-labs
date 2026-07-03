(function () {
  "use strict";

  var gallery = document.querySelector(".rlb-image-gallery");
  if (!gallery) return;

  var mainImage = gallery.querySelector(".rlb-image-gallery__main-image");
  var thumbButtons = gallery.querySelectorAll(".rlb-image-gallery__thumb");
  var prevBtn = gallery.querySelector(".rlb-image-gallery__nav--prev");
  var nextBtn = gallery.querySelector(".rlb-image-gallery__nav--next");
  var counter = gallery.querySelector(".rlb-image-gallery__counter");
  var totalImages = thumbButtons.length;
  var currentIndex = 0;

  /**
   * Select an image by index. Updates main image, alt text,
   * aria-current on thumbnails, and the live-region counter.
   */
  function selectImage(index) {
    // Clamp index
    if (index < 0) index = totalImages - 1;
    if (index >= totalImages) index = 0;

    currentIndex = index;
    var thumb = thumbButtons[currentIndex];

    // Update main image
    mainImage.src = thumb.getAttribute("data-full");
    mainImage.alt = thumb.getAttribute("data-alt");

    // Update aria-current on thumbnails
    thumbButtons.forEach(function (btn) {
      btn.setAttribute("aria-current", "false");
    });
    thumb.setAttribute("aria-current", "true");

    // Update live region counter
    counter.textContent = "Image " + (currentIndex + 1) + " of " + totalImages;
  }

  // --- Thumbnail click ---
  thumbButtons.forEach(function (btn, idx) {
    btn.addEventListener("click", function () {
      selectImage(idx);
    });
  });

  // --- Previous / Next buttons ---
  prevBtn.addEventListener("click", function () {
    selectImage(currentIndex - 1);
  });

  nextBtn.addEventListener("click", function () {
    selectImage(currentIndex + 1);
  });

  // --- Keyboard: Enter/Space on prev/next (native button handles this) ---
  // --- Arrow keys within thumbnail strip ---
  var thumbList = gallery.querySelector(".rlb-image-gallery__thumbnails");

  thumbList.addEventListener("keydown", function (e) {
    var index = Array.prototype.indexOf.call(thumbButtons, document.activeElement);
    if (index === -1) return;

    var handled = false;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      index = (index + 1) % totalImages;
      handled = true;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      index = (index - 1 + totalImages) % totalImages;
      handled = true;
    } else if (e.key === "Home") {
      index = 0;
      handled = true;
    } else if (e.key === "End") {
      index = totalImages - 1;
      handled = true;
    }

    if (handled) {
      e.preventDefault();
      thumbButtons[index].focus();
      selectImage(index);
    }
  });
})();
