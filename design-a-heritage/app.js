/* ==========================================================================
   SDCertified × Suresh Drives — Design A "Heritage Ivory · The Assurance Ledger"
   app.js — vanilla, defer-loaded, file:// safe (no fetch, no modules).
   1. Helpers   2. Icon + seal sprite   3. Shell (header, top bar, tab bar,
   flow header, footer, help)   4. Interactions   5. Page behaviours
   Page content lives in each HTML file; this script only adds the shell
   and progressive enhancement. Every selector is guarded.
   ========================================================================== */
(function () {
  'use strict';

  /* 1. HELPERS ------------------------------------------------------------ */
  var d = document, root = d.documentElement, body = d.body;
  root.classList.add('js');
  if (!body) { return; }
  var page = body.getAttribute('data-page') || '';
  var shell = body.getAttribute('data-shell') || 'app';
  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  function $(s, c) { try { return (c || d).querySelector(s); } catch (e) { return null; } }
  function $$(s, c) { try { return Array.prototype.slice.call((c || d).querySelectorAll(s)); } catch (e) { return []; } }
  function on(el, ev, fn, opt) { if (el && el.addEventListener) { el.addEventListener(ev, fn, opt || false); } }
  function store(k, v) {
    try {
      if (v === undefined) { return window.sessionStorage.getItem(k); }
      if (v === null) { window.sessionStorage.removeItem(k); return null; }
      window.sessionStorage.setItem(k, v); return v;
    } catch (e) { return null; }
  }
  function ic(name, cls) { return '<svg class="i ' + (cls || '') + '" aria-hidden="true" focusable="false"><use href="#i-' + name + '"></use></svg>'; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function inr(n) { try { return Number(n).toLocaleString('en-IN'); } catch (e) { return String(n); } }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* 2. ICON + SEAL SPRITE ------------------------------------------------- */
  var ICONS = {
    home: '<path d="M3.5 10.5 12 3.5l8.5 7V20a1 1 0 0 1-1 1H15v-6H9v6H4.5a1 1 0 0 1-1-1z"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
    car: '<path d="M5 11.5 6.7 7a2 2 0 0 1 1.9-1.3h6.8A2 2 0 0 1 17.3 7l1.7 4.5"/><rect x="3" y="11.5" width="18" height="5.5" rx="1.6"/><path d="M6 17v2M18 17v2"/><circle cx="7.3" cy="14.2" r=".9"/><circle cx="16.7" cy="14.2" r=".9"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    'calendar-plus': '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4M12 13v5M9.5 15.5h5"/>',
    clipboard: '<rect x="5" y="4.5" width="14" height="16.5" rx="2"/><path d="M9 4.5v-1h6v1M8.5 11.5l2 2 4-4M9 17h6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.4-3.8 4.4-5.8 8-5.8s6.6 2 8 5.8"/>',
    bell: '<path d="M6 16.5V11a6 6 0 1 1 12 0v5.5l1.5 1.8h-15z"/><path d="M10 20.8a2.1 2.1 0 0 0 4 0"/>',
    'chevron-left': '<path d="m15 5-7 7 7 7"/>',
    'chevron-right': '<path d="m9 5 7 7-7 7"/>',
    'chevron-down': '<path d="m5 9 7 7 7-7"/>',
    'chevron-up': '<path d="m5 15 7-7 7 7"/>',
    'arrow-right': '<path d="M4 12h16M14 6l6 6-6 6"/>',
    'arrow-left': '<path d="M20 12H4M10 6l-6 6 6 6"/>',
    'arrow-up-right': '<path d="M7 17 17 7M8.5 7H17v8.5"/>',
    phone: '<path d="M5 3.8h3.4l1.6 4.1-2.1 1.4a11.5 11.5 0 0 0 6.8 6.8l1.4-2.1 4.1 1.6V19a2 2 0 0 1-2 2A16.5 16.5 0 0 1 3 5.8a2 2 0 0 1 2-2z"/>',
    whatsapp: '<path d="M4 20.2 5.2 16.6A8.4 8.4 0 1 1 8.4 19.3z"/><path d="M9.2 8.4c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.6 1 1.4 1.8 2.5 2.4.2.1.4.1.5 0l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.3.3.5 0 .9-.7 1.6-1.6 1.7-2.5.2-6.2-3.2-6.2-5.9 0-.7.3-1.3.8-1.9z"/>',
    chat: '<path d="M4 5.5h16v10.5H9.5L4 20.5z"/><path d="M8 9.5h8M8 12.5h5"/>',
    headset: '<path d="M4 14.5V12a8 8 0 0 1 16 0v2.5"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/><path d="M19 20c0 1.1-1.2 1.6-3.4 1.6H14"/>',
    'map-pin': '<path d="M12 21s-6.8-6-6.8-11.3a6.8 6.8 0 0 1 13.6 0C18.8 15 12 21 12 21z"/><circle cx="12" cy="9.6" r="2.5"/>',
    locate: '<circle cx="12" cy="12" r="6.5"/><circle cx="12" cy="12" r="2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3"/>',
    shield: '<path d="M12 3 4.5 6v5.6c0 4.6 3.1 8.1 7.5 9.4 4.4-1.3 7.5-4.8 7.5-9.4V6z"/><path d="m8.6 12 2.4 2.4 4.4-4.8"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8 12.4 2.8 2.8 5.2-5.7"/>',
    'check-double': '<path d="m2.5 12.5 4 4L15 8M10.5 15.5l1 1L20 8"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    'x-circle': '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
    download: '<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>',
    share: '<circle cx="6" cy="12" r="2.4"/><circle cx="17.5" cy="6" r="2.4"/><circle cx="17.5" cy="18" r="2.4"/><path d="m8.2 10.9 7.1-3.7M8.2 13.1l7.1 3.7"/>',
    heart: '<path d="M12 20s-7.5-4.5-7.5-10.1A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.6C19.5 15.5 12 20 12 20z"/>',
    sliders: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
    sort: '<path d="M7 4v16M4 17l3 3 3-3M17 20V4M14 7l3-3 3 3"/>',
    star: '<path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z"/>',
    gauge: '<path d="M4.3 17.5a8.5 8.5 0 1 1 15.4 0"/><path d="m12 14.5 3.8-4.6"/><circle cx="12" cy="14.8" r="1.2"/>',
    wrench: '<path d="M14.6 5.2a4.4 4.4 0 0 0 4.2 6.2L11 19.2a2.2 2.2 0 1 1-3.1-3.1l7.8-7.8"/><path d="M14.6 5.2 16.8 3a4.4 4.4 0 0 1 4.2 4.2l-2.2 2.2"/>',
    file: '<path d="M6 3h8.5L19 7.5V21H6z"/><path d="M14 3v5h5M9 12.5h7M9 16.5h7"/>',
    card: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h3.5"/>',
    bank: '<path d="M3 9.5 12 4l9 5.5M5 10.5v7M9.7 10.5v7M14.3 10.5v7M19 10.5v7M3 20.5h18"/>',
    zap: '<path d="M13 2.5 4.5 13.5H12l-1 8 8.5-11H12z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.6v.4"/>',
    alert: '<path d="M12 4 2.8 19.5h18.4z"/><path d="M12 10v4.5M12 17.2v.3"/>',
    lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.4 2.5 3.6 5.5 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3z"/>',
    logout: '<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M10 8l-4 4 4 4M6 12h10"/>',
    camera: '<path d="M4 8h3l1.6-2.5h6.8L17 8h3v11H4z"/><circle cx="12" cy="13.2" r="3.4"/>',
    image: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="m4 18 5-5 4 4 3-3 4 4"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.6 2.6 0 1 1 3.6 2.4c-.7.3-1.1.8-1.1 1.5v.6M12 16.8v.4"/>',
    sparkle: '<path d="M12 3c.6 4.3 2.7 6.4 7 7-4.3.6-6.4 2.7-7 7-.6-4.3-2.7-6.4-7-7 4.3-.6 6.4-2.7 7-7z"/><path d="M19 15.5c.2 1.4.9 2.1 2.3 2.3-1.4.2-2.1.9-2.3 2.3-.2-1.4-.9-2.1-2.3-2.3 1.4-.2 2.1-.9 2.3-2.3z"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1.2"/><rect x="13" y="4" width="7" height="7" rx="1.2"/><rect x="4" y="13" width="7" height="7" rx="1.2"/><rect x="13" y="13" width="7" height="7" rx="1.2"/>',
    list: '<path d="M9 6.5h11M9 12h11M9 17.5h11M4.5 6.5h.01M4.5 12h.01M4.5 17.5h.01"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>',
    navigation: '<path d="m4 11 16-7-7 16-2.2-6.8z"/>',
    battery: '<rect x="3" y="7.5" width="16" height="9" rx="2"/><path d="M21 10.5v3M6.5 10.5v3M9.5 10.5v3M12.5 10.5v3"/>',
    tyre: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.6"/><path d="M12 3v5.4M12 15.6V21M3 12h5.4M15.6 12H21"/>',
    engine: '<path d="M3.5 10h2V8h4V6h4.5v2h3l2 3h1.5v5H19l-2 2h-7l-2-2H5.5v-2h-2z"/>',
    scan: '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M7 12h10"/>',
    video: '<rect x="3" y="6.5" width="12" height="11" rx="2"/><path d="m15 10.5 6-3.5v10l-6-3.5"/>',
    droplet: '<path d="M12 3.5s6 6.3 6 10.5a6 6 0 0 1-12 0c0-4.2 6-10.5 6-10.5z"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.6 7 8.4 6 8.4-6"/>',
    receipt: '<path d="M6 3h12v18l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4L6 21z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.5-4.5L4 8.2M4 4v4.2h4.2M4 13a8 8 0 0 0 14.5 4.5l1.5-1.7M20 20v-4.2h-4.2"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    building: '<path d="M5 21V4h10v17M15 9h4v12M3 21h18M8 8h4M8 12h4M8 16h4"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2M3 12.5h18"/>',
    truck: '<path d="M3 6h11v10H3zM14 9.5h4l3 3.5v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    percent: '<path d="M19 5 5 19"/><circle cx="7" cy="7" r="2.4"/><circle cx="17" cy="17" r="2.4"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="m8.6 14-1.6 7 5-2.6 5 2.6-1.6-7"/>',
    route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h7.5a3 3 0 0 0 0-6h-7a3 3 0 0 1 0-6H16"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
    sunset: '<path d="M3 17.5h18M6.5 17.5a5.5 5.5 0 0 1 11 0M12 4v4M4.9 9.6l1.4 1.4M19.1 9.6l-1.4 1.4M8 21h8"/>',
    wallet: '<path d="M4 7h14.5A1.5 1.5 0 0 1 20 8.5v10a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5V6a2 2 0 0 1 2-2h10v3"/><path d="M15.5 13.5h2"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    layers: '<path d="m12 3.5 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
    smartphone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
    filter: '<path d="M4 5h16l-6.2 7.6V19l-3.6 1.5v-7.9z"/>',
    send: '<path d="M21 3 10 14M21 3l-6.8 18-4.2-7-7-4.2z"/>',
    rupee: '<path d="M7 4.5h10M7 9h10M7 4.5h3.5a4.3 4.3 0 0 1 0 8.6H7l7.5 6.9"/>',
    chart: '<path d="M4 20h16M6.5 16l4-4.5 3 3 6-7"/>',
    pen: '<path d="M4 20c3-1 5.5-4.5 8-8l3-3 3 3-3 3c-3.5 2.5-7 5-8 8"/><path d="m14 7 3-3 3 3-3 3"/>',
    handshake: '<path d="m3 11 4-4 4 1.5 2-1.5 4 .5 4 3.5"/><path d="m21 11-3.5 3.5M3 11l6.5 6.5a1.5 1.5 0 0 0 2.1 0l.4-.4M13 9.5l-3 2.8a1.4 1.4 0 0 0 2 2l2.2-2 3.3 3.2"/>',
    qr: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2v2h-2zM18 14h2M14 18h2v2M18 18h2v2"/>',
    more: '<circle cx="5.5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="18.5" cy="12" r="1.2"/>',
    apple: '<path fill="currentColor" stroke="none" d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.8-3.5.8-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.5 1.3-2.6 0 0-2.5-1-2.5-3.7zM14.2 5.6c.6-.8 1.1-1.8 1-2.9-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.7-1 2.8 1 .1 2.1-.5 2.7-1.3z"/>',
    play: '<path d="M5.5 3.8v16.4c0 .6.6.9 1.1.6l13.6-8.2a.7.7 0 0 0 0-1.2L6.6 3.2c-.5-.3-1.1 0-1.1.6z"/><path d="m5.8 4 9.4 9.6M5.8 20l9.4-9.6"/>'
  };

  function rose(R, a, k, ph, n) {
    var p = '', i, t, r;
    for (i = 0; i <= n; i++) {
      t = (i / n) * Math.PI * 2;
      r = R + a * Math.sin(k * t + ph);
      p += (i ? 'L' : 'M') + (50 + r * Math.cos(t)).toFixed(2) + ' ' + (50 + r * Math.sin(t)).toFixed(2);
    }
    return p + 'Z';
  }
  function guilloche(R, a, k, count, step, sw) {
    var g = '<g fill="none" stroke="currentColor" stroke-width="' + sw + '">', j;
    for (j = 0; j < count; j++) { g += '<path d="' + rose(R, a, k, j * step, 360) + '"/>'; }
    return g + '</g>';
  }

  function buildSprite() {
    if (d.getElementById('sd-sprite')) { return; }
    var s = '', k;
    for (k in ICONS) { if (Object.prototype.hasOwnProperty.call(ICONS, k)) { s += '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + ICONS[k] + '</symbol>'; } }
    /* Full "Suresh Drives Verified" rosette seal */
    s += '<symbol id="seal" viewBox="0 0 100 100">' +
      '<path id="seal-arc" fill="none" d="M12.5 50a37.5 37.5 0 1 1 75 0a37.5 37.5 0 1 1-75 0"/>' +
      '<circle cx="50" cy="50" r="48.6" fill="none" stroke="currentColor" stroke-width="1.1"/>' +
      '<circle cx="50" cy="50" r="46.4" fill="none" stroke="currentColor" stroke-width=".35"/>' +
      '<circle cx="50" cy="50" r="44.8" fill="none" stroke="currentColor" stroke-width=".9" stroke-linecap="round" stroke-dasharray=".05 2.15"/>' +
      '<text font-family="Manrope, Arial, sans-serif" font-size="6" font-weight="800" letter-spacing="1.4" fill="currentColor"><textPath href="#seal-arc" textLength="226" lengthAdjust="spacing">SURESH DRIVES · VERIFIED · INSPECTED ·</textPath></text>' +
      '<circle cx="50" cy="50" r="33.4" fill="none" stroke="currentColor" stroke-width=".7"/>' +
      '<circle cx="50" cy="50" r="31.8" fill="none" stroke="currentColor" stroke-width=".25"/>' +
      guilloche(22.5, 4.4, 16, 6, Math.PI / 24, '.3') +
      guilloche(15.5, 1.8, 10, 3, Math.PI / 15, '.25') +
      '<circle cx="50" cy="50" r="11" fill="currentColor"/>' +
      '<path d="m44.6 50.4 3.7 3.7 7.2-7.8" fill="none" stroke="#FFFEFB" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</symbol>';
    /* Mini seal for small sizes (no text) */
    s += '<symbol id="seal-mini" viewBox="0 0 100 100">' +
      '<circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" stroke-width="3"/>' +
      '<circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" stroke-width="1"/>' +
      guilloche(30, 6, 12, 4, Math.PI / 12, '.9') +
      '<circle cx="50" cy="50" r="19" fill="currentColor"/>' +
      '<path d="m40.5 50.5 6.5 6.5 12.5-13.5" fill="none" stroke="#FFFEFB" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</symbol>';
    var wrap = d.createElement('div');
    wrap.innerHTML = '<svg id="sd-sprite" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden">' + s + '</svg>';
    body.insertBefore(wrap.firstChild, body.firstChild);
  }
  buildSprite();

  /* 3. SHELL -------------------------------------------------------------- */
  var NAV = [
    ['browse.html', 'Buy cars', ['browse', 'vehicle']],
    ['book.html', 'Book inspection', ['book', 'book-car', 'book-location', 'book-slot', 'checkout', 'booking-confirmed']],
    ['sell.html', 'Sell', ['sell']],
    ['inspections.html', 'My inspections', ['inspections', 'track', 'report']],
    ['suresh-drives.html', 'Suresh Drives', ['suresh-drives']],
    ['partners.html', 'Partners', ['partners']]
  ];
  var TABS = [
    ['home.html', 'Home', 'home', ['home', 'notifications', 'support']],
    ['browse.html', 'Buy', 'car', ['browse', 'vehicle', 'sell']],
    ['book.html', 'Book', 'plus', ['book']],
    ['inspections.html', 'Inspections', 'clipboard', ['inspections', 'track', 'report']],
    ['profile.html', 'Profile', 'user', ['profile']]
  ];
  var STEPS = [
    ['book.html', 'Service'], ['book-car.html', 'Car'], ['book-location.html', 'Location'], ['book-slot.html', 'Slot'], ['checkout.html', 'Pay']
  ];
  var MARK = '<img class="brand__mark" src="../assets/logo-sdcertified-mark.png" alt="" width="24" height="28">';
  function brand(href, light, noBy) {
    return '<a class="brand' + (light ? ' brand--light' : '') + '" href="' + href + '" aria-label="SDCertified by Suresh Drives, home">' + MARK +
      '<span class="brand__word"><b>SD</b>Certified</span>' + (noBy ? '' : '<span class="brand__by">by Suresh Drives</span>') + '</a>';
  }
  function inList(list) { return list.indexOf(page) !== -1; }
  var CALL_PILL = '<a class="call-pill" href="tel:+918330881213" aria-label="Call us, +91 8330 881 213">' + ic('phone', 'i--sm') + '<span>Call us</span></a>';
  function langSwitch() {
    var ml = store('sdA.lang') === 'ml';
    return '<div class="lang" role="group" aria-label="Language"><button type="button" lang="en" aria-pressed="' + (!ml) + '" data-lang="en">EN</button><span aria-hidden="true">·</span><button type="button" lang="ml" aria-pressed="' + ml + '" data-lang="ml">മലയാളം</button></div>';
  }
  var isPublic = shell === 'site';
  var homeHref = isPublic ? 'index.html' : 'home.html';

  function injectSiteHeader() {
    var links = NAV.map(function (n) {
      return '<a href="' + n[0] + '"' + (inList(n[2]) ? ' aria-current="page"' : '') + '>' + n[1] + '</a>';
    }).join('');
    var actions = isPublic
      ? '<a class="icon-btn" href="browse.html" aria-label="Search certified cars">' + ic('search') + '</a>' +
        '<a class="btn btn--ghost btn--sm" href="home.html">Sign in</a>' +
        '<a class="btn btn--primary btn--sm" href="book.html">Book an inspection</a>'
      : '<a class="icon-btn" href="browse.html" aria-label="Search certified cars">' + ic('search') + '</a>' +
        '<a class="icon-btn" href="notifications.html" aria-label="Notifications, 3 unread"' + (page === 'notifications' ? ' aria-current="page"' : '') + '>' + ic('bell') + '<span class="dot-badge" aria-hidden="true">3</span></a>' +
        '<a class="avatar" href="profile.html" aria-label="Arjun Menon, your profile"' + (page === 'profile' ? ' aria-current="page"' : '') + '>AM</a>';
    var h = d.createElement('header');
    h.className = 'site-header';
    h.innerHTML = '<div class="container nav">' + brand(homeHref) +
      '<nav class="nav__links" aria-label="Primary">' + links + '</nav>' +
      '<div class="nav__actions">' + actions + '</div></div>';
    return h;
  }

  function injectTopbar() {
    var back = body.getAttribute('data-back');
    var title = body.getAttribute('data-title') || (function () { var h = $('main h1'); return h ? h.textContent.trim() : ''; })();
    var left = back
      ? '<a class="icon-btn" href="' + back + '" aria-label="Back">' + ic('chevron-left', 'i--lg') + '</a>'
      : brand(homeHref, false, true);
    var right = CALL_PILL + (isPublic
      ? '<a class="topbar__signin" href="home.html">Sign in</a>'
      : '<a class="icon-btn" href="notifications.html" aria-label="Notifications, 3 unread">' + ic('bell') + '<span class="dot-badge" aria-hidden="true">3</span></a>');
    var t = d.createElement('div');
    t.className = 'topbar';
    t.innerHTML = '<div class="topbar__left">' + left + '</div><div class="topbar__lang">' + langSwitch() + '</div><div class="topbar__title" aria-hidden="true">' + esc(title) + '</div><div class="topbar__right">' + right + '</div>';
    return t;
  }
  function injectUtility() {
    var u = d.createElement('div');
    u.className = 'utility';
    u.innerHTML = '<div class="container utility__inner"><p>Suresh Drives LLP · Kozhikode, Kerala · India\'s first on-site car inspection company</p>' +
      '<div class="utility__right"><a href="tel:+918330881213">' + ic('phone', 'i--sm') + 'Call us +91 8330 881 213</a>' +
      '<a href="https://wa.me/919895441213">' + ic('whatsapp', 'i--sm') + 'WhatsApp</a>' + langSwitch() + '</div></div>';
    return u;
  }

  function injectFlowHeader() {
    var step = parseInt(body.getAttribute('data-step') || '1', 10);
    var back = body.getAttribute('data-back') || 'home.html';
    var done = step > STEPS.length;
    var items = STEPS.map(function (s, i) {
      var n = i + 1, cls = n < step ? 'is-done' : (n === step ? 'is-current' : '');
      var inner = '<span class="stepper__n">' + (n < step ? ic('check') : n) + '</span>' + s[1];
      var content = n < step ? '<a href="' + s[0] + '">' + inner + '</a>' : '<span class="row" style="--gap:8px">' + inner + '</span>';
      return '<li class="' + cls + '"' + (n === step ? ' aria-current="step"' : '') + '>' + content + '</li>';
    }).join('');
    var label = done ? 'Booking confirmed' : (STEPS[step - 1] ? STEPS[step - 1][1] : '');
    var h = d.createElement('header');
    h.className = 'flow-header';
    h.innerHTML = '<div class="container flow-header__inner">' +
      '<a class="flow-back" href="' + back + '" aria-label="Back">' + ic('chevron-left') + '<span>' + (done ? 'Home' : 'Back') + '</span></a>' +
      brand('home.html', false, true) +
      '<ol class="stepper" aria-label="Booking steps">' + items + '</ol>' +
      '<div class="flow-meta" aria-hidden="true"><b>' + esc(done ? 'Booking confirmed' : label) + '</b><small>' + (done ? 'SDB-24817' : 'Step ' + step + ' of 5') + '</small></div>' +
      '<div class="flow-help">' +
        '<a class="call-pill" href="tel:+918330881213" aria-label="Call us, +91 8330 881 213">' + ic('phone', 'i--sm') + '<span>Call us</span><span class="call-pill__num">+91 8330 881 213</span></a>' +
        '<a class="flow-help__label" href="https://wa.me/919895441213">' + ic('whatsapp') + '<span>WhatsApp</span></a>' +
        '<a class="flow-help__label" href="support.html">' + ic('headset') + '<span>Help</span></a>' +
        '<span class="flow-help__lang">' + langSwitch() + '</span>' +
      '</div></div>' +
      '<div class="flow-progress" aria-hidden="true"><span style="--p:' + Math.min(1, step / 5).toFixed(2) + '"></span></div>';
    return h;
  }

  function injectTabbar() {
    var tab = body.getAttribute('data-tab');
    var html = TABS.map(function (t) {
      var current = tab ? tab === t[2] || tab === t[1].toLowerCase() : inList(t[3]);
      var cur = current ? ' aria-current="page"' : '';
      if (t[1] === 'Book') {
        return '<a class="tabbar__item tabbar__book" href="' + t[0] + '"' + cur + '><span class="tabbar__book-disc">' + ic('plus') + '</span>Book</a>';
      }
      var live = t[1] === 'Inspections' ? '<span class="live-dot" aria-hidden="true"></span><span class="sr-only">(1 live inspection)</span>' : '';
      return '<a class="tabbar__item" href="' + t[0] + '"' + cur + '>' + ic(t[2]) + t[1] + live + '</a>';
    }).join('');
    var n = d.createElement('nav');
    n.className = 'tabbar';
    n.setAttribute('aria-label', 'App');
    n.innerHTML = html;
    body.appendChild(n);
    body.classList.add('has-tabbar');
  }

  function injectFooter(slim) {
    var f = d.createElement('footer');
    f.className = 'footer' + (slim ? ' footer--slim' : '');
    var logos = '<div class="footer__logos"><img class="footer__sd" src="../assets/logo-sureshdrives-light.png" alt="Suresh Drives" width="104" height="67">' +
      '<span class="footer__x" aria-hidden="true">&times;</span>' + brand(isPublic ? 'index.html' : 'home.html', true, true) + '</div>';
    var endorse = '<p class="footer__endorse"><b style="font-weight:500">SDCertified</b> — an offering of Suresh Drives LLP, <em>India\'s first on-site car inspection company.</em></p>';
    var lockup = '<div class="footer__lockup"><span class="lockup-line"><span class="g">Inspected by Suresh Drives</span><span aria-hidden="true">·</span><span class="r">Sold on SDCertified</span></span>' +
      '<span>&copy; 2026 Suresh Drives LLP · Kozhikode, Kerala · GSTIN on invoices</span></div>';
    if (slim) {
      f.innerHTML = '<div class="container"><div class="row between" style="--gap:16px">' + logos +
        '<p class="small" style="max-width:52ch">SDCertified — an offering of Suresh Drives LLP, India\'s first on-site car inspection company. 256-bit secure payments · Call +91 8330 881 213</p></div></div>';
      body.appendChild(f);
      return;
    }
    f.innerHTML = '<div class="container">' +
      '<div class="footer__top">' +
        '<div class="footer__brand">' + logos + endorse +
          '<div class="footer__stores"><a class="store store--outline" href="index.html#get-app">' + ic('apple') + '<span><small>Download on the</small><strong>App Store</strong></span></a>' +
          '<a class="store store--outline" href="index.html#get-app">' + ic('play') + '<span><small>Get it on</small><strong>Google Play</strong></span></a></div>' +
          '<div class="footer__compact"><a href="tel:+918330881213">Call +91 8330 881 213</a><a href="https://wa.me/919895441213">WhatsApp +91 98954 41213</a><a href="mailto:sureshhdrives@gmail.com">sureshhdrives@gmail.com</a></div>' +
        '</div>' +
        '<div class="footer__cols"><p class="footer__h">Marketplace</p><ul><li><a href="browse.html">Buy certified cars</a></li><li><a href="sell.html">Sell &amp; get certified</a></li><li><a href="vehicle.html">BMW X4 M Competition</a></li><li><a href="profile.html">Saved cars</a></li></ul></div>' +
        '<div class="footer__cols"><p class="footer__h">Inspections</p><ul><li><a href="book.html">Book an inspection</a></li><li><a href="track.html">Track SDB-24817</a></li><li><a href="inspections.html">My inspections</a></li><li><a href="report.html">Sample report</a></li></ul></div>' +
        '<div class="footer__cols"><p class="footer__h">Company</p><ul><li><a href="suresh-drives.html">Suresh Drives</a></li><li><a href="partners.html">Partner with us</a></li><li><a href="support.html">Help &amp; guides</a></li><li><a href="notifications.html">Notification settings</a></li></ul></div>' +
        '<div class="footer__cols"><p class="footer__h">Contact</p><ul><li><a href="tel:+918330881213">+91 8330 881 213</a></li><li><a href="https://wa.me/919895441213">WhatsApp +91 98954 41213</a></li><li><a href="mailto:sureshhdrives@gmail.com">sureshhdrives@gmail.com</a></li><li>The Workbook, HiLITE Business Park, Poovangal, Kozhikode, Kerala 673014</li></ul></div>' +
      '</div>' + lockup + '</div>';
    body.appendChild(f);
  }

  function injectHelp() {
    if (shell === 'flow' || page === 'support' || body.getAttribute('data-help') === 'off') { return; }
    var a = d.createElement('a');
    a.className = 'help-fab';
    a.href = 'support.html';
    a.innerHTML = '<span class="help-fab__face" aria-hidden="true">AS</span><span>Talk to a guide<small>Anjali · replies in ~2 min</small></span>';
    body.appendChild(a);
  }

  (function shellInit() {
    var main = $('main');
    if (main && !main.id) { main.id = 'main'; }
    var skip = d.createElement('a');
    skip.className = 'skip-link'; skip.href = '#main'; skip.textContent = 'Skip to content';
    var sprite = d.getElementById('sd-sprite');
    var anchor = sprite ? sprite.nextSibling : body.firstChild;
    body.insertBefore(skip, anchor);
    if (shell === 'flow') {
      body.insertBefore(injectFlowHeader(), skip.nextSibling);
    } else {
      var tb = injectTopbar();
      body.insertBefore(tb, skip.nextSibling);
      var sh = injectSiteHeader();
      body.insertBefore(sh, tb);
      body.insertBefore(injectUtility(), sh);
    }
    if (body.getAttribute('data-footer') !== 'off') { injectFooter(shell === 'flow'); }
    if (shell !== 'flow' && body.getAttribute('data-tabbar') !== 'off') { injectTabbar(); }
    if ($('.cta-bar')) { body.classList.add('has-ctabar'); }
    if ($('.action-bar')) { body.classList.add('has-actionbar'); }
    injectHelp();
  })();

  /* Toast region + sheet backdrop */
  var toastRegion = d.createElement('div');
  toastRegion.className = 'toast-region';
  toastRegion.setAttribute('aria-live', 'polite');
  toastRegion.setAttribute('role', 'status');
  body.appendChild(toastRegion);
  function toast(title, text, icon, ms) {
    var t = d.createElement('div');
    t.className = 'toast';
    t.innerHTML = ic(icon || 'check-circle') + '<div><strong>' + esc(title) + '</strong>' + (text ? '<span>' + esc(text) + '</span>' : '') + '</div>';
    toastRegion.appendChild(t);
    while (toastRegion.children.length > 3) { toastRegion.removeChild(toastRegion.firstChild); }
    setTimeout(function () {
      t.classList.add('is-out');
      setTimeout(function () { if (t.parentNode) { t.parentNode.removeChild(t); } }, 300);
    }, ms || 4200);
  }
  window.sdToast = toast;

  /* 4. INTERACTIONS ------------------------------------------------------- */
  /* 4a. Large-title collapse into the mobile top bar */
  (function () {
    var bar = $('.topbar');
    if (!bar) { return; }
    var h1 = $('main h1');
    if (h1 && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { bar.classList.toggle('is-scrolled', !e.isIntersecting && e.boundingClientRect.top < 80); });
      }, { rootMargin: '-60px 0px 0px 0px', threshold: 0 });
      io.observe(h1);
    } else {
      on(window, 'scroll', function () { bar.classList.toggle('is-scrolled', window.scrollY > 60); }, { passive: true });
    }
  })();

  /* 4b. Reveal on scroll, rings, bars, journeys, count-ups */
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) { return; }
    var dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var pre = el.getAttribute('data-prefix') || '', suf = el.getAttribute('data-suffix') || '';
    if (reduce) { el.textContent = pre + (dec ? target.toFixed(dec) : inr(target)) + suf; return; }
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) { start = ts; }
      var p = Math.min(1, (ts - start) / dur), e = 1 - Math.pow(1 - p, 3), v = target * e;
      el.textContent = pre + (dec ? v.toFixed(dec) : inr(Math.round(v))) + suf;
      if (p < 1) { window.requestAnimationFrame(step); }
    }
    window.requestAnimationFrame(step);
  }
  $$('.journey').forEach(function (j) { $$('.journey__item', j).forEach(function (li, i) { li.style.setProperty('--i', i); }); });
  $$('.ledger').forEach(function (l) { $$('.ledger__line.is-filled', l).forEach(function (li, i) { li.style.setProperty('--i', i); }); });
  (function () {
    var targets = $$('[data-reveal], .ring, .bar, .gauge, .journey, [data-count]');
    if (!targets.length) { return; }
    function show(el) {
      if (el.classList.contains('is-in')) { return; }
      el.classList.add('is-in');
      if (el.hasAttribute('data-count')) { countUp(el); }
    }
    if (!('IntersectionObserver' in window)) { targets.forEach(show); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    targets.forEach(function (t) { io.observe(t); });
    /* safety: never leave content hidden */
    setTimeout(function () { targets.forEach(function (t) { if (t.getBoundingClientRect().top < window.innerHeight) { show(t); } }); }, 1600);
  })();

  /* 4c. Tabs / segmented controls */
  $$('[data-tabs]').forEach(function (wrap) {
    var tabs = $$('[role="tab"]', wrap);
    function select(t, focus) {
      tabs.forEach(function (x) {
        var sel = x === t;
        x.setAttribute('aria-selected', sel ? 'true' : 'false');
        x.tabIndex = sel ? 0 : -1;
        var p = d.getElementById(x.getAttribute('aria-controls') || '');
        if (p) { p.hidden = !sel; }
      });
      if (focus) { t.focus(); }
    }
    tabs.forEach(function (t, i) {
      on(t, 'click', function () { select(t); });
      on(t, 'keydown', function (e) {
        var n = e.key === 'ArrowRight' ? 1 : (e.key === 'ArrowLeft' ? -1 : 0);
        if (n) { e.preventDefault(); select(tabs[(i + n + tabs.length) % tabs.length], true); }
      });
    });
  });

  /* 4d. Chips (toggle / single-select / filter) */
  $$('[data-chips]').forEach(function (group) {
    var single = group.getAttribute('data-chips') === 'single';
    var targetSel = group.getAttribute('data-filter-target');
    on(group, 'click', function (e) {
      var chip = e.target.closest ? e.target.closest('.chip[aria-pressed]') : null;
      if (!chip || !group.contains(chip)) { return; }
      if (single) {
        $$('.chip[aria-pressed]', group).forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
      } else {
        chip.setAttribute('aria-pressed', chip.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
      }
      var target = targetSel ? $(targetSel) : null;
      if (target) {
        var f = chip.getAttribute('data-filter') || 'all';
        $$('[data-cat]', target).forEach(function (item) {
          var cats = (item.getAttribute('data-cat') || '').split(' ');
          item.hidden = !(f === 'all' || cats.indexOf(f) !== -1);
        });
        $$('[data-group]', target).forEach(function (g) {
          g.hidden = !$$('[data-cat]', g).some(function (it) { return !it.hidden; });
        });
      }
    });
  });
  on(d, 'click', function (e) {
    var rm = e.target.closest ? e.target.closest('.chip--remove') : null;
    if (!rm) { return; }
    var label = rm.textContent.trim();
    rm.parentNode && rm.parentNode.removeChild(rm);
    var cnt = $('[data-result-count]');
    if (cnt) {
      var n = parseInt(cnt.textContent.replace(/\D/g, ''), 10) || 0;
      cnt.textContent = inr(n + 37);
    }
    toast('Filter removed', label);
  });

  /* 4e. Sheets (bottom sheets on mobile) */
  var backdrop = d.createElement('div');
  backdrop.className = 'sheet-backdrop';
  body.appendChild(backdrop);
  var openSheetEl = null, lastFocus = null;
  function openSheet(id) {
    var s = d.getElementById(id);
    if (!s) { return; }
    lastFocus = d.activeElement;
    s.classList.add('is-open');
    s.setAttribute('aria-hidden', 'false');
    backdrop.classList.add('is-open');
    openSheetEl = s;
    body.style.overflow = 'hidden';
    var f = s.querySelector('button, a[href], input, select, textarea');
    if (f) { setTimeout(function () { try { f.focus({ preventScroll: true }); } catch (err) { f.focus(); } }, 60); }
  }
  function closeSheet() {
    if (!openSheetEl) { return; }
    openSheetEl.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    body.style.overflow = '';
    openSheetEl = null;
    if (lastFocus && lastFocus.focus) { lastFocus.focus(); }
  }
  on(d, 'click', function (e) {
    if (!e.target.closest) { return; }
    var o = e.target.closest('[data-sheet-open]');
    if (o) { e.preventDefault(); openSheet(o.getAttribute('data-sheet-open')); return; }
    if (e.target.closest('[data-sheet-close]')) { e.preventDefault(); closeSheet(); }
  });
  on(backdrop, 'click', closeSheet);
  on(d, 'keydown', function (e) { if (e.key === 'Escape') { closeSheet(); } });

  /* 4f. Gallery */
  $$('[data-gallery]').forEach(function (g) {
    var main = $('[data-gallery-main]', g), img = main ? $('img', main) : null;
    $$('[data-gallery-thumb]', g).forEach(function (t) {
      on(t, 'click', function () {
        if (!img) { return; }
        $$('[data-gallery-thumb]', g).forEach(function (x) { x.setAttribute('aria-pressed', x === t ? 'true' : 'false'); });
        main.classList.add('is-swapping');
        setTimeout(function () {
          img.src = t.getAttribute('data-src') || img.src;
          img.style.objectPosition = t.getAttribute('data-pos') || '';
          img.alt = t.getAttribute('data-alt') || img.alt;
          main.classList.remove('is-swapping');
        }, 180);
      });
    });
  });

  /* 4g. Choice cards (fallback for :has) + live data binding into the ledger */
  function bind(key, value) {
    $$('[data-bind="' + key + '"]').forEach(function (el) {
      el.textContent = value;
      var line = el.closest ? el.closest('.ledger__line') : null;
      if (line) {
        line.classList.remove('is-pending');
        line.classList.remove('is-filled'); line.classList.remove('is-new');
        void line.offsetWidth;
        line.style.setProperty('--i', 0);
        line.classList.add('is-filled'); line.classList.add('is-new');
      }
    });
  }
  window.sdBind = bind;
  on(d, 'change', function (e) {
    var t = e.target;
    if (!t || !t.matches) { return; }
    if (t.matches('.choice > input')) {
      if (t.type === 'radio') {
        $$('input[name="' + t.name + '"]').forEach(function (x) { var c = x.closest('.choice'); if (c) { c.classList.toggle('is-selected', x.checked); } });
      } else {
        var c = t.closest('.choice'); if (c) { c.classList.toggle('is-selected', t.checked); }
      }
    }
    var sets = t.getAttribute('data-sets');
    if (sets && t.checked !== false) {
      sets.split('|').forEach(function (pair) {
        var i = pair.indexOf(':');
        if (i > 0) { bind(pair.slice(0, i).trim(), pair.slice(i + 1).trim()); }
      });
    }
    if (t.matches('.switch input') && !t.hasAttribute('data-silent')) {
      var lbl = t.getAttribute('data-label') || 'Preference';
      toast(lbl + (t.checked ? ' turned on' : ' turned off'), 'Saved to your account', t.checked ? 'check-circle' : 'info', 2600);
    }
  });
  $$('.choice > input:checked').forEach(function (x) { var c = x.closest('.choice'); if (c) { c.classList.add('is-selected'); } });

  /* Registration plate formatter: KL 11 BH 7272 */
  $$('[data-plate]').forEach(function (inp) {
    on(inp, 'input', function () {
      var raw = inp.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
      var m = raw.match(/^([A-Z]{0,2})(\d{0,2})([A-Z]{0,3})(\d{0,4})/);
      if (m) { inp.value = [m[1], m[2], m[3], m[4]].filter(Boolean).join(' '); }
      var key = inp.getAttribute('data-bind-input');
      if (key && inp.value.length >= 9) { bind(key, inp.value); }
    });
  });
  $$('[data-bind-input]:not([data-plate])').forEach(function (inp) {
    on(inp, 'change', function () { if (inp.value) { bind(inp.getAttribute('data-bind-input'), inp.value); } });
  });

  /* 4g-2. ONE BOOKING STATE ---------------------------------------------
     A single `booking` object in sessionStorage ("sdA.booking") carries the
     service, car, price tier, location, contacts and slot through every step.
     Markup hooks:
       data-field="key"       input/select/radio/checkbox that writes state (checkbox → "on"/"off")
       data-line="car"        on a field: which ledger line (li[data-line]) to mark as filled
       data-b="key"           element whose text is rendered from the derived state
       data-show-if="a=b&c!=d|e"  shown only when the condition holds
       select[data-brands]    filled with every brand; select[data-models] filtered by brand
     With no stored state the default mock (GLE 300d, Luxury, ₹7,079) is used. */
  var BRANDS = {
    'Maruti Suzuki': { tier: 'Standard', models: ['Swift', 'Baleno', 'Brezza', 'Grand Vitara'] },
    'Hyundai': { tier: 'Standard', models: ['i20', 'Creta', 'Venue', 'Verna'] },
    'Tata': { tier: 'Standard', models: ['Nexon', 'Punch', 'Harrier'] },
    'Mahindra': { tier: 'Standard', models: ['XUV700', 'Scorpio-N', 'Thar'], premium: ['XUV700'] },
    'Kia': { tier: 'Standard', models: ['Seltos', 'Sonet', 'Carens'] },
    'Toyota': { tier: 'Standard', models: ['Innova Crysta', 'Innova Hycross', 'Fortuner', 'Glanza'], premium: ['Innova Hycross', 'Fortuner'] },
    'Honda': { tier: 'Standard', models: ['City', 'Amaze', 'Elevate'] },
    'Skoda': { tier: 'Premium', models: ['Slavia', 'Kushaq', 'Kodiaq', 'Superb'] },
    'Volkswagen': { tier: 'Premium', models: ['Virtus', 'Taigun', 'Tiguan'] },
    'MG': { tier: 'Premium', models: ['Astor', 'Hector', 'Gloster', 'ZS EV'] },
    'Jeep': { tier: 'Premium', models: ['Compass', 'Meridian', 'Wrangler Rubicon'] },
    'Mercedes-Benz': { tier: 'Luxury', models: ['GLE 300d 4MATIC', 'C 200', 'E 220d', 'GLC 300', 'GLS 450', 'S 500'] },
    'BMW': { tier: 'Luxury', models: ['X4 M Competition', '3 Series Gran Limousine', '5 Series', 'X1', 'X5 xDrive30d', 'X7 xDrive40i', 'i7 xDrive60'] },
    'Audi': { tier: 'Luxury', models: ['A4', 'A6', 'Q3', 'Q5', 'Q7 45 TDI'] },
    'Volvo': { tier: 'Luxury', models: ['XC40', 'XC60', 'XC90', 'S60 B5 Inscription'] },
    'Lexus': { tier: 'Luxury', models: ['ES 300h', 'NX 350h', 'RX 500h'] },
    'Land Rover': { tier: 'Luxury', models: ['Defender', 'Discovery Sport', 'Range Rover Velar', 'Range Rover Sport'] },
    'Porsche': { tier: 'Luxury', models: ['Macan', 'Cayenne', '911 Carrera'] },
    'Jaguar': { tier: 'Luxury', models: ['F-Pace', 'XF'] },
    'Mini': { tier: 'Luxury', models: ['Cooper S', 'Countryman'] }
  };
  var PRICES = { Standard: 3999, Premium: 4999, Luxury: 5999 };
  var DEFAULT_BOOKING = {
    service: 'used', brand: 'Mercedes-Benz', model: 'GLE 300d 4MATIC', year: '2021', variant: '', colour: '',
    notreg: 'off', reg: 'KL 11 BH 7272', vin: '', regd: '14 Mar 2021', whose: 'seller',
    address: 'Near Hilite Mall, Thondayad Bypass, Kozhikode 673014', landmark: 'Opp. Hilite City gate 2',
    contactName: 'Faisal (seller)', contactPhone: '+91 99460 55120', rep: '',
    dealer: 'BMW EVM Autokraft, Kochi', advisor: '', handover: '',
    date: 'Sat 21 Nov', session: 'Morning'
  };
  function bookingRaw() { try { return JSON.parse(store('sdA.booking') || '{}') || {}; } catch (e) { return {}; } }
  function bookingGet() {
    var s = {}, k, raw = bookingRaw();
    for (k in DEFAULT_BOOKING) { if (Object.prototype.hasOwnProperty.call(DEFAULT_BOOKING, k)) { s[k] = DEFAULT_BOOKING[k]; } }
    for (k in raw) { if (Object.prototype.hasOwnProperty.call(raw, k)) { s[k] = raw[k]; } }
    return s;
  }
  function bookingSave(patch) {
    var cur = bookingRaw(), k;
    for (k in patch) { if (Object.prototype.hasOwnProperty.call(patch, k)) { cur[k] = patch[k]; } }
    store('sdA.booking', JSON.stringify(cur));
  }
  function money(n, dec) {
    try { return '₹' + Number(n).toLocaleString('en-IN', { minimumFractionDigits: dec ? 2 : 0, maximumFractionDigits: dec ? 2 : 0 }); }
    catch (e) { return '₹' + (dec ? Number(n).toFixed(2) : Math.round(n)); }
  }
  function tierOf(s) {
    var b = BRANDS[s.brand];
    if (!b) { return 'Standard'; }
    if (b.premium && b.premium.indexOf(s.model) !== -1) { return 'Premium'; }
    return b.tier;
  }
  function derive(s) {
    var pdi = s.service === 'pdi', tier = tierOf(s);
    var base = pdi ? 3999 : (PRICES[tier] || 3999);
    var gst = Math.round(base * 18) / 100;
    var total = Math.round((base + gst) * 100) / 100, pay = Math.round(total), rnd = Math.round((pay - total) * 100) / 100;
    var sessTime = s.session === 'Afternoon' ? '2:00 – 6:00 PM IST' : '9:00 AM – 1:00 PM IST';
    var car = ((pdi ? (s.year || '2026') : s.year) ? (pdi ? (s.year || '2026') : s.year) + ' ' : '') + s.brand + ' ' + s.model + (s.variant ? ' ' + s.variant : '');
    return {
      service: pdi ? 'New Car PDI' : 'Used Car Pre-Purchase Inspection',
      serviceShort: pdi ? 'New Car PDI · 125+ points' : 'Used car · 300+ points',
      tier: pdi ? 'New Car PDI · flat price' : tier,
      tierNote: pdi ? 'One flat price for every new car' : tier + ' segment · set by the model you chose',
      base: money(base), gst: money(gst, true), total: money(total, true),
      rounding: (rnd < 0 ? '−' : '+') + money(Math.abs(rnd), true),
      pay: money(pay), priceLine: money(base) + ' + GST', payCta: 'Pay ' + money(pay) + ' securely',
      halfRefund: money(pay / 2, true),
      duration: pdi ? 'about 2 hours' : 'about 3–4 hours',
      car: car, brand: s.brand, model: s.model, year: s.year, colour: s.colour || '—',
      reg: (pdi && s.notreg !== 'off') ? 'Not registered yet' + (s.vin ? ' · ' + s.vin : '') : (s.reg || '—'),
      location: pdi ? s.dealer : s.address, landmark: s.landmark || '—',
      contact: pdi ? (s.advisor ? s.advisor + ' · sales advisor' : 'Sales advisor at ' + s.dealer) : (s.contactName + ' · ' + s.contactPhone),
      rep: s.rep || 'None added',
      dealer: s.dealer, advisor: s.advisor || '—', handover: s.handover || '—',
      date: s.date, session: s.session, sessionTime: sessTime,
      slot: s.date + ' · ' + s.session + ', ' + sessTime,
      holdLabel: s.date + ', ' + s.session
    };
  }
  function cond(expr, s) {
    return expr.split('&').every(function (c) {
      var neg = c.indexOf('!=') > -1, p = c.split(neg ? '!=' : '=');
      if (p.length < 2) { return true; }
      var ok = p[1].trim().split('|').indexOf(String(s[p[0].trim()] || '')) !== -1;
      return neg ? !ok : ok;
    });
  }
  var bookingRendered = false;
  function renderBooking() {
    var s = bookingGet(), v = derive(s);
    $$('[data-b]').forEach(function (el) {
      var k = el.getAttribute('data-b');
      if (!Object.prototype.hasOwnProperty.call(v, k)) { return; }
      if (el.closest && el.closest('.ledger__line.is-pending')) { return; }
      var val = String(v[k]);
      if (el.textContent !== val) {
        el.textContent = val;
        if (bookingRendered && !reduce) { el.classList.remove('is-ticking'); void el.offsetWidth; el.classList.add('is-ticking'); }
      }
    });
    $$('[data-show-if]').forEach(function (el) { el.hidden = !cond(el.getAttribute('data-show-if'), s); });
    $$('[data-pay-cta]').forEach(function (b) { b.setAttribute('data-pay-cta', v.payCta); });
    bookingRendered = true;
  }
  function fillBrandsModels() {
    var s = bookingGet();
    $$('select[data-brands]').forEach(function (sel) {
      var groups = { Standard: [], Premium: [], Luxury: [] }, k;
      for (k in BRANDS) { if (Object.prototype.hasOwnProperty.call(BRANDS, k)) { groups[BRANDS[k].tier].push(k); } }
      sel.innerHTML = ['Standard', 'Premium', 'Luxury'].map(function (t) {
        return '<optgroup label="' + t + ' brands">' + groups[t].map(function (b) { return '<option value="' + esc(b) + '"' + (b === s.brand ? ' selected' : '') + '>' + esc(b) + '</option>'; }).join('') + '</optgroup>';
      }).join('');
    });
    $$('select[data-models]').forEach(function (sel) {
      var b = BRANDS[s.brand];
      if (!b) { return; }
      sel.innerHTML = b.models.map(function (m) { return '<option value="' + esc(m) + '"' + (m === s.model ? ' selected' : '') + '>' + esc(m) + '</option>'; }).join('');
      if (b.models.indexOf(s.model) === -1) { bookingSave({ model: b.models[0] }); }
    });
  }
  function initFields() {
    var s = bookingGet();
    $$('[data-field]').forEach(function (el) {
      var k = el.getAttribute('data-field');
      if (el.hasAttribute('data-no-init') || !Object.prototype.hasOwnProperty.call(s, k)) { return; }
      if (el.type === 'radio') {
        el.checked = el.value === s[k];
        var c = el.closest ? el.closest('.choice') : null;
        if (c) { c.classList.toggle('is-selected', el.checked); }
      } else if (el.type === 'checkbox') {
        el.checked = s[k] === 'on';
      } else if (el.tagName === 'SELECT') {
        if ($$('option', el).some(function (o) { return (o.value || o.textContent) === s[k]; })) { el.value = s[k]; }
      } else if (s[k] && !el.value) {
        el.value = s[k];
      }
    });
  }
  function markLine(name) {
    if (!name) { return; }
    $$('.ledger__line[data-line="' + name + '"]').forEach(function (line) {
      line.classList.remove('is-pending', 'is-filled', 'is-new'); void line.offsetWidth;
      line.style.setProperty('--i', 0);
      line.classList.add('is-filled', 'is-new');
    });
  }
  (function () {
    var q = (window.location.search || '').match(/[?&]service=(pdi|used)\b/);
    if (q) { bookingSave({ service: q[1] }); }
    fillBrandsModels();
    initFields();
    renderBooking();
    function onField(e) {
      var t = e.target;
      if (!t || !t.getAttribute) { return; }
      var k = t.getAttribute('data-field');
      if (!k) { return; }
      if (e.type === 'input' && (t.type === 'radio' || t.type === 'checkbox' || t.tagName === 'SELECT')) { return; }
      var patch = {};
      patch[k] = t.type === 'checkbox' ? (t.checked ? 'on' : 'off') : t.value;
      if (k === 'brand') {
        var b = BRANDS[t.value];
        if (b && b.models.indexOf(bookingGet().model) === -1) { patch.model = b.models[0]; }
      }
      bookingSave(patch);
      if (k === 'brand' || k === 'service') { fillBrandsModels(); initFields(); }
      renderBooking();
      if (e.type === 'change') { markLine(t.getAttribute('data-line')); }
    }
    on(d, 'change', onField);
    on(d, 'input', onField);
  })();
  window.sdBooking = { get: bookingGet, save: function (p) { bookingSave(p); renderBooking(); }, derive: function () { return derive(bookingGet()); } };

  /* 4g-3. Inline, persistent field validation (icon + text, aria-invalid) */
  function fieldError(f, msg) {
    if (!f.id) { f.id = 'f-' + Math.random().toString(36).slice(2, 9); }
    var eid = 'err-' + f.id, err = d.getElementById(eid);
    var desc = (f.getAttribute('aria-describedby') || '').split(' ').filter(function (x) { return x && x !== eid; });
    if (msg) {
      if (!err) {
        err = d.createElement('p');
        err.className = 'field-error';
        err.id = eid;
        var host = f.closest ? (f.closest('.check, .switch') || null) : null;
        var field = f.closest ? f.closest('.field') : null;
        if (host) { host.parentNode.insertBefore(err, host.nextSibling); }
        else if (field) { field.appendChild(err); }
        else { f.parentNode.insertBefore(err, f.nextSibling); }
      }
      err.innerHTML = ic('alert') + '<span>' + esc(msg) + '</span>';
      f.setAttribute('aria-invalid', 'true');
      desc.push(eid);
    } else {
      if (err && err.parentNode) { err.parentNode.removeChild(err); }
      f.removeAttribute('aria-invalid');
    }
    if (desc.length) { f.setAttribute('aria-describedby', desc.join(' ')); } else { f.removeAttribute('aria-describedby'); }
  }
  function checkField(f, scope) {
    if (f.closest && f.closest('[hidden]')) { fieldError(f, ''); return true; }
    var ok, v = (f.value || '').trim();
    if (f.type === 'checkbox') { ok = f.checked; }
    else if (f.type === 'radio') { ok = !!(scope || d).querySelector('input[name="' + f.name + '"]:checked'); }
    else {
      ok = !f.required || v !== '';
      if (ok && v && f.getAttribute('pattern')) { try { ok = new RegExp('^(?:' + f.getAttribute('pattern') + ')$').test(v); } catch (e) { ok = true; } }
      if (ok && v && f.type === 'email') { ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
    }
    fieldError(f, ok ? '' : (f.getAttribute('data-error') || 'Please fill this in.'));
    return ok;
  }
  function validate(scope) {
    if (!scope) { return true; }
    var bad = $$('[required], [pattern]', scope).filter(function (f) { return !checkField(f, scope); });
    if (bad.length) { try { bad[0].focus({ preventScroll: false }); } catch (e) { bad[0].focus(); } }
    return !bad.length;
  }
  window.sdValidate = validate;
  $$('form[data-validate], form[data-demo]').forEach(function (f) { f.noValidate = true; });
  on(d, 'click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-validate-for]') : null;
    if (!t) { return; }
    var scope = $(t.getAttribute('data-validate-for'));
    if (scope && !validate(scope)) { e.preventDefault(); e.stopImmediatePropagation(); }
  }, true);
  on(d, 'submit', function (e) {
    var f = e.target;
    if (f && f.matches && f.matches('form[data-validate]') && !f.hasAttribute('data-demo')) {
      e.preventDefault();
      if (validate(f)) {
        var next = f.getAttribute('data-next');
        if (next) { window.location.href = next; }
      }
    }
  });
  function revalidate(e) { var f = e.target; if (f && f.getAttribute && f.getAttribute('aria-invalid') === 'true') { checkField(f, f.form || d); } }
  on(d, 'input', revalidate);
  on(d, 'change', revalidate);

  /* Generic reveal of a hidden target (confirm steps inside sheets, etc.) */
  on(d, 'click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-show-target]') : null;
    if (!t) { return; }
    e.preventDefault();
    var target = $(t.getAttribute('data-show-target'));
    if (target) {
      target.hidden = false;
      if (t.hasAttribute('data-hide-self')) { t.hidden = true; }
      var f = target.querySelector('button, a[href], input');
      if (f) { f.focus(); }
    }
  });

  /* 4h. Calendar + session → enables Continue, starts the 10-minute hold */
  var HOLD_MS = 10 * 60 * 1000;
  function holdUntil() { var v = parseInt(store('sdA.holdUntil') || '', 10); return isNaN(v) ? 0 : v; }
  function startHold(label, restart) {
    if (restart || !holdUntil() || holdUntil() < Date.now()) { store('sdA.holdUntil', String(Date.now() + HOLD_MS)); }
    if (label) { store('sdA.slotLabel', label); }
    $$('[data-hold]').forEach(function (h) { h.hidden = false; });
    renderHold();
  }
  var lastMin = -1;
  function renderHold() {
    var timers = $$('[data-hold-timer]');
    if (!timers.length) { return; }
    var until = holdUntil();
    if (!until) { return; }
    var left = Math.max(0, until - Date.now());
    var m = Math.floor(left / 60000), s = Math.floor((left % 60000) / 1000);
    timers.forEach(function (t) { t.textContent = pad(m) + ':' + pad(s); });
    $$('[data-hold-bar]').forEach(function (b) { b.style.setProperty('--p', (left / HOLD_MS).toFixed(4)); });
    var label = store('sdA.slotLabel');
    if (label) { $$('[data-hold-label]').forEach(function (l) { l.textContent = label; }); }
    $$('[data-hold]').forEach(function (h) {
      h.classList.toggle('is-low', left > 0 && left < 120000);
      h.classList.toggle('is-expired', left === 0);
    });
    $$('[data-hold-expired]').forEach(function (x) { x.hidden = left !== 0; });
    $$('[data-hold-active]').forEach(function (x) { x.hidden = left === 0; });
    if (m !== lastMin) {
      lastMin = m;
      $$('[data-hold-sr]').forEach(function (sr) { sr.textContent = left === 0 ? 'Your slot hold has expired.' : 'Slot held for ' + (m + 1) + ' more minute' + (m ? 's' : '') + '.'; });
    }
  }
  (function () {
    var cal = $('[data-cal]');
    var conts = $$('[data-requires-slot]');
    function ready() {
      var day = cal ? $('.cal__day[aria-pressed="true"]', cal) : null;
      var ses = $('[data-session] input:checked');
      if (day && ses) {
        conts.forEach(function (c) { c.removeAttribute('aria-disabled'); c.classList.remove('is-disabled'); });
        var label = (day.getAttribute('data-label') || '') + ', ' + (ses.getAttribute('data-short') || ses.value);
        bookingSave({ date: day.getAttribute('data-label') || '', session: ses.getAttribute('data-short') || ses.value });
        renderBooking();
        bind('slot', derive(bookingGet()).slot);
        startHold(label, true);
        var hint = $('[data-slot-hint]'); if (hint) { hint.hidden = true; }
      }
    }
    if (cal) {
      $$('.cal__day', cal).forEach(function (b) {
        on(b, 'click', function () {
          if (b.disabled || b.getAttribute('data-state') === 'full') { return; }
          $$('.cal__day', cal).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
          var dl = $('[data-day-label]'); if (dl) { dl.textContent = b.getAttribute('data-label') || ''; }
          ready();
        });
      });
      $$('[data-session] input').forEach(function (i) { on(i, 'change', ready); });
    }
    var auto = $('[data-hold-autostart]');
    if (auto && (!holdUntil() || holdUntil() < Date.now() - 1)) {
      if (!holdUntil()) { startHold(auto.getAttribute('data-hold-autostart'), true); }
    }
    if (holdUntil()) { $$('[data-hold]').forEach(function (h) { h.hidden = false; }); }
    renderHold();
    if ($$('[data-hold-timer]').length) { setInterval(renderHold, 1000); }
    on(d, 'click', function (e) {
      var r = e.target.closest ? e.target.closest('[data-hold-renew]') : null;
      if (r) { e.preventDefault(); startHold(null, true); toast('Slot held again', 'You have another 10 minutes to pay.', 'clock'); }
    });
  })();

  /* Disabled links/buttons explain themselves */
  on(d, 'click', function (e) {
    var dis = e.target.closest ? e.target.closest('[aria-disabled="true"]') : null;
    if (!dis) { return; }
    e.preventDefault();
    var hint = dis.getAttribute('data-disabled-hint');
    if (hint) { toast('Not just yet', hint, 'info'); }
  }, true);

  /* 4i. Payment methods */
  (function () {
    var group = $('[data-pay]');
    if (!group) { return; }
    function sync() {
      var sel = $('input[name="pay"]:checked', group);
      if (!sel) { return; }
      $$('[data-pay-panel]').forEach(function (p) { p.hidden = p.getAttribute('data-pay-panel') !== sel.value; });
      var cta = sel.getAttribute('data-cta');
      $$('[data-pay-cta]').forEach(function (b) { b.textContent = cta || b.getAttribute('data-pay-cta'); });
    }
    $$('input[name="pay"]', group).forEach(function (i) { on(i, 'change', sync); });
    sync();
  })();

  /* Language switch EN · മലയാളം (prototype: remembers the choice, copy stays English) */
  on(d, 'click', function (e) {
    var b = e.target.closest ? e.target.closest('.lang [data-lang]') : null;
    if (!b) { return; }
    var lang = b.getAttribute('data-lang');
    store('sdA.lang', lang);
    $$('.lang [data-lang]').forEach(function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-lang') === lang ? 'true' : 'false'); });
    toast(lang === 'ml' ? 'ഭാഷ: മലയാളം' : 'Language: English', lang === 'ml' ? 'Language set to Malayalam. This prototype shows English text; the app will switch every screen.' : 'All screens in English', 'globe', 3200);
  });

  /* 4j. Save heart, copy, generic toasts, demo forms, view toggle, range outputs */
  on(d, 'click', function (e) {
    if (!e.target.closest) { return; }
    var h = e.target.closest('.heart');
    if (h) {
      e.preventDefault(); e.stopPropagation();
      var on2 = h.getAttribute('aria-pressed') !== 'true';
      h.setAttribute('aria-pressed', on2 ? 'true' : 'false');
      var name = h.getAttribute('data-car') || 'this car';
      toast(on2 ? 'Saved to your shortlist' : 'Removed from shortlist', name, on2 ? 'heart' : 'x');
      return;
    }
    var c = e.target.closest('[data-copy]');
    if (c) {
      e.preventDefault();
      var txt = c.getAttribute('data-copy');
      try { if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(txt).catch(function () {}); } } catch (err) { /* ignore */ }
      toast(c.getAttribute('data-copy-title') || 'Link copied', txt, 'copy');
      return;
    }
    var t = e.target.closest('[data-toast]');
    if (t) {
      if (t.tagName === 'A' && (t.getAttribute('href') || '#').charAt(0) === '#') { e.preventDefault(); }
      if (t.tagName === 'BUTTON' && t.type === 'submit') { return; }
      toast(t.getAttribute('data-toast'), t.getAttribute('data-toast-sub') || '', t.getAttribute('data-toast-icon') || 'check-circle');
      return;
    }
    var v = e.target.closest('[data-view-set]');
    if (v) {
      var target = $(v.getAttribute('data-view-target') || '');
      if (target) { target.setAttribute('data-view', v.getAttribute('data-view-set')); }
      $$('[data-view-set]').forEach(function (x) { x.setAttribute('aria-pressed', x === v ? 'true' : 'false'); });
    }
  });
  $$('form[data-demo]').forEach(function (f) {
    on(f, 'submit', function (e) {
      e.preventDefault();
      if (!validate(f)) { return; }
      toast(f.getAttribute('data-demo'), f.getAttribute('data-demo-sub') || '', 'check-circle');
      var next = f.getAttribute('data-demo-next');
      if (next) { setTimeout(function () { window.location.href = next; }, 900); }
    });
  });
  $$('input[type="range"][data-out]').forEach(function (r) {
    var out = d.getElementById(r.getAttribute('data-out'));
    function upd() { if (out) { out.textContent = (r.getAttribute('data-prefix') || '') + inr(r.value) + (r.getAttribute('data-suffix') || ''); } }
    on(r, 'input', upd); upd();
  });

  /* 4k. Pseudo QR (decorative "Get the app" code) */
  $$('[data-qr]').forEach(function (box) {
    var n = 25, cell = 4, seed = 24817, s = '', x, y;
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    function finder(fx, fy) {
      return '<rect x="' + fx * cell + '" y="' + fy * cell + '" width="' + 7 * cell + '" height="' + 7 * cell + '" fill="#141414"/>' +
        '<rect x="' + (fx + 1) * cell + '" y="' + (fy + 1) * cell + '" width="' + 5 * cell + '" height="' + 5 * cell + '" fill="#fff"/>' +
        '<rect x="' + (fx + 2) * cell + '" y="' + (fy + 2) * cell + '" width="' + 3 * cell + '" height="' + 3 * cell + '" fill="#141414"/>';
    }
    for (y = 0; y < n; y++) {
      for (x = 0; x < n; x++) {
        var inF = (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9);
        if (!inF && rnd() > 0.52) { s += '<rect x="' + x * cell + '" y="' + y * cell + '" width="' + cell + '" height="' + cell + '" fill="#141414"/>'; }
      }
    }
    s += finder(0, 0) + finder(n - 7, 0) + finder(0, n - 7);
    s += '<rect x="' + (n / 2 - 2.5) * cell + '" y="' + (n / 2 - 2.5) * cell + '" width="' + 5 * cell + '" height="' + 5 * cell + '" rx="3" fill="#fff"/><rect x="' + (n / 2 - 1.5) * cell + '" y="' + (n / 2 - 1.5) * cell + '" width="' + 3 * cell + '" height="' + 3 * cell + '" rx="2" fill="#E61E2A"/>';
    box.innerHTML = '<svg viewBox="0 0 ' + n * cell + ' ' + n * cell + '" role="img" aria-label="QR code to download the SDCertified Cars app">' + s + '</svg>';
  });

  /* 5. PAGE BEHAVIOURS ---------------------------------------------------- */
  /* 5a. Prototype state switch (track.html): In progress ↔ Report ready.
     Tracking is milestone-based (no live sync). Elements with
     [data-state-show="progress|ready"] are shown for the matching state;
     buttons [data-state-set] switch it and announce the milestone with a toast. */
  (function () {
    var btns = $$('[data-state-set]');
    var blocks = $$('[data-state-show]');
    if (!btns.length || !blocks.length) { return; }
    function apply(state, announce) {
      blocks.forEach(function (b) {
        var show = (b.getAttribute('data-state-show') || '').split(' ').indexOf(state) !== -1;
        b.hidden = !show;
        if (show) {
          $$('[data-reveal], .ring, .bar, .gauge, .journey', b).forEach(function (x) {
            x.classList.remove('is-in'); void x.offsetWidth;
            setTimeout(function () { x.classList.add('is-in'); }, 60);
          });
        }
      });
      btns.forEach(function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-state-set') === state ? 'true' : 'false'); });
      body.setAttribute('data-state', state);
      store('sdA.trackState', state);
      if (announce) {
        if (state === 'ready') { toast('Your report is ready', 'SDR-24817 · 89/100 · Gold · sent on WhatsApp at 1:18 PM', 'file', 5200); }
        else { toast('Inspection in progress', 'Nikhil started at 9:31 AM · report in about 3–4 hours', 'clock', 4200); }
      }
    }
    btns.forEach(function (b) { on(b, 'click', function () { apply(b.getAttribute('data-state-set'), true); }); });
    var saved = store('sdA.trackState');
    apply(saved === 'ready' ? 'ready' : 'progress', false);
  })();

  /* 5b. Report: section filter "jump" highlighting + print */
  on(d, 'click', function (e) {
    var p = e.target.closest ? e.target.closest('[data-print]') : null;
    if (p) { e.preventDefault(); toast((p.getAttribute('data-print') || 'SDR-18842') + '.pdf downloading', 'Saved to your Downloads folder', 'download'); }
  });

  /* 5c. Add to calendar (.ics generated client-side, no server) */
  on(d, 'click', function (e) {
    var a = e.target.closest ? e.target.closest('[data-ics]') : null;
    if (!a) { return; }
    e.preventDefault();
    var ics = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//SDCertified//Booking//EN\r\nBEGIN:VEVENT\r\nUID:SDB-24817@sdcertified\r\nDTSTART:20261121T033000Z\r\nDTEND:20261121T073000Z\r\nSUMMARY:Suresh Drives inspection · Mercedes-Benz GLE 300d (SDB-24817)\r\nLOCATION:Near Hilite Mall, Thondayad Bypass, Kozhikode 673014\r\nDESCRIPTION:Morning session 9:00 AM–1:00 PM. Technician will be assigned and shared on WhatsApp.\r\nEND:VEVENT\r\nEND:VCALENDAR';
    try {
      var blob = new Blob([ics], { type: 'text/calendar' });
      var url = URL.createObjectURL(blob);
      var link = d.createElement('a');
      link.href = url; link.download = 'SDB-24817.ics';
      body.appendChild(link); link.click(); body.removeChild(link);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    } catch (err) { /* ignore */ }
    toast('Added to your calendar', 'Sat 21 Nov · 9:00 AM – 1:00 PM', 'calendar');
  });
})();
