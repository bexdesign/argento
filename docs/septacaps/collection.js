// Argento Scientific — SeptaCaps collection page (3a): filters run against
// variants the way Shopify's own collection filtering does.
(() => {
  const BASE = window.SITE_BASE || '';
  const { PRODUCTS, cardImage } = window.ArgentoProducts;

  const FILTER_GROUPS = [
    { key: 'container', label: 'Container', opts: [['all', 'All containers'], ['bottle', 'Bottles and carboys'], ['vial', 'Centrifuge vials']] },
    { key: 'cut', label: 'Septum cut', opts: [['all', 'Any cut'], ['Uncut', 'Uncut'], ['Cross-cut', 'Cross-cut'], ['Multi-cut', 'Multi-cut']] },
    { key: 'cfg', label: 'Configuration', opts: [['all', 'Any form'], ['Vial + cap', 'Vial + cap'], ['Cap only', 'Cap only']] }
  ];

  const state = { container: 'all', cut: 'all', cfg: 'all', sort: 'thread' };

  function matches(p) {
    return p.variants.filter((x) =>
      (state.cut === 'all' || x.sep === state.cut) &&
      (state.cfg === 'all' || x.cfg === state.cfg));
  }

  const SORTERS = {
    thread: (a, b) => a.order - b.order,
    title: (a, b) => a.title.localeCompare(b.title)
  };

  function renderFilters() {
    const mount = document.getElementById('filter-groups');
    mount.innerHTML = FILTER_GROUPS.map((g) => `
      <div class="facet-group">
        <div class="kicker">${g.label}</div>
        <div class="facets">
          ${g.opts.map(([val, label]) => `<button class="facet${state[g.key] === val ? ' facet-on' : ''}" data-group="${g.key}" data-value="${val}" type="button">${label}</button>`).join('')}
        </div>
      </div>
    `).join('');
    mount.querySelectorAll('.facet').forEach((btn) => {
      btn.addEventListener('click', () => {
        state[btn.dataset.group] = btn.dataset.value;
        render();
      });
    });
  }

  function render() {
    renderFilters();

    let shown = PRODUCTS.filter((p) => (state.container === 'all' || p.group === state.container) && matches(p).length > 0);
    shown = shown.slice().sort(SORTERS[state.sort] || SORTERS.thread);

    document.getElementById('shown-count').textContent = shown.length;
    document.getElementById('shown-variants').textContent = shown.reduce((n, p) => n + matches(p).length, 0);

    const active = FILTER_GROUPS.filter((g) => state[g.key] !== 'all').length;
    document.getElementById('filter-summary').textContent =
      active === 0 ? 'Whole collection' : active + (active === 1 ? ' filter applied' : ' filters applied');

    const grid = document.getElementById('results-grid');
    const empty = document.getElementById('empty-state');
    if (shown.length === 0) {
      grid.innerHTML = '';
      empty.hidden = false;
    } else {
      empty.hidden = true;
      grid.innerHTML = shown.map((p) => {
        const septa = Array.from(new Set(p.variants.map((x) => x.sep))).join(', ');
        const variantCount = matches(p).length;
        const href = BASE + 'septacaps/' + p.handle + '/index.html';
        return `
          <div class="pcard">
            <div class="plate"><img class="pimg" src="${cardImage(p, BASE)}" alt="${p.photo}"></div>
            <div class="card-body">
              <h3>${p.title}</h3>
              <p class="fits-line">${p.fits}</p>
              <div class="detail-grid">
                <span class="kicker">Thread</span><span class="mono">${p.thread}</span>
                <span class="kicker">Septum</span><span>${septa}</span>
                <span class="kicker">Options</span><span>${p.axesLabel}</span>
              </div>
              <div class="variant-count">${variantCount} ${variantCount === 1 ? 'variant' : 'variants'}</div>
              <a class="select-link" href="${href}">Select options</a>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  document.getElementById('sort-select').addEventListener('change', (e) => {
    state.sort = e.target.value;
    render();
  });
  function clearFilters() {
    state.container = 'all'; state.cut = 'all'; state.cfg = 'all';
    render();
  }
  document.getElementById('clear-filters').addEventListener('click', clearFilters);
  document.getElementById('clear-filters-empty').addEventListener('click', clearFilters);

  // Fit-help dialog.
  const helpScrim = document.getElementById('help-scrim');
  const helpForm = document.getElementById('help-form');
  function openHelp() { helpScrim.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeHelp() { helpScrim.classList.remove('open'); document.body.style.overflow = ''; }
  document.getElementById('open-help').addEventListener('click', openHelp);
  document.getElementById('help-close').addEventListener('click', closeHelp);
  helpScrim.addEventListener('click', (e) => { if (e.target === helpScrim) closeHelp(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && helpScrim.classList.contains('open')) closeHelp(); });
  helpForm.addEventListener('submit', (e) => { e.preventDefault(); helpForm.reset(); closeHelp(); });

  render();
})();
