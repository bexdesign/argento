// Argento Scientific — shared site header + footer + quote-list state.
// Every page sets `window.SITE_BASE` (a relative path back to docs/, e.g. '', '../', '../../')
// before loading this script, and includes `<div id="site-header"></div>` /
// `<div id="site-footer" data-note="..."></div>` placeholders where the chrome should render.
(() => {
  const BASE = window.SITE_BASE || '';
  const QUOTE_KEY = 'argento_quote_count';

  function getQuoteCount() {
    const n = parseInt(localStorage.getItem(QUOTE_KEY) || '0', 10);
    return Number.isFinite(n) ? n : 0;
  }
  function setQuoteCount(n) {
    localStorage.setItem(QUOTE_KEY, String(n));
    document.querySelectorAll('[data-quote-count]').forEach((el) => {
      el.textContent = String(n);
    });
  }
  window.ArgentoQuote = {
    get: getQuoteCount,
    add(qty) {
      const next = getQuoteCount() + qty;
      setQuoteCount(next);
      return next;
    }
  };

  const NAV = [
    {
      key: 'services', label: 'Column Services', minWidth: 250,
      links: [
        { label: 'Custom Column Packing', href: '#' },
        { label: 'Column Swap Program', href: BASE + 'index.html#swap' },
        { label: 'Resin &amp; Spec Library', href: '#' }
      ]
    },
    {
      key: 'products', label: 'Column Products', minWidth: 250,
      links: [
        { label: 'Column Storage &amp; Handling', href: '#' },
        { label: 'Column Accessories', href: '#' }
      ]
    },
    {
      key: 'fluid', label: 'Fluid Management', minWidth: 265,
      links: [
        { label: 'Waste Solvent Safety', href: '#' },
        { label: 'Solvent Extraction', href: '#' },
        { label: 'Fittings &amp; Tubing Assemblies', href: '#' },
        { label: 'SeptaCaps for Bottles + Vials', href: BASE + 'septacaps/index.html' }
      ]
    },
    {
      key: 'company', label: 'Company', minWidth: 220,
      links: [
        { label: 'Company Overview', href: '#' },
        { label: 'Contact', href: '#' }
      ]
    }
  ];

  function renderHeader() {
    const mount = document.getElementById('site-header');
    if (!mount) return;
    const navHtml = NAV.map((menu) => `
      <div class="nav-item" data-nav="${menu.key}">
        <button class="navtrig" type="button">${menu.label} <span style="font-size:10px">▾</span></button>
        <div class="nav-dropdown" style="min-width:${menu.minWidth}px">
          <div class="nav-dropdown-inner">
            ${menu.links.map((l) => `<a class="menu-link" href="${l.href}">${l.label}</a>`).join('')}
          </div>
        </div>
      </div>
    `).join('');

    mount.innerHTML = `
      <header class="site-header">
        <div class="header-row">
          <a href="${BASE}index.html" class="logo"><img src="${BASE}assets/argento-logo.png" alt="Argento Scientific"></a>
          <nav class="main-nav">${navHtml}</nav>
          <div class="header-quote">
            <a href="#">
              <span class="mono mono-label">Quote list</span>
              <span class="mono mono-count" data-quote-count>${getQuoteCount()}</span>
            </a>
          </div>
        </div>
        <div class="header-accent-line"></div>
      </header>
    `;

    mount.querySelectorAll('.nav-item').forEach((item) => {
      const trigger = item.querySelector('.navtrig');
      item.addEventListener('mouseenter', () => item.classList.add('open'));
      item.addEventListener('mouseleave', () => item.classList.remove('open'));
      trigger.addEventListener('click', () => {
        const wasOpen = item.classList.contains('open');
        mount.querySelectorAll('.nav-item.open').forEach((o) => o.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
      });
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-item')) {
        mount.querySelectorAll('.nav-item.open').forEach((o) => o.classList.remove('open'));
      }
    });
  }

  const FOOTER_COLUMNS = [
    { title: 'Column Services', links: [
      { label: 'Custom Column Packing', href: '#' },
      { label: 'Column Swap Program', href: BASE + 'index.html#swap' },
      { label: 'Resin &amp; Spec Library', href: '#' }
    ] },
    { title: 'Column Products', links: [
      { label: 'Column Storage &amp; Handling', href: '#' },
      { label: 'Column Accessories', href: '#' }
    ] },
    { title: 'Fluid Management', links: [
      { label: 'Waste Solvent Safety', href: '#' },
      { label: 'Solvent Extraction', href: '#' },
      { label: 'Fittings &amp; Tubing Assemblies', href: '#' },
      { label: 'SeptaCaps for Bottles + Vials', href: BASE + 'septacaps/index.html' }
    ] },
    { title: 'Company', links: [
      { label: 'Company Overview', href: '#' },
      { label: 'Contact', href: '#' }
    ], secondKicker: 'Quote', secondLinks: [
      { label: 'Quote List', href: '#' },
      { label: 'Account', href: '#' }
    ] }
  ];

  const DEFAULT_NOTE = '© 2026 Argento Scientific. All rights reserved.';

  function renderFooter() {
    const mount = document.getElementById('site-footer');
    if (!mount) return;
    const note = mount.getAttribute('data-note') || DEFAULT_NOTE;
    const columnsHtml = FOOTER_COLUMNS.map((col) => `
      <div class="col">
        <div class="kicker">${col.title}</div>
        ${col.links.map((l) => `<a href="${l.href}">${l.label}</a>`).join('')}
        ${col.secondKicker ? `<div class="kicker second">${col.secondKicker}</div>` : ''}
        ${col.secondLinks ? col.secondLinks.map((l) => `<a href="${l.href}">${l.label}</a>`).join('') : ''}
      </div>
    `).join('');

    mount.innerHTML = `
      <footer class="site-footer">
        <div class="footer-bg"></div>
        <div class="footer-top">
          <div class="footer-brand">
            <div class="name">Argento Scientific</div>
            <p>Bench-scale column hardware, column packing, solvent waste safety and accessories.</p>
            <div class="address">100 Cummings Center, Suite 451-C<br>Beverly, MA 01915<br>203-343-7679</div>
          </div>
          <div class="footer-links">${columnsHtml}</div>
        </div>
        <div class="footer-legal">
          <a href="#">Terms &amp; Conditions</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Shipping Policy</a>
          <a href="#">Return &amp; Refund Policy</a>
          <a href="#">Accessibility Statement</a>
          <a href="#">Cookie / Data Notice</a>
          <span class="note">${note}</span>
        </div>
      </footer>
    `;
  }

  function boot() {
    renderHeader();
    renderFooter();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
