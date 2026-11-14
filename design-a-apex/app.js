/* ==========================================================================
   SDCertified × Suresh Drives — Design A "Apex · Motorsport Precision"
   app.js — vanilla, no dependencies, works from file://

   Body contract:
     <body data-page="track" data-shell="site|app|flow" [data-back="href"]
           [data-step="1..5|done"] [data-theme="green"]>
   - Injects: icon sprite, header (site / app / flow + grid walk), mobile tab bar,
     mobile CTA bar (flow), footer, callback sheet, toast region.
   - Page content is real HTML in each page; this file only enhances it.
   - Every querySelector result is guarded.
   ========================================================================== */
(function () {
  'use strict';
  var d = document, root = d.documentElement, B = d.body;
  if (!B) return;
  root.classList.add('js');

  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var ss = {
    get: function (k) { try { return window.sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.sessionStorage.setItem(k, v); } catch (e) { /* blocked */ } },
    del: function (k) { try { window.sessionStorage.removeItem(k); } catch (e) { /* blocked */ } }
  };
  var ls = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* blocked */ } }
  };
  var page = B.getAttribute('data-page') || '';
  var shell = B.getAttribute('data-shell') || 'app';
  var stepAttr = B.getAttribute('data-step') || '';
  var step = stepAttr === 'done' ? 6 : (parseInt(stepAttr, 10) || 0);
  var A = '../assets/';
  var TEL = 'tel:+918330881213', TEL_TXT = '+91 8330 881 213';
  var WA = 'https://wa.me/919895441213';

  /* ---------------------------------------------------------------- Icons (stroke set, 24×24) */
  var ICONS = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
    car: '<path d="M3 16v-3.6l2-5A2 2 0 0 1 6.9 6h10.2a2 2 0 0 1 1.9 1.4l2 5V16a1 1 0 0 1-1 1h-1"/><path d="M5 17H4a1 1 0 0 1-1-1"/><path d="M9 17h6"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M3.5 12h17"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    bell: '<path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a2 2 0 0 0 3.4 0"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    whatsapp: '<path d="M3.5 20.5 5 16.3A8.5 8.5 0 1 1 8 19.2z"/><path d="M9 8.6c0 3.3 3 6.4 6.4 6.4l1.1-1.5-2-1-1 .9a4.6 4.6 0 0 1-2.4-2.4l.9-1-1-2z"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 3 3 5-6"/>',
    'double-check': '<path d="m2 12.5 4 4L14 8.5"/><path d="m10 16.5 1 0 8-8"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    'arrow-right': '<path d="M4 12h15M13 6l6 6-6 6"/>',
    'arrow-left': '<path d="M20 12H5M11 6l-6 6 6 6"/>',
    'chev-right': '<path d="m9 6 6 6-6 6"/>',
    'chev-left': '<path d="m15 6-6 6 6 6"/>',
    'chev-down': '<path d="m6 9 6 6 6-6"/>',
    'chev-up': '<path d="m6 15 6-6 6 6"/>',
    shield: '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z"/>',
    'shield-check': '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z"/><path d="m8.8 12 2.2 2.2 4.2-4.4"/>',
    gauge: '<path d="M4.5 18a9 9 0 1 1 15 0"/><path d="m12 13 4-4"/><circle cx="12" cy="13" r="1.3"/>',
    wrench: '<path d="M14.7 6.3a4 4 0 0 1 5.1-1.8l-2.6 2.6.4 2.2 2.2.4 2.6-2.6a4 4 0 0 1-5.4 5.1l-7.3 7.3a2 2 0 0 1-2.8-2.8l7.3-7.3a4 4 0 0 1 .5-3.1z"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    battery: '<rect x="2.5" y="7" width="17" height="10" rx="1"/><path d="M22 10.5v3M6 10v4M9.5 10v4M13 10v4"/>',
    tyre: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v5M12 16v5M3 12h5M16 12h5"/>',
    disc: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.5"/><path d="M17.5 5.8a8.5 8.5 0 0 1 1.3 11.5"/>',
    scan: '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><path d="M4 12h16"/>',
    camera: '<path d="M4 7h3l2-3h6l2 3h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.5"/>',
    file: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5"/>',
    heart: '<path d="M12 20s-7.5-4.6-9-9.4A4.7 4.7 0 0 1 12 6.6a4.7 4.7 0 0 1 9 4C19.5 15.4 12 20 12 20z"/>',
    filter: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
    sort: '<path d="M7 4v16M3 8l4-4 4 4M17 20V4M13 16l4 4 4-4"/>',
    grid: '<rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    alert: '<path d="M12 4 2.8 19.5h18.4z"/><path d="M12 10v4.5M12 17h.01"/>',
    star: '<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
    map: '<path d="M9 4 3 6.5v13.5L9 17.5l6 2.5 6-2.5V4L15 6.5z"/><path d="M9 4v13.5M15 6.5V20"/>',
    locate: '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
    lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="1"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>',
    card: '<rect x="3" y="5.5" width="18" height="13" rx="1"/><path d="M3 10h18M7 15h4"/>',
    bank: '<path d="M3 9.5 12 4l9 5.5M4 20h16M6 10.5v7M10 10.5v7M14 10.5v7M18 10.5v7"/>',
    wallet: '<path d="M19 7V5.5A1.5 1.5 0 0 0 17.5 4H5a2 2 0 0 0 0 4h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V6"/><path d="M16 13.5h.01"/>',
    rupee: '<path d="M6 4h12M6 9h12M9 4c6 0 6 9 0 9H6l8 7"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',
    edit: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01"/>',
    logout: '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l-4-4 4-4M6 12h10"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    engine: '<path d="M4 10h2V8h3V6h6v2h2l2 2h1v6h-1l-2 2H9l-2-2H4z"/><path d="M2 11v4M12 10v4"/>',
    droplet: '<path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5z"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M4.2 6.5l2.6 1.5M17.2 16l2.6 1.5M4.2 17.5 6.8 16M17.2 8l2.6-1.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
    sms: '<path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1"/><path d="M8 10.5h.01M12 10.5h.01M16 10.5h.01"/>',
    smartphone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2"/><path d="M11 18.5h2"/>',
    tag: '<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    trend: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    building: '<rect x="4" y="3" width="16" height="18"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14a6.5 6.5 0 0 1 3.5 6"/>',
    truck: '<path d="M2 6h12v10H2zM14 9h4l3 3.5V16h-7"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
    qr: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 17h3v3"/>',
    copy: '<rect x="8" y="8" width="12" height="12"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
    route: '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',
    paint: '<path d="M4 4h13v5H4z"/><path d="M17 6.5h2.5V12H11v3"/><rect x="9.5" y="15" width="3" height="6"/>',
    chip: '<rect x="6" y="6" width="12" height="12"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
    road: '<path d="M8 3 4 21M16 3l4 18M12 4v3M12 11v3M12 18v2"/>',
    seat: '<path d="M7 3h5a2 2 0 0 1 2 2v8H8.5L7 5z"/><path d="M6 13h10l2 4H7z"/><path d="M8 17v4M16 17v4"/>',
    receipt: '<path d="M5 3h14v18l-2.3-1.5L14.3 21 12 19.5 9.7 21l-2.4-1.5L5 21z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3M14 9l2 2"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    scope: '<circle cx="17" cy="7" r="3"/><path d="M14.9 9.1 4 20M3 21l2-1"/>',
    send: '<path d="M21 3 10 14M21 3l-7 18-4-7-7-4z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    sunset: '<path d="M4 18h16M6 14a6 6 0 0 1 12 0M12 4v4M5 8l1.5 1.5M19 8l-1.5 1.5M2 22h20"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/>',
    timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/>',
    flag: '<path d="M5 21V4"/><path d="M5 4h14l-2.5 4.5L19 13H5"/><path d="M9 4v9M13 4v9M5 8.5h12"/>',
    orbit: '<ellipse cx="12" cy="12" rx="10" ry="5.5" transform="rotate(-20 12 12)"/><circle cx="12" cy="12" r="2.5"/>',
    speed: '<path d="M3 7h9M5 12h11M3 17h9"/><path d="m15 5 6 7-6 7"/>',
    thumb: '<path d="M7 11v9H4v-9zM7 11l4-8a2.5 2.5 0 0 1 2.5 3L13 10h6a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 17.8 20H7"/>',
    fuel: '<path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M3 21h12M4 10h10"/><path d="M14 8h2a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0V8l-3-3"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>'
  };
  var ic = function (n, cls) { return '<svg class="i' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><use href="#i-' + n + '"/></svg>'; };
  window.SDIcon = ic;

  function buildSprite() {
    var s = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">';
    Object.keys(ICONS).forEach(function (k) { s += '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + ICONS[k] + '</symbol>'; });
    /* Suresh Drives Verified seal: green orbit + check (fixed colours) */
    s += '<symbol id="seal" viewBox="0 0 44 30"><ellipse cx="22" cy="15" rx="19.5" ry="10" transform="rotate(-18 22 15)" fill="none" stroke="#8CC63F" stroke-width="4.2"/><path d="m14.5 15.5 4.8 4.6L29.5 9.6" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="square"/></symbol>';
    /* Top-down car, front to the right (240×120). Colours via currentColor + --car-body */
    s += '<symbol id="car-top" viewBox="0 0 240 120">' +
      '<rect x="38" y="6" width="34" height="12" fill="currentColor"/><rect x="38" y="102" width="34" height="12" fill="currentColor"/>' +
      '<rect x="164" y="6" width="34" height="12" fill="currentColor"/><rect x="164" y="102" width="34" height="12" fill="currentColor"/>' +
      '<path d="M30 14H170c32 0 56 16 62 46-6 30-30 46-62 46H30c-12 0-19-8-19-20V34c0-12 7-20 19-20z" fill="var(--car-body,#fff)" stroke="currentColor" stroke-width="3"/>' +
      '<path d="M150 25c18 4 28 18 30 35-2 17-12 31-30 35l-12-8c6-9 8-18 8-27s-2-18-8-27z" fill="currentColor" opacity=".9"/>' +
      '<path d="M54 28l14 5v54l-14 5c-6-10-9-21-9-32s3-22 9-32z" fill="currentColor" opacity=".9"/>' +
      '<rect x="74" y="30" width="62" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="2" opacity=".55"/>' +
      '<path d="M146 14l6-7h8l-2 7M146 106l6 7h8l-2-7" fill="currentColor"/>' +
      '<path d="M222 40v40M14 44v32" stroke="currentColor" stroke-width="2" opacity=".5"/>' +
      '</symbol>';
    s += '</svg>';
    B.insertAdjacentHTML('afterbegin', s);
  }

  /* ---------------------------------------------------------------- Language (EN · മലയാളം) */
  function langSwitch() {
    return '<div class="lang" role="group" aria-label="Language"><button type="button" data-lang="en" aria-pressed="true">EN</button><span class="sep" aria-hidden="true">·</span><button type="button" data-lang="ml" aria-pressed="false" lang="ml">മലയാളം</button></div>';
  }
  function applyLang(l, announce) {
    root.setAttribute('lang', l === 'ml' ? 'ml' : 'en');
    $$('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-lang') === l ? 'true' : 'false'); });
    $$('[data-ml]').forEach(function (el) {
      if (el.getAttribute('data-en') === null) el.setAttribute('data-en', el.textContent);
      el.textContent = l === 'ml' ? el.getAttribute('data-ml') : el.getAttribute('data-en');
    });
    ls.set('sd_lang', l);
    if (announce) toast(l === 'ml' ? 'Menus and key labels are now in Malayalam. Full translation ships with the app.' : 'Showing English.', { title: l === 'ml' ? 'മലയാളം' : 'English', icon: 'globe' });
  }
  function initLang() {
    $$('[data-lang]').forEach(function (b) { b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang'), true); }); });
    if (ls.get('sd_lang') === 'ml') applyLang('ml', false);
  }

  /* ---------------------------------------------------------------- Shell */
  function lockup(dark) {
    return '<a class="lockup" href="index.html" aria-label="SDCertified by Suresh Drives — home"><img class="mark" src="' + A + 'logo-sdcertified-mark.png" alt="" width="26" height="30"><span class="lockup-t"><b>SDCertified</b><small>by Suresh Drives</small></span></a>' +
      (dark ? '<span class="lockup-div only-d" aria-hidden="true"></span><img class="lockup-sd only-d" src="' + A + 'logo-sureshdrives-light.png" alt="Suresh Drives" width="52" height="34">' : '');
  }
  function callBtn() { return '<a class="callbtn" href="' + TEL + '">' + ic('phone') + '<span data-ml="വിളിക്കൂ">Call us</span><span class="n">&nbsp;' + TEL_TXT + '</span></a>'; }
  function waBtn() { return '<a class="callbtn wabtn" href="' + WA + '" target="_blank" rel="noopener">' + ic('whatsapp') + '<span>WhatsApp us</span></a>'; }
  var NAV = [
    ['browse.html', 'Buy cars', 'കാറുകൾ വാങ്ങുക', ['browse', 'vehicle']],
    ['book.html', 'Book inspection', 'പരിശോധന ബുക്ക് ചെയ്യുക', ['book']],
    ['sell.html', 'Sell', 'വിൽക്കുക', ['sell']],
    ['inspections.html', 'My inspections', 'എന്റെ പരിശോധനകൾ', ['inspections', 'track', 'report', 'report-gle', 'report-pdi']],
    ['suresh-drives.html', 'Suresh Drives', 'സുരേഷ് ഡ്രൈവ്സ്', ['suresh-drives']],
    ['partners.html', 'Partners', 'പങ്കാളികൾ', ['partners']]
  ];
  function nav(site) {
    return '<nav class="nav" aria-label="Main">' + NAV.filter(function (n) { return !(site && n[0] === 'inspections.html'); }).map(function (n) {
      return '<a href="' + n[0] + '"' + (n[3].indexOf(page) > -1 ? ' aria-current="page"' : '') + '><span data-ml="' + n[2] + '">' + n[1] + '</span></a>';
    }).join('') + '</nav>';
  }
  /* Desktop utility strip: help + language live here so the main bar stays clean */
  function utilBar() {
    return '<div class="utilbar carbon only-d"><div class="wrap utilbar-in"><span class="util-endorse">SDCertified — an offering of Suresh Drives LLP, India’s first on-site car inspection company</span>' +
      '<div class="util-right">' + callBtn() + waBtn() + '<button class="callbtn" type="button" data-callback>' + ic('clock') + '<span>Request a callback</span></button>' + langSwitch() + '</div></div></div>';
  }
  function siteHeader() {
    return utilBar() + '<header class="topbar carbon"><div class="wrap topbar-in">' + lockup(true) + nav(true) +
      '<div class="bar-right"><span class="hide-d">' + langSwitch() + '</span><span class="hide-d">' + callBtn() + '</span>' +
      '<a class="btn btn-red btn-sm only-d" href="home.html">' + ic('user') + 'My account</a></div></div></header>';
  }
  function appHeader() {
    var back = B.getAttribute('data-back');
    var lead = back ? '<a class="icon-btn backbtn hide-d" href="' + back + '" aria-label="Back">' + ic('arrow-left') + '</a><span class="only-d">' + lockup(false) + '</span>' : lockup(false);
    return utilBar() + '<header class="topbar"><div class="wrap topbar-in">' + lead + nav(false) +
      '<div class="bar-right"><a class="icon-btn searchbtn" href="browse.html" aria-label="Search certified cars">' + ic('search') + '</a><span class="hide-d">' + langSwitch() + '</span><span class="hide-d">' + callBtn() + '</span>' +
      '<a class="icon-btn" href="notifications.html" aria-label="Notifications, 3 unread"' + (page === 'notifications' ? ' aria-current="page"' : '') + '>' + ic('bell') + '<span class="badge-dot" aria-hidden="true">3</span></a>' +
      '<a class="avatar-btn" href="profile.html" aria-label="Profile — Arjun Menon"><span class="avatar" aria-hidden="true">AM</span></a></div></div></header>';
  }
  var STEPS = [['book.html', 'Service'], ['book-car.html', 'Car'], ['book-location.html', 'Location'], ['book-slot.html', 'Slot'], ['checkout.html', 'Pay']];
  function gridWalk(cls) {
    var li = STEPS.map(function (s, i) {
      var n = i + 1, st = n < step ? 'done' : (n === step ? 'now' : 'next');
      if (step === 6) st = 'done';
      var inner = '<span class="gw-n">0' + n + '</span><span class="gw-l">' + s[1] + '</span>';
      if (st === 'done' && step !== 6) return '<li class="gw done"><a href="' + s[0] + '" aria-label="Step ' + n + ', ' + s[1] + ' — done, edit">' + inner + '</a></li>';
      return '<li class="gw ' + st + '"' + (st === 'now' ? ' aria-current="step"' : '') + '><span>' + inner + (st === 'now' ? '<span class="sr-only"> — current step</span>' : '') + '</span></li>';
    }).join('');
    return '<nav class="gridwalk ' + (cls || '') + '" aria-label="Booking steps"><ol>' + li + '</ol><div class="gw-track" aria-hidden="true"><span class="gw-fill"></span></div></nav>';
  }
  function flowHeader() {
    var prev = step > 1 && step < 6 ? STEPS[step - 2][0] : 'home.html';
    var label = step === 6 ? 'Booking confirmed' : (STEPS[step - 1] ? STEPS[step - 1][1] : '');
    return '<header class="flowbar"><div class="wrap"><div class="topbar-in">' +
      '<a class="icon-btn backbtn" href="' + prev + '" aria-label="' + (step > 1 && step < 6 ? 'Back to previous step' : 'Back to home') + '">' + ic('arrow-left') + '</a>' +
      '<span class="only-d">' + lockup(false) + '</span>' +
      '<div class="flow-step-m"><b>' + label + '</b><span>' + (step === 6 ? 'All 5 steps done' : 'Step ' + step + ' of 5 · about 3 minutes') + '</span></div>' +
      '<div class="bar-right">' + langSwitch() + callBtn() + waBtn() + '<a class="btn btn-ghost btn-sm only-d" href="home.html">Save &amp; exit</a></div>' +
      '</div>' + gridWalk('gridwalk-m') + '</div></header>';
  }
  function tabbar() {
    var cur = function (arr) { return arr.indexOf(page) > -1 ? ' aria-current="page"' : ''; };
    return '<nav class="tabbar" aria-label="App">' +
      '<a class="tb" href="home.html"' + cur(['home']) + '>' + ic('home') + '<span data-ml="ഹോം">Home</span></a>' +
      '<a class="tb" href="browse.html"' + cur(['browse', 'vehicle']) + '>' + ic('car') + '<span data-ml="വാങ്ങുക">Buy</span></a>' +
      '<a class="tb tb-book" href="book.html"' + cur(['book']) + '><span class="plate">' + ic('plus') + '</span><span data-ml="ബുക്ക്">Book</span></a>' +
      '<a class="tb" href="inspections.html"' + cur(['inspections', 'track', 'report', 'report-gle', 'report-pdi']) + '>' + ic('scan') + '<span class="dot" aria-hidden="true"></span><span data-ml="പരിശോധനകൾ">Inspections</span><span class="sr-only"> (1 in progress)</span></a>' +
      '<a class="tb" href="profile.html"' + cur(['profile', 'notifications', 'support', 'sell']) + '>' + ic('user') + '<span data-ml="പ്രൊഫൈൽ">Profile</span></a></nav>';
  }
  function footer() {
    return '<footer class="footer carbon"><div class="wrap"><div class="footer-grid">' +
      '<div><a class="lockup" href="index.html" aria-label="SDCertified home"><img class="mark" src="' + A + 'logo-sdcertified-mark.png" alt="" width="26" height="30"><span class="lockup-t"><b>SDCertified</b><small>by Suresh Drives</small></span></a>' +
      '<p class="small mt-3" style="color:var(--on-dark-2);max-width:42ch">Inspected by Suresh Drives · Sold on SDCertified. Book, track and pay for inspections in the app — help is a call away.</p>' +
      '<div class="footer-help"><a class="btn btn-light btn-sm" href="' + TEL + '">' + ic('phone') + '<span>Call us · ' + TEL_TXT + '</span></a><a class="btn btn-line btn-sm" href="' + WA + '" target="_blank" rel="noopener">' + ic('whatsapp') + 'WhatsApp us</a><button class="btn btn-line btn-sm" type="button" data-callback>' + ic('clock') + 'Request a callback</button></div>' +
      '<div class="stores mt-5"><a class="store" href="index.html#get-app">' + ic('smartphone') + '<span><small>Download on the</small><b>App Store</b></span></a><a class="store" href="index.html#get-app">' + ic('smartphone') + '<span><small>Get it on</small><b>Google Play</b></span></a></div></div>' +
      '<div class="footer-links"><h2>SDCertified</h2><ul><li><a href="browse.html">Buy certified cars</a></li><li><a href="book.html">Book an inspection</a></li><li><a href="book.html?service=pdi">Book a New Car PDI</a></li><li><a href="sell.html">Sell / get certified</a></li><li><a href="inspections.html">My inspections</a></li></ul></div>' +
      '<div class="footer-links"><h2>Suresh Drives</h2><ul><li><a href="suresh-drives.html">About Suresh Drives</a></li><li><a href="suresh-drives.html#process">The 300+ point process</a></li><li><a href="report.html">Sample report</a></li><li><a href="partners.html">Partner with us</a></li></ul></div>' +
      '<div class="footer-links"><h2>Help</h2><ul><li><a href="support.html">Help &amp; guides</a></li><li><a href="notifications.html">Notifications</a></li><li><a href="profile.html">My account</a></li><li><a href="mailto:sureshhdrives@gmail.com">sureshhdrives@gmail.com</a></li></ul></div>' +
      '</div><div class="endorse"><img src="' + A + 'logo-sureshdrives-light.png" alt="Suresh Drives" width="68" height="44"><span>SDCertified — an offering of Suresh Drives LLP, India’s first on-site car inspection company.</span></div>' +
      '<p class="foot-legal">The Workbook, HiLITE Business Park, Poovangal, Kozhikode, Kerala 673014 · sdcertifiedcars.com · © 2026 Suresh Drives LLP</p></div></footer>';
  }
  var CC = [['+91', 'India +91'], ['+971', 'UAE +971'], ['+966', 'Saudi +966'], ['+974', 'Qatar +974'], ['+965', 'Kuwait +965'], ['+968', 'Oman +968'], ['+973', 'Bahrain +973'], ['+1', 'US/Canada +1'], ['+44', 'UK +44']];
  function ccOptions(sel) { return CC.map(function (c) { return '<option value="' + c[0] + '"' + (c[0] === (sel || '+91') ? ' selected' : '') + '>' + c[1] + '</option>'; }).join(''); }
  function callbackSheet() {
    return '<div class="sheet" id="callback" aria-hidden="true"><div class="scrim" data-close></div><div class="sheet-panel" role="dialog" aria-modal="true" aria-labelledby="cb-h">' +
      '<div class="sheet-head"><h2 id="cb-h" class="h3">Request a callback</h2><button class="icon-btn" type="button" data-close aria-label="Close">' + ic('x') + '</button></div>' +
      '<p class="small muted mt-0">We’ll call you from ' + TEL_TXT + ' in the window you pick. Usually within 15 minutes during the day.</p>' +
      '<form class="stack" data-toast-form="We’ll call you in the window you picked, from ' + TEL_TXT + '." data-toast-title="Callback requested">' +
      '<div class="field"><label for="cb-topic">What’s it about?</label><select class="select" id="cb-topic"><option>A booking I’ve made</option><option>Booking a new inspection</option><option>Buying a certified car</option><option>Selling / certifying my car</option><option>Payments &amp; refunds</option><option>Something else</option></select></div>' +
      '<div class="field"><label for="cb-phone">Your number</label><div class="tel"><select class="select" aria-label="Country code" id="cb-cc">' + ccOptions('+91') + '</select><input class="input" id="cb-phone" type="tel" inputmode="tel" autocomplete="tel-national" value="98470 12345" required data-err="Enter a number we can call."></div></div>' +
      '<div class="field"><label for="cb-window">When should we call? (IST)</label><select class="select" id="cb-window"><option>As soon as possible</option><option>9 AM – 12 PM IST</option><option>12 PM – 3 PM IST</option><option>3 PM – 6 PM IST</option><option>6 PM – 9 PM IST</option></select></div>' +
      '<label class="check"><input type="checkbox" checked> <span>This number is reachable on WhatsApp</span></label>' +
      '<button class="btn btn-red btn-lg btn-block" type="submit">' + ic('phone') + 'Request callback</button></form></div></div>';
  }
  function ctaBar() {
    var main = $('[data-cta-main]');
    if (!main) return '';
    var rs = $('#race-sheet');
    var top = rs ? '<button class="sumbtn" type="button" data-msheet="#race-sheet" aria-expanded="false" aria-controls="race-sheet"><span class="t"><small>Your booking · incl. GST</small><b data-bk="total">₹7,079</b></span>' + ic('chev-up') + '<span class="sr-only">Show booking summary</span></button>'
      : '<span class="sumbtn"><span class="t"><small>' + (B.getAttribute('data-cta-note-k') || 'Booking') + '</small><b>' + (B.getAttribute('data-cta-note') || '') + '</b></span></span>';
    return '<div class="ctabar" data-ctabar><div class="ctabar-top">' + top + callBtn() + '</div><div data-cta-slot></div></div>';
  }
  function injectShell() {
    buildSprite();
    var head = shell === 'flow' ? flowHeader() : (shell === 'site' ? siteHeader() : appHeader());
    B.insertAdjacentHTML('afterbegin', '<a class="skip" href="#main">Skip to content</a>' + head);
    var after = footer() + (shell === 'app' ? tabbar() : '') + (shell === 'flow' ? ctaBar() : '') + callbackSheet() +
      '<div class="rs-scrim" data-msheet-close></div><div class="toasts" id="toasts" aria-live="polite" aria-atomic="false"></div>';
    var main = $('main');
    if (main) main.insertAdjacentHTML('afterend', after); else B.insertAdjacentHTML('beforeend', after);
    if (shell === 'app') B.classList.add('has-tabbar');
    var slot = $('[data-cta-slot]'), cta = $('[data-cta-main]');
    if (slot && cta) {
      var c = cta.cloneNode(true);
      c.removeAttribute('data-cta-main'); c.removeAttribute('id');
      c.classList.add('btn-block');
      slot.parentNode.replaceChild(c, slot);
      B.classList.add('has-ctabar');
    }
    if (B.getAttribute('data-theme') === 'green') root.style.setProperty('--theme', 'green');
  }
  function initGridWalk() {
    var target = step >= 6 ? 1 : Math.max(0, (step - .5) / 5);
    var last = parseFloat(ss.get('sd_gw_last') || '0');
    $$('.gw-fill').forEach(function (f) {
      f.style.setProperty('--p', reduce ? target : (isNaN(last) ? 0 : last));
      if (!reduce) requestAnimationFrame(function () { requestAnimationFrame(function () { f.style.setProperty('--p', target); }); });
    });
    if (step) ss.set('sd_gw_last', String(target));
  }

  /* ---------------------------------------------------------------- Toast */
  function toast(msg, opts) {
    opts = opts || {};
    var wrap = $('#toasts');
    if (!wrap) return;
    var el = d.createElement('div');
    el.className = 'toast' + (opts.kind ? ' ' + opts.kind : '');
    el.setAttribute('role', 'status');
    el.innerHTML = ic(opts.icon || (opts.kind === 'warn' ? 'alert' : 'check-circle')) + '<div>' + (opts.title ? '<b>' + opts.title + '</b>' : '') + '<span>' + msg + '</span></div>';
    wrap.appendChild(el);
    while (wrap.children.length > 3) wrap.removeChild(wrap.firstChild);
    setTimeout(function () { el.classList.add('out'); setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 260); }, opts.ms || 4600);
  }
  window.SDToast = toast;

  /* ---------------------------------------------------------------- Formatting */
  function inr(n) {
    n = Math.round(n);
    var s = String(Math.abs(n)), last3 = s.slice(-3), rest = s.slice(0, -3);
    if (rest) last3 = ',' + last3;
    return (n < 0 ? '-' : '') + rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + last3;
  }
  function inr2(n) { var w = Math.floor(n), f = Math.round((n - w) * 100); if (f === 100) { w += 1; f = 0; } return inr(w) + '.' + (f < 10 ? '0' : '') + f; }
  function money(n, dec) { return '₹' + (dec ? inr2(n) : inr(n)); }
  function animateNum(el, from, to, dur, fmt) {
    if (!el) return;
    fmt = fmt || function (v) { return inr(v); };
    if (reduce || from === to) { el.textContent = fmt(to); return; }
    var t0 = null;
    function tick(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(from + (to - from) * e);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------------------------------------------------------------- Booking state — one object in sessionStorage.
     Every summary, eyebrow, price and CTA in the flow reads from it. No personal data in URLs. */
  var BK_KEY = 'sd_booking';
  var TIERS = { Standard: 3999, Premium: 4999, Luxury: 5999 };
  var BK_DEFAULT = {
    service: 'used', brand: 'Mercedes-Benz', model: 'GLE 300d 4MATIC', year: '2021', tier: 'Luxury',
    reg: 'KL 11 BH 7272', notReg: false, vin: '', variant: '', colour: '', owner: 'seller',
    where: 'Near Hilite Mall, Thondayad Bypass, Kozhikode 673014', landmark: 'Opp. Hilite City gate 2',
    dealer: '', advisor: '', advisorPhone: '', handoverDate: 'Sat 21 Nov', handoverTime: '4:00 PM',
    contactName: 'Faisal (seller)', contactPhone: '+91 99460 55120', rep: '', repRel: '', repPhone: '',
    date: 'Sat 21 Nov', session: 'Morning'
  };
  var PDI_DEFAULT = { brand: 'BMW', model: 'i7 xDrive60', year: '2026', tier: 'Luxury', notReg: true, reg: '', owner: 'mine', dealer: 'BMW EVM Autokraft, Kochi', advisor: '', advisorPhone: '', contactName: '', contactPhone: '' };
  function bk() {
    var s = null, b = {}, k;
    try { s = JSON.parse(window.sessionStorage.getItem(BK_KEY) || 'null'); } catch (e) { s = null; }
    for (k in BK_DEFAULT) b[k] = BK_DEFAULT[k];
    if (s && typeof s === 'object') for (k in s) b[k] = s[k];
    return b;
  }
  function bkSet(patch) {
    var b = bk(), k;
    for (k in patch) b[k] = patch[k];
    try { window.sessionStorage.setItem(BK_KEY, JSON.stringify(b)); } catch (e) { /* blocked */ }
    renderBk();
    return b;
  }
  function priceOf(b) {
    var base = b.service === 'pdi' ? 3999 : (TIERS[b.tier] || 5999);
    var gst = Math.round(base * 18) / 100, exact = Math.round((base + gst) * 100) / 100, total = Math.round(exact);
    return { base: base, gst: gst, exact: exact, total: total, round: Math.round((total - exact) * 100) / 100 };
  }
  function bkView(b) {
    var p = priceOf(b), pdi = b.service === 'pdi';
    var sessTime = b.session === 'Afternoon' ? '2:00 – 6:00 PM IST' : '9:00 AM – 1:00 PM IST';
    var where = pdi ? (b.dealer || 'Choose a dealership') : (b.where || 'Add the address');
    return {
      service: pdi ? 'New Car PDI · 125+ points' : 'Used Car Pre-Purchase Inspection · 300+ points',
      serviceShort: pdi ? 'New Car PDI' : 'Used Car Pre-Purchase',
      car: ((b.year ? b.year + ' ' : '') + b.brand + ' ' + b.model).trim(),
      carShort: b.brand + ' ' + b.model,
      reg: pdi && b.notReg ? ('Not registered yet' + (b.vin ? ' · ' + b.vin : '')) : (b.reg || 'Registration to be added'),
      tier: pdi ? 'Flat price · all new cars' : b.tier + ' segment',
      tierName: pdi ? 'New Car PDI' : b.tier,
      base: money(p.base, true), baseShort: money(p.base), gst: money(p.gst, true),
      round: (p.round >= 0 ? '+' : '−') + '₹' + Math.abs(p.round).toFixed(2), exact: money(p.exact, true),
      total: money(p.total), payLabel: 'Pay ' + money(p.total) + ' securely',
      half: money(p.total / 2, true), refundFull: money(p.total),
      priceLine: money(p.base) + ' + GST ' + money(p.gst, true) + ' = ' + money(p.total),
      where: where, landmark: pdi ? '' : (b.landmark || ''),
      whereKind: pdi ? 'At the dealership' : (b.owner === 'mine' ? 'At your place' : (b.owner === 'dealer' ? 'At the dealer’s yard' : 'At the seller’s place')),
      contact: pdi ? ((b.advisor || 'Sales advisor to be added') + (b.advisorPhone ? ' · ' + b.advisorPhone : '')) : ((b.contactName || 'You') + (b.contactPhone ? ' · ' + b.contactPhone : '')),
      rep: b.rep ? (b.rep + (b.repRel ? ' (' + b.repRel + ')' : '') + (b.repPhone ? ' · ' + b.repPhone : '')) : 'None added',
      date: b.date, session: b.session,
      slot: b.date + ' · ' + b.session, slotTime: sessTime, slotFull: b.date + ' · ' + b.session + ' · ' + sessTime,
      handover: (b.handoverDate || '') + ', ' + (b.handoverTime || '') + ' IST',
      duration: pdi ? 'about 2 hours' : 'about 3–4 hours',
      slotDual: b.session === 'Afternoon' ? '2:00 – 6:00 PM IST · 12:30 – 4:30 PM Dubai' : '9:00 AM – 1:00 PM IST · 7:30 – 11:30 AM Dubai',
      carTitle: pdi ? 'Your new car' : 'Your car',
      whereTitle: pdi ? 'Which dealership?' : 'Where is the car?'
    };
  }
  function renderBk() {
    var b = bk(), v = bkView(b);
    $$('[data-bk]').forEach(function (el) { var k = el.getAttribute('data-bk'); if (v[k] !== undefined) el.textContent = v[k]; });
    $$('[data-bk-show]').forEach(function (el) { el.hidden = el.getAttribute('data-bk-show') !== b.service; });
    B.setAttribute('data-service', b.service);
    /* Dual IST · Dubai times when the booker uses a +971 number or adds a representative */
    var dual = /^\+971/.test(b.myPhone || '') || /^\+971/.test(b.repPhone || '') || !!(b.rep && b.rep.trim());
    $$('[data-dual]').forEach(function (el) { el.hidden = !dual; });
    $$('.rs-row[data-rs]').forEach(function (r) {
      var n = parseInt(r.getAttribute('data-rs'), 10);
      r.classList.toggle('pending', step && step < 6 && n > step);
      r.classList.toggle('now', n === step);
    });
  }
  window.SDBooking = { get: bk, set: bkSet, view: function () { return bkView(bk()); } };

  /* ---------------------------------------------------------------- Inline validation */
  function fieldErr(el, msg) {
    if (!el.id) el.id = 'f-' + Math.random().toString(36).slice(2, 8);
    var eid = el.id + '-err', e = d.getElementById(eid);
    var db = (el.getAttribute('aria-describedby') || '').split(' ').filter(function (x) { return x && x !== eid; });
    if (!msg) {
      el.removeAttribute('aria-invalid');
      if (e && e.parentNode) e.parentNode.removeChild(e);
      if (db.length) el.setAttribute('aria-describedby', db.join(' ')); else el.removeAttribute('aria-describedby');
      return true;
    }
    el.setAttribute('aria-invalid', 'true');
    if (!e) { e = d.createElement('p'); e.className = 'err-msg'; e.id = eid; var host = el.closest('.field, .check, fieldset') || el.parentNode; host.appendChild(e); }
    e.innerHTML = ic('alert') + '<span>' + msg + '</span>';
    db.push(eid); el.setAttribute('aria-describedby', db.join(' '));
    return false;
  }
  function validate(scope) {
    var ok = true, first = null, seen = {};
    $$('[required]', scope).forEach(function (el) {
      if (el.closest('[hidden]') || el.disabled) { fieldErr(el, ''); return; }
      if (el.type === 'radio') { if (seen[el.name]) return; seen[el.name] = 1; }
      var val = (el.value || '').trim(), bad;
      if (el.type === 'checkbox') bad = !el.checked;
      else if (el.type === 'radio') bad = !$$('input[name="' + el.name + '"]', scope).some(function (r) { return r.checked; });
      else bad = !val;
      if (!bad && el.getAttribute('data-pattern')) { try { bad = !(new RegExp(el.getAttribute('data-pattern'))).test(val); } catch (er) { bad = false; } }
      if (!fieldErr(el, bad ? (el.getAttribute('data-err') || 'Please fill this in.') : '')) { ok = false; if (!first) first = el; }
    });
    if (first) { try { first.focus(); } catch (e) { /* noop */ } }
    return ok;
  }
  function initValidation() {
    $$('form').forEach(function (f) { f.setAttribute('novalidate', ''); });
    d.addEventListener('input', function (e) { var t = e.target; if (t && t.getAttribute && t.getAttribute('aria-invalid') === 'true') fieldErr(t, ''); });
    d.addEventListener('change', function (e) {
      var t = e.target;
      if (t && t.getAttribute && t.getAttribute('aria-invalid') === 'true') fieldErr(t, '');
      if (t && t.type === 'radio') $$('input[name="' + t.name + '"][aria-invalid]').forEach(function (r) { fieldErr(r, ''); });
    });
    /* Continue links validate their step first: data-check="#form-id" */
    d.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('[data-check]') : null;
      if (!a) return;
      var scope = $(a.getAttribute('data-check'));
      if (scope && !validate(scope)) { e.preventDefault(); toast('Please check the highlighted fields.', { kind: 'warn', title: 'A few details missing' }); closeMsheets(); }
    });
    /* Forms that just confirm with a toast: data-toast-form="message" */
    $$('form[data-toast-form]').forEach(function (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!validate(f)) return;
        var sh = f.closest('.sheet'); if (sh) closeLayer(sh);
        toast(f.getAttribute('data-toast-form'), { title: f.getAttribute('data-toast-title') || 'Done' });
        if (f.hasAttribute('data-reset')) f.reset();
      });
    });
  }

  /* ---------------------------------------------------------------- Layers: sheets (.sheet) and mobile sheets (.msheet) */
  var lastFocus = null;
  function openLayer(el) {
    if (!el) return;
    lastFocus = d.activeElement;
    el.setAttribute('aria-hidden', 'false');
    B.classList.add('lock');
    var f = $('input:not([type=hidden]), select, textarea, button:not([data-close]), a[href]', $('.sheet-panel', el) || el);
    setTimeout(function () { try { (f || el).focus(); } catch (e) { /* noop */ } }, 60);
  }
  function closeLayer(el) {
    if (!el) return;
    el.setAttribute('aria-hidden', 'true');
    if (!$('.sheet[aria-hidden="false"]')) B.classList.remove('lock');
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) { /* noop */ } }
  }
  function closeMsheets() {
    $$('.msheet.open').forEach(function (m) { m.classList.remove('open'); });
    $$('.rs-scrim').forEach(function (s) { s.classList.remove('open'); });
    $$('[data-msheet]').forEach(function (b) { if (b.hasAttribute('aria-expanded')) b.setAttribute('aria-expanded', 'false'); });
    B.classList.remove('lock');
  }
  function initLayers() {
    d.addEventListener('click', function (e) {
      var t = e.target;
      if (!t.closest) return;
      var o = t.closest('[data-open]');
      if (o) { e.preventDefault(); openLayer($(o.getAttribute('data-open'))); return; }
      var cb = t.closest('[data-callback]');
      if (cb) { e.preventDefault(); openLayer($('#callback')); return; }
      var c = t.closest('[data-close]');
      if (c) { closeLayer(c.closest('.sheet')); return; }
      var m = t.closest('[data-msheet]');
      if (m && m.tagName === 'BUTTON') {
        var target = $(m.getAttribute('data-msheet'));
        if (!target) return;
        var open = !target.classList.contains('open');
        closeMsheets();
        if (open) {
          target.classList.add('open'); B.classList.add('lock');
          $$('.rs-scrim').forEach(function (s) { s.classList.add('open'); });
          m.setAttribute('aria-expanded', 'true');
          var f = $('button, a[href], input, select', target); if (f) setTimeout(function () { try { f.focus(); } catch (er) { /* noop */ } }, 80);
        }
        return;
      }
      if (t.closest('[data-msheet-close]')) { closeMsheets(); return; }
      /* Panels inside a sheet: data-step-to="#panel" shows it, hides siblings [data-panel] */
      var st = t.closest('[data-step-to]');
      if (st) {
        var p = $(st.getAttribute('data-step-to'));
        if (p && p.parentNode) { $$('[data-panel]', p.parentNode).forEach(function (x) { x.hidden = x !== p; }); var h = $('h2, h3, button, a', p); if (h) { h.setAttribute('tabindex', '-1'); try { h.focus(); } catch (er) { /* noop */ } } }
      }
    });
    d.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var s = $$('.sheet[aria-hidden="false"]').pop();
      if (s) closeLayer(s); else closeMsheets();
    });
    /* Reset multi-step sheets each time they open */
    $$('.sheet').forEach(function (s) {
      var panels = $$('[data-panel]', s);
      if (!panels.length) return;
      new MutationObserver(function () { if (s.getAttribute('aria-hidden') === 'false') panels.forEach(function (p, i) { p.hidden = i !== 0; }); }).observe(s, { attributes: true, attributeFilter: ['aria-hidden'] });
    });
  }

  /* ---------------------------------------------------------------- Generic actions */
  function initActions() {
    d.addEventListener('click', function (e) {
      var t = e.target;
      if (!t.closest) return;
      var sv = t.closest('[data-save]');
      if (sv) {
        e.preventDefault();
        var on = sv.getAttribute('aria-pressed') !== 'true';
        sv.setAttribute('aria-pressed', on ? 'true' : 'false');
        toast(on ? (sv.getAttribute('data-save') || 'Car') + ' saved to your shortlist.' : 'Removed from your shortlist.', { title: on ? 'Saved' : 'Removed', icon: 'heart' });
        return;
      }
      var sh = t.closest('[data-share]');
      if (sh) {
        e.preventDefault();
        var txt = sh.getAttribute('data-share-text') || window.location.href;
        try { if (navigator.clipboard) navigator.clipboard.writeText(txt).catch(function () { /* ignore */ }); } catch (er) { /* ignore */ }
        toast(sh.getAttribute('data-share') || 'Link copied — paste it in WhatsApp.', { title: sh.getAttribute('data-share-title') || 'Link copied', icon: 'share' });
        return;
      }
      var dl = t.closest('[data-download]');
      if (dl) { e.preventDefault(); toast(dl.getAttribute('data-download') + ' is downloading.', { title: 'Download started', icon: 'download' }); return; }
      var tt = t.closest('[data-toast]');
      if (tt) {
        if (tt.tagName === 'A' && !tt.hasAttribute('data-toast-follow')) e.preventDefault();
        toast(tt.getAttribute('data-toast'), { title: tt.getAttribute('data-toast-title') || '', icon: tt.getAttribute('data-toast-icon') || null, kind: tt.getAttribute('data-toast-kind') || '' });
        var sheet = tt.closest('.sheet'); if (sheet && tt.hasAttribute('data-close-after')) closeLayer(sheet);
      }
    });
    /* Pressed-state chips (single-select groups: data-group) */
    d.addEventListener('click', function (e) {
      var c = e.target.closest ? e.target.closest('[aria-pressed][data-group]') : null;
      if (!c) return;
      $$('[data-group="' + c.getAttribute('data-group') + '"]').forEach(function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); });
    });
    d.addEventListener('click', function (e) {
      var c = e.target.closest ? e.target.closest('.chip[aria-pressed]:not([data-group]):not([data-f])') : null;
      if (!c) return;
      c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    });
    /* Preference switches confirm quietly */
    d.addEventListener('change', function (e) {
      var s = e.target;
      if (!s.classList || !s.classList.contains('switch') || !s.hasAttribute('data-pref')) return;
      toast((s.getAttribute('data-pref') || 'Preference') + (s.checked ? ' on' : ' off') + '.', { title: 'Saved', icon: 'settings', ms: 2600 });
    });
  }

  /* ---------------------------------------------------------------- Tabs (role=tablist) & filters */
  function initTabs() {
    $$('[role="tablist"]').forEach(function (list) {
      var tabs = $$('[role="tab"]', list);
      function sel(t, focus) {
        tabs.forEach(function (x) {
          var on = x === t;
          x.setAttribute('aria-selected', on ? 'true' : 'false');
          x.setAttribute('tabindex', on ? '0' : '-1');
          var p = d.getElementById(x.getAttribute('aria-controls'));
          if (p) { p.hidden = !on; if (on && !reduce) { p.classList.remove('state-in'); void p.offsetWidth; p.classList.add('state-in'); } }
        });
        if (focus) t.focus();
      }
      tabs.forEach(function (t, i) {
        t.addEventListener('click', function () { sel(t); });
        t.addEventListener('keydown', function (e) {
          var n = e.key === 'ArrowRight' ? 1 : (e.key === 'ArrowLeft' ? -1 : 0);
          if (n) { e.preventDefault(); sel(tabs[(i + n + tabs.length) % tabs.length], true); }
        });
      });
      var init = tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || tabs[0];
      if (init) sel(init);
    });
    /* List filter: buttons [data-filter="cat"] within [data-filter-group] filter items [data-cat] in [data-filter-list] */
    $$('[data-filter-group]').forEach(function (g) {
      var list = $(g.getAttribute('data-filter-group'));
      if (!list) return;
      $$('[data-filter]', g).forEach(function (b) {
        b.addEventListener('click', function () {
          var f = b.getAttribute('data-filter');
          $$('[data-filter]', g).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
          $$('[data-cat]', list).forEach(function (it) { it.hidden = f !== 'all' && (' ' + it.getAttribute('data-cat') + ' ').indexOf(' ' + f + ' ') < 0; });
          $$('[data-day-group]', list).forEach(function (dg) { dg.hidden = !$$('[data-cat]', dg).some(function (it) { return !it.hidden; }); });
        });
      });
    });
  }

  /* ---------------------------------------------------------------- Reveal on scroll + count-up */
  function initReveal() {
    var els = $$('.rv');
    if (!els.length || reduce || !('IntersectionObserver' in window)) return;
    root.classList.add('rv-on');
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    els.forEach(function (el) { io.observe(el); });
  }
  function initCountUp() {
    var els = $$('[data-countup]');
    if (!els.length || reduce || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, to = parseFloat(el.getAttribute('data-countup'));
        if (!isNaN(to)) animateNum(el, 0, to, 560, function (v) { return String(Math.round(v)); });
        io.unobserve(el);
      });
    }, { threshold: .4 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------------- Gallery */
  function initGallery() {
    $$('[data-gallery]').forEach(function (g) {
      var main = $('[data-gallery-main]', g);
      if (!main) return;
      $$('[data-src]', g).forEach(function (t) {
        t.addEventListener('click', function () {
          main.src = t.getAttribute('data-src');
          main.style.objectPosition = t.getAttribute('data-pos') || '50% 50%';
          main.alt = t.getAttribute('data-alt') || main.alt;
          $$('[data-src]', g).forEach(function (x) { x.setAttribute('aria-pressed', x === t ? 'true' : 'false'); });
        });
      });
    });
  }

  /* ---------------------------------------------------------------- Track: prototype state switch (In progress ↔ Report ready) */
  function setState(state, announce) {
    B.setAttribute('data-track-state', state);
    $$('[data-when]').forEach(function (el) { el.hidden = el.getAttribute('data-when') !== state; if (!el.hidden && announce && !reduce) { el.classList.remove('state-in'); void el.offsetWidth; el.classList.add('state-in'); } });
    $$('[data-cls-' + state + ']').forEach(function (el) {
      if (el.getAttribute('data-cls-base') === null) el.setAttribute('data-cls-base', el.className.replace(/\b(done|now|next|finish)\b/g, '').trim());
      el.className = el.getAttribute('data-cls-base') + ' ' + el.getAttribute('data-cls-' + state);
    });
    $$('[data-p-' + state + ']').forEach(function (el) { el.style.setProperty('--p', el.getAttribute('data-p-' + state)); });
    $$('[data-state]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-state') === state ? 'true' : 'false'); });
    if (announce) {
      if (state === 'ready') toast('SDR-24817 · 89/100 · Gold recommended. Sent on WhatsApp and push at 1:18 PM IST.', { title: 'Report ready', icon: 'flag' });
      else toast('Nikhil started at 9:31 AM IST. We’ll message you the moment the report is ready.', { title: 'In progress', icon: 'clock' });
    }
  }
  function initStateSwitch() {
    var btns = $$('[data-state]');
    if (!btns.length) return;
    btns.forEach(function (b) { b.addEventListener('click', function () { setState(b.getAttribute('data-state'), true); }); });
    setState(/[?&]state=ready\b/.test(window.location.search) ? 'ready' : 'progress', false);
  }

  /* ---------------------------------------------------------------- Hold timer (10 min; 2 h while a pay-by-link is open) */
  var HOLD_MS = 10 * 60 * 1000, LINK_HOLD_MS = 2 * 60 * 60 * 1000, holdTick = null, holdSaid = {};
  function holdUntil() { var v = parseInt(ss.get('sd_hold_until') || '0', 10); return isNaN(v) ? 0 : v; }
  function holdTotal() { var v = parseInt(ss.get('sd_hold_total') || String(HOLD_MS), 10); return isNaN(v) ? HOLD_MS : v; }
  function startHold(ms, total) { ss.set('sd_hold_until', String(Date.now() + ms)); ss.set('sd_hold_total', String(total || ms)); holdSaid = {}; renderHold(); }
  function holdSr(msg) { $$('[data-hold-sr]').forEach(function (el) { el.textContent = msg; }); }
  function renderHold() {
    var until = holdUntil(), total = holdTotal(), left = Math.max(0, until - Date.now()), s = Math.ceil(left / 1000);
    var h = Math.floor(s / 3600), mm = String(Math.floor(s % 3600 / 60)), sec = String(s % 60);
    if (mm.length < 2) mm = '0' + mm; if (sec.length < 2) sec = '0' + sec;
    var b = bk(), label = b.date + ', ' + b.session;
    $$('[data-hold-label]').forEach(function (el) { el.textContent = label; });
    $$('[data-hold-time]').forEach(function (el) { el.textContent = until && left > 0 ? (h ? h + ':' : '') + mm + ':' + sec : '00:00'; });
    $$('[data-hold-bar]').forEach(function (el) { el.style.transform = 'scaleX(' + (total ? Math.max(0, Math.min(1, left / total)) : 0) + ')'; });
    $$('.hold').forEach(function (el) { el.classList.toggle('low', left > 0 && left < 120000 && total <= HOLD_MS); el.classList.toggle('expired', !!until && left <= 0); });
    $$('[data-hold-msg]').forEach(function (el) {
      el.textContent = left <= 0 ? 'Hold expired — tap “Hold again” to re-check availability.' :
        (total > HOLD_MS ? 'Pay-by-link open — we hold your slot for 2 hours; the link expires with the hold.' :
          (left < 120000 ? 'Almost out of time — finish payment to lock this slot.' : 'Free reschedule up to 12 h before the session.'));
    });
    $$('[data-hold-again]').forEach(function (x) { x.hidden = left > 0; });
    var mins = Math.ceil(left / 60000);
    if (left <= 0 && until && !holdSaid.exp) { holdSaid.exp = 1; holdSr('Your slot hold has expired.'); }
    [5, 2, 1].forEach(function (m) { if (mins === m && !holdSaid[m] && total <= HOLD_MS) { holdSaid[m] = 1; holdSr(m + (m === 1 ? ' minute' : ' minutes') + ' left on your slot hold.'); } });
    $$('[data-pay]').forEach(function (p) { p.setAttribute('aria-disabled', left <= 0 ? 'true' : 'false'); });
  }
  function initHold() {
    if (!$('[data-hold-time]')) return;
    if (page === 'checkout' && holdUntil() < Date.now() - 60 * 60 * 1000) startHold(582000, HOLD_MS);
    if (page === 'book-slot' && holdUntil() > Date.now()) { var p = $('[data-hold-panel]'); if (p) p.hidden = false; }
    renderHold();
    holdSr('We’re holding ' + bk().date + ', ' + bk().session + ' for you.');
    clearInterval(holdTick);
    holdTick = setInterval(renderHold, 1000);
    $$('[data-hold-again]').forEach(function (x) { x.addEventListener('click', function () { startHold(HOLD_MS, HOLD_MS); toast('Still available — held for another 10 minutes.', { title: 'Held again', icon: 'timer' }); }); });
  }

  /* ---------------------------------------------------------------- Step 1: service (book.html, ?service=pdi preselects PDI) */
  function initServiceStep() {
    var radios = $$('input[name="service"]');
    if (!radios.length) return;
    var q = /[?&]service=pdi\b/.test(window.location.search);
    function apply(svc) {
      var b = bk();
      if (svc === 'pdi' && b.service !== 'pdi') { var p = { service: 'pdi' }, k; for (k in PDI_DEFAULT) p[k] = PDI_DEFAULT[k]; bkSet(p); }
      else if (svc === 'used' && b.service !== 'used') bkSet({ service: 'used', brand: BK_DEFAULT.brand, model: BK_DEFAULT.model, year: BK_DEFAULT.year, tier: BK_DEFAULT.tier, reg: BK_DEFAULT.reg, notReg: false, owner: 'seller', dealer: '', contactName: BK_DEFAULT.contactName, contactPhone: BK_DEFAULT.contactPhone });
      else renderBk();
      radios.forEach(function (r) { r.checked = r.value === svc; });
    }
    apply(q ? 'pdi' : bk().service);
    radios.forEach(function (r) { r.addEventListener('change', function () { apply(r.value); }); });
  }

  /* ---------------------------------------------------------------- Step 2: car (book-car.html) */
  function telValue(box) { if (!box) return ''; var cc = $('select', box), n = $('input', box); return (cc ? cc.value + ' ' : '') + (n ? n.value.trim() : ''); }
  function initCarStep() {
    var model = $('#model');
    if (!model) return;
    var b = bk(), brands = $$('input[name="brand"]'), curPrice = TIERS[b.tier] || 5999;
    function applyTier(save) {
      var opt = model.options[model.selectedIndex];
      if (!opt) return;
      var tier = opt.getAttribute('data-tier') || 'Standard', price = TIERS[tier];
      if (save) bkSet({ model: opt.value, brand: opt.getAttribute('data-brand'), tier: tier });
      if (bk().service === 'pdi') return;   /* PDI is a flat price — brand never sets a segment */
      $$('[data-seg-price]').forEach(function (el) { animateNum(el, curPrice, price, 260); });
      $$('[data-seg-gst]').forEach(function (el) { el.textContent = inr2(Math.round(price * 18) / 100); });
      $$('[data-seg-total]').forEach(function (el) { animateNum(el, Math.round(curPrice * 1.18), Math.round(price * 1.18), 260); });
      $$('[data-seg-name]').forEach(function (el) { el.textContent = tier; });
      $$('[data-tier-row]').forEach(function (r) { var on = r.getAttribute('data-tier-row') === tier; r.classList.toggle('on', on); if (on) r.setAttribute('aria-current', 'true'); else r.removeAttribute('aria-current'); });
      curPrice = price;
    }
    function filterModels(brand, keep) {
      var first = null;
      $$('option', model).forEach(function (o) {
        if (!o.getAttribute('data-brand')) return;
        var show = o.getAttribute('data-brand') === brand;
        o.hidden = !show; o.disabled = !show;
        if (show && !first) first = o;
      });
      var sel = model.options[model.selectedIndex];
      if (!keep || !sel || sel.disabled) { if (first) model.value = first.value; }
      $$('[data-brand-name]').forEach(function (el) { el.textContent = brand; });
      applyTier(true);
    }
    brands.forEach(function (r) { r.checked = r.value === b.brand; r.addEventListener('change', function () { filterModels(r.value, false); }); });
    $$('option', model).forEach(function (o) { if (o.value === b.model && o.getAttribute('data-brand') === b.brand) o.selected = true; });
    model.addEventListener('change', function () { applyTier(true); });
    filterModels(b.brand, true);
    var bind = function (sel, key) {
      var el = $(sel); if (!el) return;
      if (b[key] !== undefined && b[key] !== '' && el.type !== 'checkbox') el.value = b[key];
      var up = function () { var p = {}; p[key] = el.value; bkSet(p); };
      el.addEventListener('input', up); el.addEventListener('change', up);
    };
    bind('#year', 'year'); bind('#vin', 'vin'); bind('#variant', 'variant'); bind('#colour', 'colour');
    var reg = $('#reg'), fetchEl = $('[data-fetch]');
    if (reg) {
      if (b.reg) reg.value = b.reg;
      reg.addEventListener('input', function () {
        var raw = reg.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        var m = raw.match(/^([A-Z]{0,2})(\d{0,2})([A-Z]{0,3})(\d{0,4})/);
        var out = m ? [m[1], m[2], m[3], m[4]].filter(Boolean).join(' ') : raw;
        reg.value = out; bkSet({ reg: out });
        var full = /^[A-Z]{2} \d{1,2} [A-Z]{1,3} \d{4}$/.test(out);
        if (fetchEl) fetchEl.innerHTML = full ? ic('check-circle') + '<span>Format looks right — we’ll fetch make, model and registration date from the RC.</span>' : ic('info') + '<span>Format: KL 11 BH 7272. We’ll fetch make, model and registration date from the RC.</span>';
      });
    }
    var nr = $('#notreg');
    function regMode() {
      var pdi = bk().service === 'pdi', not = pdi && nr && nr.checked;
      $$('[data-reg-plate]').forEach(function (el) { el.hidden = not; });
      $$('[data-reg-vin]').forEach(function (el) { el.hidden = !not; });
      if (reg) { if (pdi) reg.removeAttribute('required'); else reg.setAttribute('required', ''); }
    }
    if (nr) { nr.checked = bk().notReg !== false; nr.addEventListener('change', function () { bkSet({ notReg: nr.checked }); regMode(); }); }
    regMode();
    var box = $('[data-seller-fields]');
    $$('input[name="owner"]').forEach(function (r) {
      r.checked = r.value === b.owner;
      r.addEventListener('change', function () {
        var patch = { owner: r.value };
        if (r.value === 'mine') { patch.contactName = 'You (Arjun Menon)'; patch.contactPhone = '+91 98470 12345'; }
        bkSet(patch);
        if (box) box.hidden = r.value === 'mine';
        $$('[data-seller-title]').forEach(function (el) { el.textContent = r.value === 'dealer' ? 'Dealer contact at the car' : 'Seller contact at the car'; });
      });
    });
    if (box) box.hidden = b.owner === 'mine';
    var sn = $('#sname'), sp = $('#sphone');
    if (sn) { if (b.contactName && b.owner !== 'mine') sn.value = b.contactName.replace(/\s*\((seller|dealer)\)$/, ''); sn.addEventListener('input', function () { bkSet({ contactName: sn.value + (bk().owner === 'dealer' ? ' (dealer)' : ' (seller)') }); }); }
    if (sp) { var tb = sp.closest('.tel'); if (b.contactPhone && b.owner !== 'mine') sp.value = b.contactPhone.replace(/^\+\d+\s*/, ''); var up = function () { bkSet({ contactPhone: telValue(tb) }); }; sp.addEventListener('input', up); if (tb && $('select', tb)) $('select', tb).addEventListener('change', up); }
  }

  /* ---------------------------------------------------------------- Step 3: location (book-location.html) */
  function initLocation() {
    var b = bk(), pin = $('[data-drag-pin]'), map = pin ? pin.closest('.map') : null;
    if (pin && map) {
      var dragging = false;
      pin.addEventListener('pointerdown', function (e) { dragging = true; try { pin.setPointerCapture(e.pointerId); } catch (er) { /* noop */ } pin.style.cursor = 'grabbing'; });
      pin.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        var r = map.getBoundingClientRect();
        pin.style.setProperty('--x', Math.min(94, Math.max(6, (e.clientX - r.left) / r.width * 100)) + '%');
        pin.style.setProperty('--y', Math.min(96, Math.max(20, (e.clientY - r.top + 20) / r.height * 100)) + '%');
      });
      var end = function () { if (!dragging) return; dragging = false; pin.style.cursor = 'grab'; toast('Pin updated — still inside the Kozhikode service area.', { title: 'Location set', icon: 'pin' }); };
      pin.addEventListener('pointerup', end); pin.addEventListener('pointercancel', end);
      pin.addEventListener('keydown', function (e) {
        var k = { ArrowLeft: [-2, 0], ArrowRight: [2, 0], ArrowUp: [0, -3], ArrowDown: [0, 3] }[e.key];
        if (!k) return; e.preventDefault();
        var x = parseFloat(pin.style.getPropertyValue('--x') || getComputedStyle(pin).getPropertyValue('--x')) || 50, y = parseFloat(pin.style.getPropertyValue('--y') || getComputedStyle(pin).getPropertyValue('--y')) || 50;
        pin.style.setProperty('--x', Math.min(94, Math.max(6, x + k[0])) + '%'); pin.style.setProperty('--y', Math.min(96, Math.max(20, y + k[1])) + '%');
      });
    }
    var loc = $('[data-locate]');
    if (loc) loc.addEventListener('click', function () {
      var html = loc.innerHTML; loc.innerHTML = ic('refresh') + 'Locating…';
      setTimeout(function () { loc.innerHTML = html; if (pin) { pin.style.setProperty('--x', '62%'); pin.style.setProperty('--y', '58%'); } toast('Thondayad Bypass, Kozhikode 673014', { title: 'Location found', icon: 'locate' }); }, reduce ? 50 : 800);
    });
    var g = function (id) { var el = $('#' + id); return el ? el.value.trim() : ''; };
    var compose = function () { return [g('building'), g('street'), g('district')].filter(Boolean).join(', '); };
    $$('input[name="addr"]').forEach(function (r) {
      r.addEventListener('change', function () {
        ['street', 'building', 'landmark', 'district'].forEach(function (k) { var f = $('#' + k), v = r.getAttribute('data-' + k); if (f && v !== null) f.value = v; });
        bkSet({ where: r.getAttribute('data-short') || compose(), landmark: r.getAttribute('data-landmark') || '' });
      });
    });
    ['street', 'building', 'district', 'landmark'].forEach(function (k) { var f = $('#' + k); if (f) f.addEventListener('input', function () { bkSet({ where: compose(), landmark: g('landmark') }); }); });
    $$('input[name="dealer"]').forEach(function (r) { r.checked = r.value === b.dealer; r.addEventListener('change', function () { bkSet({ dealer: r.value }); }); });
    var map2 = { '#cname': 'contactName', '#advisor': 'advisor', '#rep': 'rep', '#hdate': 'handoverDate', '#htime': 'handoverTime' };
    Object.keys(map2).forEach(function (sel) {
      var el = $(sel), key = map2[sel]; if (!el) return;
      if (b[key] && !(sel === '#cname' && b.owner === 'mine')) el.value = b[key];
      var up = function () { var p = {}; p[key] = el.value; bkSet(p); };
      el.addEventListener('input', up); el.addEventListener('change', up);
    });
    var telMap = { '#cphone': 'contactPhone', '#advphone': 'advisorPhone', '#repphone': 'repPhone', '#myphone': 'myPhone' };
    Object.keys(telMap).forEach(function (sel) {
      var el = $(sel), key = telMap[sel]; if (!el) return;
      var box = el.closest('.tel'); if (b[key]) el.value = b[key].replace(/^\+\d+\s*/, '');
      var up = function () { var p = {}; p[key] = telValue(box); bkSet(p); };
      el.addEventListener('input', up); if (box && $('select', box)) $('select', box).addEventListener('change', up);
    });
    $$('[data-rel]').forEach(function (c) { if (c.getAttribute('data-rel') === b.repRel) c.setAttribute('aria-pressed', 'true'); c.addEventListener('click', function () { bkSet({ repRel: c.getAttribute('data-rel') }); }); });
  }

  /* ---------------------------------------------------------------- Step 4: calendar + sessions (book-slot.html) */
  function hourOf(t) { var m = /(\d+):(\d+)\s*(AM|PM)/i.exec(t || ''); if (!m) return 16; var h = parseInt(m[1], 10) % 12; if (/PM/i.test(m[3])) h += 12; return h + parseInt(m[2], 10) / 60; }
  function initSlots() {
    var cal = $('[data-cal]');
    if (!cal) return;
    var days = $$('.day:not([disabled]):not(.blank)', cal), sessions = $$('input[name="session"]'), conts = $$('[data-continue]'), b0 = bk();
    var picked = days.filter(function (x) { return x.getAttribute('data-label') === b0.date; })[0] || $('.day[aria-pressed="true"]', cal);
    days.forEach(function (x) { x.setAttribute('aria-pressed', x === picked ? 'true' : 'false'); });
    function stateText(st) { return st === 'few' ? '2 left' : (st === 'full' ? 'Full' : 'Open'); }
    function updateSessions() {
      if (!picked) return;
      var m = picked.getAttribute('data-m'), a = picked.getAttribute('data-a'), b = bk(), hh = hourOf(b.handoverTime);
      sessions.forEach(function (s) {
        var st = s.value === 'Morning' ? m : a;
        s.disabled = st === 'full';
        if (s.disabled && s.checked) s.checked = false;
        $$('[data-sess-state="' + s.value + '"]').forEach(function (lab) { lab.textContent = stateText(st); lab.className = 'tag' + (st === 'few' ? ' tag-a' : (st === 'full' ? ' tag-k' : '')); });
        $$('[data-fit="' + s.value + '"]').forEach(function (fit) {
          var ends = s.value === 'Morning' ? 13 : 18, ok = ends + 1 <= hh;
          fit.hidden = b.service !== 'pdi';
          fit.className = 'tag ' + (ok ? 'tag-k' : 'tag-a');
          fit.innerHTML = ok ? ic('flag') + 'Recommended · we’ll finish before you sign' : ic('alert') + 'Ends too close to your handover';
        });
      });
      $$('[data-picked-day]').forEach(function (el) { el.textContent = picked.getAttribute('data-label'); });
    }
    function check(user) {
      var s = sessions.filter(function (x) { return x.checked; })[0], ok = !!(picked && s);
      conts.forEach(function (c) { c.setAttribute('aria-disabled', ok ? 'false' : 'true'); });
      if (!ok) return;
      var b = bk(), label = picked.getAttribute('data-label');
      if (user || b.date !== label || b.session !== s.value || holdUntil() < Date.now()) {
        bkSet({ date: label, session: s.value });
        if (user || holdUntil() < Date.now()) { startHold(HOLD_MS, HOLD_MS); if (user) toast('We’re holding ' + label + ', ' + s.value + ' for 10 minutes while you pay.', { title: 'Slot held', icon: 'timer' }); }
      }
      var p = $('[data-hold-panel]'); if (p) p.hidden = false;
    }
    days.forEach(function (x) { x.addEventListener('click', function () { days.forEach(function (y) { y.setAttribute('aria-pressed', 'false'); }); x.setAttribute('aria-pressed', 'true'); picked = x; updateSessions(); check(true); }); });
    sessions.forEach(function (s) { s.addEventListener('change', function () { check(true); }); });
    conts.forEach(function (c) { c.addEventListener('click', function (e) { if (c.getAttribute('aria-disabled') === 'true') { e.preventDefault(); toast('Pick a date and a session to continue.', { kind: 'warn', title: 'One more thing' }); closeMsheets(); } }); });
    updateSessions();
    var bs = sessions.filter(function (s) { return s.value === b0.session && !s.disabled; })[0];
    if (bs && holdUntil() > Date.now()) bs.checked = true;
    check(false);
  }

  /* ---------------------------------------------------------------- Step 5: payment (checkout.html) */
  function initPayment() {
    var opts = $$('input[name="pay"]');
    if (!opts.length) return;
    function cur() { return (opts.filter(function (o) { return o.checked; })[0] || {}).value; }
    function show() {
      var v = cur();
      $$('[data-pay-panel]').forEach(function (p) { p.hidden = p.getAttribute('data-pay-panel') !== v; });
      $$('[data-pay-label]').forEach(function (el) { el.textContent = v === 'later' ? 'Send payment link' : bkView(bk()).payLabel; });
    }
    opts.forEach(function (o) { o.addEventListener('change', show); });
    show();
    $$('[data-pay]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        closeMsheets();
        var form = $('#checkout-form');
        if (form && !validate(form)) { toast('Please check the highlighted fields.', { kind: 'warn', title: 'Almost there' }); return; }
        if (btn.getAttribute('aria-disabled') === 'true') { toast('Your slot hold expired. Tap “Hold again” to re-check availability.', { kind: 'warn', title: 'Hold expired' }); return; }
        if (cur() === 'later') {
          startHold(LINK_HOLD_MS, LINK_HOLD_MS);
          var box = $('#later-phone') ? $('#later-phone').closest('.tel') : null;
          toast('Link sent to ' + (telValue(box) || 'the number you gave') + '. We hold your slot for 2 hours; the link expires with the hold.', { title: 'Payment link sent', icon: 'whatsapp' });
          return;
        }
        var href = btn.getAttribute('href') || 'booking-confirmed.html';
        $$('[data-pay-label]').forEach(function (el) { el.textContent = 'Securing payment…'; });
        setTimeout(function () { ss.del('sd_hold_until'); window.location.href = href; }, reduce ? 50 : 700);
      });
    });
  }

  /* ---------------------------------------------------------------- Browse: filters, sort, view (browse.html)
     Contract: [data-browse] root; filter controls [data-f="key"][data-v="value"] (chips, aria-pressed, multi)
     or select/range [data-f="key"]; cards [data-car] with data-tier/city/fuel/body/brand/price(lakhs)/score/km;
     [data-count], [data-active], [data-clear], [data-empty], [data-sort], [data-view="grid|list"], [data-results]. */
  /* Budget in lakhs: shows ₹ Cr from 100 L up */
  function rangeText(c) {
    var v = parseFloat(c.value);
    if (c.getAttribute('data-format') === 'lakh') return v >= 100 ? '₹' + String(Math.round(v) / 100) + ' Cr' : '₹' + v + ' L';
    return (c.getAttribute('data-prefix') || '') + c.value + (c.getAttribute('data-suffix') || '');
  }
  function initBrowse() {
    var rootEl = $('[data-browse]');
    if (!rootEl) return;
    var cards = $$('[data-car]', rootEl), results = $('[data-results]', rootEl);
    var labels = { tier: '', city: '', fuel: '', body: '', brand: '' };
    function state() {
      var st = {};
      $$('[data-f]').forEach(function (c) {
        var k = c.getAttribute('data-f');
        if (c.tagName === 'BUTTON') { if (c.getAttribute('aria-pressed') === 'true') { (st[k] = st[k] || []).push(c.getAttribute('data-v')); } }
        else if (c.value !== '' && c.value !== 'any') st[k] = c.type === 'range' ? parseFloat(c.value) : [c.value];
      });
      return st;
    }
    function apply() {
      var st = state(), n = 0;
      cards.forEach(function (c) {
        var ok = true;
        Object.keys(st).forEach(function (k) {
          var v = st[k];
          if (k === 'maxprice') { if (v < parseFloat($('[data-f="maxprice"]').max)) ok = ok && parseFloat(c.getAttribute('data-price')) <= v; }
          else if (k === 'minscore') ok = ok && parseFloat(c.getAttribute('data-score')) >= v;
          else if (k === 'maxkm') { if (v < parseFloat($('[data-f="maxkm"]').max)) ok = ok && parseFloat(c.getAttribute('data-km')) <= v; }
          else if (k === 'q') ok = ok && (c.textContent.toLowerCase().indexOf(String(v[0]).toLowerCase()) > -1);
          else ok = ok && v.indexOf(c.getAttribute('data-' + k)) > -1;
        });
        c.hidden = !ok; if (ok) n++;
      });
      $$('[data-count]').forEach(function (el) { el.textContent = n === cards.length ? 'All cars · ' + n + ' shown' : n + (n === 1 ? ' car matches' : ' cars match'); });
      $$('[data-empty]').forEach(function (el) { el.hidden = n > 0; });
      var act = $('[data-active]');
      if (act) {
        var chips = [];
        $$('[data-f]').forEach(function (c) {
          if (c.tagName === 'BUTTON' && c.getAttribute('aria-pressed') === 'true') chips.push([c, c.textContent.trim()]);
          else if (c.tagName === 'SELECT' && c.value && c.value !== 'any') chips.push([c, c.options[c.selectedIndex].text]);
          else if (c.type === 'range' && parseFloat(c.value) !== parseFloat(c.getAttribute('data-default') || c.max)) chips.push([c, c.getAttribute('data-label') + ' ' + rangeText(c)]);
        });
        act.innerHTML = chips.map(function (x, i) { return '<button class="chip on" type="button" data-unset="' + i + '">' + x[1] + ic('x', 'x') + '<span class="sr-only"> — remove filter</span></button>'; }).join('');
        $$('[data-unset]', act).forEach(function (bt) {
          bt.addEventListener('click', function () {
            var c = chips[parseInt(bt.getAttribute('data-unset'), 10)][0];
            if (c.tagName === 'BUTTON') c.setAttribute('aria-pressed', 'false'); else if (c.type === 'range') { c.value = c.getAttribute('data-default') || c.max; c.dispatchEvent(new Event('input')); } else c.value = 'any';
            apply();
          });
        });
        $$('[data-clear]').forEach(function (cl) { cl.hidden = !chips.length; });
      }
    }
    $$('[data-f]').forEach(function (c) {
      if (c.tagName === 'BUTTON') c.addEventListener('click', function () { c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); apply(); });
      else c.addEventListener(c.tagName === 'INPUT' && c.type !== 'range' ? 'input' : 'change', apply);
      if (c.type === 'range') c.addEventListener('input', function () { var o = $('[data-out="' + c.getAttribute('data-f') + '"]'); if (o) o.textContent = rangeText(c); });
    });
    $$('[data-clear]').forEach(function (cl) {
      cl.addEventListener('click', function () {
        $$('[data-f]').forEach(function (c) { if (c.tagName === 'BUTTON') c.setAttribute('aria-pressed', 'false'); else if (c.type === 'range') { c.value = c.getAttribute('data-default') || c.max; c.dispatchEvent(new Event('input')); } else if (c.tagName === 'SELECT') c.value = 'any'; else c.value = ''; });
        apply();
      });
    });
    var sort = $('[data-sort]');
    if (sort && results) sort.addEventListener('change', function () {
      var v = sort.value, key = { 'price-asc': 'price', 'price-desc': 'price', score: 'score', km: 'km', year: 'year' }[v] || 'score';
      var dir = (v === 'price-asc' || v === 'km') ? 1 : -1;
      cards.slice().sort(function (a, b2) { return dir * (parseFloat(a.getAttribute('data-' + key)) - parseFloat(b2.getAttribute('data-' + key))); }).forEach(function (c) { results.appendChild(c); });
      var banner = $('[data-inline-banner]', results); if (banner && results.children.length > 4) results.insertBefore(banner, results.children[4]);
      toast('Sorted: ' + sort.options[sort.selectedIndex].text, { icon: 'sort', ms: 2200 });
    });
    $$('[data-view]').forEach(function (vb) {
      vb.addEventListener('click', function () {
        var list = vb.getAttribute('data-view') === 'list';
        $$('[data-view]').forEach(function (x) { x.setAttribute('aria-pressed', x === vb ? 'true' : 'false'); });
        if (results) results.classList.toggle('as-list', list);
        cards.forEach(function (c) { c.classList.toggle('car-row', list); });
      });
    });
    apply();
  }

  /* ---------------------------------------------------------------- QR mock (decorative) */
  function initQR() {
    $$('[data-qr]').forEach(function (el) {
      var n = 25, seed = 7, s = '<svg viewBox="0 0 ' + n + ' ' + n + '" aria-hidden="true" shape-rendering="crispEdges"><rect width="' + n + '" height="' + n + '" fill="#fff"/>';
      var rnd = function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
      var finder = function (x, y) { return (x < 7 && y < 7) || (x > n - 8 && y < 7) || (x < 7 && y > n - 8); };
      for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) { if (!finder(x, y) && rnd() > .52) s += '<rect x="' + x + '" y="' + y + '" width="1" height="1" fill="#0B0B0C"/>'; }
      [[0, 0], [n - 7, 0], [0, n - 7]].forEach(function (p) { s += '<rect x="' + (p[0] + .5) + '" y="' + (p[1] + .5) + '" width="6" height="6" fill="none" stroke="#0B0B0C"/><rect x="' + (p[0] + 2) + '" y="' + (p[1] + 2) + '" width="3" height="3" fill="#0B0B0C"/>'; });
      el.innerHTML = s + '</svg>';
    });
  }

  /* ---------------------------------------------------------------- Reveal blocks from checkboxes / radios
     <input type="checkbox" data-reveal="#rep-block">  — shows #rep-block while checked.
     Radios: every radio in the group may carry data-reveal; only the checked one's target shows.
     data-reveal-invert shows the target while UNchecked. */
  function initReveals() {
    var inputs = $$('input[data-reveal]');
    if (!inputs.length) return;
    function sync() {
      inputs.forEach(function (i) {
        var on = i.hasAttribute('data-reveal-invert') ? !i.checked : i.checked;
        $$(i.getAttribute('data-reveal')).forEach(function (t) {
          if (i.type === 'radio' && !on) { var other = $$('input[name="' + i.name + '"][data-reveal]').some(function (r) { return r.checked && r.getAttribute('data-reveal') === i.getAttribute('data-reveal'); }); if (other) return; }
          t.hidden = !on;
        });
      });
    }
    inputs.forEach(function (i) { i.addEventListener('change', sync); });
    var names = {};
    inputs.forEach(function (i) { if (i.type === 'radio') names[i.name] = 1; });
    Object.keys(names).forEach(function (n) { $$('input[name="' + n + '"]').forEach(function (r) { if (!r.hasAttribute('data-reveal')) r.addEventListener('change', sync); }); });
    sync();
  }

  /* ---------------------------------------------------------------- Country-code selects left empty get the standard list */
  function initCC() {
    $$('select[data-cc]').forEach(function (s) { if (!s.options.length) s.innerHTML = ccOptions(s.getAttribute('data-cc') || '+91'); });
  }

  /* ---------------------------------------------------------------- Boot */
  function boot() {
    injectShell();
    initCC();
    initLang();
    initGridWalk();
    renderBk();
    initValidation();
    initLayers();
    initActions();
    initTabs();
    initReveal();
    initCountUp();
    initGallery();
    initStateSwitch();
    initServiceStep();
    initCarStep();
    initLocation();
    initSlots();
    initHold();
    initPayment();
    initBrowse();
    initReveals();
    initQR();
    renderBk();
  }
  try { boot(); } catch (err) { if (window.console) console.error('SD app.js', err); }
})();
