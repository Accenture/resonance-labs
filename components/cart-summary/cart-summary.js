(function () {
  var SHIPPING = 5.99;
  var TAX_RATE = 0.08;

  var section = document.querySelector('.rlb-cart-summary');
  if (!section) return;

  var table = section.querySelector('.rlb-cart-summary__table');
  var tbody = table.querySelector('tbody');
  var emptyMsg = section.querySelector('.rlb-cart-summary__empty');
  var liveRegion = section.querySelector('.rlb-cart-summary__live');
  var subtotalEl = section.querySelector('.rlb-cart-summary__subtotal');
  var shippingEl = section.querySelector('.rlb-cart-summary__shipping');
  var taxEl = section.querySelector('.rlb-cart-summary__tax');
  var orderTotalEl = section.querySelector('.rlb-cart-summary__order-total');

  function formatCurrency(value) {
    return '$' + value.toFixed(2);
  }

  function announce(message) {
    liveRegion.textContent = '';
    requestAnimationFrame(function () {
      liveRegion.textContent = message;
    });
  }

  function recalcTotals() {
    var rows = tbody.querySelectorAll('.rlb-cart-summary__item');
    var subtotal = 0;

    rows.forEach(function (row) {
      var price = parseFloat(row.getAttribute('data-price'));
      var qtyInput = row.querySelector('.rlb-cart-summary__qty-input');
      var qty = parseInt(qtyInput.value, 10) || 1;
      var lineTotal = price * qty;

      row.querySelector('.rlb-cart-summary__line-total').textContent = formatCurrency(lineTotal);
      subtotal += lineTotal;
    });

    var tax = subtotal * TAX_RATE;
    var shipping = rows.length > 0 ? SHIPPING : 0;
    var total = subtotal + shipping + tax;

    subtotalEl.textContent = formatCurrency(subtotal);
    shippingEl.textContent = rows.length > 0 ? formatCurrency(shipping) : '$0.00';
    taxEl.textContent = formatCurrency(tax);
    orderTotalEl.textContent = formatCurrency(total);

    announce('Order total updated to ' + formatCurrency(total));
  }

  function showEmptyState() {
    table.hidden = true;
    emptyMsg.hidden = false;
    section.querySelector('.rlb-cart-summary__order').hidden = true;
    announce('Your shopping cart is now empty.');
    emptyMsg.focus();
  }

  function handleRemove(row) {
    var name = row.getAttribute('data-name');
    var nextRow = row.nextElementSibling || row.previousElementSibling;

    row.remove();

    var remaining = tbody.querySelectorAll('.rlb-cart-summary__item');
    if (remaining.length === 0) {
      showEmptyState();
    } else {
      recalcTotals();
      announce(name + ' removed from cart.');

      if (nextRow) {
        var focusTarget = nextRow.querySelector('.rlb-cart-summary__remove');
        if (focusTarget) focusTarget.focus();
      }
    }
  }

  function handleQuantityChange(row, delta) {
    var input = row.querySelector('.rlb-cart-summary__qty-input');
    var current = parseInt(input.value, 10) || 1;
    var newVal = current + delta;

    if (newVal < 1) newVal = 1;
    if (newVal > 99) newVal = 99;

    input.value = newVal;
    recalcTotals();
  }

  // Event delegation on the table
  table.addEventListener('click', function (e) {
    var removeBtn = e.target.closest('.rlb-cart-summary__remove');
    if (removeBtn) {
      var row = removeBtn.closest('.rlb-cart-summary__item');
      handleRemove(row);
      return;
    }

    var qtyBtn = e.target.closest('.rlb-cart-summary__qty-btn');
    if (qtyBtn) {
      var row = qtyBtn.closest('.rlb-cart-summary__item');
      var action = qtyBtn.getAttribute('data-action');
      handleQuantityChange(row, action === 'increase' ? 1 : -1);
      return;
    }
  });

  // Handle direct input changes
  table.addEventListener('input', function (e) {
    if (e.target.classList.contains('rlb-cart-summary__qty-input')) {
      var val = parseInt(e.target.value, 10);
      if (isNaN(val) || val < 1) e.target.value = 1;
      if (val > 99) e.target.value = 99;
      recalcTotals();
    }
  });
})();
