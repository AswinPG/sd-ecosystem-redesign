/* =====================================================================
   SDCertified × Suresh Drives — Design C "Concierge"
   app.js — vanilla, defer-loaded, file:// safe.
   1. Icon sprite  2. Shell (nav / mobile bar / tab bar / flow header /
   footer / guide FAB / toasts)  3. Interactions
   Page content is real HTML in each page; this file only adds chrome
   and behaviour. Every selector is guarded.
   ===================================================================== */
(function () {
  'use strict';
  var d = document;
  var b = d.body;
  if (!b) return;
  d.documentElement.classList.add('js');

  function $(s, c) { return (c || d).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]; }); }
  function ic(n, c) { return '<svg class="i ' + (c || '') + '" aria-hidden="true"><use href="#i-' + n + '"/></svg>'; }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function store(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); if (v === null) sessionStorage.removeItem(k); else sessionStorage.setItem(k, v); } catch (e) { return null; } return null; }

  /* ------------------------------------------------------------------
     1. ICON SPRITE (24px grid, 1.75 stroke)
     ------------------------------------------------------------------ */
  var ICONS = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    car: '<path d="M4 16v-3.5l1.8-4.6a2 2 0 0 1 1.9-1.3h8.6a2 2 0 0 1 1.9 1.3l1.8 4.6V16"/><path d="M3 12.5h18v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M6 17.5V19M18 17.5V19M6.5 15h1.5M16 15h1.5"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    'calendar-plus': '<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4M12 13v5M9.5 15.5h5"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    shield: '<path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.3 7.5 9.5 4.3-1.2 7.5-5 7.5-9.5V6z"/><path d="m8.8 12 2.2 2.2 4.2-4.4"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    'check-circle': '<circle cx="12" cy="12" r="8.5"/><path d="m8.5 12.2 2.4 2.4 4.8-4.9"/>',
    'chev-r': '<path d="m9.5 6 6 6-6 6"/>',
    'chev-l': '<path d="m14.5 6-6 6 6 6"/>',
    'chev-d': '<path d="m6 9.5 6 6 6-6"/>',
    'chev-u': '<path d="m6 14.5 6-6 6 6"/>',
    'arrow-r': '<path d="M5 12h14M13 6l6 6-6 6"/>',
    'arrow-l': '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    'arrow-ur': '<path d="M7 17 17 7M8 7h9v9"/>',
    bell: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c1.2-3.8 4-5.5 7.5-5.5s6.3 1.7 7.5 5.5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.6"/>',
    locate: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22"/>',
    nav: '<path d="M4 11 20 4l-7 16-2-7z"/>',
    phone: '<path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z"/>',
    wa: '<path d="M4 20l1.2-3.9A8.3 8.3 0 1 1 8.1 19z"/><path d="M9.2 8.4c.4-.3 1-.3 1.2.1l.8 1.7c.1.3 0 .5-.2.7l-.5.5a6 6 0 0 0 2.9 2.9l.5-.5c.2-.2.4-.3.7-.2l1.7.8c.4.2.4.8.1 1.2-.7.8-1.8 1-2.9.5a8 8 0 0 1-4.1-4.1c-.5-1.1-.3-2.2.5-2.9z"/>',
    chat: '<path d="M20 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.2A8 8 0 1 1 20 12z"/><path d="M8.5 11h7M8.5 14h4.5"/>',
    sms: '<rect x="3.5" y="4.5" width="17" height="12.5" rx="3"/><path d="M8 17v3.5l4-3.5M8 10.8h.1M12 10.8h.1M16 10.8h.1"/>',
    heart: '<path d="M12 20s-7.5-4.5-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.5-7.5 10-7.5 10z"/>',
    share: '<path d="M12 3v12M7.5 7.5 12 3l4.5 4.5"/><path d="M5 12v6.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V12"/>',
    download: '<path d="M12 4v11M7.5 10.5 12 15l4.5-4.5"/><path d="M5 19.5h14"/>',
    star: '<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8z"/>',
    sliders: '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
    sort: '<path d="M7 4v16M3.5 16.5 7 20l3.5-3.5M17 20V4M13.5 7.5 17 4l3.5 3.5"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.1M4.5 12h.1M4.5 18h.1"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8v.1"/>',
    alert: '<path d="M12 4 2.8 19.5h18.4z"/><path d="M12 10v4.5M12 17.2v.1"/>',
    'alert-c': '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V13M12 16.2v.1"/>',
    sparkle: '<path d="M12 3.5 13.8 9l5.7 1.5-5.7 1.5L12 17.5 10.2 12l-5.7-1.5L10.2 9z"/><path d="M18.5 16.5v4M16.5 18.5h4"/>',
    bolt: '<path d="M13 3 5 13.5h6L10 21l8-10.5h-6z"/>',
    gauge: '<path d="M4.5 17a8.5 8.5 0 1 1 15 0"/><path d="m12 13 3.5-4"/><circle cx="12" cy="13.5" r="1.3"/>',
    camera: '<path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2.3l1.5-2.2h5.4L16.2 7h2.3A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z"/><circle cx="12" cy="12.8" r="3.3"/>',
    file: '<path d="M14 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8z"/><path d="M14 3.5V8h4.5M9 12.5h6M9 16h6"/>',
    card: '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3 10h18M7 15h3"/>',
    bank: '<path d="M3.5 9.5 12 4.5l8.5 5"/><path d="M5 10v7.5M9.5 10v7.5M14.5 10v7.5M19 10v7.5M3.5 20h17"/>',
    mobile: '<rect x="6.5" y="3" width="11" height="18" rx="2.5"/><path d="M11 17.5h2"/>',
    lock: '<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
    refresh: '<path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3L19.5 9"/><path d="M19.5 4.5V9H15"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8"/>',
    logout: '<path d="M14 4.5h3.5A1.5 1.5 0 0 1 19 6v12a1.5 1.5 0 0 1-1.5 1.5H14"/><path d="M10 8l-4 4 4 4M6 12h9"/>',
    help: '<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.5a2.5 2.5 0 0 1 4.8.8c0 1.7-2.4 2.1-2.4 3.7M12 17v.1"/>',
    tag: '<path d="M3.5 12.5V5A1.5 1.5 0 0 1 5 3.5h7.5l8 8-9 9z"/><circle cx="8.3" cy="8.3" r="1.4"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    battery: '<rect x="3" y="7.5" width="16" height="9" rx="2"/><path d="M21 10.5v3M6 10.5v3M9 10.5v3M12 10.5v3"/>',
    tyre: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.5"/><path d="M12 3.5v5M12 15.5v5M3.5 12h5M15.5 12h5"/>',
    engine: '<path d="M3.5 10.5v5M3.5 13H6"/><path d="M6 9.5h2.5v-2h6v2h2l2 2.5h2v5h-2l-2 2.5h-8L6 16.5z"/>',
    steering: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2"/><path d="M3.8 10.5c2.5.7 5 .7 6.3 0M13.9 10.5c1.3.7 3.8.7 6.3 0M12 14v6.5"/>',
    wrench: '<path d="M15 4.5a4.5 4.5 0 0 0-4.3 5.8L4.5 16.5a2.1 2.1 0 0 0 3 3l6.2-6.2A4.5 4.5 0 0 0 19.5 9l-2.8 2.8-2.6-.7-.7-2.6 2.8-2.8A4.5 4.5 0 0 0 15 4.5z"/>',
    scan: '<path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16"/><path d="M7.5 12h2l1.5-3 2 6 1.5-3h2"/>',
    layers: '<path d="m12 4 8.5 4.5L12 13 3.5 8.5z"/><path d="m3.5 12.5 8.5 4.5 8.5-4.5M3.5 16.5 12 21l8.5-4.5"/>',
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.6 3.5 5.5 3.5 8.5s-1 5.9-3.5 8.5c-2.5-2.6-3.5-5.5-3.5-8.5s1-5.9 3.5-8.5z"/>',
    mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="m4 7 8 6 8-6"/>',
    building: '<path d="M4.5 20.5V5A1.5 1.5 0 0 1 6 3.5h8A1.5 1.5 0 0 1 15.5 5v15.5M15.5 9.5H18a1.5 1.5 0 0 1 1.5 1.5v9.5M3 20.5h18M8 7.5h4M8 11h4M8 14.5h4"/>',
    users: '<circle cx="9" cy="8.5" r="3.5"/><path d="M2.5 19.5c.9-3.2 3.3-4.8 6.5-4.8s5.6 1.6 6.5 4.8"/><path d="M15.5 5.2a3.5 3.5 0 0 1 0 6.6M17.5 14.9c2 .6 3.4 2.1 4 4.6"/>',
    briefcase: '<rect x="3.5" y="7" width="17" height="12.5" rx="2.5"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3.5 12.5h17"/>',
    receipt: '<path d="M6 3.5h12v17l-2.2-1.5-1.9 1.5-1.9-1.5-1.9 1.5-1.9-1.5L6 20.5z"/><path d="M9 8h6M9 11.5h6M9 15h3.5"/>',
    play: '<path d="M8 5.5v13l10-6.5z"/>',
    copy: '<rect x="8.5" y="8.5" width="11.5" height="11.5" rx="2.5"/><path d="M15.5 8.5V6A1.5 1.5 0 0 0 14 4.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5"/>',
    trend: '<path d="M3.5 17 9 11.5l3.5 3.5 8-8"/><path d="M15 7h5.5v5.5"/>',
    award: '<circle cx="12" cy="9" r="5.5"/><path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7"/>',
    droplet: '<path d="M12 3.5s6 6.3 6 10.5a6 6 0 0 1-12 0c0-4.2 6-10.5 6-10.5z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5V5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/>',
    sunset: '<path d="M3 18.5h18M6 15a6 6 0 0 1 12 0M12 3.5v4.5M9.5 6l2.5-2.5L14.5 6M4.2 10.8l1.6 1M19.8 10.8l-1.6 1"/>',
    route: '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>',
    fuel: '<path d="M5 20.5V5A1.5 1.5 0 0 1 6.5 3.5h6A1.5 1.5 0 0 1 14 5v15.5M3.5 20.5h12M5 10h9M14 8.5h3l2 2V17a1.5 1.5 0 0 1-3 0v-3h-2"/>',
    history: '<path d="M3.5 12a8.5 8.5 0 1 0 2.5-6"/><path d="M3.5 4.5V9H8M12 8v4.5l3 1.5"/>',
    edit: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
    send: '<path d="M4 12 20 4l-5 16-3-7z"/><path d="m12 13 8-9"/>',
    image: '<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="9" cy="9.5" r="1.8"/><path d="m4 17 5-4.5 4 3.5 3-2.5 4 3.5"/>',
    link: '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    key: '<circle cx="8" cy="15" r="4.5"/><path d="m11.2 11.8 8.3-8.3M16.5 6.5 19 9M14 9l2 2"/>',
    video: '<rect x="3" y="6.5" width="12.5" height="11" rx="2.5"/><path d="m15.5 10.5 5.5-3v9l-5.5-3z"/>',
    seat: '<path d="M8 3.5h4.5a1.5 1.5 0 0 1 1.5 1.7l-1.3 9.3H7.5l-1-9.2A1.5 1.5 0 0 1 8 3.5z"/><path d="M7.5 14.5H17a1.5 1.5 0 0 1 1.5 1.5v1.5h-11zM9 17.5v3M17 17.5v3"/>',
    disc: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.2"/><path d="M12 6.3v.1M17.7 12h-.1M12 17.7v-.1M6.3 12h.1"/>',
    bulb: '<path d="M9 18h6M10 21h4M8.5 14.5a6 6 0 1 1 7 0c-.8.7-1 1.4-1 2v1.5h-5v-1.5c0-.6-.2-1.3-1-2z"/>',
    percent: '<path d="M19 5 5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>',
    umbrella: '<path d="M3 12a9 9 0 0 1 18 0z"/><path d="M12 12v6.5a2 2 0 0 1-4 0"/>',
    truck: '<path d="M3 6.5h11v10H3zM14 9.5h4l3 3.5v3.5h-7z"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/>',
    gem: '<path d="M6.5 4.5h11L21 9l-9 11.5L3 9z"/><path d="M3 9h18M9.5 4.5 12 9l2.5-4.5M8 9l4 11.5L16 9"/>',
    volume: '<path d="M4 9.5v5h3.5l4.5 4v-13l-4.5 4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
    hourglass: '<path d="M6.5 3.5h11M6.5 20.5h11M7.5 3.5c0 4.5 4.5 5.5 4.5 8.5s-4.5 4-4.5 8.5M16.5 3.5c0 4.5-4.5 5.5-4.5 8.5s4.5 4 4.5 8.5"/>',
    dot: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none"/>',
    circle: '<circle cx="12" cy="12" r="8.5"/>',
    store: '<rect x="6.5" y="3" width="11" height="18" rx="2.5"/><path d="M12 7.5v6M9.5 11l2.5 2.5 2.5-2.5M10.5 17.5h3"/>',
    'play-store': '<path d="M5.5 3.8v16.4a.8.8 0 0 0 1.2.7l14-8.2a.8.8 0 0 0 0-1.4l-14-8.2a.8.8 0 0 0-1.2.7z"/><path d="m5.8 3.6 9.7 11.6M5.8 20.4l9.7-11.6"/>',
    qr: '<rect x="4" y="4" width="6" height="6" rx="1.2"/><rect x="14" y="4" width="6" height="6" rx="1.2"/><rect x="4" y="14" width="6" height="6" rx="1.2"/><path d="M14 14h2v2h-2zM18 18h2v2h-2zM18 14h2M14 18v2"/>',
    sparkles: '<path d="M9.5 4 11 8.5 15.5 10 11 11.5 9.5 16 8 11.5 3.5 10 8 8.5z"/><path d="M17.5 13.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>',
    flag: '<path d="M5 21V4.5M5 4.5h11l-2 4 2 4H5"/>',
    thumb: '<path d="M7.5 10.5v9.5H4.5v-9.5zM7.5 10.5l3.5-7a2 2 0 0 1 2.5 2.4l-.8 3.6h5.4a2 2 0 0 1 2 2.4l-1.4 6.5a2 2 0 0 1-2 1.6H7.5"/>'
  };
  (function sprite() {
    var out = '';
    for (var k in ICONS) {
      if (Object.prototype.hasOwnProperty.call(ICONS, k)) {
        out += '<symbol id="i-' + k + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' + ICONS[k] + '</symbol>';
      }
    }
    b.insertAdjacentHTML('afterbegin', '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">' + out + '</svg>');
  })();

  /* ------------------------------------------------------------------
     2. SHELL
     ------------------------------------------------------------------ */
  var page = b.getAttribute('data-page') || '';
  var shell = b.getAttribute('data-shell') || 'app';
  var title = b.getAttribute('data-title') || d.title.split('·')[0].trim();
  var back = b.getAttribute('data-back') || '';
  var brand = b.getAttribute('data-brand') || 'sdc';
  var tabsOff = b.getAttribute('data-tabbar') === 'off';
  var fabOff = b.getAttribute('data-fab') === 'off';
  var main = $('main') || b.firstElementChild;

  var A = '../assets/';
  var TEL = 'tel:+918330881213';
  var WA = 'https://wa.me/919895441213';

  var NAV = [
    ['browse.html', 'Buy cars', ['browse', 'vehicle']],
    ['book.html', 'Book inspection', ['book', 'book-car', 'book-location', 'book-slot', 'checkout', 'booking-confirmed']],
    ['sell.html', 'Sell', ['sell']],
    ['inspections.html', 'My inspections', ['inspections', 'track', 'report', 'report-gle', 'report-pdi'], true],
    ['suresh-drives.html', 'Suresh Drives', ['suresh-drives']],
    ['partners.html', 'Partners', ['partners']]
  ];
  var TABS = [
    ['home.html', 'Home', 'home', ['home', 'notifications', 'support']],
    ['browse.html', 'Buy', 'car', ['browse', 'vehicle', 'sell']],
    ['book.html', 'Book', 'plus', ['book']],
    ['inspections.html', 'Inspections', 'file', ['inspections', 'track', 'report', 'report-gle', 'report-pdi']],
    ['profile.html', 'Profile', 'user', ['profile']]
  ];

  function lockup(href) {
    if (brand === 'sd') {
      return '<a class="lockup lockup-sd" href="' + href + '" aria-label="Suresh Drives home"><img src="' + A + 'logo-sureshdrives-dark.png" alt="Suresh Drives" width="72" height="47"><span class="lockup-text"><span class="lockup-by">Book on <b style="color:var(--red-press)">SDCertified</b></span></span></a>';
    }
    return '<a class="lockup" href="' + href + '" aria-label="SDCertified home"><img src="' + A + 'logo-sdcertified-mark.png" alt="" width="26" height="30"><span class="lockup-text"><span class="lockup-word">SDCertified</span><span class="lockup-by">by <b>Suresh Drives</b></span></span></a>';
  }

  var CALL = '<a class="call-pill" href="' + TEL + '" aria-label="Call us on +91 8330 881 213">' + ic('phone') + '<span>Call us</span><span class="call-num">&nbsp;+91 8330 881 213</span></a>';
  function langSwitch(cls) {
    return '<div class="lang ' + (cls || '') + '" role="group" aria-label="Language"><button type="button" lang="en" aria-pressed="true" data-lang="en">EN</button><button type="button" lang="ml" aria-pressed="false" data-lang="ml">മലയാളം</button></div>';
  }
  function buildDesktopNav() {
    var links = NAV.map(function (n) {
      var cur = n[2].indexOf(page) > -1 ? ' aria-current="page"' : '';
      return '<a href="' + n[0] + '"' + cur + '>' + n[1] + (n[3] ? '<span class="live-dot" aria-hidden="true"></span>' : '') + '</a>';
    }).join('');
    var actions;
    if (shell === 'site') {
      actions = langSwitch() + CALL +
        '<a class="btn btn-ghost btn-sm" href="home.html">Open app</a>' +
        '<a class="btn btn-primary btn-sm" href="book.html">Book inspection</a>';
    } else {
      actions = langSwitch() + CALL +
        '<a class="icon-btn" href="notifications.html" aria-label="Notifications, 3 new"' + (page === 'notifications' ? ' aria-current="page"' : '') + '>' + ic('bell') + '<span class="count-badge">3</span></a>' +
        '<a href="profile.html" class="avatar" aria-label="Your profile, Arjun Menon" style="margin-left:6px">AM</a>';
    }
    return '<header class="dnav" role="banner"><div class="wrap dnav-in">' + lockup(shell === 'site' ? 'index.html' : 'home.html') +
      '<nav class="dnav-links" aria-label="Main">' + links + '</nav><div class="dnav-actions">' + actions + '</div></div></header>';
  }

  function buildMobileBar() {
    var left = back
      ? '<a class="icon-btn mbar-back" href="' + back + '" aria-label="Back">' + ic('chev-l', 'i-lg') + '</a>'
      : '<a class="lockup" href="' + (shell === 'site' ? 'index.html' : 'home.html') + '" aria-label="Home"><img src="' + A + (brand === 'sd' ? 'logo-sureshdrives-dark.png' : 'logo-sdcertified-mark.png') + '" alt="" style="width:' + (brand === 'sd' ? '52px' : '24px') + '"></a>';
    var right = shell === 'site'
      ? CALL + langSwitch() + '<button class="icon-btn" type="button" data-sheet="menu-sheet" aria-label="Open menu">' + ic('menu') + '</button>'
      : CALL + langSwitch() + '<a class="icon-btn" href="notifications.html" aria-label="Notifications, 3 new">' + ic('bell') + '<span class="count-badge">3</span></a>';
    var always = b.hasAttribute('data-title-always') ? ' always' : '';
    return '<div class="mbar' + always + '">' + left + '<span class="mbar-title">' + esc(title) + '</span><div class="mbar-actions">' + right + '</div></div>';
  }

  function buildTabbar() {
    return '<nav class="tabbar" aria-label="App">' + TABS.map(function (t) {
      var cur = t[3].indexOf(page) > -1 ? ' aria-current="page"' : '';
      if (t[2] === 'plus') {
        return '<a class="tab tab-book" href="' + t[0] + '"' + cur + '><span class="tab-fab">' + ic('plus') + '</span>' + t[1] + '</a>';
      }
      var dot = t[2] === 'file' ? '<span class="live-dot" aria-hidden="true"></span><span class="sr-only">(1 in progress)</span>' : '';
      return '<a class="tab" href="' + t[0] + '"' + cur + '>' + ic(t[2]) + t[1] + dot + '</a>';
    }).join('') + '</nav>';
  }

  var STEPS = ['Service', 'Car', 'Location', 'Slot', 'Pay'];
  function buildFlow() {
    var step = b.getAttribute('data-step') || '1';
    var n = step === 'done' ? 6 : parseInt(step, 10) || 1;
    var items = STEPS.map(function (s, i) {
      var k = i + 1;
      var cls = k < n ? 'done' : (k === n ? 'now' : '');
      var inner = k < n ? ic('check', 'i-sm') : k;
      return '<li class="' + cls + '"' + (k === n ? ' aria-current="step"' : '') + '><span class="sn">' + inner + '</span><span class="sl">' + s + '</span></li>';
    }).join('');
    var label = step === 'done' ? '<b>Booked</b>' : '<b>' + n + '</b>/5 · ' + STEPS[n - 1];
    var pct = step === 'done' ? 100 : (n / 5) * 100;
    return '<header class="fnav"><div class="wrap fnav-in">' +
      '<a class="icon-btn solid" href="' + (back || 'home.html') + '" aria-label="Back">' + ic('chev-l') + '</a>' +
      lockup('home.html') +
      '<ol class="stepper" aria-label="Booking progress">' + items + '</ol>' +
      '<span class="fnav-step m-only">' + label + '</span>' +
      '<div class="fnav-help">' +
      langSwitch('m-hide') + CALL +
      '<a class="call-pill m-hide" href="' + WA + '">' + ic('wa') + '<span class="wa-label">WhatsApp</span></a>' +
      '<a class="btn btn-soft btn-sm" href="support.html" style="padding-left:6px"><span class="meera meera-sm" aria-hidden="true">M</span><span><span class="m-hide">Ask </span>Meera</span></a>' +
      '</div></div><div class="fnav-progress" aria-hidden="true"><span style="--w:' + pct + '%"></span></div></header>';
  }

  function buildFooter(compact) {
    var endorse = '<div class="foot-endorse"><span><strong>SDCertified</strong> — an offering of Suresh Drives LLP, India\'s first on-site car inspection company.</span><span>Inspected by Suresh Drives · Sold on SDCertified · © 2026</span></div>';
    if (compact) return '<footer class="foot" style="margin-top:40px"><div class="wrap">' + endorse + '</div></footer>';
    return '<footer class="foot" role="contentinfo"><div class="wrap"><div class="foot-in">' +
      '<div class="foot-brand"><div class="foot-logos"><span class="lockup"><img src="' + A + 'logo-sdcertified-mark.png" alt="" width="26" height="30"><span class="lockup-word">SDCertified</span></span><img class="sdlogo" src="' + A + 'logo-sureshdrives-dark.png" alt="Suresh Drives"></div>' +
      '<p>Certified pre-owned cars, inspected by hand by Suresh Drives. Book any inspection right here — we come to the car.</p>' +
      '<div class="stack mt-2" style="--gap:6px"><a class="link small" href="' + TEL + '">' + ic('phone', 'i-sm') + '+91 8330 881 213</a><a class="link small" href="' + WA + '">' + ic('wa', 'i-sm') + 'WhatsApp +91 98954 41213</a><a class="link small" href="mailto:sureshhdrives@gmail.com">' + ic('mail', 'i-sm') + 'sureshhdrives@gmail.com</a></div></div>' +
      '<div class="foot-col"><h4>SDCertified</h4><ul><li><a href="browse.html">Buy certified cars</a></li><li><a href="sell.html">Sell &amp; get certified</a></li><li><a href="book.html">Book an inspection</a></li><li><a href="inspections.html">My inspections</a></li><li><a href="index.html">Get the app</a></li></ul></div>' +
      '<div class="foot-col"><h4>Suresh Drives</h4><ul><li><a href="suresh-drives.html">Our story</a></li><li><a href="suresh-drives.html#services">Services &amp; prices</a></li><li><a href="report.html">Sample report</a></li><li><a href="partners.html">Partner with us</a></li></ul></div>' +
      '<div class="foot-col"><h4>Visit</h4><ul><li><a href="support.html">Help &amp; guide</a></li><li><a href="notifications.html">Notification settings</a></li></ul><p class="small muted mt-2">The Workbook, HiLITE Business Park, Poovangal, Kozhikode, Kerala 673014</p></div>' +
      '</div>' + endorse + '</div></footer>';
  }

  function buildMenuSheet() {
    return '<div class="sheet" id="menu-sheet" role="dialog" aria-modal="true" aria-label="Menu"><div class="sheet-grab"></div>' +
      '<div class="sheet-head"><strong class="h3">Where to?</strong><button class="icon-btn" type="button" data-close-sheet aria-label="Close menu">' + ic('x') + '</button></div>' +
      '<ul class="menu-list">' + NAV.map(function (n) { return '<li><a href="' + n[0] + '">' + n[1] + ic('chev-r', 'chev') + '</a></li>'; }).join('') +
      '<li><a href="home.html">Open the app' + ic('chev-r', 'chev') + '</a></li></ul></div>';
  }

  // Skip link
  b.insertAdjacentHTML('afterbegin', '<a class="skip" href="#main">Skip to content</a>');
  if (main && !main.id) main.id = 'main';

  if (main) {
    if (shell === 'flow') {
      main.insertAdjacentHTML('beforebegin', buildFlow());
      main.insertAdjacentHTML('afterend', buildFooter(true));
    } else {
      main.insertAdjacentHTML('beforebegin', buildDesktopNav() + buildMobileBar());
      main.insertAdjacentHTML('afterend', buildFooter(false));
      if (!tabsOff) { b.insertAdjacentHTML('beforeend', buildTabbar()); b.classList.add('has-tabbar'); }
      if (shell === 'site') b.insertAdjacentHTML('beforeend', buildMenuSheet());
    }
  }
  if ($('.cta-bar')) b.classList.add('has-ctabar');
  if (!fabOff && shell !== 'flow' && page !== 'support') {
    b.insertAdjacentHTML('beforeend', '<a class="guide-fab" href="support.html" aria-label="Talk to Meera, your Suresh Drives guide"><span class="meera" aria-hidden="true">M</span><span class="gf-text">Talk to Meera<small>Online · replies in ~2 min</small></span></a>');
  }
  b.insertAdjacentHTML('beforeend', '<div class="toasts" id="toasts" role="status" aria-live="polite"></div><div class="scrim" data-close-sheet></div>');

  /* ------------------------------------------------------------------
     3. INTERACTIONS
     ------------------------------------------------------------------ */
  function toast(t, sub, icon) {
    var r = $('#toasts'); if (!r) return;
    var el = d.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<span class="toast-ico">' + ic(icon || 'check') + '</span><div>' + esc(t) + (sub ? '<small>' + esc(sub) + '</small>' : '') + '</div>';
    r.appendChild(el);
    while (r.children.length > 3) r.removeChild(r.firstChild);
    setTimeout(function () { el.classList.add('out'); setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 300); }, 4200);
  }
  window.sdToast = toast;

  // Scrolled state for bars
  var bars = $$('.dnav, .mbar');
  function onScroll() { var s = window.scrollY > 8; bars.forEach(function (x) { x.classList.toggle('scrolled', s); }); }
  if (bars.length) { window.addEventListener('scroll', onScroll, { passive: true }); onScroll(); }

  // Generic toasts: data-toast="Title|Sub|icon"
  d.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-toast]') : null;
    if (!t) return;
    var parts = (t.getAttribute('data-toast') || '').split('|');
    var href = t.getAttribute('href');
    if (t.tagName === 'A' && (!href || href === '#')) e.preventDefault();
    toast(parts[0], parts[1], parts[2]);
  });

  // Copy
  $$('[data-copy]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var txt = el.getAttribute('data-copy');
      try { if (navigator.clipboard) navigator.clipboard.writeText(txt).catch(function () {}); } catch (err) { /* ignore */ }
      toast('Link copied', txt, 'link');
    });
  });

  // Sheets
  var scrim = $('.scrim');
  var lastFocus = null;
  function openSheet(id) {
    var s = d.getElementById(id); if (!s) return;
    lastFocus = d.activeElement;
    s.classList.add('open'); if (scrim) scrim.classList.add('open');
    var f = s.querySelector('button, a, input, select'); if (f) setTimeout(function () { f.focus(); }, 60);
  }
  function closeSheets() {
    $$('.sheet.open, .filters.open').forEach(function (s) { s.classList.remove('open'); });
    if (scrim) scrim.classList.remove('open');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  d.addEventListener('click', function (e) {
    if (!e.target.closest) return;
    var o = e.target.closest('[data-sheet]');
    if (o) { e.preventDefault(); openSheet(o.getAttribute('data-sheet')); return; }
    if (e.target.closest('[data-close-sheet]')) { closeSheets(); }
  });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSheets(); });

  // Tabs / segmented
  $$('[data-tabs]').forEach(function (root) {
    var tabs = $$('[role="tab"]', root);
    function sel(t, focus) {
      tabs.forEach(function (x) {
        var on = x === t;
        x.setAttribute('aria-selected', on ? 'true' : 'false');
        x.tabIndex = on ? 0 : -1;
        var p = d.getElementById(x.getAttribute('aria-controls'));
        if (p) p.hidden = !on;
      });
      if (focus) t.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { sel(t); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); sel(tabs[(i + 1) % tabs.length], true); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); sel(tabs[(i - 1 + tabs.length) % tabs.length], true); }
      });
    });
  });

  // Filter chips with targets: [data-filter] > [data-f]; items [data-cat]
  $$('[data-filter]').forEach(function (root) {
    var target = d.querySelector(root.getAttribute('data-filter'));
    if (!target) return;
    var chips = $$('[data-f]', root);
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        chips.forEach(function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); });
        var f = c.getAttribute('data-f');
        $$('[data-cat]', target).forEach(function (it) {
          it.hidden = !(f === 'all' || (it.getAttribute('data-cat') || '').split(' ').indexOf(f) > -1);
        });
        $$('[data-group]', target).forEach(function (g) {
          g.hidden = !$$('[data-cat]', g).some(function (it) { return !it.hidden; });
        });
      });
    });
  });

  // Toggle chips (standalone)
  $$('.chip[aria-pressed]').forEach(function (c) {
    if (c.hasAttribute('data-f')) return;
    c.addEventListener('click', function () { c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); });
  });
  // Removable active filter chips
  $$('[data-remove-chip]').forEach(function (c) {
    c.addEventListener('click', function () {
      var label = c.textContent.trim();
      c.style.transition = 'opacity 200ms, transform 200ms';
      c.style.opacity = '0'; c.style.transform = 'scale(.9)';
      setTimeout(function () { if (c.parentNode) c.parentNode.removeChild(c); }, 200);
      toast('Filter removed', label, 'x');
    });
  });

  // Hearts
  $$('.heart').forEach(function (h) {
    h.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      var on = h.getAttribute('aria-pressed') !== 'true';
      h.setAttribute('aria-pressed', on ? 'true' : 'false');
      toast(on ? 'Saved to your shortlist' : 'Removed from shortlist', on ? 'We\'ll tell you if the price changes.' : '', 'heart');
    });
  });

  // Gallery
  $$('[data-gallery]').forEach(function (g) {
    var img = $('.gallery-main img', g);
    var th = $$('.gallery-thumbs button', g);
    th.forEach(function (t) {
      t.addEventListener('click', function () {
        th.forEach(function (x) { x.setAttribute('aria-pressed', x === t ? 'true' : 'false'); });
        if (!img) return;
        img.classList.add('swap');
        setTimeout(function () {
          img.src = t.getAttribute('data-src') || img.src;
          img.style.objectPosition = t.getAttribute('data-pos') || '50% 50%';
          img.style.transform = t.getAttribute('data-zoom') ? 'scale(' + t.getAttribute('data-zoom') + ')' : '';
          img.alt = t.getAttribute('data-alt') || img.alt;
          img.classList.remove('swap');
        }, 160);
      });
    });
  });

  // Show/hide by radio: <input type=radio name=x data-show="#id">
  var showRadios = $$('input[data-show]');
  function syncShow() {
    showRadios.forEach(function (r) {
      var t = d.querySelector(r.getAttribute('data-show'));
      if (t) t.hidden = !r.checked;
    });
  }
  showRadios.forEach(function (r) {
    var group = $$('input[name="' + r.name + '"]');
    group.forEach(function (g) { g.addEventListener('change', syncShow); });
  });
  if (showRadios.length) syncShow();

  // Summary fill: inputs with data-sum-key / data-sum-val
  function setSum(key, val) { $$('[data-sum="' + key + '"]').forEach(function (x) { x.textContent = val; x.classList.remove('muted'); }); }
  $$('input[data-sum-key]').forEach(function (inp) {
    inp.addEventListener('change', function () { if (inp.checked) setSum(inp.getAttribute('data-sum-key'), inp.getAttribute('data-sum-val')); });
  });

  /* ------------------------------------------------------------------
     BOOKING STATE — one object in sessionStorage, read by every step
     ------------------------------------------------------------------ */
  var BK_KEY = 'sdc_booking';
  var BK_DEFAULT = {
    service: 'used', brand: 'Mercedes-Benz', model: 'GLE 300d 4MATIC', year: '2021', reg: 'KL 11 BH 7272', notReg: false,
    owner: 'seller', location: 'Near Hilite Mall, Thondayad Bypass, Kozhikode', dealer: 'BMW EVM Autokraft, Kochi',
    handover: 'Tue 17 Nov, 4:00 PM IST', date: 'Sat 21 Nov', session: 'Morning', abroad: false
  };
  var BK_PRESET = {
    used: { brand: 'Mercedes-Benz', model: 'GLE 300d 4MATIC', year: '2021', notReg: false, owner: 'seller', date: 'Sat 21 Nov', session: 'Morning' },
    pdi: { brand: 'BMW', model: 'i7 xDrive60', year: '2026', notReg: true, owner: 'dealer', date: 'Tue 17 Nov', session: 'Morning' }
  };
  var MODELS = {
    'Maruti Suzuki': ['Swift', 'Baleno', 'Brezza', 'Grand Vitara'],
    'Hyundai': ['i20', 'Creta', 'Venue', 'Verna'],
    'Tata': ['Nexon', 'Punch', 'Harrier'],
    'Mahindra': ['XUV700', 'Scorpio-N', 'Thar'],
    'Kia': ['Seltos', 'Sonet', 'Carens'],
    'Toyota': ['Innova Crysta', 'Innova Hycross', 'Fortuner', 'Glanza'],
    'Honda': ['City', 'Amaze', 'Elevate'],
    'Skoda': ['Slavia', 'Kushaq', 'Kodiaq'],
    'Volkswagen': ['Virtus', 'Taigun', 'Tiguan'],
    'MG': ['Hector', 'Astor', 'ZS EV'],
    'Jeep': ['Compass', 'Meridian', 'Wrangler Rubicon'],
    'Mercedes-Benz': ['GLE 300d 4MATIC', 'GLC 300', 'C 220d', 'E 350d', 'GLA 220d', 'S 350d'],
    'BMW': ['X1 sDrive18d', '3 Series Gran Limousine', '5 Series', 'X5 xDrive30d', 'X4 M Competition', 'i7 xDrive60'],
    'Audi': ['A4', 'Q5', 'Q7 45 TDI'],
    'Volvo': ['XC60', 'XC90', 'S60 B5 Inscription'],
    'Lexus': ['ES 300h', 'NX 350h', 'RX 500h'],
    'Land Rover': ['Defender', 'Range Rover Velar', 'Discovery Sport'],
    'Porsche': ['Macan', 'Cayenne'],
    'Jaguar': ['F-Pace', 'XF'],
    'Mini': ['Cooper S', 'Countryman']
  };
  var BRAND_TIER = { 'Skoda': 'Premium', 'Volkswagen': 'Premium', 'MG': 'Premium', 'Jeep': 'Premium', 'Mercedes-Benz': 'Luxury', 'BMW': 'Luxury', 'Audi': 'Luxury', 'Volvo': 'Luxury', 'Lexus': 'Luxury', 'Land Rover': 'Luxury', 'Porsche': 'Luxury', 'Jaguar': 'Luxury', 'Mini': 'Luxury' };
  var MODEL_TIER = { 'Fortuner': 'Premium', 'Innova Hycross': 'Premium', 'XUV700': 'Premium' };
  var TIER_PRICE = { Standard: 3999, Premium: 4999, Luxury: 5999 };

  function getBk() {
    var o = {}, k;
    for (k in BK_DEFAULT) o[k] = BK_DEFAULT[k];
    try {
      var s = JSON.parse(sessionStorage.getItem(BK_KEY) || 'null');
      if (s && typeof s === 'object') for (k in s) if (Object.prototype.hasOwnProperty.call(BK_DEFAULT, k)) o[k] = s[k];
    } catch (e) { /* storage blocked: use the default mock */ }
    return o;
  }
  function saveBk(bk) { try { sessionStorage.setItem(BK_KEY, JSON.stringify(bk)); } catch (e) { /* ignore */ } }
  function tierOf(bk) { return MODEL_TIER[bk.model] || BRAND_TIER[bk.brand] || 'Standard'; }
  function priceOf(bk) {
    var base = bk.service === 'pdi' ? 3999 : (TIER_PRICE[tierOf(bk)] || 5999);
    var gst = Math.round(base * 18) / 100;
    var exact = Math.round((base + gst) * 100) / 100;
    var total = Math.round(exact);
    return { base: base, gst: gst, exact: exact, total: total, round: Math.round((total - exact) * 100) / 100 };
  }
  function inr(n, dec) { dec = dec || 0; return '₹' + Number(n).toLocaleString('en-IN', { minimumFractionDigits: dec, maximumFractionDigits: dec }); }
  var bk = getBk();

  function renderBk() {
    var pr = priceOf(bk), t = tierOf(bk), pdi = bk.service === 'pdi';
    var svc = pdi ? 'New Car PDI' : 'Used Car Pre-Purchase Inspection';
    var map = {
      'service': svc,
      'service-short': pdi ? 'New Car PDI' : 'Used Car Pre-Purchase',
      'eyebrow': svc + ' · ' + bk.brand + ' ' + bk.model,
      'car': (bk.year ? bk.year + ' ' : '') + bk.brand + ' ' + bk.model,
      'car-short': bk.brand + ' ' + bk.model,
      'reg': bk.notReg ? 'Not registered yet' : (bk.reg || 'Registration to be confirmed'),
      'tier': pdi ? 'Flat PDI price' : t + ' tier',
      'tier-name': pdi ? 'New Car PDI · flat price' : t + ' segment',
      'base': inr(pr.base, 2), 'base-short': inr(pr.base), 'gst': inr(pr.gst, 2), 'round': (pr.round >= 0 ? '+' : '−') + inr(Math.abs(pr.round), 2),
      'exact': inr(pr.exact, 2), 'total': inr(pr.total), 'price-line': inr(pr.base) + ' + GST',
      'pay': 'Pay ' + inr(pr.total) + ' securely',
      'where': pdi ? bk.dealer : bk.location,
      'when': bk.date + ', ' + bk.session + (bk.session === 'Afternoon' ? ' · 2:00–6:00 PM IST' : ' · 9:00 AM–1:00 PM IST'),
      'when-short': bk.date + ', ' + bk.session,
      'duration': pdi ? 'about 2 hours' : 'about 3–4 hours',
      'who': pdi ? 'Sales advisor at ' + bk.dealer : 'Faisal (seller) · +91 99460 55120',
      'handover': bk.handover
    };
    $$('[data-bk]').forEach(function (el) {
      var k = el.getAttribute('data-bk');
      if (map[k] == null || el.textContent === map[k]) return;
      el.textContent = map[k];
      el.classList.remove('muted');
      if (el.hasAttribute('data-bk-tick') && !reduce) { el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick'); }
    });
    $$('[data-bk-show]').forEach(function (el) { el.hidden = el.getAttribute('data-bk-show') !== bk.service; });
    $$('[data-tier-opt]').forEach(function (x) { x.classList.toggle('on', !pdi && x.getAttribute('data-tier-opt') === t); });
    $$('[data-bk-open="abroad"]').forEach(function (x) { if (bk.abroad) x.open = true; });
    $$('[data-reg-wrap]').forEach(function (x) { x.hidden = !!bk.notReg; });
    $$('[data-vin-wrap]').forEach(function (x) { x.hidden = !bk.notReg; });
  }

  function syncControls() {
    $$('[data-bk-set]').forEach(function (inp) {
      var k = inp.getAttribute('data-bk-set');
      if (inp.type === 'radio') inp.checked = String(bk[k]) === inp.value;
      else if (inp.type === 'checkbox') inp.checked = !!bk[k];
      else if (inp.tagName === 'SELECT' && inp.id !== 'model') { if (bk[k]) inp.value = bk[k]; }
      else if (inp.tagName === 'INPUT' && bk[k] && typeof bk[k] === 'string') inp.value = bk[k];
    });
    fillModels();
    if (bk.abroad) $$('select[data-cc-user]').forEach(function (s) { s.value = '+971'; });
    syncShow();
  }
  function fillModels() {
    var sel = $('#model');
    if (!sel) return;
    var list = MODELS[bk.brand] || [];
    if (list.indexOf(bk.model) < 0) bk.model = list[0] || bk.model;
    sel.disabled = false;
    sel.innerHTML = list.map(function (m) {
      var tt = MODEL_TIER[m] || BRAND_TIER[bk.brand] || 'Standard';
      return '<option value="' + esc(m) + '"' + (m === bk.model ? ' selected' : '') + '>' + esc(m) + (bk.service === 'pdi' ? '' : ' · ' + tt) + '</option>';
    }).join('');
  }
  function setService(svc) {
    if (svc !== 'used' && svc !== 'pdi') return;
    var changed = bk.service !== svc;
    bk.service = svc;
    if (changed) { var p = BK_PRESET[svc], k; for (k in p) bk[k] = p[k]; }
    saveBk(bk); syncControls(); renderBk();
  }

  $$('[data-bk-set]').forEach(function (inp) {
    var k = inp.getAttribute('data-bk-set');
    var ev = (inp.tagName === 'INPUT' && (inp.type === 'text' || inp.type === 'search' || !inp.type)) ? 'input' : 'change';
    inp.addEventListener(ev, function () {
      if (inp.type === 'radio' && !inp.checked) return;
      if (k === 'service') { setService(inp.value); return; }
      bk[k] = inp.type === 'checkbox' ? inp.checked : inp.value;
      if (k === 'brand') { bk.model = ''; fillModels(); }
      saveBk(bk); renderBk();
    });
  });
  var modelSel = $('#model');
  if (modelSel) modelSel.addEventListener('change', function () { bk.model = modelSel.value; saveBk(bk); renderBk(); });

  // Deep link: book.html?service=pdi
  try {
    var qs = new URLSearchParams(window.location.search);
    if (qs.get('service')) setService(qs.get('service'));
  } catch (e) { /* old browser */ }

  // Guide chips act inside the flow
  $$('[data-guide]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var a = chip.getAttribute('data-guide'), msg = '';
      if (a === 'pdi') { setService('pdi'); msg = 'Lovely — a new car! I\'ve switched you to New Car PDI: a flat ₹3,999 + GST, about 2 hours at the showroom, and we finish before you sign.'; }
      if (a === 'dealer') { setService('used'); bk.owner = 'dealer'; saveBk(bk); syncControls(); renderBk(); msg = 'Got it — buying from a used-car dealer. On the next step I\'ll ask for the dealership and a sales contact instead of a private seller.'; }
      if (a === 'abroad') { bk.abroad = true; saveBk(bk); syncControls(); renderBk(); msg = 'No problem. I\'ve switched on "My representative" so family can meet the technician, set your number to +971, and you can pay by link from any country.'; }
      $$('[data-guide]').forEach(function (c) { if (c.getAttribute('data-guide') === a) c.setAttribute('aria-pressed', 'true'); });
      var host = chip.closest ? chip.closest('.guide-bubble') : null;
      var out = (host && $('[data-guide-reply]', host)) || $('[data-guide-reply]');
      if (out && msg) { out.textContent = msg; out.hidden = false; }
    });
  });

  // Price example in the plate field
  $$('[data-plate]').forEach(function (inp) { inp.setAttribute('autocapitalize', 'characters'); });

  // Indian plate formatting
  $$('[data-plate]').forEach(function (inp) {
    inp.addEventListener('input', function () {
      var raw = inp.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
      var m = raw.match(/^([A-Z]{0,2})(\d{0,2})([A-Z]{0,3})(\d{0,4})/);
      if (!m) return;
      inp.value = [m[1], m[2], m[3], m[4]].filter(Boolean).join(' ');
    });
  });

  // Slot picker (writes date + session into the booking state)
  $$('[data-slot-picker]').forEach(function (root) {
    var days = $$('.day:not([disabled])', root);
    var sessions = $$('input[name="session"]', root);
    var cont = $$('[data-continue]');
    var picked = { day: '', session: '' };
    function update(announce) {
      var ready = picked.day && picked.session;
      cont.forEach(function (c) { c.setAttribute('aria-disabled', ready ? 'false' : 'true'); });
      if (picked.day) { bk.date = picked.day; }
      if (picked.session) { bk.session = picked.session; }
      if (picked.day || picked.session) { saveBk(bk); renderBk(); }
      if (ready) {
        var lab = picked.day + ', ' + picked.session;
        var prev = store('sdc_hold_label');
        store('sdc_hold_ms', null);
        startHold(lab, prev !== lab);
        if (prev !== lab && announce) toast('Held for you for 10 minutes', lab + ' — no one else can take it while you pay.', 'clock');
      }
    }
    days.forEach(function (dy) {
      dy.addEventListener('click', function () {
        days.forEach(function (x) { x.setAttribute('aria-pressed', x === dy ? 'true' : 'false'); });
        picked.day = dy.getAttribute('data-label') || dy.textContent.trim();
        var sl = $('[data-sessions-for]', root); if (sl) sl.textContent = picked.day;
        update(true);
      });
    });
    sessions.forEach(function (s) {
      s.addEventListener('change', function () { if (s.checked) { picked.session = s.getAttribute('data-label') || s.value; update(true); } });
    });
    update(false);
  });

  /* Inline, persistent field errors (icon + text + aria) */
  function setErr(inp, msg) {
    if (!inp) return true;
    var id = (inp.id || ('f' + Math.random().toString(36).slice(2))) + '-err';
    if (!inp.id) inp.id = id.replace(/-err$/, '');
    var el = d.getElementById(id);
    var desc = (inp.getAttribute('aria-describedby') || '').split(' ').filter(function (x) { return x && x !== id; });
    if (!msg) {
      inp.removeAttribute('aria-invalid');
      if (el && el.parentNode) el.parentNode.removeChild(el);
      if (desc.length) inp.setAttribute('aria-describedby', desc.join(' ')); else inp.removeAttribute('aria-describedby');
      return true;
    }
    inp.setAttribute('aria-invalid', 'true');
    if (!el) {
      el = d.createElement('p'); el.className = 'field-error'; el.id = id;
      var host = (inp.closest && (inp.closest('.consent-row') || inp.closest('.field'))) || inp.parentNode;
      if (host.classList && host.classList.contains('consent-row')) host.insertAdjacentElement('afterend', el); else host.appendChild(el);
    }
    el.innerHTML = ic('alert-c') + '<span>' + esc(msg) + '</span>';
    desc.push(id); inp.setAttribute('aria-describedby', desc.join(' '));
    if (!inp.__errBound) {
      inp.__errBound = true;
      inp.addEventListener(inp.type === 'checkbox' ? 'change' : 'input', function () { setErr(inp, ''); });
    }
    return false;
  }
  function validateRequired(scope) {
    var first = null;
    $$('[required]', scope).forEach(function (inp) {
      var bad = inp.type === 'checkbox' ? !inp.checked : !String(inp.value || '').trim();
      if (!bad && inp.getAttribute('data-min-digits')) bad = (inp.value.replace(/\D/g, '').length < parseInt(inp.getAttribute('data-min-digits'), 10));
      if (bad) { setErr(inp, inp.getAttribute('data-err') || 'Please fill this in.'); if (!first) first = inp; }
      else setErr(inp, '');
    });
    if (first) first.focus();
    return !first;
  }

  /* Hold timer — 10 minutes; 2 hours while a pay-by-link is open */
  var HOLD_MS = 10 * 60 * 1000, LINK_MS = 2 * 60 * 60 * 1000;
  var holdTimer = null;
  var holdMsgs = $$('[data-hold-msg]').map(function (m) { return [m, m.innerHTML]; });
  function fmt(ms) {
    var s = Math.max(0, Math.ceil(ms / 1000)); var h = Math.floor(s / 3600); var m = Math.floor((s % 3600) / 60); s = s % 60;
    return (h ? h + ':' + (m < 10 ? '0' : '') : (m < 10 ? '0' : '')) + m + ':' + (s < 10 ? '0' : '') + s;
  }
  function renderHold() {
    var exp = parseInt(store('sdc_hold_exp') || '0', 10);
    var span = parseInt(store('sdc_hold_ms') || String(HOLD_MS), 10);
    var label = store('sdc_hold_label') || (bk.date + ', ' + bk.session);
    var rem = exp - Date.now();
    var linkMode = span === LINK_MS;
    $$('[data-hold]').forEach(function (h) {
      h.hidden = false;
      var expired = rem <= 0;
      h.classList.toggle('expired', expired);
      var tEl = $('[data-hold-time]', h); if (tEl) tEl.textContent = fmt(rem);
      var r = $('.ring-fill', h); if (r) r.style.setProperty('--p', Math.max(0, rem / span * 100).toFixed(2));
    });
    holdMsgs.forEach(function (pair) {
      var msg = pair[0];
      if (rem <= 0) msg.innerHTML = 'Your hold on <b>' + esc(label) + '</b> has ended. <a class="link-red" style="font-weight:700" href="book-slot.html">Pick a time again</a> — most slots are still open.';
      else if (linkMode) msg.innerHTML = 'Pay by link — we hold <b>' + esc(label) + '</b> for <b>2 hours</b> while the link is open; the link expires with the hold.';
      else msg.innerHTML = pair[1];
    });
    $$('[data-hold-inline]').forEach(function (x) { x.textContent = fmt(rem); });
    $$('[data-hold-label]').forEach(function (x) { x.textContent = label; });
    if (rem <= 0 && holdTimer) { clearInterval(holdTimer); holdTimer = null; }
  }
  function startHold(label, fresh, span) {
    span = span || parseInt(store('sdc_hold_ms') || String(HOLD_MS), 10);
    var exp = parseInt(store('sdc_hold_exp') || '0', 10);
    if (fresh || !exp || exp < Date.now()) store('sdc_hold_exp', String(Date.now() + span));
    if (label) store('sdc_hold_label', label);
    if (holdTimer) clearInterval(holdTimer);
    renderHold();
    holdTimer = setInterval(renderHold, 1000);
  }
  if ($('[data-hold][data-hold-auto]')) startHold(store('sdc_hold_label') || (bk.date + ', ' + bk.session), false);

  // Pay by link switches the hold to 2 hours (and back)
  $$('input[name="pay"]').forEach(function (r) {
    r.addEventListener('change', function () {
      if (!r.checked) return;
      var isLink = r.value === 'link';
      var was = parseInt(store('sdc_hold_ms') || String(HOLD_MS), 10) === LINK_MS;
      if (isLink && !was) { store('sdc_hold_ms', String(LINK_MS)); startHold(null, true, LINK_MS); toast('Slot held for 2 hours', 'The payment link expires with the hold.', 'clock'); }
      if (!isLink && was) { store('sdc_hold_ms', null); startHold(null, true, HOLD_MS); }
      $$('[data-pay-label]').forEach(function (x) { x.textContent = isLink ? 'Send payment link' : x.getAttribute('data-pay-label'); });
    });
  });

  // Payment with inline validation
  $$('[data-pay]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var ok = true, first = null;
      function chk(inp, bad, msg) { if (!inp) return; if (bad) { setErr(inp, msg); ok = false; if (!first) first = inp; } else setErr(inp, ''); }
      var method = ($('input[name="pay"]:checked') || {}).value;
      if (method === 'card') {
        var cn = $('#cn'), ce = $('#ce'), cv = $('#cv');
        chk(cn, cn && !/^\d{12,19}$/.test(cn.value.replace(/\s/g, '')), 'Enter the 12–19 digit card number.');
        chk(ce, ce && !/^(0[1-9]|1[0-2])\s*\/\s*\d{2}$/.test(ce.value.trim()), 'Use MM / YY, for example 08 / 29.');
        chk(cv, cv && !/^\d{3,4}$/.test(cv.value.trim()), 'CVV is 3 or 4 digits.');
      }
      if (method === 'link') {
        var pp = $('#payer');
        chk(pp, pp && pp.value.replace(/\D/g, '').length < 6, 'Add the mobile number that should receive the link.');
      }
      var consent = $('#consent-terms');
      chk(consent, consent && !consent.checked, 'Please tick to agree to the cancellation policy before paying.');
      if (!ok) { if (first) first.focus(); return; }
      var href = btn.getAttribute('href') || 'booking-confirmed.html';
      btn.classList.add('is-loading');
      btn.textContent = method === 'link' ? 'Sending link ' : 'Processing securely ';
      setTimeout(function () { store('sdc_hold_exp', null); store('sdc_hold_ms', null); window.location.href = href; }, 1200);
    });
  });

  // Two-step confirmations inside sheets (cancel, reschedule)
  $$('[data-step-next]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tgt = d.querySelector(btn.getAttribute('data-step-next'));
      var cur = btn.closest ? btn.closest('[data-step-panel]') : null;
      if (tgt) { tgt.hidden = false; var f = tgt.querySelector('button, a, input'); if (f) f.focus(); }
      if (cur) cur.hidden = true;
    });
  });
  $$('[data-revoke]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var li = btn.closest ? btn.closest('li') : null;
      toast('Access removed', btn.getAttribute('data-revoke') + ' can no longer open this link.', 'lock');
      if (li && li.parentNode) li.parentNode.removeChild(li);
    });
  });

  // Language switch (EN · മലയാളം)
  var lang = store('sdc_lang') || 'en';
  function setLang(l, announce) {
    lang = l; store('sdc_lang', l);
    $$('[data-lang]').forEach(function (bt) { bt.setAttribute('aria-pressed', bt.getAttribute('data-lang') === l ? 'true' : 'false'); });
    if (announce) toast(l === 'ml' ? 'മലയാളം selected' : 'English selected', l === 'ml' ? 'This prototype shows English text; the app ships fully in Malayalam.' : '', 'globe');
  }
  $$('[data-lang]').forEach(function (bt) { bt.addEventListener('click', function () { setLang(bt.getAttribute('data-lang'), true); }); });
  setLang(lang, false);

  // Mobile booking summary: the sticky bar opens a summary sheet on every step
  (function summarySheet() {
    var cs = $('.cta-bar .cta-sum');
    var src = $('aside[data-summary] > section');
    if (shell !== 'flow' || !cs || !src) return;
    var clone = src.cloneNode(true);
    $$('[id]', clone).forEach(function (x) { x.removeAttribute('id'); });
    $$('[aria-labelledby]', clone).forEach(function (x) { x.removeAttribute('aria-labelledby'); });
    clone.removeAttribute('aria-labelledby'); clone.style.boxShadow = 'none'; clone.style.border = '0'; clone.style.padding = '0';
    var sh = d.createElement('div');
    sh.className = 'sheet'; sh.id = 'sum-sheet'; sh.setAttribute('role', 'dialog'); sh.setAttribute('aria-modal', 'true'); sh.setAttribute('aria-label', 'Your booking');
    sh.innerHTML = '<div class="sheet-grab"></div><div class="sheet-head"><strong class="h3">Your booking</strong><button class="icon-btn" type="button" data-close-sheet aria-label="Close summary">' + ic('x') + '</button></div>';
    sh.appendChild(clone);
    b.appendChild(sh);
    var btn = d.createElement('button');
    btn.type = 'button'; btn.className = 'cta-sum-btn'; btn.setAttribute('data-sheet', 'sum-sheet');
    btn.innerHTML = cs.innerHTML + '<span class="more">See booking details ' + ic('chev-u', 'i-sm') + '</span>';
    cs.parentNode.replaceChild(btn, cs);
  })();

  syncControls();
  renderBk();

  // Prototype state switch (track.html): milestone states, no live sync
  $$('[data-state-switch]').forEach(function (sw) {
    var btns = $$('[data-state]', sw);
    function apply(state, announce, btn) {
      btns.forEach(function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-state') === state ? 'true' : 'false'); });
      $$('[data-state-panel]').forEach(function (p) { p.hidden = p.getAttribute('data-state-panel') !== state; });
      $$('[data-state-text]').forEach(function (t) {
        var v = t.getAttribute('data-' + state); if (v != null) t.textContent = v;
      });
      if (announce && btn) {
        var parts = (btn.getAttribute('data-state-toast') || '').split('|');
        if (parts[0]) toast(parts[0], parts[1], parts[2] || 'bell');
      }
    }
    btns.forEach(function (bt) {
      bt.addEventListener('click', function () { apply(bt.getAttribute('data-state'), true, bt); });
    });
    var initial = btns.filter(function (x) { return x.getAttribute('aria-pressed') === 'true'; })[0] || btns[0];
    if (initial) apply(initial.getAttribute('data-state'), false);
  });

  // Dynamic island expand
  $$('[data-island-toggle]').forEach(function (btn) {
    var isl = btn.closest ? btn.closest('.island') : null;
    if (!isl) return;
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', on ? 'true' : 'false');
      isl.classList.toggle('expanded', on);
    });
  });

  // Wallet fan
  $$('[data-wallet-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var w = d.querySelector(btn.getAttribute('data-wallet-toggle'));
      if (!w) return;
      var on = !w.classList.contains('fanned');
      w.classList.toggle('fanned', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      var l = $('[data-label]', btn); if (l) l.textContent = on ? 'Stack cards' : 'Spread cards';
    });
  });

  // Wallet: tap a card to bring it to the front
  $$('.wallet .pass').forEach(function (p) {
    p.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('a, button')) return;
      var w = p.parentNode;
      if (!w || w.classList.contains('fanned') || w.lastElementChild === p) return;
      w.appendChild(p);
      if (!reduce && p.animate) p.animate([{ transform: 'translateY(-24px)', opacity: .85 }, { transform: 'none', opacity: 1 }], { duration: 420, easing: 'cubic-bezier(.22,1,.36,1)' });
    });
  });

  // Browse view toggle
  $$('[data-view]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var r = $('.results'); if (!r) return;
      var v = btn.getAttribute('data-view');
      r.classList.toggle('list', v === 'list');
      $$('.car', r).forEach(function (c) { c.classList.toggle('car-row', v === 'list'); });
      $$('[data-view]').forEach(function (x) { x.setAttribute('aria-pressed', x === btn ? 'true' : 'false'); });
    });
  });

  // Preference toggles
  var prefT = null;
  $$('[data-pref] input[type="checkbox"]').forEach(function (inp) {
    inp.addEventListener('change', function () {
      clearTimeout(prefT);
      prefT = setTimeout(function () { toast('Preferences saved', 'We\'ll use these from your next update.', 'bell'); }, 350);
    });
  });

  // Demo forms
  $$('form[data-demo]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateRequired(f)) return;
      var go = f.getAttribute('data-go');
      var parts = (f.getAttribute('data-demo') || 'Sent|').split('|');
      toast(parts[0], parts[1], parts[2] || 'check');
      if (go) setTimeout(function () { window.location.href = go; }, 900);
    });
  });

  // Concierge chat
  $$('[data-chat]').forEach(function (root) {
    var log = $('[data-chat-log]', root);
    if (!log) return;
    function now() { var t = new Date(); var h = t.getHours(), m = t.getMinutes(); var ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return h + ':' + (m < 10 ? '0' : '') + m + ' ' + ap; }
    function add(text, me) {
      var el = d.createElement('div');
      el.className = 'msg' + (me ? ' me' : '');
      el.innerHTML = (me ? '<span class="avatar avatar-sm" aria-hidden="true">AM</span>' : '<span class="meera meera-sm" aria-hidden="true">M</span>') +
        '<div><div class="msg-b">' + esc(text) + '</div><time>' + now() + '</time></div>';
      log.appendChild(el);
      el.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
    }
    function reply(text) {
      var ty = d.createElement('div');
      ty.className = 'msg';
      ty.innerHTML = '<span class="meera meera-sm" aria-hidden="true">M</span><div class="msg-b typing" aria-label="Meera is typing"><i></i><i></i><i></i></div>';
      log.appendChild(ty);
      setTimeout(function () { if (ty.parentNode) ty.parentNode.removeChild(ty); add(text, false); }, 1200);
    }
    $$('[data-reply]', root).forEach(function (c) {
      c.addEventListener('click', function () { add(c.textContent.trim(), true); reply(c.getAttribute('data-reply')); });
    });
    var form = $('[data-chat-form]', root);
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var inp = $('input', form);
        if (!inp || !inp.value.trim()) return;
        add(inp.value.trim(), true); inp.value = '';
        reply('Thanks, Arjun — I\'m on it. I\'ll reply right here within about 2 minutes, and on WhatsApp if you step away.');
      });
    }
  });

  // Reveal on scroll
  var rv = $$('.reveal');
  if (rv.length) {
    d.documentElement.classList.add('reveal-ready');
    setTimeout(function () { rv.forEach(function (x) { x.classList.add('in'); }); }, 2500);
    if ('IntersectionObserver' in window && !reduce) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
      rv.forEach(function (x) { io.observe(x); });
    } else { rv.forEach(function (x) { x.classList.add('in'); }); }
  }

  // Filters sheet on browse (mobile): reuse .filters as sheet
  $$('[data-open-filters]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = $('.filters'); if (!f) return;
      lastFocus = btn;
      f.classList.add('open'); if (scrim) scrim.classList.add('open');
    });
  });
})();
