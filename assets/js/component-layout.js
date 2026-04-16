(function () {

  var GROUPS = [
    {
      label: 'Input & Forms',
      items: [
        { name: 'Autocomplete',          href: '../autocomplete/index.html' },
        { name: 'Checkbox',              href: '../checkbox/index.html' },
        { name: 'Combobox',              href: '../combobox/index.html' },
        { name: 'Date Picker',           href: '../date-picker/index.html' },
        { name: 'File Upload',           href: '../file-upload/index.html' },
        { name: 'Password Input Toggle', href: '../password-input-toggle/index.html' },
        { name: 'Radio Button',          href: '../radio-button/index.html' },
        { name: 'Search Input',          href: '../search-input/index.html' },
        { name: 'Select',                href: '../select/index.html' },
        { name: 'Slider',                href: '../slider/index.html' },
        { name: 'Text Input',            href: '../text-input/index.html' },
        { name: 'Toggle Switch',         href: '../toggle-switch/index.html' }
      ]
    },
    {
      label: 'Navigation',
      items: [
        { name: 'Breadcrumbs',     href: '../breadcrumbs/index.html' },
        { name: 'Dropdown',        href: '../dropdown/index.html' },
        { name: 'Link',            href: '../link/index.html' },
        { name: 'Mega Navigation', href: '../mega-navigation/index.html' },
        { name: 'Pagination',      href: '../pagination/index.html' },
        { name: 'Skip Navigation', href: '../skip-navigation/index.html' },
        { name: 'Tabs',            href: '../tabs/index.html' }
      ]
    },
    {
      label: 'Disclosure & Overlays',
      items: [
        { name: 'Accordion',      href: '../accordion/index.html' },
        { name: 'Alert Dialog',   href: '../alert-dialog/index.html' },
        { name: 'Cookie Consent', href: '../cookie-consent/index.html' },
        { name: 'Dialog',         href: '../dialog/index.html' },
        { name: 'Disclosure',     href: '../disclosure/index.html' },
        { name: 'Modal',          href: '../modal/index.html' },
        { name: 'Popover',        href: '../popover/index.html' },
        { name: 'Tooltip',        href: '../tooltip/index.html' }
      ]
    },
    {
      label: 'Feedback & Status',
      items: [
        { name: 'Alert',        href: '../alert/index.html' },
        { name: 'Badge',        href: '../badge/index.html' },
        { name: 'Progress Bar', href: '../progress-bar/index.html' },
        { name: 'Tag',          href: '../tag/index.html' },
        { name: 'Toast',        href: '../toast/index.html' }
      ]
    },
    {
      label: 'Data Display & Media',
      items: [
        { name: 'Avatar',        href: '../avatar/index.html' },
        { name: 'Button',        href: '../button/index.html' },
        { name: 'Card',          href: '../card/index.html' },
        { name: 'Card List',     href: '../card-list/index.html' },
        { name: 'Carousel',      href: '../carousel/index.html' },
        { name: 'Image Gallery', href: '../image-gallery/index.html' },
        { name: 'Listbox',       href: '../listbox/index.html' },
        { name: 'Table',         href: '../table/index.html' },
        { name: 'Video',         href: '../video/index.html' }
      ]
    },
    {
      label: 'Commerce Patterns',
      items: [
        { name: 'Cart Summary',     href: '../cart-summary/index.html' },
        { name: 'Faceted Filter',   href: '../faceted-filter/index.html' },
        { name: 'Mini Cart',        href: '../mini-cart/index.html' },
        { name: 'Price',            href: '../price/index.html' },
        { name: 'Product Card',     href: '../product-card/index.html' },
        { name: 'Quantity Stepper', href: '../quantity-stepper/index.html' },
        { name: 'Review Comment',   href: '../review-comment/index.html' },
        { name: 'Sale Price',       href: '../sale-price/index.html' },
        { name: 'Star Rating',      href: '../star-rating/index.html' },
        { name: 'Variant Selector', href: '../variant-selector/index.html' },
        { name: 'Wishlist Button',  href: '../wishlist-button/index.html' }
      ]
    }
  ];

  // ── Left nav ────────────────────────────────────────────────────────────────

  function buildLeftNav() {
    var currentPath = window.location.pathname;

    var nav = document.createElement('nav');
    nav.className = 'sidebar-left';
    nav.setAttribute('aria-label', 'Component navigation');

    // Skip link
    var skip = document.createElement('a');
    skip.className = 'sidebar-left__skip';
    skip.href = '#main-content';
    skip.textContent = 'Skip to main content';
    nav.appendChild(skip);

    // Scrollable inner wrapper
    var scroll = document.createElement('div');
    scroll.className = 'sidebar-left__scroll';
    nav.appendChild(scroll);

    function buildGroup(label, items) {
      var groupHeading = document.createElement('p');
      groupHeading.className = 'sidebar-left__group';
      groupHeading.textContent = label;
      scroll.appendChild(groupHeading);

      var ul = document.createElement('ul');
      ul.className = 'sidebar-left__list';

      items.forEach(function (item) {
        var folder = item.href.replace('../', '').replace('/index.html', '');
        var isCurrent = currentPath.indexOf('/' + folder + '/') !== -1;

        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = item.href;
        a.textContent = item.name;
        a.className = 'sidebar-left__link' + (isCurrent ? ' sidebar-left__link--active' : '');
        if (isCurrent) a.setAttribute('aria-current', 'page');

        li.appendChild(a);
        ul.appendChild(li);
      });

      scroll.appendChild(ul);
    }

    GROUPS.forEach(function (group) {
      buildGroup(group.label, group.items);
    });

    return nav;
  }

  // ── Right TOC ────────────────────────────────────────────────────────────────

  function slugify(text) {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }

  function buildRightTOC() {
    var nav = document.createElement('nav');
    nav.className = 'sidebar-right';
    nav.setAttribute('aria-label', 'On this page');

    var tocHeading = document.createElement('p');
    tocHeading.className = 'sidebar-right__heading';
    tocHeading.textContent = 'On this page';
    nav.appendChild(tocHeading);

    var ul = document.createElement('ul');
    ul.className = 'sidebar-right__list';

    var h2s = Array.from(document.querySelectorAll('main h2'));
    h2s.forEach(function (h2) {
      if (!h2.id) h2.id = slugify(h2.textContent);

      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + h2.id;
      a.textContent = h2.textContent;
      a.className = 'sidebar-right__link';
      li.appendChild(a);
      ul.appendChild(li);
    });

    nav.appendChild(ul);

    // Highlight active section on scroll
    if ('IntersectionObserver' in window) {
      var links = Array.from(ul.querySelectorAll('.sidebar-right__link'));
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            links.forEach(function (l) { l.classList.remove('sidebar-right__link--active'); });
            var active = ul.querySelector('a[href="#' + entry.target.id + '"]');
            if (active) active.classList.add('sidebar-right__link--active');
          }
        });
      }, { rootMargin: '0px 0px -70% 0px', threshold: 0 });

      h2s.forEach(function (h2) { observer.observe(h2); });
    }

    return nav;
  }

  // ── Component folder from URL ─────────────────────────────────────────────

  function getComponentFolder() {
    var parts = window.location.pathname.split('/').filter(Boolean);
    var compIdx = parts.indexOf('components');
    return compIdx !== -1 ? parts[compIdx + 1] : null;
  }

  function buildComplianceSectionSkeleton() {
    var section = document.createElement('div');
    section.className = 'section rlb-compliance-snapshot';

    var heading = document.createElement('h2');
    heading.textContent = 'Compliance';
    section.appendChild(heading);

    var content = document.createElement('div');
    content.className = 'rlb-compliance-snapshot__content';
    content.innerHTML = '<p>Loading compliance summary...</p>';
    section.appendChild(content);

    return { section: section, content: content };
  }

  function countFor(value) {
    return Array.isArray(value) ? value.length : 0;
  }

  function insertComplianceSnapshot(folder) {
    if (!folder) return;

    var main = document.querySelector('main');
    if (!main) return;

    var existing = main.querySelector('.rlb-compliance-snapshot');
    if (existing) return;

    var skeleton = buildComplianceSectionSkeleton();
    var section = skeleton.section;
    var content = skeleton.content;

    var codeHeading = Array.from(main.querySelectorAll('h2')).find(function (h2) {
      return h2.textContent.trim() === 'Code';
    });

    var codeSection = codeHeading ? (codeHeading.closest('.section') || codeHeading.parentElement) : null;
    if (codeSection && codeSection.parentNode) {
      var nextSection = codeSection.nextElementSibling;
      if (nextSection) {
        codeSection.parentNode.insertBefore(section, nextSection);
      } else {
        codeSection.parentNode.appendChild(section);
      }
    } else {
      main.appendChild(section);
    }

    fetch('./labs.manifest.json')
      .then(function (r) {
        if (!r.ok) throw new Error('manifest-not-found');
        return r.json();
      })
      .then(function (manifest) {
        var implemented = countFor(manifest.implements);
        var partial = countFor(manifest.partial);
        var missing = countFor(manifest.missing);
        var notApplicable = countFor(manifest.notApplicable);

        content.innerHTML = '' +
          '<table class="rlb-compliance-snapshot__table">' +
            '<thead><tr><th scope="col">Status</th><th scope="col">AC Count</th></tr></thead>' +
            '<tbody>' +
              '<tr><td>Passed</td><td>' + implemented + '</td></tr>' +
              '<tr><td>Partial</td><td>' + partial + '</td></tr>' +
              '<tr><td>Missing</td><td>' + missing + '</td></tr>' +
              '<tr><td>Not Applicable</td><td>' + notApplicable + '</td></tr>' +
            '</tbody>' +
          '</table>' +
          '<p><strong>Proprietary notice:</strong> Full acceptance criteria definitions are proprietary IP in the private @resonance/specs package and are intentionally not reproduced in this repository.</p>';
      })
      .catch(function () {
        content.innerHTML = '' +
          '<p>Compliance summary is unavailable for this component.</p>' +
          '<p class="rlb-compliance-snapshot__meta">labs.manifest.json could not be loaded from this folder.</p>';
      });
  }

  // ── Remove Reference Implementation section ───────────────────────────────

  function removeReferenceSection() {
    var h2s = document.querySelectorAll('main h2');
    h2s.forEach(function (h2) {
      if (h2.textContent.trim() === 'Reference Implementation') {
        var section = h2.closest('.section') || h2.parentElement;
        if (section) section.parentNode.removeChild(section);
      }
    });
  }

  // ── GitHub buttons in code panels ─────────────────────────────────────────

  var GITHUB_ICON = '<svg aria-hidden="true" width="15" height="15" viewBox="0 0 18 18"><path fill="currentColor" d="M9 1a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 9 1"/></svg>';

  function injectGithubButtons(folder) {
    if (!folder) return;
    var githubUrl = 'https://github.com/Accenture/resonance-labs/tree/main/components/' + folder;
    var copyBtns = document.querySelectorAll('.code-preview__copy');
    copyBtns.forEach(function (copyBtn) {
      var wrapper = document.createElement('div');
      wrapper.className = 'code-preview__actions';
      copyBtn.parentNode.insertBefore(wrapper, copyBtn);
      wrapper.appendChild(copyBtn);

      var githubLink = document.createElement('a');
      githubLink.className = 'code-preview__github';
      githubLink.href = githubUrl;
      githubLink.target = '_blank';
      githubLink.rel = 'noopener';
      githubLink.setAttribute('aria-label', 'View on GitHub, opens in a new tab');
      githubLink.innerHTML = GITHUB_ICON + ' GitHub';
      wrapper.appendChild(githubLink);
    });
  }

  // ── Prev / Next navigation ────────────────────────────────────────────────

  function buildPrevNext(folder) {
    if (!folder) return null;

    var ALL = GROUPS.reduce(function (acc, group) {
      return acc.concat(group.items);
    }, []);
    var currentIdx = -1;
    ALL.forEach(function (item, i) {
      var itemFolder = item.href.replace('../', '').replace('/index.html', '');
      if (itemFolder === folder) currentIdx = i;
    });

    if (currentIdx === -1) return null;

    var prev = currentIdx > 0 ? ALL[currentIdx - 1] : null;
    var next = currentIdx < ALL.length - 1 ? ALL[currentIdx + 1] : null;

    var nav = document.createElement('nav');
    nav.className = 'comp-nav';
    nav.setAttribute('aria-label', 'Component pagination');

    var prevEl = document.createElement('div');
    prevEl.className = 'comp-nav__item comp-nav__item--prev';
    if (prev) {
      var prevLink = document.createElement('a');
      prevLink.href = prev.href;
      prevLink.className = 'comp-nav__link';
      prevLink.innerHTML =
        '<span class="comp-nav__label">Previous</span>' +
        '<span class="comp-nav__name">' +
          '<img src="../../assets/images/chevron-left.svg" alt="" width="14" height="14" aria-hidden="true" />' +
          prev.name +
        '</span>';
      prevEl.appendChild(prevLink);
    }
    nav.appendChild(prevEl);

    var nextEl = document.createElement('div');
    nextEl.className = 'comp-nav__item comp-nav__item--next';
    if (next) {
      var nextLink = document.createElement('a');
      nextLink.href = next.href;
      nextLink.className = 'comp-nav__link';
      nextLink.innerHTML =
        '<span class="comp-nav__label">Next</span>' +
        '<span class="comp-nav__name">' +
          next.name +
          '<img src="../../assets/images/chevron-right.svg" alt="" width="14" height="14" aria-hidden="true" />' +
        '</span>';
      nextEl.appendChild(nextLink);
    }
    nav.appendChild(nextEl);

    return nav;
  }

  // ── Footer version ───────────────────────────────────────────────────────

  function injectFooterVersion() {
    var footer = document.querySelector('footer');
    if (!footer) return;

    var copyrightLine = footer.querySelector('p:last-of-type');
    if (!copyrightLine) return;

    fetch('../../package.json')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (pkg) {
        if (!pkg || !pkg.version) return;

        var existing = copyrightLine.querySelector('.site-version');
        if (existing) {
          existing.textContent = ' | Version v' + pkg.version;
          return;
        }

        var marker = document.createElement('span');
        marker.className = 'site-version';
        marker.textContent = ' | Version v' + pkg.version;
        copyrightLine.appendChild(marker);
      })
      .catch(function () {
        // Keep footer unchanged if metadata cannot be loaded.
      });
  }

  // ── Init ─────────────────────────────────────────────────────────────────────

  function init() {
    var main = document.querySelector('main');
    if (!main) return;

    if (!main.id) main.id = 'main-content';

    var folder = getComponentFolder();

    removeReferenceSection();
    injectGithubButtons(folder);
    insertComplianceSnapshot(folder);

    var layout = document.createElement('div');
    layout.className = 'page-layout';

    main.parentNode.insertBefore(layout, main);
    layout.appendChild(buildLeftNav());
    layout.appendChild(main);
    layout.appendChild(buildRightTOC());

    // Prev/Next nav appended inside main, after all sections
    var prevNext = buildPrevNext(folder);
    if (prevNext) main.appendChild(prevNext);

    injectFooterVersion();

    // Scroll active left nav item into view
    var activeLink = layout.querySelector('.sidebar-left__link--active');
    if (activeLink) activeLink.scrollIntoView({ block: 'nearest' });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
