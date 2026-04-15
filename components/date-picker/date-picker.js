// Date Picker — full calendar with keyboard navigation, manual text entry, and ARIA support.
// Pattern: grid-based calendar popup with roving tabindex inside the grid.

(function () {
  var root = document.querySelector('[data-dp="root"]');
  if (!root) return;

  var input = root.querySelector('[data-dp="input"]');
  var toggle = root.querySelector('[data-dp="toggle"]');
  var calendar = root.querySelector('[data-dp="calendar"]');
  var prevBtn = root.querySelector('[data-dp="prev"]');
  var nextBtn = root.querySelector('[data-dp="next"]');
  var monthYearEl = root.querySelector('[data-dp="month-year"]');
  var gridBody = root.querySelector('[data-dp="grid-body"]');

  if (!input || !calendar || !gridBody) return;

  var MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // State
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  // Default to March 2026
  var viewYear = 2026;
  var viewMonth = 2; // 0-indexed: March
  var selectedDate = null; // Date object or null
  var focusedDate = null; // Date object for keyboard focus within grid

  // Min/max date constraints (optional — set to null for no constraint)
  var minDate = null;
  var maxDate = null;

  // ─── Helpers ───────────────────────────────────────────────────────

  function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function startDayOfWeek(year, month) {
    return new Date(year, month, 1).getDay();
  }

  function isSameDay(a, b) {
    if (!a || !b) return false;
    return a.getFullYear() === b.getFullYear() &&
           a.getMonth() === b.getMonth() &&
           a.getDate() === b.getDate();
  }

  function isDateDisabled(date) {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  }

  function formatDate(date) {
    var y = date.getFullYear();
    var m = String(date.getMonth() + 1).padStart(2, '0');
    var d = String(date.getDate()).padStart(2, '0');
    return y + '/' + m + '/' + d;
  }

  function parseInputDate(str) {
    var parts = str.trim().split('/');
    if (parts.length !== 3) return null;
    var y = parseInt(parts[0], 10);
    var m = parseInt(parts[1], 10);
    var d = parseInt(parts[2], 10);
    if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
    if (m < 1 || m > 12 || d < 1 || y < 1) return null;
    var maxD = daysInMonth(y, m - 1);
    if (d > maxD) return null;
    return new Date(y, m - 1, d);
  }

  function dateLabel(date) {
    return MONTH_NAMES[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
  }

  // ─── Rendering ─────────────────────────────────────────────────────

  function renderGrid() {
    monthYearEl.textContent = MONTH_NAMES[viewMonth] + ' ' + viewYear;

    gridBody.innerHTML = '';

    var totalDays = daysInMonth(viewYear, viewMonth);
    var startDay = startDayOfWeek(viewYear, viewMonth);

    // Previous month fill
    var prevMonthDays = daysInMonth(
      viewMonth === 0 ? viewYear - 1 : viewYear,
      viewMonth === 0 ? 11 : viewMonth - 1
    );

    var cells = [];

    // Previous month trailing days
    for (var p = startDay - 1; p >= 0; p--) {
      var pDay = prevMonthDays - p;
      var pDate = new Date(
        viewMonth === 0 ? viewYear - 1 : viewYear,
        viewMonth === 0 ? 11 : viewMonth - 1,
        pDay
      );
      cells.push({ date: pDate, outside: true });
    }

    // Current month
    for (var c = 1; c <= totalDays; c++) {
      cells.push({ date: new Date(viewYear, viewMonth, c), outside: false });
    }

    // Next month leading days to fill last row(s)
    var remainder = cells.length % 7;
    if (remainder > 0) {
      var fill = 7 - remainder;
      for (var n = 1; n <= fill; n++) {
        var nDate = new Date(
          viewMonth === 11 ? viewYear + 1 : viewYear,
          viewMonth === 11 ? 0 : viewMonth + 1,
          n
        );
        cells.push({ date: nDate, outside: true });
      }
    }

    // If no focusedDate or focusedDate is outside visible range, default to 1st of month
    if (!focusedDate || focusedDate.getMonth() !== viewMonth || focusedDate.getFullYear() !== viewYear) {
      focusedDate = new Date(viewYear, viewMonth, 1);
    }

    // Build rows
    var row = null;
    for (var i = 0; i < cells.length; i++) {
      if (i % 7 === 0) {
        row = document.createElement('tr');
        gridBody.appendChild(row);
      }

      var cell = cells[i];
      var td = document.createElement('td');
      var btn = document.createElement('button');
      btn.className = 'rl-date-picker__day';
      btn.type = 'button';
      btn.setAttribute('role', 'gridcell');
      btn.setAttribute('aria-label', dateLabel(cell.date));

      if (cell.outside) {
        btn.classList.add('rl-date-picker__day--outside');
        btn.setAttribute('aria-disabled', 'true');
        btn.tabIndex = -1;
      } else if (isDateDisabled(cell.date)) {
        btn.setAttribute('aria-disabled', 'true');
        btn.tabIndex = -1;
      }

      if (isSameDay(cell.date, today)) {
        btn.setAttribute('aria-current', 'date');
      }

      if (isSameDay(cell.date, selectedDate)) {
        btn.setAttribute('aria-selected', 'true');
      }

      // Roving tabindex: only the focused date gets tabindex 0
      if (!cell.outside && isSameDay(cell.date, focusedDate)) {
        btn.tabIndex = 0;
      } else if (!cell.outside && !isDateDisabled(cell.date)) {
        btn.tabIndex = -1;
      }

      btn.textContent = cell.date.getDate();
      btn.dataset.date = cell.date.toISOString();

      td.appendChild(btn);
      row.appendChild(td);
    }
  }

  // ─── Open / Close ──────────────────────────────────────────────────

  function isOpen() {
    return input.getAttribute('aria-expanded') === 'true';
  }

  function openCalendar() {
    // If a date is selected, open to that month
    if (selectedDate) {
      viewYear = selectedDate.getFullYear();
      viewMonth = selectedDate.getMonth();
      focusedDate = new Date(selectedDate);
    }

    renderGrid();
    calendar.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close calendar');

    // Focus the roving-tabindex day
    requestAnimationFrame(function () {
      var focusTarget = gridBody.querySelector('button[tabindex="0"]');
      if (focusTarget) focusTarget.focus();
    });
  }

  function closeCalendar(returnFocus) {
    calendar.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open calendar');
    if (returnFocus) input.focus();
  }

  // ─── Selection ─────────────────────────────────────────────────────

  function selectDate(date) {
    if (isDateDisabled(date)) return;
    selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    input.value = formatDate(selectedDate);
    closeCalendar(true);
  }

  // ─── Month navigation ─────────────────────────────────────────────

  function goToPrevMonth() {
    if (viewMonth === 0) {
      viewMonth = 11;
      viewYear--;
    } else {
      viewMonth--;
    }
    focusedDate = new Date(viewYear, viewMonth, 1);
    renderGrid();
  }

  function goToNextMonth() {
    if (viewMonth === 11) {
      viewMonth = 0;
      viewYear++;
    } else {
      viewMonth++;
    }
    focusedDate = new Date(viewYear, viewMonth, 1);
    renderGrid();
  }

  // ─── Focus management inside grid ─────────────────────────────────

  function moveFocus(date) {
    // Clamp to current month boundaries or navigate months
    if (date.getMonth() !== viewMonth || date.getFullYear() !== viewYear) {
      viewYear = date.getFullYear();
      viewMonth = date.getMonth();
    }
    focusedDate = date;
    renderGrid();

    requestAnimationFrame(function () {
      var target = gridBody.querySelector('button[tabindex="0"]');
      if (target) target.focus();
    });
  }

  function getFocusedDateFromDOM() {
    var active = document.activeElement;
    if (active && active.dataset && active.dataset.date) {
      return new Date(active.dataset.date);
    }
    return focusedDate;
  }

  function addDays(date, n) {
    var d = new Date(date);
    d.setDate(d.getDate() + n);
    return d;
  }

  // ─── Event handlers ────────────────────────────────────────────────

  // Toggle button
  toggle.addEventListener('click', function () {
    if (isOpen()) {
      closeCalendar(true);
    } else {
      openCalendar();
    }
  });

  // Input: manual text entry
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown' || e.key === 'Down') {
      if (!isOpen()) {
        e.preventDefault();
        openCalendar();
      }
      return;
    }
    if (e.key === 'Escape' || e.key === 'Esc') {
      if (isOpen()) {
        e.preventDefault();
        closeCalendar(true);
      }
      return;
    }
    if (e.key === 'Enter') {
      // Parse manually typed date
      var parsed = parseInputDate(input.value);
      if (parsed) {
        selectedDate = parsed;
        viewYear = parsed.getFullYear();
        viewMonth = parsed.getMonth();
        focusedDate = new Date(parsed);
        input.value = formatDate(parsed);
      }
      if (isOpen()) {
        e.preventDefault();
        closeCalendar(true);
      }
      return;
    }
  });

  // Allow Enter on input also when calendar is closed to validate typed date
  input.addEventListener('change', function () {
    var parsed = parseInputDate(input.value);
    if (parsed && !isDateDisabled(parsed)) {
      selectedDate = parsed;
      viewYear = parsed.getFullYear();
      viewMonth = parsed.getMonth();
      focusedDate = new Date(parsed);
    }
  });

  // Prev / Next month buttons
  prevBtn.addEventListener('click', function () {
    goToPrevMonth();
    // Refocus inside grid
    requestAnimationFrame(function () {
      var target = gridBody.querySelector('button[tabindex="0"]');
      if (target) target.focus();
    });
  });

  nextBtn.addEventListener('click', function () {
    goToNextMonth();
    requestAnimationFrame(function () {
      var target = gridBody.querySelector('button[tabindex="0"]');
      if (target) target.focus();
    });
  });

  // Keyboard navigation inside the calendar
  calendar.addEventListener('keydown', function (e) {
    var key = e.key;

    // Escape closes from anywhere in the calendar
    if (key === 'Escape' || key === 'Esc') {
      e.preventDefault();
      closeCalendar(true);
      return;
    }

    // Arrow key navigation only applies when a grid cell is focused
    var current = getFocusedDateFromDOM();
    if (!current) return;

    var inGrid = document.activeElement &&
                 document.activeElement.closest('[data-dp="grid-body"]');
    if (!inGrid) return;

    var next = null;

    switch (key) {
      case 'ArrowRight':
      case 'Right':
        e.preventDefault();
        next = addDays(current, 1);
        break;
      case 'ArrowLeft':
      case 'Left':
        e.preventDefault();
        next = addDays(current, -1);
        break;
      case 'ArrowDown':
      case 'Down':
        e.preventDefault();
        next = addDays(current, 7);
        break;
      case 'ArrowUp':
      case 'Up':
        e.preventDefault();
        next = addDays(current, -7);
        break;
      case 'Home':
        e.preventDefault();
        // Go to first day of current week (Sunday)
        next = addDays(current, -current.getDay());
        break;
      case 'End':
        e.preventDefault();
        // Go to last day of current week (Saturday)
        next = addDays(current, 6 - current.getDay());
        break;
      case 'PageUp':
        e.preventDefault();
        // Previous month, same day
        next = new Date(current);
        next.setMonth(next.getMonth() - 1);
        break;
      case 'PageDown':
        e.preventDefault();
        // Next month, same day
        next = new Date(current);
        next.setMonth(next.getMonth() + 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isDateDisabled(current)) {
          selectDate(current);
        }
        return;
    }

    if (next) {
      // Skip disabled dates in the arrow direction
      while (isDateDisabled(next)) {
        if (key === 'ArrowRight' || key === 'Right' || key === 'ArrowDown' || key === 'Down' || key === 'PageDown') {
          next = addDays(next, 1);
        } else {
          next = addDays(next, -1);
        }
      }
      moveFocus(next);
    }
  });

  // Click on day cell
  gridBody.addEventListener('click', function (e) {
    var btn = e.target.closest('.rl-date-picker__day');
    if (!btn) return;
    if (btn.getAttribute('aria-disabled') === 'true') return;
    var date = new Date(btn.dataset.date);
    selectDate(date);
  });

  // Close when clicking outside
  document.addEventListener('mousedown', function (e) {
    if (!isOpen()) return;
    if (root.contains(e.target)) return;
    closeCalendar(false);
  });

  // ─── Initialise ────────────────────────────────────────────────────
  renderGrid();
})();
