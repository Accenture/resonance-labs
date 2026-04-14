(function () {
  function componentKeyFromHref(href) {
    if (!href) return null;
    var match = href.match(/components\/([^/]+)\/index\.html$/);
    return match ? match[1] : null;
  }

  function createBadge(text, isFallback) {
    var badge = document.createElement('span');
    badge.className = 'rlw-component-card__compliance-badge' + (isFallback ? ' rlw-component-card__compliance-badge--fallback' : '');
    badge.textContent = text;
    return badge;
  }

  function createBadgeRow() {
    var row = document.createElement('div');
    row.className = 'rlw-component-card__compliance-row';
    return row;
  }

  function init() {
    var cards = Array.from(document.querySelectorAll('.rlw-component-card[href*="components/"]'));
    if (cards.length === 0) return;

    cards.forEach(function (card) {
      var key = componentKeyFromHref(card.getAttribute('href'));
      if (!key) return;

      var content = card.querySelector('.rlw-component-card__content');
      if (!content || content.querySelector('.rlw-component-card__compliance-badge')) return;

      fetch('components/' + key + '/labs.manifest.json')
        .then(function (r) {
          if (!r.ok) throw new Error('manifest-not-found');
          return r.json();
        })
        .then(function (manifest) {
          var i = Array.isArray(manifest.implements) ? manifest.implements.length : 0;
          var p = Array.isArray(manifest.partial) ? manifest.partial.length : 0;
          var m = Array.isArray(manifest.missing) ? manifest.missing.length : 0;
          var row = createBadgeRow();
          row.appendChild(createBadge('passed: ' + i, false));
          row.appendChild(createBadge('partial: ' + p, false));
          row.appendChild(createBadge('missing: ' + m, false));
          content.appendChild(row);
        })
        .catch(function () {
          var row = createBadgeRow();
          row.appendChild(createBadge('passed: N/A', true));
          row.appendChild(createBadge('partial: N/A', true));
          row.appendChild(createBadge('missing: N/A', true));
          content.appendChild(row);
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
