(function () {
  var liveRegion = document.querySelector('.rlb-review-comment__live-region');
  if (!liveRegion) return;

  // Helpful buttons — increment count on click
  var helpfulBtns = document.querySelectorAll('.rlb-review-comment__helpful-btn');
  helpfulBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var countEl = btn.querySelector('.rlb-review-comment__helpful-count');
      var current = parseInt(countEl.getAttribute('data-count'), 10);
      var next = current + 1;

      countEl.setAttribute('data-count', next);
      countEl.textContent = next;

      // Update the button's accessible name with the new count
      var article = btn.closest('.rlb-review-comment');
      var authorName = article
        ? article.getAttribute('aria-label').replace('Review by ', '')
        : 'this reviewer';

      btn.setAttribute(
        'aria-label',
        'Mark review by ' + authorName + ' as helpful, currently ' + next + ' people found this helpful'
      );

      liveRegion.textContent = 'You found this review helpful. ' + next + ' people found this helpful.';

      setTimeout(function () {
        liveRegion.textContent = '';
      }, 3000);
    });
  });

  // Report buttons — show confirmation
  var reportBtns = document.querySelectorAll('.rlb-review-comment__report-btn');
  reportBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var article = btn.closest('.rlb-review-comment');
      var authorName = article
        ? article.getAttribute('aria-label').replace('Review by ', '')
        : 'this reviewer';

      btn.textContent = 'Reported';
      btn.disabled = true;

      liveRegion.textContent = 'Review by ' + authorName + ' has been reported. Thank you for your feedback.';

      setTimeout(function () {
        liveRegion.textContent = '';
      }, 3000);
    });
  });
})();
