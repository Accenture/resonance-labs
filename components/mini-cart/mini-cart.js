(function () {
  var section = document.querySelector('.mini-cart');
  if (!section) return;

  var trigger = section.querySelector('.mini-cart__trigger');
  var panel = document.getElementById('mini-cart-panel');
  var countBadge = section.querySelector('.mini-cart__count');
  var itemsList = section.querySelector('.mini-cart__items');
  var emptyMsg = section.querySelector('.mini-cart__empty');
  var subtotalEl = section.querySelector('.mini-cart__subtotal-value');
  var actionsEl = section.querySelector('.mini-cart__actions');
  var subtotalRow = section.querySelector('.mini-cart__subtotal');
  var liveRegion = section.querySelector('.mini-cart__live');

  function announce(message) {
    liveRegion.textContent = '';
    requestAnimationFrame(function () {
      liveRegion.textContent = message;
    });
  }

  function formatCurrency(value) {
    return '$' + value.toFixed(2);
  }

  function getItemCount() {
    var items = itemsList.querySelectorAll('.mini-cart__item');
    var total = 0;
    items.forEach(function (item) {
      total += parseInt(item.getAttribute('data-qty'), 10) || 1;
    });
    return total;
  }

  function updateTriggerLabel() {
    var count = getItemCount();
    countBadge.textContent = count;
    // Update full button accessible name
    trigger.setAttribute('aria-label', 'Cart, ' + count + ' item' + (count !== 1 ? 's' : ''));
  }

  function recalcSubtotal() {
    var items = itemsList.querySelectorAll('.mini-cart__item');
    var subtotal = 0;
    items.forEach(function (item) {
      var price = parseFloat(item.getAttribute('data-price'));
      var qty = parseInt(item.getAttribute('data-qty'), 10) || 1;
      subtotal += price * qty;
    });
    subtotalEl.textContent = formatCurrency(subtotal);
  }

  function showEmptyState() {
    itemsList.hidden = true;
    emptyMsg.hidden = false;
    subtotalRow.hidden = true;
    actionsEl.hidden = true;
  }

  // Toggle panel open/closed
  function openPanel() {
    panel.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
  }

  function closePanel() {
    panel.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    trigger.focus();
  }

  // Trigger click
  trigger.addEventListener('click', function () {
    var isOpen = trigger.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closePanel();
    } else {
      openPanel();
    }
  });

  // Escape key closes panel
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && trigger.getAttribute('aria-expanded') === 'true') {
      closePanel();
    }
  });

  // Close panel when clicking outside
  document.addEventListener('click', function (e) {
    if (trigger.getAttribute('aria-expanded') === 'true') {
      if (!section.contains(e.target)) {
        closePanel();
      }
    }
  });

  // Remove item
  panel.addEventListener('click', function (e) {
    var removeBtn = e.target.closest('.mini-cart__remove');
    if (!removeBtn) return;

    var item = removeBtn.closest('.mini-cart__item');
    var name = item.getAttribute('data-name');
    var nextItem = item.nextElementSibling || item.previousElementSibling;

    item.remove();

    var remaining = itemsList.querySelectorAll('.mini-cart__item');

    if (remaining.length === 0) {
      showEmptyState();
      updateTriggerLabel();
      announce(name + ' removed. Your cart is now empty.');
    } else {
      recalcSubtotal();
      updateTriggerLabel();
      announce(name + ' removed from cart. ' + getItemCount() + ' item' + (getItemCount() !== 1 ? 's' : '') + ' remaining.');

      // Move focus to next remove button
      if (nextItem) {
        var nextRemove = nextItem.querySelector('.mini-cart__remove');
        if (nextRemove) nextRemove.focus();
      }
    }
  });

  // Initialize
  updateTriggerLabel();
  recalcSubtotal();
})();
