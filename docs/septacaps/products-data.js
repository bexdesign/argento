// Argento Scientific — SeptaCaps product/variant data.
// From the client's SeptaCaps_Master_draft (Shopify_Recommended) sheet, via the
// Aug 2026 design handoff. SKUs, handles and option values are authoritative —
// reproduce them exactly. QB Sales Price / QB Cost stay out of the UI until the
// client signs off a web price list (every variant is Commerce Mode = Quote).
//
// NOTE ON COPY: the design handoff wrote bespoke marketing copy for two product
// pages only — "48 mm Corning roller bottles" (b48r) and "50 mL centrifuge vials"
// (v50). The other 7 products render through the same template with copy
// generated from this sheet data (title/fits/thread) rather than invented prose —
// swap in real copy here (`heroDesc`) whenever the client supplies it.
(function () {
  const PRODUCTS = [
    {
      key: 'v15', title: 'SeptaCaps for 15 mL Centrifuge Vials', handle: 'septacaps-15-ml-centrifuge-vials',
      group: 'vial', thread: '18 mm', threadDiameter: '18 mm – 20 mm', order: 1,
      fits: 'Falcon® and generic 15 mL centrifuge vials; non-sterile',
      axesLabel: 'Brand · Configuration · Septum', photo: '15 mL centrifuge vial with a SeptaCap fitted',
      imgPrefix: 'p03', dimImg: 'p03-dim-18-20mm', framedImg: 'p03-framed-15ml',
      variants: [
        { sku: 'AR-SVF18PE-UC', brand: 'Falcon', cfg: 'Vial + cap', sep: 'Uncut' },
        { sku: 'AR-SVF18PE-XC', brand: 'Falcon', cfg: 'Vial + cap', sep: 'Cross-cut' },
        { sku: 'AR-SC18PE-XC', brand: 'Generic', cfg: 'Cap only', sep: 'Cross-cut' }
      ]
    },
    {
      key: 'v50', title: 'SeptaCaps for 50 mL Centrifuge Vials', handle: 'septacaps-50-ml-centrifuge-vials',
      group: 'vial', thread: '30 mm', threadDiameter: '30 mm – 32 mm', order: 2,
      fits: 'Falcon® and generic 50 mL centrifuge vials; non-sterile',
      axesLabel: 'Brand · Configuration · Septum', photo: '50 mL centrifuge vial with a SeptaCap fitted',
      imgPrefix: 'p04', dimImg: 'p04-dim-30-32mm', framedImg: 'p04-framed-50ml',
      heroDesc: 'SeptaCaps provide a quick, easy way to secure tubing while reducing contamination and evaporation. Order the vial with a SeptaCap already fitted, or a replacement cap for vials you already run.',
      measuredFit: 'The 50 mL cap seats on a 30–32 mm vial neck. The 15 mL line takes the smaller 18–20 mm cap — see the collection.',
      unavailableNote: 'Generic 50 mL vials ship as a cap only with a cross-cut septum. Switch Brand to Falcon® for the vial + cap and uncut options, or ask us about a special.',
      variants: [
        { sku: 'AR-SVF30PE-UC', brand: 'Falcon', cfg: 'Vial + cap', sep: 'Uncut' },
        { sku: 'AR-SVF30PE-XC', brand: 'Falcon', cfg: 'Vial + cap', sep: 'Cross-cut' },
        { sku: 'AR-SCF30PE-UC', brand: 'Falcon', cfg: 'Cap only', sep: 'Uncut' },
        { sku: 'AR-SCF30PE-XC', brand: 'Falcon', cfg: 'Cap only', sep: 'Cross-cut' },
        { sku: 'AR-SC30PE-XC', brand: 'Generic', cfg: 'Cap only', sep: 'Cross-cut' }
      ]
    },
    {
      key: 'b38w', title: 'SeptaCaps for 38-400 Bottles', handle: 'septacaps-38-400-bottles',
      group: 'bottle', thread: '36.8 – 37.5 mm', threadDiameter: '36.8 mm – 37.5 mm', order: 3,
      fits: 'For Wako® and Cubitainer® bottles', crossRefGroup: '38mm',
      axesLabel: 'Septum', photo: '38-400 shallow-thread SeptaCap on a Wako bottle',
      imgPrefix: 'p05', dimImg: 'p05-dim-wako', framedImg: 'p05-framed-38-400',
      variants: [
        { sku: 'AR-SC38WPE-XC', brand: null, cfg: 'Cap only', sep: 'Cross-cut' },
        { sku: 'AR-SC38WPE-MC', brand: null, cfg: 'Cap only', sep: 'Multi-cut' }
      ]
    },
    {
      key: 'gl38', title: 'SeptaCaps for GL38 Glass Bottles', handle: 'septacaps-gl38-glass-bottles',
      group: 'bottle', thread: '36.8 – 37.5 mm', threadDiameter: '36.8 mm – 37.5 mm', order: 4,
      fits: 'For 38-430 glass threaded bottles', crossRefGroup: '38mm',
      axesLabel: 'Septum', photo: 'GL38 SeptaCap on a glass media bottle',
      imgPrefix: 'p06', dimImg: 'p06-dim-glass', framedImg: 'p06-framed-gl38',
      variants: [
        { sku: 'AR-SC38PE-XC', brand: null, cfg: 'Cap only', sep: 'Cross-cut' },
        { sku: 'AR-SC38PE-MC', brand: null, cfg: 'Cap only', sep: 'Multi-cut' }
      ]
    },
    {
      key: 'b38n', title: 'SeptaCaps for 38-430 Plastic Bottles', handle: 'septacaps-38-430-plastic-bottles',
      group: 'bottle', thread: '36.8 – 37.5 mm', threadDiameter: '36.8 mm – 37.5 mm', order: 5,
      fits: 'For Nalgene™ and similar plastic bottles', crossRefGroup: '38mm',
      axesLabel: 'Septum', photo: '38-430 SeptaCap on a Nalgene bottle',
      imgPrefix: 'p07', dimImg: 'p07-dim-nalgene', framedImg: 'p07-framed-38-430',
      variants: [
        { sku: 'AR-SC38NPE-XC', brand: null, cfg: 'Cap only', sep: 'Cross-cut' },
        { sku: 'AR-SC38NPE-MC', brand: null, cfg: 'Cap only', sep: 'Multi-cut' }
      ]
    },
    {
      key: 'gl45', title: 'SeptaCaps for GL45 / 45 mm Bottles', handle: 'septacaps-gl45-45mm-bottles',
      group: 'bottle', thread: '45 mm', threadDiameter: '45 mm', order: 6,
      fits: 'For GL45 glass bottles; also Corning® Easy Grip and Nalgene™ Rapid-Flow 45 mm',
      axesLabel: 'Septum', photo: 'GL45 SeptaCap on a borosilicate media bottle',
      imgPrefix: 'p08', dimImg: 'p08-dim-gl45', framedImg: 'p08-framed-gl45',
      variants: [
        { sku: 'AR-SC45PE-XC', brand: null, cfg: 'Cap only', sep: 'Cross-cut' },
        { sku: 'AR-SC45PE-MC', brand: null, cfg: 'Cap only', sep: 'Multi-cut' }
      ]
    },
    {
      key: 'b48', title: 'SeptaCaps for 48 mm Nalgene Biotainer Bottles', handle: 'septacaps-48mm-biotainer-bottles',
      group: 'bottle', thread: '45 – 46 mm', threadDiameter: '45 mm – 46 mm', order: 7,
      fits: 'For 48 mm Nalgene™ Biotainer™ bottles', crossRefGroup: '48mm',
      pdpTitle: 'SeptaCaps for 48 mm Nalgene™ Biotainer™ Bottles',
      axesLabel: 'Septum', photo: '48 mm SeptaCap on a Nalgene Biotainer bottle',
      imgPrefix: 'p09', dimImg: 'p09-dim-biotainer', framedImg: 'p09-framed-biotainer',
      variants: [
        { sku: 'AR-SC48PE-XC', brand: null, cfg: 'Cap only', sep: 'Cross-cut' },
        { sku: 'AR-SC48PE-MC', brand: null, cfg: 'Cap only', sep: 'Multi-cut' }
      ]
    },
    {
      key: 'b48r', title: 'SeptaCaps for 48 mm Corning Roller Bottles', handle: 'septacaps-48mm-corning-roller-bottles',
      group: 'bottle', thread: '45 – 46 mm', threadDiameter: '45 mm – 46 mm', order: 8,
      fits: 'For 48 mm Corning® roller bottles', crossRefGroup: '48mm',
      pdpTitle: 'SeptaCaps for 48 mm Corning® Roller Bottles',
      axesLabel: 'Septum', photo: '48 mm SeptaCap on a Corning roller bottle',
      imgPrefix: 'p10', dimImg: 'p10-dim-corning', framedImg: 'p10-framed-corning',
      heroDesc: 'SeptaCaps provide a quick, easy way to secure tubing while reducing contamination and evaporation. A self-sealing EPDM septum holds tubing or a sampling needle in place — no ported cap to screw in, no film to re-wrap.',
      measuredFit: 'The cap seats on threads measuring 45–46 mm across. Read the diagram against your own bottle before ordering — the Nalgene™ Biotainer™ thread falls in the same range and takes a different cap.',
      cutNotes: { 'Cross-cut': 'Single cross in the EPDM septum', 'Multi-cut': 'Several cuts, for more than one line' },
      variants: [
        { sku: 'AR-SC48RPE-XC', brand: null, cfg: 'Cap only', sep: 'Cross-cut' },
        { sku: 'AR-SC48RPE-MC', brand: null, cfg: 'Cap only', sep: 'Multi-cut' }
      ]
    },
    {
      key: 'b53', title: 'SeptaCaps for 53B Bottles and Carboys', handle: 'septacaps-53b-bottles-carboys',
      group: 'bottle', thread: '53.5 – 54 mm', threadDiameter: '53.5 mm – 54 mm', order: 9,
      fits: 'For 53 mm buttress threads',
      axesLabel: 'Septum', photo: '53B SeptaCap on a solvent carboy',
      imgPrefix: 'p11', dimImg: 'p11-dim-carboy', framedImg: 'p11-framed-53b',
      variants: [
        { sku: 'AR-SC53PE-XC', brand: null, cfg: 'Cap only', sep: 'Cross-cut' },
        { sku: 'AR-SC53PE-MC', brand: null, cfg: 'Cap only', sep: 'Multi-cut' }
      ]
    }
  ];

  const DEFAULT_CUT_NOTES = {
    'Cross-cut': 'Single cross in the EPDM septum',
    'Multi-cut': 'Several cuts, for more than one line'
  };

  // Canonical ordering so pickers/tables read the same way everywhere.
  const AXIS_ORDER = {
    brand: ['Falcon', 'Generic'],
    cfg: ['Vial + cap', 'Cap only'],
    sep: ['Uncut', 'Cross-cut', 'Multi-cut']
  };
  const AXIS_META = {
    brand: { name: 'Brand', labels: { Falcon: 'Falcon®', Generic: 'Generic' } },
    cfg: { name: 'Configuration', labels: {} },
    sep: { name: 'Septum', labels: {} }
  };
  const AXIS_FIELDS = ['brand', 'cfg', 'sep'];

  function distinctValues(product, field) {
    const seen = new Set();
    product.variants.forEach((v) => { if (v[field] != null) seen.add(v[field]); });
    return AXIS_ORDER[field].filter((v) => seen.has(v));
  }

  // The axes a product actually varies on (a field with only one possible
  // value — e.g. every bottle's cfg is always "Cap only" — isn't a real choice).
  function productAxes(product) {
    return AXIS_FIELDS
      .map((field) => ({ field, values: distinctValues(product, field) }))
      .filter((a) => a.values.length > 1);
  }

  function findVariant(product, selection) {
    return product.variants.find((v) =>
      AXIS_FIELDS.every((f) => selection[f] == null || v[f] == null || v[f] === selection[f])
    ) || null;
  }

  // For a candidate value on one axis, is there a variant matching it plus the
  // current selection on every OTHER axis? (Shopify's own variant-availability rule.)
  function axisValueReachable(product, field, value, selection) {
    return product.variants.some((v) =>
      v[field] === value &&
      AXIS_FIELDS.every((f) => f === field || v[f] == null || selection[f] == null || v[f] === selection[f])
    );
  }

  function totalCombinations(product) {
    return productAxes(product).reduce((n, a) => n * a.values.length, 1);
  }

  function photo(base, name) {
    return base + 'assets/products/' + name + '.png';
  }

  // Main product image: for a "vial" product this tracks Brand x Septum (the
  // renders exist for all 4 pairings even when the pairing has no SKU, so the
  // gallery never shows a blank plate); for a "bottle" product it tracks Septum.
  function mainImageFor(product, base, selection) {
    if (product.group === 'vial') {
      const brandSlug = selection.brand === 'Generic' ? 'generic' : 'falcon';
      const sepSlug = selection.sep === 'Uncut' ? 'uncut' : 'crosscut';
      return photo(base, product.imgPrefix + '-vial-' + brandSlug + '-' + sepSlug);
    }
    const sepSlug = selection.sep === 'Multi-cut' ? 'multicut' : 'crosscut';
    return photo(base, product.imgPrefix + '-cap-' + sepSlug);
  }

  function cardImage(product, base) {
    if (product.group === 'vial') {
      return mainImageFor(product, base, { brand: 'Falcon', sep: 'Cross-cut' });
    }
    return mainImageFor(product, base, { sep: distinctValues(product, 'sep')[0] });
  }

  function trademarkNote(product) {
    if (product.key === 'v50' || product.key === 'v15') {
      return 'Falcon® and Corning® are registered trademarks of Corning Incorporated. © 2026 Argento Scientific.';
    }
    if (product.key === 'b48r' || product.key === 'b48') {
      return 'Corning® is a registered trademark of Corning Incorporated. Nalgene™ and Biotainer™ are trademarks of Thermo Fisher Scientific. © 2026 Argento Scientific.';
    }
    return 'Nalgene™ and Biotainer™ are trademarks of Thermo Fisher Scientific. Corning® is a registered trademark of Corning Incorporated. Falcon® is a registered trademark of Corning Incorporated. Wako® is a registered trademark of Fujifilm Wako Pure Chemical Corporation. Cubitainer® is a registered trademark of Hedwin Corporation. © 2026 Argento Scientific.';
  }

  window.ArgentoProducts = {
    PRODUCTS, AXIS_META, AXIS_ORDER, DEFAULT_CUT_NOTES,
    productAxes, findVariant, axisValueReachable, totalCombinations,
    photo, mainImageFor, cardImage, trademarkNote,
    byHandle: (handle) => PRODUCTS.find((p) => p.handle === handle) || null,
    byKey: (key) => PRODUCTS.find((p) => p.key === key) || null
  };
})();
