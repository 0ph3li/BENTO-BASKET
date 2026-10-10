/* ═══════════════════════════════════════════════════════════
   BENTO & BASKET · shared
   smooth scroll, header, menu, wipe transitions, image slots,
   opening hours, starbursts, basket counter
   ═══════════════════════════════════════════════════════════ */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  const BB = window.BB = {
    $, $$,
    // ?still in the address = no motion, every animation already finished (for screenshots and the reel)
    motion: !matchMedia('(prefers-reduced-motion: reduce)').matches && !/[?&]still\b/.test(location.search),
    hasGsap: typeof window.gsap !== 'undefined',
  };
  if (BB.hasGsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  // every visit starts at the front door (the loader and the pinned soup expect the top)
  // (ScrollTrigger keeps its own scroll memory and would put it back to 'auto')
  if (BB.hasGsap && window.ScrollTrigger) ScrollTrigger.clearScrollMemory('manual');
  else if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (!location.hash) window.scrollTo(0, 0);
  BB.toTop = () => { if (location.hash) return; window.scrollTo(0, 0); if (BB.lenis) BB.lenis.scrollTo(0, { immediate: true, force: true }); };
  window.addEventListener('load', () => BB.toTop());

  /* ---------- smooth scroll ---------- */
  if (BB.motion && window.Lenis && BB.hasGsap) {
    const lenis = BB.lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    if (document.body.classList.contains('is-loading')) lenis.stop();
  }
  BB.scrollTo = (target) => {
    if (BB.lenis) BB.lenis.scrollTo(target, { duration: 1.4 });
    else window.scrollTo({ top: typeof target === 'number' ? target : $(target).offsetTop, behavior: 'smooth' });
  };
  $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
    const id = a.getAttribute('href'); if (id.length < 2 || !$(id)) return;
    e.preventDefault(); BB.scrollTo(id);
  }));

  /* ---------- header: hides going down, comes back going up ---------- */
  const hdr = $('#hdr');
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (!document.body.classList.contains('menu-open')) {
      if (y > 260 && y > lastY + 2) hdr.classList.add('is-hidden');
      else if (y < lastY - 2 || y < 260) hdr.classList.remove('is-hidden');
    }
    lastY = y;
  }, { passive: true });

  /* ---------- starbursts ---------- */
  BB.burst = (poly, spikes = 18, inner = .78) => {
    const pts = [];
    for (let i = 0; i < spikes * 2; i++) {
      const a = (Math.PI * i) / spikes - Math.PI / 2;
      const r = i % 2 ? 100 * inner - (i % 4 === 1 ? 6 : 0) : 96;
      pts.push((100 + Math.cos(a) * r).toFixed(1) + ',' + (100 + Math.sin(a) * r).toFixed(1));
    }
    poly.setAttribute('points', pts.join(' '));
  };
  $$('.burst-shape').forEach((p, i) => BB.burst(p, 14 + (i % 3) * 3, .76 + (i % 2) * .04));

  /* ---------- menu (phones and tablets) ---------- */
  const menu = $('#menu'), menuBtn = $('#menuBtn');
  const menuLinks = $$('.menu-list a', menu);
  let menuOpen = false;
  const setMenu = (open) => {
    menuOpen = open;
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
    hdr.classList.remove('is-hidden');
    if (BB.lenis) open ? BB.lenis.stop() : BB.lenis.start();
    if (!BB.hasGsap || !BB.motion) {
      menu.style.visibility = open ? 'visible' : 'hidden';
      menu.style.clipPath = open ? 'none' : '';
      return;
    }
    gsap.killTweensOf([menu, menuLinks]);
    if (open) {
      gsap.set(menu, { visibility: 'visible' });
      gsap.to(menu, { clipPath: 'circle(150% at calc(100% - 50px) 40px)', duration: .8, ease: 'expo.inOut' });
      gsap.fromTo(menuLinks, { yPercent: 120, rotation: 4, opacity: 0 }, { yPercent: 0, rotation: 0, opacity: 1, duration: .7, ease: 'back.out(1.6)', stagger: .05, delay: .2 });
    } else {
      gsap.to(menu, { clipPath: 'circle(0% at calc(100% - 50px) 40px)', duration: .6, ease: 'expo.inOut', onComplete: () => gsap.set(menu, { visibility: 'hidden' }) });
    }
  };
  menuBtn.addEventListener('click', () => setMenu(!menuOpen));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menuOpen) setMenu(false); });

  /* ---------- wipe: links cover the page, the next page uncovers itself ---------- */
  const wipe = $('#wipe'), wa = $('.wipe-a', wipe), wb = $('.wipe-b', wipe);
  BB.wipeOut = (delay = 0) => {
    if (!BB.hasGsap || !BB.motion) return Promise.resolve();
    return new Promise((res) => {
      gsap.timeline({ delay, onComplete: () => { gsap.set(wipe, { visibility: 'hidden' }); res(); } })
        .to(wa, { yPercent: -100, duration: .9, ease: 'expo.inOut' }, 0)
        .to(wb, { yPercent: -100, duration: .9, ease: 'expo.inOut' }, .1);
    });
  };
  $$('a[href$=".html"], a[href*=".html#"]').forEach((a) => a.addEventListener('click', (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    const url = new URL(a.href, location.href);
    if (url.pathname === location.pathname) {
      if (menuOpen) { e.preventDefault(); setMenu(false); if (url.hash) setTimeout(() => BB.scrollTo(url.hash), 500); }
      return;
    }
    if (!BB.hasGsap || !BB.motion) return;
    e.preventDefault();
    wipe.classList.add('is-leaving');
    gsap.set(wipe, { visibility: 'visible' });
    gsap.timeline({ onComplete: () => { location.href = a.href; } })
      .fromTo(wb, { yPercent: 100 }, { yPercent: 0, duration: .6, ease: 'expo.inOut' }, 0)
      .fromTo(wa, { yPercent: 100 }, { yPercent: 0, duration: .6, ease: 'expo.inOut' }, .08);
  }));
  window.addEventListener('pageshow', (e) => { if (e.persisted && BB.hasGsap) gsap.set(wipe, { visibility: 'hidden' }); });
  // inner pages: just uncover (the home runs its own count first)
  if (document.body.dataset.page !== 'home') {
    BB.wipeOut(.1).then(() => {
      document.body.classList.remove('is-loading');
      if (BB.lenis) BB.lenis.start();
      window.dispatchEvent(new Event('bb:ready'));
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });
    if (!BB.hasGsap || !BB.motion) document.body.classList.remove('is-loading');
  }

  /* ---------- image slots: drop a file at data-img and it shows up ---------- */
  const waiting = [];
  $$('.slot').forEach((slot) => {
    // only the home holds its images back while the loader counts
    if (document.body.dataset.page === 'home' && document.body.classList.contains('is-loading') && !slot.closest('#hero')) waiting.push(slot);
    else slotInit(slot);
  });
  if (waiting.length) {
    let done = false;
    const release = () => { if (done) return; done = true; waiting.forEach(slotInit); };
    window.addEventListener('bb:ready', release, { once: true });
    setTimeout(release, 6000);
  }
  function slotInit(slot) {
    if (slot.dataset.ratio) slot.style.setProperty('--ratio', slot.dataset.ratio.replace('/', ' / '));
    const src = slot.dataset.img; if (!src || slot.dataset.init) return;
    slot.dataset.init = '1';
    const img = new Image();
    img.decoding = 'async';
    img.alt = slot.dataset.alt || '';
    img.draggable = false;
    img.onload = () => {
      slot.prepend(img);
      slot.classList.add('has-img');
      if (BB.hasGsap && window.ScrollTrigger) ScrollTrigger.refresh();
    };
    img.src = src;
  }
  BB.slot = slotInit;

  /* ---------- opening hours ---------- */
  // [open, close] in minutes, null = closed. Sunday = 0
  const HOURS = { 0: [600, 1080], 1: [510, 1230], 2: null, 3: [510, 1230], 4: [510, 1230], 5: [510, 1290], 6: [510, 1290] };
  // New York clocks: 8:30 AM, not 08:30
  const fmt = (m) => { const h = Math.floor(m / 60); return `${((h + 11) % 12) + 1}:${String(m % 60).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`; };
  BB.fmt12 = fmt;
  const DAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  BB.HOURS = HOURS;
  // the shop runs on New York time, wherever you're reading from
  BB.nyNow = () => new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
  BB.status = (now = BB.nyNow()) => {
    const d = now.getDay(), m = now.getHours() * 60 + now.getMinutes(), h = HOURS[d];
    if (h && m >= h[0] && m < h[1]) return { open: true, short: 'open till ' + fmt(h[1]), long: 'OPEN · TILL ' + fmt(h[1]) };
    if (h && m < h[0]) return { open: false, short: 'opens at ' + fmt(h[0]), long: 'CLOSED · OPENS ' + fmt(h[0]) };
    if (d === 2) return { open: false, short: 'closed, Bao is fishing', long: 'CLOSED · GONE FISHING' };
    let n = (d + 1) % 7; while (!HOURS[n]) n = (n + 1) % 7;
    const when = n === (d + 1) % 7 ? 'tomorrow' : DAY[n].toLowerCase();
    return { open: false, short: 'back ' + when + ' ' + fmt(HOURS[n][0]), long: 'CLOSED · BACK ' + when.toUpperCase() + ' ' + fmt(HOURS[n][0]) };
  };
  const paintToday = () => $$('.js-today').forEach((n) => { n.textContent = 'today: ' + BB.status().short; });
  paintToday(); setInterval(paintToday, 30000);

  /* ---------- basket counter (kept on this device only) ---------- */
  const KEY = 'bb-basket';
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const write = (b) => { try { localStorage.setItem(KEY, JSON.stringify(b)); } catch (e) { /* private mode: lives for this page only */ } };
  const basket = read();
  const countEl = $('#bsktCount'), bskt = $('#bskt');
  // bb:basket tells the page (the flyer's receipt) that something changed
  const paintBasket = () => { countEl.textContent = Object.values(basket).reduce((a, b) => a + b, 0); window.dispatchEvent(new Event('bb:basket')); };
  BB.basket = {
    el: bskt,
    add(id) {
      basket[id] = (basket[id] || 0) + 1; write(basket); paintBasket();
      bskt.classList.remove('is-bump'); bskt.offsetWidth; bskt.classList.add('is-bump');
    },
    count: (id) => basket[id] || 0,
    remove(id) {
      if (!basket[id]) return;
      if (--basket[id] <= 0) delete basket[id];
      write(basket); paintBasket();
    },
    clear() { Object.keys(basket).forEach((k) => delete basket[k]); write(basket); paintBasket(); },
    all: () => ({ ...basket }),
  };
  // a copy of the product flies into the basket in the header, then it counts
  BB.fly = (fig, id, done) => {
    hdr.classList.remove('is-hidden');
    if (!BB.hasGsap || !BB.motion) { BB.basket.add(id); if (done) done(); return; }
    const r = fig.getBoundingClientRect(), to = bskt.getBoundingClientRect();
    const fly = fig.cloneNode(true);
    fly.classList.add('flyer-fly');
    Object.assign(fly.style, { position: 'fixed', zIndex: 700, pointerEvents: 'none', left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px', margin: 0 });
    document.body.appendChild(fly);
    const dx = to.left + to.width / 2 - (r.left + r.width / 2), dy = to.top + to.height / 2 - (r.top + r.height / 2);
    gsap.timeline({ onComplete: () => { fly.remove(); BB.basket.add(id); if (done) done(); } })
      .to(fly, { x: dx, duration: .8, ease: 'power1.in' }, 0)
      .to(fly, { y: dy, duration: .8, ease: 'back.in(1.6)' }, 0)
      .to(fly, { scale: .12, rotation: 540, duration: .8, ease: 'power2.in' }, 0);
  };
  paintBasket();

  /* ---------- tickers loop seamlessly ---------- */
  $$('.ticker-track').forEach((t) => { t.innerHTML += t.innerHTML; });
})();
