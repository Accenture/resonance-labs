(function () {

  var CORE = [
    { name: 'Accordion',              href: '../accordion/index.html' },
    { name: 'Alert',                  href: '../alert/index.html' },
    { name: 'Alert Dialog',           href: '../alert-dialog/index.html' },
    { name: 'Autocomplete',           href: '../autocomplete/index.html' },
    { name: 'Avatar',                 href: '../avatar/index.html' },
    { name: 'Badge',                  href: '../badge/index.html' },
    { name: 'Breadcrumbs',            href: '../breadcrumbs/index.html' },
    { name: 'Button',                 href: '../button/index.html' },
    { name: 'Card',                   href: '../card/index.html' },
    { name: 'Card List',              href: '../card-list/index.html' },
    { name: 'Carousel',               href: '../carousel/index.html' },
    { name: 'Checkbox',               href: '../checkbox/index.html' },
    { name: 'Combobox',               href: '../combobox/index.html' },
    { name: 'Cookie Consent',         href: '../cookie-consent/index.html' },
    { name: 'Date Picker',            href: '../date-picker/index.html' },
    { name: 'Dialog',                 href: '../dialog/index.html' },
    { name: 'Disclosure',             href: '../disclosure/index.html' },
    { name: 'Dropdown',               href: '../dropdown/index.html' },
    { name: 'File Upload',            href: '../file-upload/index.html' },
    { name: 'Link',                   href: '../link/index.html' },
    { name: 'Listbox',                href: '../listbox/index.html' },
    { name: 'Mega Navigation',        href: '../mega-navigation/index.html' },
    { name: 'Modal',                  href: '../modal/index.html' },
    { name: 'Pagination',             href: '../pagination/index.html' },
    { name: 'Password Input Toggle',  href: '../password-input-toggle/index.html' },
    { name: 'Pill',                   href: '../pill/index.html' },
    { name: 'Popover',                href: '../popover/index.html' },
    { name: 'Progress Bar',           href: '../progress-bar/index.html' },
    { name: 'Radio Button',           href: '../radio-button/index.html' },
    { name: 'Search Input',           href: '../search-input/index.html' },
    { name: 'Select',                 href: '../select/index.html' },
    { name: 'Skip Navigation',        href: '../skip-navigation/index.html' },
    { name: 'Slider',                 href: '../slider/index.html' },
    { name: 'Table',                  href: '../table/index.html' },
    { name: 'Tabs',                   href: '../tabs/index.html' },
    { name: 'Text Input',             href: '../text-input/index.html' },
    { name: 'Toggle Switch',          href: '../toggle-switch/index.html' },
    { name: 'Tooltip',                href: '../tooltip/index.html' },
    { name: 'Video',                  href: '../video/index.html' },
  ];

  var ECOMMERCE = [
    { name: 'Cart Summary',      href: '../cart-summary/index.html' },
    { name: 'Faceted Filter',    href: '../faceted-filter/index.html' },
    { name: 'Image Gallery',     href: '../image-gallery/index.html' },
    { name: 'Mini Cart',         href: '../mini-cart/index.html' },
    { name: 'Price',             href: '../price/index.html' },
    { name: 'Product Card',      href: '../product-card/index.html' },
    { name: 'Quantity Stepper',  href: '../quantity-stepper/index.html' },
    { name: 'Review Comment',    href: '../review-comment/index.html' },
    { name: 'Sale Price',        href: '../sale-price/index.html' },
    { name: 'Star Rating',       href: '../star-rating/index.html' },
    { name: 'Variant Selector',  href: '../variant-selector/index.html' },
    { name: 'Wishlist Button',   href: '../wishlist-button/index.html' },
  ];

  // ── Left nav ────────────────────────────────────────────────────────────────

  function buildLeftNav() {
    var currentPath = window.location.pathname;

    var nav = document.createElement('nav');
    nav.className = 'sidebar-left';
    nav.setAttribute('aria-label', 'Component navigation');

    function buildGroup(label, items) {
      var groupHeading = document.createElement('p');
      groupHeading.className = 'sidebar-left__group';
      groupHeading.textContent = label;
      nav.appendChild(groupHeading);

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

      nav.appendChild(ul);
    }

    buildGroup('Core', CORE);
    buildGroup('eCommerce', ECOMMERCE);

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

  // ── Init ─────────────────────────────────────────────────────────────────────

  function init() {
    var main = document.querySelector('main');
    if (!main) return;

    var layout = document.createElement('div');
    layout.className = 'page-layout';

    main.parentNode.insertBefore(layout, main);
    layout.appendChild(buildLeftNav());
    layout.appendChild(main);
    layout.appendChild(buildRightTOC());

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
