// Argento Scientific — SeptaCaps product page. One template drives every
// product: it reads window.PRODUCT_HANDLE, looks up the product, and derives
// its option axes (1 for the bottle caps, 3 for the centrifuge lines) straight
// from the variant data, the way a real Shopify product template would.
(() => {
  const BASE = window.SITE_BASE || '';
  const P = window.ArgentoProducts;
  const product = P.byHandle(window.PRODUCT_HANDLE);
  if (!product) {
    document.getElementById('product-root').innerHTML = '<p style="padding:64px">Product not found.</p>';
    return;
  }

  const axes = P.productAxes(product);
  const isMultiAxis = axes.length > 1;
  const state = {
    selection: Object.fromEntries(axes.map((a) => [a.field, a.values[0]])),
    qty: 1,
    added: false
  };

  document.title = product.title + ' — Argento Scientific';

  function currentVariant() {
    return P.findVariant(product, state.selection);
  }

  function skuStem(v) {
    return v.sku.replace(/-(XC|MC|UC)$/, '');
  }

  function describeVariant(v) {
    return [v.brand, v.cfg, v.sep].filter(Boolean).join(' · ');
  }

  function renderBreadcrumb() {
    return `
      <div class="breadcrumb">
        <a href="#">Solvent safety</a><span class="sep">/</span>
        <a href="${BASE}septacaps/index.html">SeptaCaps</a><span class="sep">/</span>
        <span class="current">${product.title}</span>
      </div>
    `;
  }

  function renderThumbs() {
    if (product.group === 'vial') {
      const combos = [
        { brand: 'Falcon', sep: 'Uncut', alt: 'Falcon® profile, uncut septum' },
        { brand: 'Falcon', sep: 'Cross-cut', alt: 'Falcon® profile, cross-cut septum' },
        { brand: 'Generic', sep: 'Cross-cut', alt: 'Generic profile, cross-cut septum' },
        { brand: 'Generic', sep: 'Uncut', alt: 'Generic profile, uncut septum' }
      ];
      return combos.map((c) => {
        const on = state.selection.brand === c.brand && state.selection.sep === c.sep;
        return `<button class="thumb${on ? ' thumb-on' : ''}" data-brand="${c.brand}" data-sep="${c.sep}" title="${c.alt}">
          <img class="pimg" src="${P.mainImageFor(product, BASE, c)}" alt="${c.alt}"></button>`;
      }).join('');
    }
    const seps = P.AXIS_ORDER.sep.filter((s) => product.variants.some((v) => v.sep === s));
    const variantThumbs = seps.map((s) => {
      const on = state.selection.sep === s;
      return `<button class="thumb${on ? ' thumb-on' : ''}" data-sep="${s}" title="${s} septum">
        <img class="pimg" src="${P.mainImageFor(product, BASE, { sep: s })}" alt="${s} septum"></button>`;
    }).join('');
    const framed = `<button class="thumb" data-nonvariant title="In use"><img class="pimg" src="${P.photo(BASE, product.framedImg)}" alt="${product.photo}"></button>`;
    const dim = `<button class="thumb" data-nonvariant title="Dimensions"><img class="pimg" src="${P.photo(BASE, product.dimImg)}" alt="Dimensioned diagram"></button>`;
    return variantThumbs + framed + dim;
  }

  function renderVariantTable() {
    if (!isMultiAxis) return '';
    const hit = currentVariant();
    const rows = product.variants.map((v) => `
      <button class="vrow as-button" data-sku="${v.sku}" type="button">
        <span class="mono" style="color:var(--color-accent-700)">${v.sku}</span>
        <span>${v.brand === 'Falcon' ? 'Falcon®' : (v.brand || '')}</span>
        <span>${v.cfg}</span>
        <span>${v.sep}</span>
      </button>
    `).join('');
    return `
      <div class="variant-table-wrap">
        <div class="head-row">
          <h2>All ${product.variants.length} variant${product.variants.length === 1 ? '' : 's'}</h2>
          <span class="note">${product.variants.length} of ${P.totalCombinations(product)} possible combinations are made.</span>
        </div>
        <div class="vrow vrow-head">
          <span class="kicker">SKU</span><span class="kicker">Brand</span><span class="kicker">Configuration</span><span class="kicker">Septum</span>
        </div>
        ${rows}
      </div>
    `;
  }

  function renderGallery() {
    return `
      <div class="product-gallery">
        <div class="plate main"><img class="pimg" id="main-image" src="${P.mainImageFor(product, BASE, state.selection)}" alt=""></div>
        <div class="product-thumbs">${renderThumbs()}</div>
        <div class="measured-fit">
          <div class="plate"><img class="pimg" src="${P.photo(BASE, product.dimImg)}" alt="Dimensioned diagram"></div>
          <div>
            <div class="kicker">Measured fit</div>
            <p>${product.measuredFit || ('The cap seats on threads measuring ' + product.threadDiameter + ' across. Read the diagram against your own bottle before ordering.')}</p>
          </div>
        </div>
        ${renderVariantTable()}
      </div>
    `;
  }

  function renderAxisBlocks() {
    if (!isMultiAxis) {
      const field = axes[0].field;
      const options = axes[0].values.map((val) => {
        const variant = product.variants.find((v) => v[field] === val);
        const note = (product.cutNotes && product.cutNotes[val]) || P.DEFAULT_CUT_NOTES[val] || '';
        const on = state.selection[field] === val;
        return `
          <button class="optbtn${on ? ' optbtn-on' : ''}" data-value="${val}" type="button">
            <span class="opt-label">${val}</span>
            <span class="mono opt-sku">${variant ? variant.sku : ''}</span>
            <span class="opt-note">${note}</span>
          </button>
        `;
      }).join('');
      return `
        <div class="axis-block">
          <div class="kicker axis-label">${P.AXIS_META[field].name} <span class="chosen">— ${state.selection[field]}</span></div>
          <div class="options-2col">${options}</div>
        </div>
      `;
    }
    return axes.map((axis) => {
      const meta = P.AXIS_META[axis.field];
      const chosen = meta.labels[state.selection[axis.field]] || state.selection[axis.field];
      const opts = axis.values.map((val) => {
        const ok = P.axisValueReachable(product, axis.field, val, state.selection);
        const on = state.selection[axis.field] === val;
        const label = meta.labels[val] || val;
        return `<button class="pill${on ? ' pill-on' : ''}${ok ? '' : ' pill-off'}" data-field="${axis.field}" data-value="${val}" ${ok ? '' : 'disabled'} title="${ok ? '' : 'Not made in this combination'}">${label}</button>`;
      }).join('');
      return `
        <div class="axis-block">
          <div class="kicker axis-label">${meta.name} <span class="chosen">— ${chosen}</span></div>
          <div class="options-pills">${opts}</div>
        </div>
      `;
    }).join('');
  }

  function unavailableGuidance() {
    if (product.unavailableNote) return product.unavailableNote;
    const alternatives = product.variants.slice(0, 3).map(describeVariant).join('; ');
    return `No SKU exists for this exact combination. Made combinations: ${alternatives}.`;
  }

  function renderCompatTable(hit) {
    if (isMultiAxis) {
      return `
        <div class="compat-table">
          <div class="row"><span class="kicker">Vial</span><span class="val">${product.thread === '18 mm' ? '15 mL' : '50 mL'} centrifuge vial, non-sterile</span></div>
          <div class="row"><span class="kicker">Profiles</span><span class="val">Falcon® and generic — the <span class="mono">F</span> in the part number marks the Falcon® version</span></div>
          <div class="row"><span class="kicker">Septum</span><span class="val">EPDM, uncut or cross-cut</span></div>
          <div class="row"><span class="kicker">Variants</span><span class="val mono">${product.variants.length} of ${P.totalCombinations(product)} combinations built</span></div>
          <div class="row"><span class="kicker">Reuse</span><span class="val">Rugged design for repeated use</span></div>
        </div>
      `;
    }
    const skuList = product.variants.map((v) => v.sku).join(' · ');
    const cutLong = hit ? hit.sep.toLowerCase() : '';
    return `
      <div class="compat-table">
        <div class="row"><span class="kicker">Compatibility</span><span class="val">${product.fits}</span></div>
        <div class="row"><span class="kicker">Fits diameter</span><span class="val mono">${product.threadDiameter}</span></div>
        <div class="row"><span class="kicker">Septum</span><span class="val">EPDM, ${cutLong}</span></div>
        <div class="row"><span class="kicker">Variants</span><span class="val mono">${skuList}</span></div>
        <div class="row"><span class="kicker">Reuse</span><span class="val">Rugged design for repeated use</span></div>
      </div>
    `;
  }

  function renderBuyColumn() {
    const hit = currentVariant();
    const unavailable = isMultiAxis && !hit;
    const desc = product.heroDesc || `SeptaCaps provide a quick, easy way to secure tubing while reducing contamination and evaporation. ${product.fits.charAt(0).toUpperCase()}${product.fits.slice(1)}.`;
    const qtyNote = isMultiAxis
      ? 'Priced by quote. Case quantities and standing orders — ask us.'
      : 'Ships from Beverly, MA. Bulk or standing-order quantities — ask us rather than adding a hundred to your quote list.';

    return `
      <div class="buy-column">
        <span class="kicker sku-kicker">SeptaCaps™</span>
        <h1>${product.pdpTitle || product.title}</h1>
        <p class="desc">${desc}</p>
        <div class="sku-row"><span class="mono sku">${hit ? hit.sku : '—'}</span></div>
        <p class="quote-note">${unavailable ? 'No SKU exists for this combination.' : 'Priced by quote — added to a quote list, not a cart.'}</p>

        ${renderAxisBlocks()}

        ${unavailable ? `<div class="callout" style="margin-top:20px"><div class="title">That combination is not made</div><p>${unavailableGuidance()}</p></div>` : ''}

        <div class="buy-actions">
          <div class="qty-stepper">
            <button type="button" data-qty="dec" aria-label="Fewer">−</button>
            <span class="qty-value" id="qty-value">${state.qty}</span>
            <button type="button" data-qty="inc" aria-label="More">+</button>
          </div>
          <button class="btn-signal" id="add-to-quote" type="button" ${unavailable ? 'disabled' : ''}>${unavailable ? 'Unavailable' : (state.added ? 'Added to quote' : 'Add to quote')}</button>
        </div>
        <p class="ships-note">${qtyNote}</p>

        <div class="variant-table-wrap" style="margin-top:30px">${renderCompatTable(hit)}</div>
      </div>
    `;
  }

  function renderChoosingCut() {
    if (isMultiAxis) return '';
    const members = product.crossRefGroup
      ? P.PRODUCTS.filter((p) => p.crossRefGroup === product.crossRefGroup)
      : [];
    const careful = members.length > 1 ? `
      <div class="careful-panel">
        <div class="careful-panel-bg"></div>
        <div class="careful-panel-inner">
          <div class="kicker">Careful with ${product.threadDiameter}</div>
          <p>${members.length} different SeptaCaps threads in this catalog all measure ${product.threadDiameter} across. Match the bottle, not just the caliper reading.</p>
          <div class="careful-list">
            ${members.map((m) => `
              <div>
                <span class="mono sku">${skuStem(m.variants[0])}-XC/-MC</span>
                <span class="label">${m.key === product.key ? m.title + ' — this page' : `<a href="${BASE}septacaps/${m.handle}/index.html">${m.title}</a>`}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    ` : '';

    return `
      <section class="choosing-cut">
        <div>
          <span class="kicker">Choosing a cut</span>
          <h2>Cross-cut or multi-cut</h2>
          <p>Both caps are identical apart from the septum. The cross-cut septum carries a single cross. The multi-cut carries several, for setups that run more than one line into the same bottle.</p>
        </div>
        ${careful || '<div></div>'}
      </section>
    `;
  }

  function renderNearbyThreads() {
    if (isMultiAxis) return '';
    const siblings = P.PRODUCTS.filter((p) => p.group === 'bottle' && p.key !== product.key)
      .sort((a, b) => Math.abs(a.order - product.order) - Math.abs(b.order - product.order))
      .slice(0, 3);
    const cards = siblings.map((p) => `
      <div class="pcard">
        <div class="plate"><img class="pimg" src="${P.cardImage(p, BASE)}" alt="${p.photo}"></div>
        <div class="card-body">
          <h3>${p.title}</h3>
          <p>${p.fits}</p>
          <span class="mono skus">${skuStem(p.variants[0])}</span>
          <a class="select-link" href="${BASE}septacaps/${p.handle}/index.html">Select options →</a>
        </div>
      </div>
    `).join('');
    return `
      <section class="nearby-threads">
        <div class="nearby-threads-head">
          <h2>Nearby threads</h2>
          <a href="${BASE}septacaps/index.html">All SeptaCaps →</a>
        </div>
        <div class="related-grid">${cards}</div>
      </section>
    `;
  }

  function renderAwaitingFlag() {
    const bits = ['<strong>Published is <span class="mono">FALSE</span></strong> in the source sheet for every variant on this page — it cannot go live until Adrian publishes it in Shopify.'];
    if (isMultiAxis) {
      bits.push(`<strong>Sparse variant matrix.</strong> ${P.AXIS_META[axes[0].field].name} × ${axes.slice(1).map((a) => P.AXIS_META[a.field].name).join(' × ')} allows ${P.totalCombinations(product)} combinations, but only ${product.variants.length} exist in the sheet. The picker greys out values that cannot be reached from the current selection rather than linking to a dead SKU.`);
    }
    if (product.key === 'b48r') {
      bits.push('Selection guidance — how many tubes each cut is rated for, and whether needle sampling favours one — is not in the catalog or the sheet. This panel stays deliberately thin until Adrian supplies it.');
    }
    return `
      <div class="awaiting-flag">
        <div class="callout-flag">
          <span class="tag tag-accent-2" style="flex:none">Awaiting Adrian</span>
          <div>${bits.map((b) => `<p>${b}</p>`).join('')}</div>
        </div>
      </div>
    `;
  }

  function renderAddBar() {
    return `
      <div class="sticky-bar add-bar" id="add-bar">
        <span class="headline">Added — <span class="mono sku-note" id="add-bar-sku"></span> × <span id="add-bar-qty"></span></span>
        <a href="${BASE}septacaps/${product.handle}/index.html" style="margin-left:auto;font-size:15px">Keep browsing</a>
        <button class="btn-signal" type="button">View quote list</button>
      </div>
    `;
  }

  function render() {
    const existingBar = document.getElementById('add-bar');
    if (existingBar) existingBar.classList.remove('show');
    const root = document.getElementById('product-root');
    root.innerHTML = `
      ${renderBreadcrumb()}
      <div class="product-layout">
        ${renderGallery()}
        ${renderBuyColumn()}
      </div>
      ${renderChoosingCut()}
      ${renderNearbyThreads()}
      ${renderAwaitingFlag()}
    `;
    wire();
  }

  function wire() {
    const root = document.getElementById('product-root');

    root.querySelectorAll('.thumb[data-sep]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.selection.sep = btn.dataset.sep;
        if (btn.dataset.brand) state.selection.brand = btn.dataset.brand;
        state.added = false;
        render();
      });
    });
    root.querySelectorAll('.optbtn[data-value]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.selection[axes[0].field] = btn.dataset.value;
        state.added = false;
        render();
      });
    });
    root.querySelectorAll('.pill[data-field]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        state.selection[btn.dataset.field] = btn.dataset.value;
        state.added = false;
        render();
      });
    });
    root.querySelectorAll('.vrow.as-button').forEach((btn) => {
      btn.addEventListener('click', () => {
        const v = product.variants.find((x) => x.sku === btn.dataset.sku);
        if (v) {
          axes.forEach((a) => { if (v[a.field] != null) state.selection[a.field] = v[a.field]; });
          state.added = false;
          render();
        }
      });
    });
    const qtyEl = root.querySelector('#qty-value');
    root.querySelectorAll('[data-qty]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.qty = btn.dataset.qty === 'inc' ? state.qty + 1 : Math.max(1, state.qty - 1);
        qtyEl.textContent = state.qty;
      });
    });
    const addBtn = root.querySelector('#add-to-quote');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        const hit = currentVariant();
        if (!hit) return;
        window.ArgentoQuote.add(state.qty);
        state.added = true;
        const bar = document.getElementById('add-bar');
        document.getElementById('add-bar-sku').textContent = hit.sku;
        document.getElementById('add-bar-qty').textContent = state.qty;
        bar.classList.add('show');
        addBtn.textContent = 'Added to quote';
      });
    }
  }

  render();
  document.body.insertAdjacentHTML('beforeend', renderAddBar());
})();
