/* ==========================================================================
   SDCertified × Suresh Drives — Design B "Night Drive · Mission Control"
   app.js — vanilla, no dependencies, works from file://
   - Injects the icon sprite + shared shell (header / tab bar / flow header /
     footer / help FAB / toast region) from <body data-page data-shell ...>
   - Page content stays real HTML in each page; this file only enhances it.
   ========================================================================== */
(function () {
  'use strict';
  var d = document;
  var root = d.documentElement;
  root.classList.add('js');
  window.SDReady = true;

  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var store = {
    get: function (k) { try { return window.sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.sessionStorage.setItem(k, v); } catch (e) { /* storage blocked */ } },
    del: function (k) { try { window.sessionStorage.removeItem(k); } catch (e) { /* storage blocked */ } }
  };
  var A = '../assets/';

  /* ---------------------------------------------------------------- Icons */
  var ICONS = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
    car: '<path d="M3 16v-3.6l2-5A2 2 0 0 1 6.9 6h10.2a2 2 0 0 1 1.9 1.4l2 5V16a1 1 0 0 1-1 1h-1"/><path d="M5 17H4a1 1 0 0 1-1-1"/><path d="M9 17h6"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M3.5 12h17"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    bell: '<path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a2 2 0 0 0 3.4 0"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    whatsapp: '<path d="M3.5 20.5 5 16.3A8.5 8.5 0 1 1 8 19.2z"/><path d="M9 8.6c0 3.3 3 6.4 6.4 6.4l1.1-1.5-2-1-1 .9a4.6 4.6 0 0 1-2.4-2.4l.9-1-1-2z"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 3 3 5-6"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
    'arrow-left': '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    'chev-right': '<path d="m9 6 6 6-6 6"/>',
    'chev-left': '<path d="m15 6-6 6 6 6"/>',
    'chev-down': '<path d="m6 9 6 6 6-6"/>',
    shield: '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z"/>',
    'shield-check': '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z"/><path d="m8.8 12 2.2 2.2 4.2-4.4"/>',
    gauge: '<path d="M4.5 18a9 9 0 1 1 15 0"/><path d="m12 13 4-4"/><circle cx="12" cy="13" r="1.3"/>',
    wrench: '<path d="M14.7 6.3a4 4 0 0 1 5.1-1.8l-2.6 2.6.4 2.2 2.2.4 2.6-2.6a4 4 0 0 1-5.4 5.1l-7.3 7.3a2 2 0 0 1-2.8-2.8l7.3-7.3a4 4 0 0 1 .5-3.1z"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    battery: '<rect x="2.5" y="7" width="17" height="10" rx="2"/><path d="M22 10.5v3M6 10v4M9.5 10v4M13 10v4"/>',
    tyre: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v5M12 16v5M3 12h5M16 12h5"/>',
    disc: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.5"/><path d="M17.5 5.8a8.5 8.5 0 0 1 1.3 11.5"/><path d="M12 5.5v1M12 17.5v1M5.5 12h1M17.5 12h1"/>',
    scan: '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><path d="M4 12h16"/>',
    camera: '<path d="M4 7h3l2-3h6l2 3h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.5"/>',
    file: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5"/>',
    heart: '<path d="M12 20s-7.5-4.6-9-9.4A4.7 4.7 0 0 1 12 6.6a4.7 4.7 0 0 1 9 4C19.5 15.4 12 20 12 20z"/>',
    filter: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
    sort: '<path d="M7 4v16M3 8l4-4 4 4M17 20V4M13 16l4 4 4-4"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    alert: '<path d="M12 4 2.8 19.5h18.4z"/><path d="M12 10v4.5M12 17h.01"/>',
    star: '<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
    map: '<path d="M9 4 3 6.5v13.5L9 17.5l6 2.5 6-2.5V4L15 6.5z"/><path d="M9 4v13.5M15 6.5V20"/>',
    locate: '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
    lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>',
    card: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/>',
    bank: '<path d="M3 9.5 12 4l9 5.5M4 20h16M6 10.5v7M10 10.5v7M14 10.5v7M18 10.5v7"/>',
    wallet: '<path d="M19 7V5.5A1.5 1.5 0 0 0 17.5 4H5a2 2 0 0 0 0 4h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V6"/><path d="M16 13.5h.01"/>',
    rupee: '<path d="M6 4h12M6 9h12M9 4c6 0 6 9 0 9H6l8 7"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',
    edit: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    logout: '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l-4-4 4-4M6 12h10"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z"/>',
    engine: '<path d="M4 10h2V8h3V6h6v2h2l2 2h1v6h-1l-2 2H9l-2-2H4z"/><path d="M2 11v4M12 10v4"/>',
    droplet: '<path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5z"/>',
    live: '<circle cx="12" cy="12" r="2"/><path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M4.2 6.5l2.6 1.5M17.2 16l2.6 1.5M4.2 17.5 6.8 16M17.2 8l2.6-1.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
    sms: '<path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1"/><path d="M8 10.5h.01M12 10.5h.01M16 10.5h.01"/>',
    smartphone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
    tag: '<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    trend: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14a6.5 6.5 0 0 1 3.5 6"/>',
    truck: '<path d="M2 6h12v10H2zM14 9h4l3 3.5V16h-7"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
    play: '<path d="M7 4.5v15l12-7.5z"/>',
    qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 17h3v3"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
    nav: '<path d="M3 11 21 3l-8 18-2-8z"/>',
    route: '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',
    paint: '<path d="M4 4h13v5H4z"/><path d="M17 6.5h2.5V12H11v3"/><rect x="9.5" y="15" width="3" height="6" rx="1"/>',
    chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/>',
    road: '<path d="M8 3 4 21M16 3l4 18M12 4v3M12 11v3M12 18v2"/>',
    seat: '<path d="M7 3h5a2 2 0 0 1 2 2v8H8.5L7 5z"/><path d="M6 13h10l2 4H7z"/><path d="M8 17v4M16 17v4"/>',
    headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/><path d="M20 20a3 3 0 0 1-3 2h-3"/>',
    receipt: '<path d="M5 3h14v18l-2.3-1.5L14.3 21 12 19.5 9.7 21l-2.4-1.5L5 21z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3M14 9l2 2"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    scope: '<circle cx="17" cy="7" r="3"/><path d="M14.9 9.1 4 20M3 21l2-1"/><path d="M17 5.5v3M15.5 7h3"/>',
    send: '<path d="M21 3 10 14M21 3l-7 18-4-7-7-4z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    sunset: '<path d="M4 18h16M6 14a6 6 0 0 1 12 0M12 4v4M5 8l1.5 1.5M19 8l-1.5 1.5M2 22h20"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/>',
    percent: '<path d="M19 5 5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>',
    timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/>',
    thumb: '<path d="M7 11v9H4v-9zM7 11l4-8a2.5 2.5 0 0 1 2.5 3L13 10h6a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 17.8 20H7"/>'
  };
  var ic = function (n, cls) { return '<svg class="i' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><use href="#i-' + n + '"/></svg>'; };

  function buildSprite() {
    var s = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">';
    Object.keys(ICONS).forEach(function (k) { s += '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + ICONS[k] + '</symbol>'; });
    /* Gauge tick ring (270deg, 28 ticks, every 3rd major) */
    var t = '';
    for (var i = 0; i <= 27; i++) {
      var a = (135 + i * 10) * Math.PI / 180, maj = i % 3 === 0;
      var r1 = maj ? 64 : 67, r2 = 72;
      t += '<line x1="' + (100 + r1 * Math.cos(a)).toFixed(2) + '" y1="' + (100 + r1 * Math.sin(a)).toFixed(2) + '" x2="' + (100 + r2 * Math.cos(a)).toFixed(2) + '" y2="' + (100 + r2 * Math.sin(a)).toFixed(2) + '" stroke="' + (maj ? 'rgba(255,255,255,.45)' : 'rgba(255,255,255,.2)') + '" stroke-width="' + (maj ? 2 : 1.4) + '" stroke-linecap="round"/>';
    }
    s += '<symbol id="g-ticks" viewBox="0 0 200 200">' + t + '</symbol>';
    /* Round verified seal ring */
    s += '<symbol id="seal-ring" viewBox="0 0 132 132"><path id="seal-path" fill="none" d="M66,66 m-51,0 a51,51 0 1,1 102,0 a51,51 0 1,1 -102,0"/>' +
      '<circle cx="66" cy="66" r="64" fill="none" stroke="currentColor" stroke-opacity=".35"/><circle cx="66" cy="66" r="40" fill="none" stroke="currentColor" stroke-opacity=".25" stroke-dasharray="2 3"/>' +
      '<text font-family="JetBrains Mono, monospace" font-size="9" font-weight="600" letter-spacing="2.4" fill="currentColor"><textPath href="#seal-path" textLength="316">SURESH DRIVES · VERIFIED · 300+ POINTS · </textPath></text></symbol>';
    /* Stylised Kozhikode map (800 x 500) */
    s += '<symbol id="map-kzd" viewBox="0 0 800 500">' +
      '<rect width="800" height="500" fill="#0C1013"/>' +
      '<path d="M0 0h96c-14 40 10 80-6 120s12 90-4 130 14 90-2 130 10 60 4 90H0z" fill="#0B1720"/>' +
      '<path d="M96 0c-14 40 10 80-6 120s12 90-4 130 14 90-2 130 10 60 4 90" fill="none" stroke="#14303F" stroke-width="2"/>' +
      '<g fill="#10161B"><rect x="150" y="40" width="90" height="60" rx="6"/><rect x="420" y="60" width="120" height="70" rx="6"/><rect x="610" y="140" width="130" height="80" rx="6"/><rect x="180" y="330" width="110" height="90" rx="6"/><rect x="640" y="360" width="110" height="80" rx="6"/></g>' +
      '<rect x="560" y="300" width="60" height="44" rx="6" fill="#132018"/>' +
      '<path d="M120 470c90-30 160-10 240-40s180-10 260-50 120-20 180-30" fill="none" stroke="#0E2230" stroke-width="12" stroke-linecap="round"/>' +
      '<g stroke="#1A2229" stroke-width="2" fill="none"><path d="M100 160h700M100 240h700M100 330h700M100 420h700M200 0v500M300 0v500M400 0v500M480 0v500M580 0v500M680 0v500"/></g>' +
      '<g stroke="#252E36" stroke-width="7" fill="none" stroke-linecap="round"><path d="M110 200c120 10 230-30 340-10s230 40 350 20"/><path d="M250 0c10 120-20 230 20 330s20 120 10 170"/><path d="M600 0c-20 90 10 160-10 240s30 180 20 260"/></g>' +
      '<path d="M330 0c40 90 90 140 150 200s110 120 140 300" fill="none" stroke="#323C46" stroke-width="12" stroke-linecap="round"/>' +
      '<path d="M330 0c40 90 90 140 150 200s110 120 140 300" fill="none" stroke="#4A5560" stroke-width="1.2" stroke-dasharray="8 10"/>' +
      '</symbol>';
    /* Top-down car outline (mini) */
    s += '<symbol id="car-top" viewBox="0 0 300 520"><path d="M100 22Q150 8 200 22Q262 32 264 80L266 440Q264 490 200 498Q150 508 100 498Q36 490 34 440L36 80Q38 32 100 22Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M84 176h132l-10 40H94z M94 350h112l8 28H86z" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".7"/><rect x="94" y="222" width="112" height="122" rx="10" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".7"/></symbol>';
    s += '</svg>';
    var wrap = d.createElement('div');
    wrap.innerHTML = s;
    var svg = wrap.firstChild;
    if (svg) d.body.insertBefore(svg, d.body.firstChild);
  }

  /* ---------------------------------------------------------------- Shell */
  var B = d.body;
  var page = B.getAttribute('data-page') || '';
  var shell = B.getAttribute('data-shell') || 'app';
  var title = B.getAttribute('data-title') || '';
  var back = B.getAttribute('data-back') || '';
  var step = parseInt(B.getAttribute('data-step') || '0', 10);
  var TEL = 'tel:+918330881213', WA = 'https://wa.me/919895441213';
  /* Theme switch: Night Drive (dark) and Night Drive Light live in sibling folders */
  var THEME = 'dark';
  function themeHref(t) {
    var here = (page || 'index') + '.html' + (window.location.search || '');
    return t === THEME ? here : (t === 'light' ? '../design-b-night-drive-light/' : '../design-b-night-drive/') + here;
  }
  function themeSw(extra) {
    var it = function (t, label) { return t === THEME ? '<span aria-current="true">' + label + '</span>' : '<a href="' + themeHref(t) + '" hreflang="en">' + label + '</a>'; };
    return '<div class="theme-sw' + (extra ? ' ' + extra : '') + '" role="group" aria-label="Theme: Dark or Light">' + it('dark', 'Dark') + it('light', 'Light') + '</div>';
  }

  var navMap = { browse: 'browse', vehicle: 'browse', book: 'book', 'book-car': 'book', 'book-location': 'book', 'book-slot': 'book', checkout: 'book', 'booking-confirmed': 'book', sell: 'sell', inspections: 'inspections', track: 'inspections', report: 'inspections', 'report-gle': 'inspections', 'report-pdi': 'inspections', 'suresh-drives': 'suresh-drives', partners: 'partners' };
  var tabMap = { home: 'home', browse: 'browse', vehicle: 'browse', book: 'book', inspections: 'inspections', track: 'inspections', report: 'inspections', 'report-gle': 'inspections', 'report-pdi': 'inspections', profile: 'profile', sell: 'browse' };
  var cur = function (key, map) { return (map[page] === key) ? ' aria-current="page"' : ''; };

  function brand(href) {
    return '<a class="brand" href="' + href + '" aria-label="SDCertified by Suresh Drives — home">' +
      '<img class="brand-mark" src="' + A + 'logo-sdcertified-mark.png" alt="" width="30" height="35">' +
      '<span class="brand-word">SDCertified</span>' +
      '<span class="brand-by">by <img src="' + A + 'logo-sureshdrives-light.png" alt="Suresh Drives" width="68" height="44"></span></a>';
  }
  function lang() {
    return '<div class="lang" role="group" aria-label="Language"><button type="button" lang="en" data-toggle-press data-group="hdr-lang" aria-pressed="true" data-toast="Language: English">EN</button><button type="button" lang="ml" data-toggle-press data-group="hdr-lang" aria-pressed="false" data-toast="ഭാഷ: മലയാളം — Malayalam version coming soon">മലയാളം</button></div>';
  }
  function callBtn(extra) {
    return '<a class="call-btn' + (extra ? ' ' + extra : '') + '" href="' + TEL + '">' + ic('phone') + '<span class="lbl-short">Call us</span><span class="num">+91 8330 881 213</span></a>';
  }

  function appHeader() {
    var links = [['browse.html', 'Buy cars', 'browse'], ['book.html', 'Book inspection', 'book'], ['sell.html', 'Sell', 'sell'], ['inspections.html', 'My inspections', 'inspections'], ['suresh-drives.html', 'Suresh Drives', 'suresh-drives'], ['partners.html', 'Partners', 'partners']];
    var nav = links.map(function (l) { return '<a href="' + l[0] + '"' + cur(l[2], navMap) + '>' + l[1] + '</a>'; }).join('');
    var backBtn = back ? '<span class="sm-only"><a class="icon-btn" href="' + back + '" aria-label="Back">' + ic('arrow-left') + '</a></span>' : '';
    return '<header class="hdr" role="banner"><div class="wrap hdr-in">' + backBtn +
      brand('home.html') + (title ? '<span class="hdr-title">' + title + '</span>' : '') +
      '<nav class="nav" aria-label="Primary">' + nav + '</nav>' +
      '<div class="hdr-actions">' + themeSw('lg-only') + lang() + callBtn('d-only') +
      '<a class="icon-btn" href="notifications.html" aria-label="Notifications, 3 unread"' + (page === 'notifications' ? ' aria-current="page"' : '') + '>' + ic('bell') + '<span class="badge-dot">3</span></a>' +
      '<a class="hdr-avatar" href="profile.html" aria-label="Account: Arjun Menon"><span class="avatar">AM</span></a>' +
      '</div></div></header>';
  }

  function siteHeader() {
    var links = [['browse.html', 'Buy cars', 'browse'], ['book.html', 'Book inspection', 'book'], ['sell.html', 'Sell', 'sell'], ['suresh-drives.html', 'Suresh Drives', 'suresh-drives'], ['partners.html', 'Partners', 'partners']];
    var nav = links.map(function (l) { return '<a href="' + l[0] + '"' + cur(l[2], navMap) + '>' + l[1] + '</a>'; }).join('');
    var dl = [['index.html', 'Welcome', 'home'], ['browse.html', 'Buy certified cars', 'car'], ['book.html', 'Book an inspection', 'calendar'], ['sell.html', 'Sell / Get certified', 'tag'], ['suresh-drives.html', 'About Suresh Drives', 'shield-check'], ['partners.html', 'Partner with us', 'users'], ['support.html', 'Help & contact', 'headset'], ['home.html', 'Open my account', 'user']];
    var drawer = '<div class="drawer" id="drawer" aria-hidden="true"><div class="scrim" data-close-drawer></div><div class="drawer-panel" role="dialog" aria-modal="true" aria-label="Menu">' +
      '<div class="row between mb-4"><span class="eyebrow">Menu</span><button class="icon-btn" data-close-drawer aria-label="Close menu">' + ic('x') + '</button></div>' +
      dl.map(function (l) { return '<a class="dl" href="' + l[0] + '"' + (l[0] === page + '.html' ? ' aria-current="page"' : '') + '>' + ic(l[2]) + l[1] + '</a>'; }).join('') +
      '<a class="btn btn-red btn-block mt-4" href="book.html">' + ic('calendar') + 'Book an inspection</a>' +
      '<a class="btn btn-line btn-block mt-2" href="' + TEL + '">' + ic('phone') + 'Call us · +91 8330 881 213</a>' + '<div class="row between mt-4"><span class="small tx2">Theme</span>' + themeSw() + '</div></div></div>';
    return '<header class="hdr" role="banner"><div class="wrap hdr-in">' + brand('index.html') +
      '<nav class="nav" aria-label="Primary">' + nav + '</nav>' +
      '<div class="hdr-actions">' + themeSw('lg-only') + lang() + callBtn('d-only') + '<a class="btn btn-ghost btn-sm lg-only" href="home.html">' + ic('user', 'i-sm') + 'Sign in</a>' +
      '<a class="btn btn-red btn-sm site-cta" href="book.html">Book inspection</a>' +
      '<button class="icon-btn lg-hide" data-open-drawer aria-label="Open menu" aria-controls="drawer" aria-expanded="false">' + ic('menu') + '</button></div></div></header>' + drawer;
  }

  function flowHeader() {
    var names = ['Service', 'Car', 'Location', 'Slot', 'Pay'];
    var lis = names.map(function (n, i) {
      var k = i + 1, cls = k < step ? 'done' : (k === step ? 'now' : '');
      return '<li class="' + cls + '"' + (k === step ? ' aria-current="step"' : '') + '><span class="n">' + (k < step ? '<svg class="i" style="width:12px;height:12px;stroke-width:3" aria-hidden="true"><use href="#i-check"/></svg>' : k) + '</span>' + n + '</li>';
    }).join('');
    var mt = step <= 5 ? ('Step ' + step + ' of 5') : 'All done';
    var pct = step > 5 ? 1 : Math.min(step, 5) / 5;
    return '<header class="hdr hdr-flow" role="banner"><div class="wrap hdr-in">' +
      '<a class="flow-back" href="' + (back || 'home.html') + '" aria-label="' + (step > 5 ? 'Home' : 'Back to previous step') + '">' + ic('arrow-left') + '<span class="d-only">' + (step > 5 ? 'Home' : 'Back') + '</span></a>' +
      '<a class="brand d-only" href="home.html" aria-label="SDCertified home"><img class="brand-mark" src="' + A + 'logo-sdcertified-mark.png" alt="" width="26" height="30"><span class="brand-word">SDCertified</span></a>' +
      '<ol class="stepper" aria-label="Booking progress">' + lis + '</ol>' +
      '<div class="flow-mtitle"><span>' + mt + '</span><b>' + (title || 'Book inspection') + '</b></div>' +
      '<div class="hdr-actions" style="margin-left:0">' + lang() + callBtn() +
      '<a class="call-btn d-only" href="' + WA + '">' + ic('whatsapp') + 'WhatsApp</a></div>' +
      '</div><div class="flow-bar" aria-hidden="true"><span style="transform:scaleX(' + pct + ')"></span></div></header>';
  }

  function tabbar() {
    var t = function (href, key, icon, label, extra) { return '<a class="tab" href="' + href + '"' + cur(key, tabMap) + '>' + ic(icon) + '<span>' + label + '</span>' + (extra || '') + '</a>'; };
    return '<nav class="tabbar" aria-label="App">' + t('home.html', 'home', 'home', 'Home') + t('browse.html', 'browse', 'car', 'Buy') +
      '<a class="tab tab-book" href="book.html"' + cur('book', tabMap) + '><span class="orb">' + ic('plus', 'i-lg') + '</span><span>Book</span></a>' +
      t('inspections.html', 'inspections', 'gauge', 'Inspections', '<span class="live-dot" aria-hidden="true"></span><span class="sr-only">(1 in progress)</span>') +
      t('profile.html', 'profile', 'user', 'Profile') + '</nav>';
  }

  function footer() {
    var endorse = '<div class="ftr-endorse"><img src="' + A + 'logo-sureshdrives-light.png" alt="Suresh Drives" width="68" height="44"><span><b style="color:var(--tx)">SDCertified</b> — an offering of Suresh Drives LLP, India’s first on-site car inspection company. <span class="muted">Inspected by Suresh Drives · Sold on SDCertified.</span></span></div>';
    if (shell === 'flow') {
      return '<footer class="ftr-compact" role="contentinfo"><b>SDCertified</b> — an offering of Suresh Drives LLP, India’s first on-site car inspection company.<br>' + ic('lock', 'i-sm') + ' 256-bit secure payment · <a href="' + TEL + '">Call +91 8330 881 213</a> · <a href="' + WA + '">WhatsApp +91 98954 41213</a></footer>';
    }
    return '<footer class="ftr" role="contentinfo"><div class="wrap">' +
      '<div class="ftr-top"><div><a class="brand" href="index.html"><img class="brand-mark" src="' + A + 'logo-sdcertified-mark.png" alt="" width="30" height="35"><span class="brand-word">SDCertified</span></a>' +
      '<p class="muted small mt-3" style="max-width:36ch">Certified pre-owned cars, each one inspected on-site by Suresh Drives. Zero brokerage. Book any inspection in the app.</p>' +
      '<div class="row mt-4"><a class="store" href="index.html#app-title" aria-label="Download SDCertified Cars on the App Store">' + ic('smartphone', 'i-lg') + '<span><small>Download on the</small><b>App Store</b></span></a><a class="store" href="index.html#app-title" aria-label="Get SDCertified Cars on Google Play">' + ic('play', 'i-lg') + '<span><small>Get it on</small><b>Google Play</b></span></a></div></div>' +
      '<div><h4>Marketplace</h4><ul><li><a href="browse.html">Buy certified cars</a></li><li><a href="sell.html">Sell / Get certified</a></li><li><a href="report-gle.html">How to read a report</a></li><li><a href="vehicle.html">Featured: BMW X4 M</a></li></ul></div>' +
      '<div><h4>Inspections</h4><ul><li><a href="book.html">Book an inspection</a></li><li><a href="book.html?service=pdi">Book a New Car PDI</a></li><li><a href="track.html">Track inspection</a></li><li><a href="report-gle.html">Sample report</a></li><li><a href="suresh-drives.html#prices">Prices</a></li></ul></div>' +
      '<div><h4>Company</h4><ul><li><a href="suresh-drives.html">Suresh Drives</a></li><li><a href="partners.html">Partners</a></li><li><a href="support.html">Help &amp; contact</a></li><li><a href="' + TEL + '">Call +91 8330 881 213</a></li><li><a href="' + WA + '">WhatsApp +91 98954 41213</a></li><li><a href="mailto:sureshhdrives@gmail.com">sureshhdrives@gmail.com</a></li></ul></div></div>' +
      endorse +
      '<div class="ftr-bottom"><span>© 2026 Suresh Drives LLP · The Workbook, HiLITE Business Park, Poovangal, Kozhikode, Kerala 673014</span><span>sdcertifiedcars.com</span></div>' +
      '</div></footer>';
  }

  function fab() {
    var f = shell === 'flow' ? '' : '<button class="fab-help" type="button" data-open-sheet="help" aria-haspopup="dialog"><span class="ic">' + ic('headset') + '</span><span>Help<small>Call · WhatsApp · callback</small></span></button>';
    return f + (shell === 'flow' ? '' : '<a class="call-btn call-float" href="' + TEL + '">' + ic('phone') + 'Call us</a>');
  }

  function helpSheets() {
    var CCN = [['+91', 'India'], ['+971', 'UAE'], ['+966', 'Saudi Arabia'], ['+974', 'Qatar'], ['+965', 'Kuwait'], ['+968', 'Oman'], ['+973', 'Bahrain'], ['+1', 'USA / Canada'], ['+44', 'UK']];
    var cc = CCN.map(function (c) { return '<option value="' + c[0] + '"' + (c[0] === '+91' ? ' selected' : '') + '>' + c[1] + ' ' + c[0] + '</option>'; }).join('');
    return '<div class="sheet" id="help" aria-hidden="true"><div class="scrim" data-close-sheet></div><div class="sheet-panel" role="dialog" aria-modal="true" aria-labelledby="help-sheet-h">' +
      '<div class="sheet-head"><h2 id="help-sheet-h" class="h3">How can we help?</h2><button class="icon-btn" type="button" data-close-sheet aria-label="Close">' + ic('x') + '</button></div>' +
      '<p class="small tx2 mt-0">Suresh Drives, Kozhikode · 8 AM – 9 PM IST</p>' +
      '<div class="stack" style="--gap:10px">' +
      '<a class="btn btn-line btn-block btn-lg" href="' + TEL + '" style="justify-content:flex-start">' + ic('phone') + 'Call us · +91 8330 881 213</a>' +
      '<a class="btn btn-wa btn-block btn-lg" href="' + WA + '" style="justify-content:flex-start">' + ic('whatsapp') + 'WhatsApp us · +91 98954 41213</a>' +
      '<button class="btn btn-line btn-block btn-lg" type="button" data-callback data-topic="General question" style="justify-content:flex-start">' + ic('clock') + 'Request a callback</button>' +
      '</div><a class="link small mt-4" href="support.html">Help centre &amp; FAQs' + ic('arrow-right') + '</a></div></div>' +
      '<div class="sheet" id="callback" aria-hidden="true"><div class="scrim" data-close-sheet></div><div class="sheet-panel" role="dialog" aria-modal="true" aria-labelledby="cb-sheet-h">' +
      '<div class="sheet-head"><h2 id="cb-sheet-h" class="h3">Request a callback</h2><button class="icon-btn" type="button" data-close-sheet aria-label="Close">' + ic('x') + '</button></div>' +
      '<p class="small tx2 mt-0">We’ll call you from +91 8330 881 213 in the window you choose.</p>' +
      '<form class="stack" style="--gap:12px" data-callback-form>' +
      '<div class="field"><label for="cbs-topic">About</label><input class="input" id="cbs-topic" value="General question" required data-err="Tell us what it’s about."></div>' +
      '<div class="field"><label for="cbs-phone">Your number</label><div class="tel"><select class="select" aria-label="Country code">' + cc + '</select><input class="input" id="cbs-phone" type="tel" inputmode="tel" autocomplete="tel-national" value="98470 12345" required data-err="Enter a number we can call."></div></div>' +
      '<div class="field"><label for="cbs-window">When should we call? (IST)</label><select class="select" id="cbs-window"><option>As soon as possible — usually within 15 minutes</option><option>9 AM – 12 PM</option><option>12 PM – 3 PM</option><option>3 PM – 6 PM</option><option>6 PM – 9 PM</option></select></div>' +
      '<button class="btn btn-red btn-block btn-lg" type="submit">' + ic('phone') + 'Request callback</button></form></div></div>';
  }

  function initThemeSlots() { $$('[data-theme-slot]').forEach(function (el) { el.innerHTML = themeSw(); }); }

  function injectShell() {
    var main = $('main');
    var head = shell === 'flow' ? flowHeader() : (shell === 'site' ? siteHeader() : appHeader());
    B.insertAdjacentHTML('afterbegin', '<a class="skip" href="#main">Skip to content</a>' + head);
    if (title && shell === 'app') B.classList.add('has-title');
    var after = footer() + (shell === 'app' ? tabbar() : '') + fab() + helpSheets() + (shell === 'flow' && step <= 5 ? bkSheet() : '') + '<div class="toasts" id="toasts" aria-live="polite" aria-atomic="false"></div>';
    if (main) main.insertAdjacentHTML('afterend', after); else B.insertAdjacentHTML('beforeend', after);
    initThemeSlots();
  }

  /* ---------------------------------------------------------------- Booking state (one object, sessionStorage)
     Every summary, price and CTA in the booking flow reads from this. No personal data goes in the URL. */
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
  var PDI_DEFAULT = { brand: 'BMW', model: 'i7 xDrive60', year: '2026', tier: 'Luxury', notReg: true, reg: '', dealer: 'BMW EVM Autokraft, Kochi', contactName: '', contactPhone: '' };
  function bk() {
    var s = null;
    try { s = JSON.parse(window.sessionStorage.getItem(BK_KEY) || 'null'); } catch (e) { s = null; }
    var b = {}, k;
    for (k in BK_DEFAULT) b[k] = BK_DEFAULT[k];
    if (s) for (k in s) b[k] = s[k];
    return b;
  }
  function bkSet(patch) {
    var b = bk(), k;
    for (k in patch) b[k] = patch[k];
    try { window.sessionStorage.setItem(BK_KEY, JSON.stringify(b)); } catch (e) { /* storage blocked */ }
    renderBk();
    return b;
  }
  function money(n, dec) { return '₹' + (dec ? n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : inr(n)); }
  function priceOf(b) {
    var base = b.service === 'pdi' ? 3999 : (TIERS[b.tier] || 5999);
    var gst = Math.round(base * 18) / 100, exact = Math.round((base + gst) * 100) / 100, total = Math.round(exact);
    return { base: base, gst: gst, exact: exact, total: total, round: Math.round((total - exact) * 100) / 100 };
  }
  function bkView(b) {
    var p = priceOf(b), pdi = b.service === 'pdi';
    var abroad = isAbroad(b);
    var sessTime = b.session === 'Afternoon' ? '2:00 PM – 6:00 PM IST' + (abroad ? ' · 12:30 – 4:30 PM Dubai' : '') : '9:00 AM – 1:00 PM IST' + (abroad ? ' · 7:30 – 11:30 AM Dubai' : '');
    return {
      service: pdi ? 'New Car PDI · 125+ points' : 'Used Car Pre-Purchase Inspection · 300+ points',
      serviceShort: pdi ? 'New Car PDI' : 'Used Car Pre-Purchase',
      car: (b.year ? b.year + ' ' : '') + b.brand + ' ' + b.model,
      carShort: b.brand + ' ' + b.model,
      reg: b.notReg ? ('Not registered yet' + (b.vin ? ' · ' + b.vin : '')) : (b.reg || 'Registration to be added'),
      tier: pdi ? 'Flat price · all cars' : b.tier + ' segment',
      tierName: pdi ? 'PDI' : b.tier,
      base: money(p.base, true), baseShort: money(p.base), gst: money(p.gst, true),
      round: (p.round >= 0 ? '+' : '−') + '₹' + Math.abs(p.round).toFixed(2), exact: money(p.exact, true),
      total: money(p.total), payLabel: 'Pay ' + money(p.total) + ' securely',
      half: money(p.total / 2, true),
      where: pdi ? (b.dealer || 'Choose a dealership') : b.where,
      whereKind: pdi ? 'Dealership' : (b.owner === 'mine' ? 'Your place' : (b.owner === 'dealer' ? 'Dealer’s yard' : 'Seller’s place')),
      contact: pdi ? ((b.advisor || 'Sales advisor') + (b.advisorPhone ? ' · ' + b.advisorPhone : '')) : (b.contactName + (b.contactPhone ? ' · ' + b.contactPhone : '')),
      rep: b.rep ? (b.rep + (b.repRel ? ' (' + b.repRel + ')' : '') + (b.repPhone ? ' · ' + b.repPhone : '')) : 'None added',
      slot: b.date + ' · ' + b.session, slotTime: sessTime, slotFull: b.date + ' · ' + b.session + ' · ' + sessTime,
      handover: b.handoverDate + ', ' + b.handoverTime + ' IST',
      duration: pdi ? 'about 2 hours' : 'about 3–4 hours'
    };
  }
  function isAbroad(b) { return !!(b.rep && b.rep.trim()) || /\+971/.test([b.contactPhone, b.repPhone, b.advisorPhone].join(' ')); }
  function renderBk() {
    var b = bk(), v = bkView(b);
    $$('[data-bk]').forEach(function (el) { var k = el.getAttribute('data-bk'); if (v[k] !== undefined) el.textContent = v[k]; });
    $$('[data-bk-show]').forEach(function (el) { el.hidden = el.getAttribute('data-bk-show') !== b.service; });
    B.setAttribute('data-service', b.service);
    $$('[data-dubai]').forEach(function (el) { el.hidden = !isAbroad(b); });
  }
  function bkSheet() {
    var row = function (k, label, icon, edit) { return '<div class="build-row ok"><span class="ic">' + ic(icon) + '</span><div><div class="k">' + label + '</div><div class="v" data-bk="' + k + '"></div></div>' + (edit ? '<a href="' + edit[0] + '">' + edit[1] + '</a>' : '') + '</div>'; };
    return '<div class="sheet" id="bk-sheet" aria-hidden="true"><div class="scrim" data-close-sheet></div><div class="sheet-panel" role="dialog" aria-modal="true" aria-labelledby="bk-sheet-h">' +
      '<div class="sheet-head"><h2 id="bk-sheet-h" class="h4">Your booking so far</h2><button class="icon-btn" type="button" data-close-sheet aria-label="Close summary">' + ic('x') + '</button></div>' +
      row('serviceShort', 'Service', 'scan', ['book.html', 'Edit service']) + row('car', 'Car', 'car', ['book-car.html', 'Edit car']) +
      row('where', 'Location', 'pin', ['book-location.html', 'Edit location']) + row('slotFull', 'Date & session', 'calendar', ['book-slot.html', 'Edit slot']) +
      '<div class="build-total"><span class="panel-label">Total incl. GST 18%</span><div class="big mt-2" data-bk="total"></div><p class="tiny muted mt-2 mb-0"><span data-bk="baseShort"></span> + <span data-bk="gst"></span> GST · rounding <span data-bk="round"></span> · no hidden charges</p></div>' +
      '<a class="call-btn mt-4" href="' + TEL + '">' + ic('phone') + 'Questions? Call us · +91 8330 881 213</a></div></div>';
  }

  /* ---------------------------------------------------------------- Inline validation (icon + text, aria-invalid, aria-describedby) */
  function fieldErr(el, msg) {
    if (!el.id) el.id = 'f-' + Math.random().toString(36).slice(2, 8);
    var eid = el.id + '-err', e = d.getElementById(eid);
    var db = (el.getAttribute('aria-describedby') || '').split(' ').filter(function (x) { return x && x !== eid; });
    if (!msg) { el.removeAttribute('aria-invalid'); if (e && e.parentNode) e.parentNode.removeChild(e); el.setAttribute('aria-describedby', db.join(' ')); if (!db.length) el.removeAttribute('aria-describedby'); return true; }
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
      if (!bad && el.getAttribute('data-pattern') && !(new RegExp(el.getAttribute('data-pattern'))).test(val)) bad = true;
      if (!fieldErr(el, bad ? (el.getAttribute('data-err') || 'Please fill this in.') : '')) { ok = false; if (!first) first = el; }
    });
    if (first) { try { first.focus(); } catch (e) { /* noop */ } }
    return ok;
  }
  function initValidation() {
    $$('form').forEach(function (f) { f.setAttribute('novalidate', ''); });
    d.addEventListener('input', function (e) { var t = e.target; if (t && t.getAttribute && t.getAttribute('aria-invalid') === 'true') fieldErr(t, ''); });
    d.addEventListener('change', function (e) { var t = e.target; if (t && t.getAttribute && t.getAttribute('aria-invalid') === 'true') fieldErr(t, ''); if (t && t.type === 'radio') $$('input[name="' + t.name + '"][aria-invalid]').forEach(function (r) { fieldErr(r, ''); }); });
    /* Continue links in the booking flow validate their step first */
    d.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('[data-check]') : null;
      if (!a) return;
      var scope = d.querySelector(a.getAttribute('data-check'));
      if (scope && !validate(scope)) { e.preventDefault(); toast('Please check the highlighted fields.', { kind: 'warn', title: 'A few details missing' }); }
    });
  }

  /* ---------------------------------------------------------------- Toast */
  function toast(msg, opts) {
    opts = opts || {};
    var wrap = $('#toasts');
    if (!wrap) return;
    var el = d.createElement('div');
    el.className = 'toast' + (opts.kind ? ' ' + opts.kind : '');
    el.setAttribute('role', 'status');
    el.innerHTML = ic(opts.icon || (opts.kind === 'warn' ? 'alert' : (opts.kind === 'info' ? 'info' : 'check-circle'))) +
      '<div>' + (opts.title ? '<b>' + opts.title + '</b>' : '') + '<span>' + msg + '</span>' + (opts.meta ? '<div class="mono mt-1">' + opts.meta + '</div>' : '') + '</div>';
    wrap.appendChild(el);
    setTimeout(function () { el.classList.add('out'); setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 260); }, opts.ms || 4200);
  }
  window.SDToast = toast;

  /* ---------------------------------------------------------------- Helpers */
  var inr = function (n) {
    n = Math.round(n);
    var s = String(Math.abs(n)), last3 = s.slice(-3), rest = s.slice(0, -3);
    if (rest) last3 = ',' + last3;
    return (n < 0 ? '-' : '') + rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + last3;
  };
  function animateNum(el, from, to, dur, fmt) {
    if (!el) return;
    fmt = fmt || inr;
    if (reduce) { el.textContent = fmt(to); return; }
    var t0 = null;
    function f(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(from + (to - from) * e);
      if (p < 1) requestAnimationFrame(f);
    }
    requestAnimationFrame(f);
  }

  /* ---------------------------------------------------------------- Reveal, gauges, counters */
  function initReveal() {
    var els = $$('.reveal, .gauge, [data-count]');
    function show(el) {
      el.classList.add('in');
      if (el.hasAttribute('data-count') && !el.getAttribute('data-counted')) {
        el.setAttribute('data-counted', '1');
        var to = parseFloat(el.getAttribute('data-count')) || 0, dec = parseInt(el.getAttribute('data-dec') || '0', 10);
        animateNum(el, 0, to, 1400, function (v) { return dec ? v.toFixed(dec) : inr(v); });
      }
    }
    if (!('IntersectionObserver' in window)) { els.forEach(show); return; }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) { show(en.target); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .12 });
    els.forEach(function (el) { io.observe(el); });
    /* Safety: reveal anything still hidden after 4s (e.g. print, odd viewports) */
    setTimeout(function () { $$('.reveal:not(.in), .gauge:not(.in)').forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top < window.innerHeight) show(el); }); }, 4000);
  }
  function initGauges() {
    $$('.gauge').forEach(function (g) {
      var v = parseFloat(getComputedStyle(g).getPropertyValue('--v')) || parseFloat(g.getAttribute('data-value')) || 0;
      var f = $('.g-fill', g), t = $('.g-track', g);
      if (t) { t.setAttribute('pathLength', '100'); t.setAttribute('stroke-dasharray', '75 200'); }
      if (f) { f.setAttribute('pathLength', '100'); f.setAttribute('stroke-dasharray', (v * 0.75).toFixed(2) + ' 200'); }
    });
  }

  /* ---------------------------------------------------------------- Tabs */
  function initTabs() {
    $$('[role="tablist"]').forEach(function (list) {
      var tabs = $$('[role="tab"]', list);
      function select(tab, focus) {
        tabs.forEach(function (t) {
          var on = t === tab;
          t.setAttribute('aria-selected', on ? 'true' : 'false');
          t.setAttribute('tabindex', on ? '0' : '-1');
          var p = d.getElementById(t.getAttribute('aria-controls'));
          if (p) { if (on) p.removeAttribute('hidden'); else p.setAttribute('hidden', ''); }
        });
        if (focus) tab.focus();
        $$('.reveal:not(.in), .gauge:not(.in)', d.getElementById(tab.getAttribute('aria-controls')) || d).forEach(function (el) { el.classList.add('in'); });
      }
      tabs.forEach(function (t, i) {
        t.addEventListener('click', function () { select(t); });
        t.addEventListener('keydown', function (e) {
          var k = e.key, n = null;
          if (k === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
          if (k === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
          if (n) { e.preventDefault(); select(n, true); }
        });
      });
    });
  }

  /* ---------------------------------------------------------------- Pressed toggles, hearts, chips */
  function initToggles() {
    d.addEventListener('click', function (e) {
      var h = e.target.closest ? e.target.closest('.heart') : null;
      if (h) {
        e.preventDefault(); e.stopPropagation();
        var on = h.getAttribute('aria-pressed') !== 'true';
        h.setAttribute('aria-pressed', on ? 'true' : 'false');
        toast(on ? 'Saved to your shortlist' : 'Removed from your shortlist', { icon: 'heart', meta: (h.getAttribute('data-car') || '').toUpperCase() });
        return;
      }
      var c = e.target.closest ? e.target.closest('[data-toggle-press]') : null;
      if (c) {
        var group = c.getAttribute('data-group');
        if (group) $$('[data-group="' + group + '"]').forEach(function (x) { if (x !== c) x.setAttribute('aria-pressed', 'false'); });
        c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') === 'true' && !group ? 'false' : 'true');
        if (c.hasAttribute('data-toast')) toast(c.getAttribute('data-toast'));
      }
    });
  }

  /* ---------------------------------------------------------------- Generic actions */
  function initActions() {
    d.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target.closest('[data-toast]:not([data-toggle-press])') : null;
      if (t && !t.matches('.switch input')) {
        if (t.tagName === 'A' && (t.getAttribute('href') || '#') === '#') e.preventDefault();
        toast(t.getAttribute('data-toast'), { kind: t.getAttribute('data-kind') || '', title: t.getAttribute('data-toast-title') || '' });
      }
      var cp = e.target.closest ? e.target.closest('[data-copy]') : null;
      if (cp) {
        e.preventDefault();
        var txt = cp.getAttribute('data-copy');
        var done = function () { toast('Link copied — share it on WhatsApp or SMS', { title: 'Copied', meta: txt }); };
        try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, done); else done(); } catch (err) { done(); }
      }
      var ics = e.target.closest ? e.target.closest('[data-ics]') : null;
      if (ics) {
        e.preventDefault();
        try {
          var body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//SDCertified//Booking//EN', 'BEGIN:VEVENT', 'UID:SDB-24817@sdcertified', 'DTSTAMP:20261114T051200Z', 'DTSTART:20261121T033000Z', 'DTEND:20261121T073000Z', 'SUMMARY:Suresh Drives inspection - Mercedes-Benz GLE 300d (SDB-24817)', 'LOCATION:Near Hilite Mall\\, Thondayad Bypass\\, Kozhikode 673014', 'DESCRIPTION:Your technician is assigned by 15 Nov. Track your inspection in the SDCertified app. Times are IST.', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
          var a = d.createElement('a');
          a.href = URL.createObjectURL(new Blob([body], { type: 'text/calendar' }));
          a.download = 'SDB-24817.ics';
          d.body.appendChild(a); a.click(); d.body.removeChild(a);
        } catch (err) { /* no blob support */ }
        toast('Calendar event for Sat 21 Nov, 9:00 AM – 1:00 PM is ready', { title: 'Added to calendar', icon: 'calendar' });
      }
    });
    $$('form[data-mock]').forEach(function (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!validate(f)) { toast('Please check the highlighted fields.', { kind: 'warn', title: 'A few details missing' }); return; }
        var sh = f.closest('.sheet');
        if (sh && f.hasAttribute('data-close-on-send')) closeLayer(sh);
        toast(f.getAttribute('data-mock'), { title: f.getAttribute('data-mock-title') || 'Done' });
        var b = $('[type="submit"]', f);
        if (b && f.hasAttribute('data-mock-lock')) { b.setAttribute('disabled', ''); b.innerHTML = ic('check') + 'Sent'; }
      });
    });
    $$('.switch input[data-label]').forEach(function (s) {
      s.addEventListener('change', function () { toast(s.getAttribute('data-label') + (s.checked ? ' — on' : ' — off'), { kind: s.checked ? '' : 'info', icon: s.checked ? 'check-circle' : 'bell' }); });
    });
  }

  /* ---------------------------------------------------------------- Sheets & drawer */
  var lastFocus = null;
  function openLayer(el) {
    if (!el) return;
    lastFocus = d.activeElement;
    el.classList.add('open'); el.setAttribute('aria-hidden', 'false');
    var f = $('button, a[href], input, select, textarea', $('.sheet-panel, .drawer-panel', el) || el);
    if (f) setTimeout(function () { f.focus(); }, 60);
  }
  function closeLayer(el) {
    if (!el) return;
    el.classList.remove('open'); el.setAttribute('aria-hidden', 'true');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function initLayers() {
    d.addEventListener('click', function (e) {
      var o = e.target.closest ? e.target.closest('[data-open-sheet]') : null;
      if (o) { e.preventDefault(); openLayer(d.getElementById(o.getAttribute('data-open-sheet'))); return; }
      var c = e.target.closest ? e.target.closest('[data-close-sheet]') : null;
      if (c) { e.preventDefault(); closeLayer(c.closest('.sheet')); return; }
      var od = e.target.closest ? e.target.closest('[data-open-drawer]') : null;
      if (od) { od.setAttribute('aria-expanded', 'true'); openLayer($('#drawer')); return; }
      var cd = e.target.closest ? e.target.closest('[data-close-drawer]') : null;
      if (cd) { var ob = $('[data-open-drawer]'); if (ob) ob.setAttribute('aria-expanded', 'false'); closeLayer($('#drawer')); }
    });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { $$('.sheet.open, .drawer.open').forEach(closeLayer); }
      if (e.key === '/' && shell === 'app' && !/INPUT|TEXTAREA|SELECT/.test((d.activeElement || {}).tagName || '')) {
        var s = $('[data-search]'); if (s) { e.preventDefault(); s.focus(); }
      }
    });
  }

  /* ---------------------------------------------------------------- Header scroll state */
  function initHeader() {
    var h = $('.hdr');
    if (!h) return;
    var on = function () { h.classList.toggle('scrolled', window.scrollY > 24); };
    on();
    window.addEventListener('scroll', on, { passive: true });
  }

  /* ---------------------------------------------------------------- Gallery */
  function initGallery() {
    $$('[data-gallery]').forEach(function (g) {
      var main = $('[data-gallery-main]', g);
      $$('[data-src]', g).forEach(function (b) {
        b.addEventListener('click', function () {
          if (!main) return;
          $$('[data-src]', g).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
          main.style.opacity = '0';
          setTimeout(function () {
            main.src = b.getAttribute('data-src');
            main.style.objectPosition = b.getAttribute('data-pos') || '50% 50%';
            main.alt = b.getAttribute('data-alt') || main.alt;
            main.style.opacity = '1';
          }, reduce ? 0 : 160);
          var cnt = $('[data-gallery-count]', g);
          if (cnt) cnt.textContent = b.getAttribute('data-n') || '';
        });
      });
    });
  }

  /* ---------------------------------------------------------------- Hold timer (10-minute slot hold; 2 h while a pay-by-link is open) */
  var HOLD_MS = 10 * 60 * 1000, LINK_HOLD_MS = 2 * 60 * 60 * 1000;
  var holdTick = null, holdMilestones = {};
  function holdUntil() { var v = parseInt(store.get('sdb_hold_until') || '0', 10); return isNaN(v) ? 0 : v; }
  function holdTotal() { var v = parseInt(store.get('sdb_hold_total') || String(HOLD_MS), 10); return isNaN(v) ? HOLD_MS : v; }
  function slotLabel() { var b = bk(); return b.date + ', ' + b.session; }
  function startHold(remainingMs, total) {
    store.set('sdb_hold_until', String(Date.now() + (remainingMs || HOLD_MS)));
    store.set('sdb_hold_total', String(total || HOLD_MS));
    holdMilestones = {};
    renderHold();
  }
  function holdSr(msg) { $$('[data-hold-sr]').forEach(function (el) { el.textContent = msg; }); }
  function renderHold() {
    var until = holdUntil(), total = holdTotal(), left = Math.max(0, until - Date.now()), s = Math.ceil(left / 1000);
    var h = Math.floor(s / 3600), mm = String(Math.floor(s % 3600 / 60)).padStart(2, '0'), ss = String(s % 60).padStart(2, '0');
    var label = slotLabel();
    $$('[data-hold-label]').forEach(function (el) { el.textContent = label; });
    $$('[data-hold-time]').forEach(function (el) { el.textContent = until && left > 0 ? (h ? h + ':' : '') + mm + ':' + ss : '00:00'; });
    $$('[data-hold-ring] .prg').forEach(function (c) { c.style.strokeDashoffset = String(100 - (left / total) * 100); });
    $$('.hold').forEach(function (el) { el.classList.toggle('low', left > 0 && left < 120000); el.classList.toggle('expired', !!until && left <= 0); });
    $$('[data-hold-msg]').forEach(function (el) {
      el.textContent = left <= 0 ? 'Hold expired — tap “Hold again” to re-check availability.' : (total > HOLD_MS ? 'Payment link open — we hold your slot for 2 hours; the link expires with the hold.' : (left < 120000 ? 'Almost out of time — finish payment to lock this slot.' : 'Free reschedule up to 12 h before the session.'));
    });
    $$('[data-hold-again]').forEach(function (b) { b.hidden = left > 0; });
    var mins = Math.ceil(left / 60000);
    if (left <= 0 && until && !holdMilestones.exp) { holdMilestones.exp = 1; holdSr('Your slot hold has expired.'); }
    [5, 2, 1].forEach(function (m) { if (mins === m && !holdMilestones[m]) { holdMilestones[m] = 1; holdSr(m + (m === 1 ? ' minute' : ' minutes') + ' left on your slot hold.'); } });
    $$('[data-pay]').forEach(function (p) { p.setAttribute('aria-disabled', left <= 0 ? 'true' : 'false'); });
  }
  function initHold() {
    if (!$('[data-hold-time]')) return;
    if (page === 'checkout' && (!holdUntil() || holdUntil() < Date.now() - 60 * 60 * 1000)) startHold(582000, HOLD_MS);
    if (page === 'book-slot' && holdUntil() > Date.now()) { var p = $('[data-hold-panel]'); if (p) p.hidden = false; }
    renderHold();
    holdSr('We’re holding ' + slotLabel() + ' for you.');
    clearInterval(holdTick);
    holdTick = setInterval(renderHold, 1000);
    $$('[data-hold-again]').forEach(function (b) { b.addEventListener('click', function () { startHold(HOLD_MS, HOLD_MS); toast('Slot is still available — held for another 10 minutes', { title: 'Held again', icon: 'timer' }); }); });
  }

  /* ---------------------------------------------------------------- Service step (book) */
  function initServiceStep() {
    var radios = $$('input[name="service"]');
    if (!radios.length) return;
    var q = /[?&]service=pdi\b/.test(window.location.search);
    function apply(svc, user) {
      var b = bk();
      if (svc === 'pdi' && b.service !== 'pdi') bkSet(Object.assign({ service: 'pdi' }, PDI_DEFAULT));
      else if (svc === 'used' && b.service !== 'used') bkSet({ service: 'used', brand: BK_DEFAULT.brand, model: BK_DEFAULT.model, year: BK_DEFAULT.year, tier: BK_DEFAULT.tier, reg: BK_DEFAULT.reg, notReg: false, dealer: '', contactName: BK_DEFAULT.contactName, contactPhone: BK_DEFAULT.contactPhone });
      else renderBk();
      radios.forEach(function (r) { r.checked = r.value === svc; });
    }
    apply(q ? 'pdi' : bk().service, false);
    radios.forEach(function (r) { r.addEventListener('change', function () { apply(r.value, true); }); });
  }

  /* ---------------------------------------------------------------- Calendar + sessions (book-slot) */
  function hourOf(t) { var m = /(\d+):(\d+)\s*(AM|PM)/i.exec(t || ''); if (!m) return 16; var h = parseInt(m[1], 10) % 12; if (/PM/i.test(m[3])) h += 12; return h + parseInt(m[2], 10) / 60; }
  function initSlots() {
    var cal = $('[data-cal]');
    if (!cal) return;
    var days = $$('.day:not([disabled]):not(.blank)', cal);
    var sessions = $$('input[name="session"]');
    var cont = $('[data-continue]');
    var b0 = bk();
    var picked = days.filter(function (x) { return x.getAttribute('data-label') === b0.date; })[0] || $('.day[aria-pressed="true"]', cal);
    days.forEach(function (x) { x.setAttribute('aria-pressed', x === picked ? 'true' : 'false'); });
    function stateText(st) { return st === 'few' ? '2 left' : (st === 'full' ? 'Full' : 'Open'); }
    function updateSessions() {
      if (!picked) return;
      var m = picked.getAttribute('data-m'), a = picked.getAttribute('data-a'), b = bk();
      var hh = hourOf(b.handoverTime);
      sessions.forEach(function (s) {
        var st = s.value === 'Morning' ? m : a;
        s.disabled = st === 'full';
        if (s.disabled && s.checked) s.checked = false;
        var lab = $('[data-sess-state="' + s.value + '"]');
        if (lab) { lab.textContent = stateText(st); lab.className = 'tag' + (st === 'few' ? ' a' : ''); }
        var fit = $('[data-fit="' + s.value + '"]');
        if (fit) {
          var ends = s.value === 'Morning' ? 13 : 18, ok = ends + 1 <= hh;
          fit.hidden = b.service !== 'pdi';
          fit.className = 'tag mt-3 ' + (ok ? 'g' : 'a');
          fit.textContent = ok ? 'Recommended · we’ll finish before you sign' : 'Ends too close to your handover';
        }
      });
      $$('[data-picked-day]').forEach(function (el) { el.textContent = picked.getAttribute('data-label'); });
    }
    function check(user) {
      var s = sessions.filter(function (x) { return x.checked; })[0];
      var ok = !!(picked && s);
      if (cont) cont.setAttribute('aria-disabled', ok ? 'false' : 'true');
      if (ok) {
        var b = bk(), label = picked.getAttribute('data-label');
        if (user || b.date !== label || b.session !== s.value || holdUntil() < Date.now()) {
          bkSet({ date: label, session: s.value });
          if (user || holdUntil() < Date.now()) { startHold(HOLD_MS, HOLD_MS); if (user) toast('We’re holding ' + label + ', ' + s.value + ' for 10 minutes while you pay.', { title: 'Slot held', icon: 'timer' }); }
        }
        var p = $('[data-hold-panel]'); if (p) p.hidden = false;
      }
    }
    days.forEach(function (x) {
      x.addEventListener('click', function () {
        days.forEach(function (y) { y.setAttribute('aria-pressed', 'false'); });
        x.setAttribute('aria-pressed', 'true'); picked = x; updateSessions(); check(true);
      });
    });
    sessions.forEach(function (s) { s.addEventListener('change', function () { check(true); }); });
    if (cont) cont.addEventListener('click', function (e) { if (cont.getAttribute('aria-disabled') === 'true') { e.preventDefault(); toast('Pick a date and a session to continue', { kind: 'warn' }); } });
    updateSessions();
    var bs = sessions.filter(function (s) { return s.value === b0.session && !s.disabled; })[0];
    if (bs && holdUntil() > Date.now()) { bs.checked = true; }
    check(false);
  }

  /* ---------------------------------------------------------------- Car step (book-car) */
  function telValue(box) { if (!box) return ''; var cc = $('select', box), n = $('input', box); return (cc ? cc.value + ' ' : '') + (n ? n.value.trim() : ''); }
  function initCarStep() {
    var model = $('#model');
    if (!model) return;
    var b = bk();
    var brands = $$('input[name="brand"]');
    var curPrice = TIERS[b.tier] || 5999;
    function applyTier(save) {
      var opt = model.options[model.selectedIndex];
      if (!opt) return;
      var tier = opt.getAttribute('data-tier') || 'Standard', price = TIERS[tier];
      if (save) bkSet({ model: opt.value, brand: opt.getAttribute('data-brand'), tier: tier });
      if (bk().service === 'pdi') return;
      $$('[data-seg-price]').forEach(function (el) { animateNum(el, curPrice, price, 260); });
      $$('[data-seg-gst]').forEach(function (el) { el.textContent = (price * 0.18).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); });
      $$('[data-seg-total]').forEach(function (el) { animateNum(el, Math.round(curPrice * 1.18), Math.round(price * 1.18), 260); });
      $$('[data-seg-tiers] [data-tier-row]').forEach(function (r) { var on = r.getAttribute('data-tier-row') === tier; r.classList.toggle('on', on); r.setAttribute('aria-current', on ? 'true' : 'false'); });
      curPrice = price;
    }
    function filterModels(brand, keep) {
      var first = null;
      $$('option', model).forEach(function (o) {
        var show = o.getAttribute('data-brand') === brand;
        o.hidden = !show; o.disabled = !show;
        if (show && !first) first = o;
      });
      var sel = model.options[model.selectedIndex];
      if (!keep || !sel || sel.disabled) { if (first) model.value = first.value; }
      applyTier(true);
    }
    brands.forEach(function (r) { r.checked = r.value === b.brand; r.addEventListener('change', function () { filterModels(r.value, false); }); });
    $$('option', model).forEach(function (o) { if (o.value === b.model && o.getAttribute('data-brand') === b.brand) o.selected = true; });
    model.addEventListener('change', function () { applyTier(true); });
    filterModels(b.brand, true);
    var bind = function (sel, key, fmt) { var el = $(sel); if (!el) return; if (b[key] !== undefined && b[key] !== '' && el.type !== 'checkbox') el.value = b[key]; el.addEventListener('input', function () { var p = {}; p[key] = fmt ? fmt(el) : el.value; bkSet(p); }); el.addEventListener('change', function () { var p = {}; p[key] = fmt ? fmt(el) : el.value; bkSet(p); }); };
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
        if (fetchEl) fetchEl.innerHTML = full ? ic('check-circle') + '<span>Format looks right — we’ll confirm make, model and registration date from the RC.</span>' : ic('info') + '<span>Format: KL 11 BH 7272. We’ll fetch make, model and registration date from the RC.</span>';
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
    var ownerBox = $('[data-seller-fields]');
    $$('input[name="owner"]').forEach(function (r) {
      r.checked = r.value === b.owner;
      r.addEventListener('change', function () {
        bkSet({ owner: r.value });
        if (ownerBox) ownerBox.hidden = r.value === 'mine';
        var lab = $('[data-seller-title]'); if (lab) lab.textContent = r.value === 'dealer' ? 'Dealer contact at the car' : 'Seller contact at the car';
      });
    });
    if (ownerBox) ownerBox.hidden = b.owner === 'mine';
    var sn = $('#sname'), sp = $('#sphone');
    if (sn) { if (b.contactName) sn.value = b.contactName.replace(/\s*\((seller|dealer)\)$/, ''); sn.addEventListener('input', function () { bkSet({ contactName: sn.value + (bk().owner === 'dealer' ? ' (dealer)' : ' (seller)') }); }); }
    if (sp) { var box = sp.closest('.tel'); if (b.contactPhone) sp.value = b.contactPhone.replace(/^\+\d+\s*/, ''); sp.addEventListener('input', function () { bkSet({ contactPhone: telValue(box) }); }); }
  }

  /* ---------------------------------------------------------------- Location step */
  function initLocation() {
    var b = bk();
    var pin = $('[data-drag-pin]');
    var map = pin ? pin.closest('.map') : null;
    if (pin && map) {
      var dragging = false;
      pin.addEventListener('pointerdown', function (e) { dragging = true; try { pin.setPointerCapture(e.pointerId); } catch (er) { /* noop */ } pin.style.cursor = 'grabbing'; });
      pin.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        var r = map.getBoundingClientRect();
        pin.style.left = Math.min(95, Math.max(5, (e.clientX - r.left) / r.width * 100)) + '%';
        pin.style.top = Math.min(95, Math.max(12, (e.clientY - r.top + 20) / r.height * 100)) + '%';
      });
      var end = function () { if (!dragging) return; dragging = false; pin.style.cursor = 'grab'; toast('Pin updated — still inside the Kozhikode service area', { title: 'Location set', icon: 'pin' }); };
      pin.addEventListener('pointerup', end); pin.addEventListener('pointercancel', end);
    }
    var loc = $('[data-locate]');
    if (loc) loc.addEventListener('click', function () {
      loc.innerHTML = ic('refresh') + 'Locating…';
      setTimeout(function () { loc.innerHTML = ic('locate') + 'Use current location'; if (pin) { pin.style.left = '76.5%'; pin.style.top = '58%'; } toast('Thondayad Bypass, Kozhikode 673014', { title: 'Location found', icon: 'locate' }); }, 900);
    });
    var compose = function () { var g = function (id) { var el = $('#' + id); return el ? el.value.trim() : ''; }; return [g('building'), g('street'), g('district')].filter(Boolean).join(', '); };
    $$('input[name="addr"]').forEach(function (r) {
      r.addEventListener('change', function () {
        ['street', 'building', 'landmark', 'district'].forEach(function (k) { var f = $('#' + k), v = r.getAttribute('data-' + k); if (f && v !== null) f.value = v; });
        bkSet({ where: r.getAttribute('data-short') || compose(), landmark: r.getAttribute('data-landmark') || '' });
      });
    });
    ['street', 'building', 'district', 'landmark'].forEach(function (k) { var f = $('#' + k); if (f) f.addEventListener('input', function () { bkSet({ where: compose(), landmark: ($('#landmark') || {}).value || '' }); }); });
    $$('input[name="dealer"]').forEach(function (r) { r.checked = r.value === b.dealer; r.addEventListener('change', function () { bkSet({ dealer: r.value }); }); });
    var map2 = { '#cname': 'contactName', '#advisor': 'advisor', '#rep': 'rep', '#hdate': 'handoverDate', '#htime': 'handoverTime' };
    Object.keys(map2).forEach(function (sel) { var el = $(sel), key = map2[sel]; if (!el) return; if (b[key]) el.value = b[key]; el.addEventListener('input', function () { var p = {}; p[key] = el.value; bkSet(p); }); el.addEventListener('change', function () { var p = {}; p[key] = el.value; bkSet(p); }); });
    var telMap = { '#cphone': 'contactPhone', '#advphone': 'advisorPhone', '#repphone': 'repPhone' };
    Object.keys(telMap).forEach(function (sel) { var el = $(sel), key = telMap[sel]; if (!el) return; var box = el.closest('.tel'); if (b[key]) el.value = b[key].replace(/^\+\d+\s*/, ''); var up = function () { var p = {}; p[key] = telValue(box); bkSet(p); }; el.addEventListener('input', up); if (box && $('select', box)) $('select', box).addEventListener('change', up); });
    $$('[data-rel]').forEach(function (c) { if (c.getAttribute('data-rel') === b.repRel) c.setAttribute('aria-pressed', 'true'); c.addEventListener('click', function () { bkSet({ repRel: c.getAttribute('data-rel') }); }); });
  }

  /* ---------------------------------------------------------------- Payment (checkout) */
  function initPayment() {
    var opts = $$('input[name="pay"]');
    if (!opts.length) return;
    function show() {
      var v = (opts.filter(function (o) { return o.checked; })[0] || {}).value;
      $$('[data-pay-panel]').forEach(function (p) { p.hidden = p.getAttribute('data-pay-panel') !== v; });
      $$('[data-pay-label]').forEach(function (el) { el.textContent = v === 'later' ? 'Send payment link' : bkView(bk()).payLabel; });
    }
    opts.forEach(function (o) { o.addEventListener('change', show); });
    show();
    $$('[data-pay]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var form = $('#checkout-form');
        if (form && !validate(form)) { toast('Please check the highlighted fields.', { kind: 'warn', title: 'Almost there' }); return; }
        if (btn.getAttribute('aria-disabled') === 'true') { toast('Your slot hold expired. Tap “Hold again” to re-check availability.', { kind: 'warn', title: 'Hold expired' }); return; }
        var later = (opts.filter(function (o) { return o.checked; })[0] || {}).value === 'later';
        if (later) {
          startHold(LINK_HOLD_MS, LINK_HOLD_MS);
          toast('Link sent to ' + telValue($('#later-to') ? $('#later-to').closest('.tel') : null) + '. We hold your slot for 2 hours; the link expires with the hold.', { title: 'Payment link sent', icon: 'whatsapp' });
          return;
        }
        var href = btn.getAttribute('href');
        btn.innerHTML = ic('lock') + '<span>Securing payment…</span>';
        setTimeout(function () { store.del('sdb_hold_until'); window.location.href = href; }, reduce ? 50 : 700);
      });
    });
  }

  /* ---------------------------------------------------------------- Browse filtering */
  function initBrowse() {
    var grid = $('[data-cars]');
    if (!grid) return;
    var cards = $$('[data-car-card]', grid);
    var countEls = $$('[data-result-count]');
    var range = $('#budget'), rangeOut = $('[data-budget-out]');
    function fmtL(l) { return l >= 100 ? '₹' + (l / 100).toFixed(2).replace(/\.?0+$/, '') + ' Cr' : '₹' + l + ' L'; }
    function active() {
      var groups = {};
      $$('[data-f][aria-pressed="true"]').forEach(function (c) {
        var p = c.getAttribute('data-f').split(':');
        (groups[p[0]] = groups[p[0]] || {})[p[1]] = 1;
      });
      return groups;
    }
    function apply() {
      var g = active(), n = 0, max = range ? parseInt(range.value, 10) : 99999;
      cards.forEach(function (c) {
        var ok = Object.keys(g).every(function (k) {
          if (k === 'score') { var min = Math.max.apply(null, Object.keys(g[k]).map(Number)); return parseInt(c.getAttribute('data-score'), 10) >= min; }
          return !!g[k][c.getAttribute('data-' + k)];
        });
        if (parseInt(c.getAttribute('data-price'), 10) > max) ok = false;
        c.hidden = !ok; if (ok) n++;
      });
      countEls.forEach(function (el) { el.textContent = n; });
      var anyF = $$('[data-f][aria-pressed="true"]').length || (range && max < parseInt(range.max, 10));
      $$('[data-count-label]').forEach(function (el) { el.textContent = anyF ? n + (n === 1 ? ' matching car' : ' matching cars') + ' on this page' : 'All cars · 1,248'; });
      var empty = $('[data-empty]'); if (empty) empty.hidden = n > 0;
      var chipsBox = $('[data-active-chips]');
      if (chipsBox) {
        var html = '';
        $$('.filter-sheet [data-f][aria-pressed="true"]').forEach(function (c) { html += '<button class="chip on" type="button" data-remove="' + c.getAttribute('data-f') + '">' + c.textContent.trim() + ic('x', 'x') + '<span class="sr-only">Remove filter</span></button>'; });
        if (range && max < parseInt(range.max, 10)) html += '<button class="chip on" type="button" data-remove="budget">Up to ' + fmtL(max) + ic('x', 'x') + '</button>';
        chipsBox.innerHTML = html || '<span class="muted small">No filters — showing every certified car.</span>';
      }
      $$('[data-filter-count]').forEach(function (el) { var k = $$('.filter-sheet [data-f][aria-pressed="true"]').length + (range && max < parseInt(range.max, 10) ? 1 : 0); el.textContent = k ? String(k) : ''; el.hidden = !k; });
    }
    d.addEventListener('click', function (e) {
      var c = e.target.closest ? e.target.closest('[data-f]') : null;
      if (c) {
        var k = c.getAttribute('data-f');
        var on = c.getAttribute('aria-pressed') !== 'true';
        if (c.hasAttribute('data-exclusive')) $$('[data-f^="' + k.split(':')[0] + ':"]').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        $$('[data-f="' + k + '"]').forEach(function (x) { x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
        apply(); return;
      }
      var r = e.target.closest ? e.target.closest('[data-remove]') : null;
      if (r) {
        var key = r.getAttribute('data-remove');
        if (key === 'budget' && range) { range.value = range.max; if (rangeOut) rangeOut.textContent = 'Any budget'; }
        else $$('[data-f="' + key + '"]').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        apply(); return;
      }
      if (e.target.closest && e.target.closest('[data-clear]')) {
        $$('[data-f]').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        if (range) { range.value = range.max; if (rangeOut) rangeOut.textContent = 'Any budget'; }
        apply();
      }
    });
    if (range) range.addEventListener('input', function () { var v = parseInt(range.value, 10); if (rangeOut) rangeOut.textContent = v >= parseInt(range.max, 10) ? 'Any budget' : 'Up to ' + fmtL(v); apply(); });
    var sort = $('[data-sort]');
    if (sort) sort.addEventListener('change', function () {
      var v = sort.value, arr = cards.slice();
      arr.sort(function (a, b) {
        var A2 = parseFloat(a.getAttribute('data-' + v.split('-')[0])), B2 = parseFloat(b.getAttribute('data-' + v.split('-')[0]));
        return v.indexOf('-asc') > -1 ? A2 - B2 : B2 - A2;
      });
      arr.forEach(function (c) { grid.appendChild(c); });
      toast('Sorted: ' + sort.options[sort.selectedIndex].text, { icon: 'sort' });
    });
    $$('[data-view]').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('[data-view]').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        grid.classList.toggle('car-list', b.getAttribute('data-view') === 'list');
      });
    });
    var q = $('[data-search]');
    if (q) q.addEventListener('input', function () {
      var t = q.value.trim().toLowerCase();
      cards.forEach(function (c) { if (!t) { c.hidden = false; return; } c.hidden = c.textContent.toLowerCase().indexOf(t) < 0; });
      countEls.forEach(function (el) { el.textContent = cards.filter(function (c) { return !c.hidden; }).length; });
    });
    apply();
  }

  /* ---------------------------------------------------------------- Track state switch (prototype: In progress <-> Report ready)
     Tracking is milestone-based (no live sync). The switch only previews the two states. */
  function initStateSwitch() {
    var btns = $$('[data-state-btn]');
    if (!btns.length) return;
    function set(state, announce) {
      btns.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-state-btn') === state ? 'true' : 'false'); });
      $$('[data-state]').forEach(function (p) {
        var on = p.getAttribute('data-state') === state;
        p.hidden = !on;
        if (on) $$('.reveal:not(.in), .gauge:not(.in), .meter.reveal:not(.in)', p).forEach(function (el) { setTimeout(function () { el.classList.add('in'); }, 80); });
      });
      B.setAttribute('data-track-state', state);
      if (announce) {
        if (state === 'ready') toast('Overall 89/100 \u00b7 Gold recommended. Sent on WhatsApp and push at 1:18 PM.', { title: 'Report ready \u00b7 SDR-24817', icon: 'file' });
        else toast('Nikhil started at 9:31 AM. We\u2019ll message you the moment the report is ready.', { title: 'Inspection in progress', icon: 'clock', kind: 'info' });
      }
    }
    btns.forEach(function (b) { b.addEventListener('click', function () { set(b.getAttribute('data-state-btn'), true); }); });
    set(/ready/.test(window.location.hash) ? 'ready' : 'progress', false);
  }

  /* ---------------------------------------------------------------- Steps form (sell) */
  function initSteps() {
    $$('[data-steps]').forEach(function (box) {
      var panes = $$('[data-pane]', box), i = 0;
      var dots = $$('[data-dot]', box);
      function go(n) {
        i = Math.max(0, Math.min(panes.length - 1, n));
        panes.forEach(function (p, k) { p.hidden = k !== i; });
        dots.forEach(function (dd, k) { dd.classList.toggle('on', k <= i); });
        var f = $('input, select, button', panes[i]); if (f && n > 0) f.focus();
      }
      $$('[data-next]', box).forEach(function (b) { b.addEventListener('click', function () { if (validate(panes[i])) go(i + 1); }); });
      $$('[data-prev]', box).forEach(function (b) { b.addEventListener('click', function () { go(i - 1); }); });
      go(0);
    });
  }

  /* ---------------------------------------------------------------- Callback requests (real channels only: call, WhatsApp, callback) */
  function initCallback() {
    d.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target.closest('[data-callback]') : null;
      if (!t) return;
      e.preventDefault();
      $$('.sheet.open').forEach(function (x) { x.classList.remove('open'); x.setAttribute('aria-hidden', 'true'); });
      var topic = $('#cbs-topic'); if (topic) topic.value = t.getAttribute('data-topic') || 'General question';
      openLayer($('#callback'));
    });
    $$('[data-callback-form]').forEach(function (f) {
      f.setAttribute('novalidate', '');
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!validate(f)) return;
        var tel = f.querySelector('.tel'), win = $('select[id$="window"]', f) || $('#cbs-window');
        var when = win ? win.value : '';
        toast('We’ll call ' + telValue(tel) + (/soon/i.test(when) ? ' — usually within 15 minutes.' : ' between ' + when + ' IST.'), { title: 'Callback requested', icon: 'phone' });
        var sh = f.closest('.sheet'); if (sh) closeLayer(sh);
      });
    });
  }

  /* ---------------------------------------------------------------- Pseudo QR */
  function initQR() {
    $$('[data-qr]').forEach(function (q) {
      var n = 25, cells = '', seed = 7;
      var rnd = function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
      var finder = function (x, y) { return '<rect x="' + x + '" y="' + y + '" width="7" height="7" fill="#0A0C0E"/><rect x="' + (x + 1) + '" y="' + (y + 1) + '" width="5" height="5" fill="#fff"/><rect x="' + (x + 2) + '" y="' + (y + 2) + '" width="3" height="3" fill="#0A0C0E"/>'; };
      for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) {
        var inF = (x < 8 && y < 8) || (x > 16 && y < 8) || (x < 8 && y > 16);
        if (!inF && rnd() > .52) cells += '<rect x="' + x + '" y="' + y + '" width="1" height="1"/>';
      }
      q.innerHTML = '<svg viewBox="0 0 25 25" role="img" aria-label="QR code to download the SDCertified Cars app" shape-rendering="crispEdges"><g fill="#0A0C0E">' + cells + '</g>' + finder(0, 0) + finder(18, 0) + finder(0, 18) + '</svg>';
    });
  }

  /* ---------------------------------------------------------------- Expand all accordions */
  function initAccTools() {
    $$('[data-expand]').forEach(function (b) {
      b.addEventListener('click', function () {
        var box = d.getElementById(b.getAttribute('data-expand'));
        if (!box) return;
        var all = $$('details', box), open = all.some(function (x) { return !x.open; });
        all.forEach(function (x) { x.open = open; });
        b.textContent = open ? 'Collapse all' : 'Expand all';
      });
    });
  }

  /* ---------------------------------------------------------------- List filter (notifications) */
  function initListFilter() {
    $$('[data-filter-list]').forEach(function (group) {
      var list = d.getElementById(group.getAttribute('data-filter-list'));
      if (!list) return;
      var btns = $$('button[data-cat]', group);
      btns.forEach(function (b) {
        b.addEventListener('click', function () {
          var cat = b.getAttribute('data-cat');
          btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
          $$('[data-cat]', list).forEach(function (it) { it.hidden = cat !== 'all' && it.getAttribute('data-cat') !== cat; });
          $$('[data-day]', list).forEach(function (day) { day.hidden = !$$('[data-cat]:not([hidden])', day).length; });
        });
      });
    });
  }

  /* ---------------------------------------------------------------- Boot */
  function boot() {
    try { buildSprite(); } catch (e) { /* sprite optional */ }
    try { injectShell(); } catch (e) { /* shell optional */ }
    var fns = [initGauges, initReveal, initValidation, renderBk, initServiceStep, initTabs, initToggles, initActions, initLayers, initHeader, initGallery, initHold, initSlots, initCarStep, initLocation, initPayment, initBrowse, initStateSwitch, initSteps, initCallback, initQR, initAccTools, initListFilter];
    fns.forEach(function (fn) { try { fn(); } catch (e) { if (window.console) console.warn('[SD]', fn.name, e); } });
    if (page === 'booking-confirmed') store.del('sdb_hold_until');
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', boot); else boot();
})();
