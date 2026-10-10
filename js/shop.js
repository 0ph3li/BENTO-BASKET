/* ═══════════════════════════════════════════════════════════
   BENTO & BASKET · the shop, on every page
   skip link, after-hours lights (New York time), the basket drawer,
   Mochi asleep somewhere, and karaoke Thursday.
   needs main.js (window.BB) and catalog.js (products, prices)
   ═══════════════════════════════════════════════════════════ */
(() => {
  const BB = window.BB; if (!BB) return;
  const { $, $$, motion, hasGsap } = BB;
  const P = window.BB_PRODUCTS || {}, DEALS = window.BB_DEALS || {};
  const price = (id) => (window.BB_PRICE ? window.BB_PRICE(id) : parseFloat(P[id].price));
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const money = (n) => n.toFixed(2);
  const store = {
    get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode: forget it */ } },
  };
  const make = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const lenis = (on) => { if (BB.lenis) on ? BB.lenis.start() : BB.lenis.stop(); };
  const hdrR = $('.hdr-r'), bskt = $('#bskt');

  /* ═════════════ accessibility: skip link, current page ═════════════ */
  const main = $('main');
  if (main) {
    main.id = main.id || 'content'; main.tabIndex = -1;
    const skip = make(`<a class="skip" href="#${main.id}">Skip to content</a>`);
    skip.addEventListener('click', (e) => { e.preventDefault(); main.focus({ preventScroll: true }); BB.scrollTo('#' + main.id); });
    document.body.prepend(skip);
  }
  $$('.nav a, .menu-list a, .ftr-nav a').forEach((a) => { if (new URL(a.href, location.href).pathname === location.pathname) a.setAttribute('aria-current', 'page'); });

  /* ═════════════ after hours: the lights follow New York ═════════════ */
  const MODES = ['auto', 'day', 'night'];
  // one switch in the header, a twin in the phone menu (the header has no room there)
  const lightBtn = () => make('<button class="lights" type="button"><span class="lights-i" aria-hidden="true"></span><span class="lights-t mono"></span></button>');
  const switches = [];
  if (hdrR) { const b = lightBtn(); hdrR.prepend(b); switches.push(b); }
  const menuFoot = $('.menu-foot');
  if (menuFoot) { const b = lightBtn(); b.classList.add('lights--menu'); menuFoot.prepend(b); switches.push(b); }
  const badge = make(`<p class="night-badge" aria-hidden="true"><b class="zh">打烊</b><span class="mono">after hours</span><small class="mono"></small></p>`);
  document.body.appendChild(badge);
  const paintLights = () => {
    const mode = store.get('bb-lights', 'auto'), now = BB.nyNow(), s = BB.status(now);
    const night = mode === 'night' || (mode === 'auto' && !s.open);
    document.body.classList.toggle('is-night', night);
    switches.forEach((b) => {
      $('.lights-i', b).textContent = night ? '☾' : '☀';
      $('.lights-t', b).textContent = b.classList.contains('lights--menu') ? `lights: ${mode}` : mode;
      b.setAttribute('aria-label', `Lights: ${mode}${mode === 'auto' ? ` (the shop is ${s.open ? 'open' : 'closed'} in New York)` : ''}. Change`);
      b.title = mode === 'auto' ? 'lights follow the shop: dark when it\'s closed in New York' : `lights forced ${mode}`;
    });
    $('small', badge).textContent = `it's ${BB.fmt12(now.getHours() * 60 + now.getMinutes())} in New York`;
  };
  switches.forEach((b) => b.addEventListener('click', () => {
    store.set('bb-lights', MODES[(MODES.indexOf(store.get('bb-lights', 'auto')) + 1) % MODES.length]);
    paintLights();
  }));
  paintLights(); setInterval(paintLights, 30000);

  /* ═════════════ the basket drawer ═════════════ */
  const drw = make(`
    <div class="drw" hidden>
      <div class="drw-bg" data-x></div>
      <aside class="drw-p" role="dialog" aria-modal="true" aria-labelledby="drwT">
        <header class="drw-h">
          <h2 id="drwT">Your basket <span class="zh">菜籃</span></h2>
          <button class="drw-x" type="button" data-x aria-label="Close the basket">×</button>
        </header>
        <div class="drw-body"></div>
        <i class="rc-teeth"></i>
      </aside>
    </div>`);
  document.body.appendChild(drw);
  const body = $('.drw-body', drw);
  let drwOpen = false, lastFocus = null;
  const renderDrawer = () => {
    const all = BB.basket.all(), ids = Object.keys(all).filter((id) => P[id]);
    const items = ids.reduce((a, id) => a + all[id], 0);
    if (!items) {
      body.innerHTML = `
        <div class="drw-empty">
          <p class="script">it's empty!</p>
          <p>Mochi is sleeping in it. Tap “+ basket” anywhere on the site to wake her up.</p>
          <a class="btn btn--ink" href="aisles.html">Walk the aisles <i aria-hidden="true">→</i></a>
        </div>`;
      return;
    }
    let sub = 0, saved = 0;
    const rows = ids.map((id) => {
      const p = P[id], n = all[id], line = price(id) * n;
      sub += line; if (DEALS[id]) saved += (DEALS[id].was - DEALS[id].now) * n;
      return `
        <li class="drw-row" data-id="${id}">
          <img src="img/${p.img}" alt="" loading="lazy">
          <span class="drw-name">${esc(p.name)}${DEALS[id] ? ' <em>SALE</em>' : ''}<small class="zh">${p.zh}</small></span>
          <span class="drw-qty"><button type="button" data-q="-1" aria-label="One less ${esc(p.name)}">−</button><b>${n}</b><button type="button" data-q="1" aria-label="One more ${esc(p.name)}">+</button></span>
          <span class="drw-sum mono">${money(line)}</span>
        </li>`;
    }).join('');
    // the −5% coupon from the flyer counts here too
    const off = store.get('bb-coupons', []).includes('bag') ? sub * .05 : 0;
    saved += off;
    body.innerHTML = `
      <ul class="drw-list">${rows}</ul>
      <div class="drw-foot">
        <p class="drw-line mono"><span>${items} item${items === 1 ? '' : 's'}</span><span>${money(sub)}</span></p>
        ${off ? `<p class="drw-line mono"><span>✂ own basket −5%</span><span>−${money(off)}</span></p>` : ''}
        ${saved > 0 ? `<p class="drw-line drw-saved mono"><span>you saved</span><span>${money(saved)}</span></p>` : ''}
        <p class="drw-total"><span class="mono">TOTAL</span><b>$${money(sub - off)}</b></p>
        <div class="drw-btns">
          <a class="btn btn--red" href="flyer.html#basket" data-receipt>Print the receipt <i aria-hidden="true">→</i></a>
          <button class="drw-empty-btn mono" type="button" data-clear>empty it</button>
        </div>
      </div>`;
  };
  const trap = (e) => {
    if (e.key === 'Escape') return closeDrawer();
    if (e.key !== 'Tab') return;
    const f = $$('a[href], button', drw).filter((x) => x.offsetParent);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  };
  function openDrawer() {
    if (drwOpen) return; drwOpen = true; lastFocus = document.activeElement;
    renderDrawer(); drw.hidden = false; void drw.offsetWidth; drw.classList.add('is-open');
    document.body.classList.add('drawer-open'); lenis(false);
    document.addEventListener('keydown', trap);
    setTimeout(() => $('.drw-x', drw).focus(), 50);
  }
  function closeDrawer() {
    if (!drwOpen) return; drwOpen = false;
    drw.classList.remove('is-open'); document.body.classList.remove('drawer-open'); lenis(true);
    document.removeEventListener('keydown', trap);
    setTimeout(() => { if (!drwOpen) drw.hidden = true; }, 450);
    if (lastFocus) lastFocus.focus();
  }
  if (bskt) {
    bskt.setAttribute('aria-haspopup', 'dialog');
    // capture: beats main.js, which would scroll or wipe to the flyer
    bskt.addEventListener('click', (e) => { e.preventDefault(); e.stopImmediatePropagation(); openDrawer(); }, true);
  }
  drw.addEventListener('click', (e) => {
    if (e.target.closest('[data-x]')) return closeDrawer();
    const q = e.target.closest('[data-q]');
    if (q) { const id = q.closest('.drw-row').dataset.id; +q.dataset.q > 0 ? BB.basket.add(id) : BB.basket.remove(id); return; }
    if (e.target.closest('[data-clear]')) { BB.basket.clear(); return; }
    // already on the flyer: just close and scroll down to the receipt
    if (e.target.closest('[data-receipt]') && document.body.dataset.page === 'flyer') { e.preventDefault(); closeDrawer(); BB.scrollTo('#basket'); }
  });
  window.addEventListener('bb:basket', () => { if (drwOpen) renderDrawer(); });

  /* ═════════════ Mochi, asleep somewhere on the page ═════════════ */
  const PERCHES = ['.rcard', '.tile', '.prod-tag', '.tag', '.note', '.kn', '.cpn-card', '.deal', '.o-rcpt', '.rcpt', '.pol', '.page-bar', '.map-paper', '.hrs-list', '.fr-sign', '.vi-receipt', '.polaroid', '.fl-info', '.o-map', '.sun-big', '.next-big', '.bye-big'];
  // a calico curled up asleep, head on her paws, tail wrapped round the front
  const CAT = `
    <svg viewBox="0 0 160 104" aria-hidden="true">
      <defs>
        <clipPath id="mcBody"><path d="M24,90 C18,56 50,30 94,30 C134,31 152,58 146,90Z"/></clipPath>
        <clipPath id="mcHead"><ellipse cx="46" cy="64" rx="31" ry="26"/></clipPath>
      </defs>
      <ellipse cx="84" cy="96" rx="66" ry="6" class="mc-shadow"/>
      <path d="M24,90 C18,56 50,30 94,30 C134,31 152,58 146,90Z" class="mc-white"/>
      <g clip-path="url(#mcBody)">
        <path d="M66,26 C100,18 132,38 136,64 C116,58 96,52 82,58 C72,48 62,38 66,26Z" class="mc-orange"/>
        <path d="M112,38 C138,42 156,66 152,92 L124,92 C126,72 120,54 112,38Z" class="mc-black"/>
      </g>
      <path d="M24,90 C18,56 50,30 94,30 C134,31 152,58 146,90Z" class="mc-line"/>
      <path class="mc-tail-o" d="M142,86 C146,100 92,102 64,94"/>
      <path class="mc-tail" d="M142,86 C146,100 92,102 64,94"/>
      <path class="mc-tail-tip" d="M84,99 C76,98 70,97 64,94"/>
      <path d="M20,50 L16,24 L40,40Z" class="mc-black mc-ear"/>
      <path d="M22,44 L20,31 L33,40Z" class="mc-inner"/>
      <path d="M52,38 L70,20 L74,46Z" class="mc-orange mc-ear"/>
      <path d="M57,39 L68,27 L70,43Z" class="mc-inner"/>
      <ellipse cx="46" cy="64" rx="31" ry="26" class="mc-white"/>
      <g clip-path="url(#mcHead)">
        <path d="M12,66 C10,44 26,34 42,38 C40,50 30,58 12,66Z" class="mc-black"/>
        <path d="M48,36 C66,34 80,50 78,66 C66,60 56,52 48,36Z" class="mc-orange"/>
      </g>
      <ellipse cx="46" cy="64" rx="31" ry="26" class="mc-line"/>
      <ellipse cx="38" cy="89" rx="11" ry="6" class="mc-white mc-line mc-paw"/>
      <ellipse cx="58" cy="90" rx="11" ry="6" class="mc-white mc-line mc-paw"/>
      <ellipse cx="27" cy="73" rx="6" ry="3.5" class="mc-blush"/>
      <ellipse cx="65" cy="73" rx="6" ry="3.5" class="mc-blush"/>
      <path d="M28,65 q5,4.5 10,0 M54,65 q5,4.5 10,0" class="mc-eye mc-shut"/>
      <g class="mc-open"><ellipse cx="33" cy="64" rx="4" ry="5"/><ellipse cx="59" cy="64" rx="4" ry="5"/><circle cx="34.5" cy="62" r="1.4" class="mc-glint"/><circle cx="60.5" cy="62" r="1.4" class="mc-glint"/></g>
      <path d="M43.5,70 h5 l-2.5,3z" class="mc-nose"/>
      <path d="M42,75 q2,2.5 4,0 q2,2.5 4,0" class="mc-mouth"/>
      <path d="M22,70 L6,67 M22,74 L7,76 M70,70 L86,67 M70,74 L85,76" class="mc-whisk"/>
    </svg>
    <span class="mc-z" aria-hidden="true"><i>z</i><i>z</i><i>Z</i></span>
    <span class="mc-say script" aria-live="polite"></span>`;
  const placeMochi = () => {
    const spots = PERCHES.flatMap((s) => $$(s)).filter((el) => {
      const r = el.getBoundingClientRect();
      return el.offsetParent && r.width > 150 && getComputedStyle(el).overflow === 'visible' && !el.closest('.drw, .modal, .menu, .wipe');
    });
    if (!spots.length) return;
    // a different spot every visit
    const last = store.get('bb-mochi-spot', -1);
    let i = Math.floor(Math.random() * spots.length);
    if (spots.length > 1 && i === last) i = (i + 1) % spots.length;
    store.set('bb-mochi-spot', i);
    const perch = spots[i];
    if (getComputedStyle(perch).position === 'static') perch.style.position = 'relative';
    const cat = make(`<button class="mochi" type="button" aria-label="Mochi the cat is asleep here. Wake her up?">${CAT}</button>`);
    cat.style.setProperty('--x', `${10 + Math.random() * 55}%`);
    perch.appendChild(cat);
    const SAYS = ['mrrp?', '…five more minutes', 'hssss (joking)', 'is it dinner?', 'Mei! someone woke me'];
    cat.addEventListener('click', (e) => {
      e.stopPropagation(); e.preventDefault();
      if (cat.classList.contains('is-awake')) return;
      const n = store.get('bb-mochi-woken', 0) + 1; store.set('bb-mochi-woken', n);
      $('.mc-say', cat).textContent = n > 4 && n % 5 === 0 ? `woken ${n} times. Mei is watching.` : SAYS[Math.floor(Math.random() * SAYS.length)];
      cat.classList.add('is-awake');
      cat.setAttribute('aria-label', 'Mochi is awake now');
      setTimeout(() => cat.classList.add('is-leaving'), 1500);
      setTimeout(() => cat.remove(), 2600);
    });
  };
  // after the page has built itself (shelves, cards, the album). without motion the page
  // is ready before this file even loads, so don't wait for an event that already happened
  if (document.body.classList.contains('is-loading')) window.addEventListener('bb:ready', () => setTimeout(placeMochi, 900), { once: true });
  else window.addEventListener('load', () => setTimeout(placeMochi, 300), { once: true });

  /* ═════════════ karaoke Thursday ═════════════ */
  // an original song, by Bao. one note per word
  const SONG = [
    { w: ['Under', 'the', 'green', 'sign', 'on', 'Lantern', 'Lane'], n: [64, 64, 67, 69, 67, 64, 62], root: 48 },
    { w: ['Bao', 'makes', 'the', 'soup', 'and', 'Mei', 'tastes', 'it', 'again'], n: [60, 62, 64, 67, 64, 62, 60, 62, 64], root: 45 },
    { w: ['Less', 'salt,', 'less', 'salt,', 'the', 'whole', 'block', 'knows'], n: [69, 67, 69, 67, 64, 67, 69, 72], root: 41 },
    { w: ['Mochi', 'is', 'sleeping', 'so', 'sing', 'it', 'low'], n: [72, 69, 67, 64, 62, 60, 60], root: 43 },
    { w: ['Thank', 'you,', 'come', 'again,', '謝謝', '光臨!'], n: [67, 69, 72, 69, 67, 72], root: 48 },
  ];
  const BEAT = .46;
  const kk = make(`
    <div class="kk" role="dialog" aria-modal="true" aria-label="Karaoke Thursday" hidden>
      <div class="kk-lights" aria-hidden="true"></div>
      <p class="kk-ball" aria-hidden="true">🪩</p>
      <p class="kk-top mono">卡拉OK · karaoke Thursday · Bao on vocals, Mei on tambourine</p>
      <div class="kk-lyrics">
        <p class="kk-line kk-prev"></p>
        <p class="kk-line kk-now"><span class="kk-words"></span></p>
        <p class="kk-line kk-next"></p>
      </div>
      <p class="kk-score script" hidden></p>
      <div class="kk-btns">
        <button class="btn btn--yellow kk-again" type="button" hidden>Sing it again <i aria-hidden="true">↺</i></button>
        <button class="kk-x mono" type="button">stop ■ <small>esc</small></button>
      </div>
    </div>`);
  document.body.appendChild(kk);
  let ctx, timers = [], kkOn = false;
  const note = (midi, t, dur, type, vol) => {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.value = 440 * 2 ** ((midi - 69) / 12);
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + dur + .05);
  };
  const lineHTML = (l) => l ? l.w.map((w) => `<span>${esc(w)}</span>`).join(' ') : '';
  const sing = () => {
    timers.forEach(clearTimeout); timers = [];
    $('.kk-score', kk).hidden = true; $('.kk-again', kk).hidden = true;
    try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); if (ctx.state === 'suspended') ctx.resume(); } catch (e) { ctx = null; }
    let at = .4;
    SONG.forEach((line, li) => {
      const start = at, len = line.w.length + 2;
      timers.push(setTimeout(() => {
        $('.kk-prev', kk).innerHTML = lineHTML(SONG[li - 1]);
        // the bouncing dot lives inside the line, so it can sit over each word
        $('.kk-words', kk).innerHTML = lineHTML(line) + '<i class="kk-dot" aria-hidden="true"></i>';
        $('.kk-next', kk).innerHTML = lineHTML(SONG[li + 1]);
      }, start * 1000 - 200));
      line.w.forEach((w, wi) => {
        const t = start + wi * BEAT;
        timers.push(setTimeout(() => {
          const spans = $$('.kk-words span', kk), sp = spans[wi]; if (!sp) return;
          spans.forEach((s, k) => s.classList.toggle('is-sung', k <= wi));
          const dot = $('.kk-dot', kk);
          dot.style.transform = `translate(${sp.offsetLeft + sp.offsetWidth / 2}px, ${sp.offsetTop}px)`;
          dot.classList.remove('is-hop'); void dot.offsetWidth; dot.classList.add('is-hop');
        }, t * 1000));
      });
      if (ctx) {
        const t0 = ctx.currentTime;
        line.n.forEach((m, wi) => note(m, t0 + start + wi * BEAT, BEAT * .9, 'square', .05));
        for (let b = 0; b < len; b++) note(line.root - (b % 2 ? 0 : 12) + 12, t0 + start + b * BEAT, BEAT * .8, 'triangle', .12);
        [0, 4, 7].forEach((iv) => note(line.root + 12 + iv, t0 + start, len * BEAT, 'sine', .025));
      }
      at += len * BEAT;
    });
    timers.push(setTimeout(() => {
      $('.kk-prev', kk).innerHTML = ''; $('.kk-words', kk).innerHTML = ''; $('.kk-next', kk).innerHTML = '';
      const sc = $('.kk-score', kk);
      sc.textContent = ['Mei: 10/10. Bao: 7/10, too loud.', 'Mochi woke up. that\'s a standing ovation.', 'the regulars want an encore!'][Math.floor(Math.random() * 3)];
      sc.hidden = false; $('.kk-again', kk).hidden = false; $('.kk-again', kk).focus();
    }, at * 1000 + 300));
  };
  const kkKey = (e) => { if (e.key === 'Escape') stopKaraoke(); };
  function startKaraoke() {
    if (kkOn) return; kkOn = true;
    if (drwOpen) closeDrawer();
    kk.hidden = false; void kk.offsetWidth; kk.classList.add('is-on');
    document.body.classList.add('karaoke-on'); lenis(false);
    document.addEventListener('keydown', kkKey);
    $('.kk-x', kk).focus();
    sing();
  }
  function stopKaraoke() {
    if (!kkOn) return; kkOn = false;
    timers.forEach(clearTimeout); timers = [];
    if (ctx) { ctx.close(); ctx = null; }
    kk.classList.remove('is-on'); document.body.classList.remove('karaoke-on'); lenis(true);
    document.removeEventListener('keydown', kkKey);
    setTimeout(() => { if (!kkOn) kk.hidden = true; }, 400);
  }
  $('.kk-x', kk).addEventListener('click', stopKaraoke);
  $('.kk-again', kk).addEventListener('click', sing);
  // the secret: type "karaoke" anywhere (not in a text field)
  let typed = '';
  document.addEventListener('keydown', (e) => {
    if (e.target.closest('input, textarea') || e.key.length !== 1) return;
    typed = (typed + e.key.toLowerCase()).slice(-7);
    if (typed === 'karaoke') startKaraoke();
  });
  // or click anything marked for it (the neon sign in the album)
  document.addEventListener('click', (e) => { if (e.target.closest('[data-karaoke]')) startKaraoke(); });
  document.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target.closest && e.target.closest('[data-karaoke]')) { e.preventDefault(); startKaraoke(); } });
  // and on Thursday nights, after closing, the shop invites you
  const ny = BB.nyNow();
  if (ny.getDay() === 4 && ny.getHours() * 60 + ny.getMinutes() >= 1230 && !sessionStorage.getItem('bb-kk-asked')) {
    const toast = make(`<div class="kk-toast" role="status"><span class="zh">卡拉OK</span><p>It's karaoke night at the shop!</p><button class="btn btn--yellow" type="button">Sing 🎤</button><button class="kk-toast-x" type="button" aria-label="No thanks">×</button></div>`);
    document.body.appendChild(toast);
    try { sessionStorage.setItem('bb-kk-asked', '1'); } catch (e) { /* ask again, fine */ }
    $('.btn', toast).addEventListener('click', () => { toast.remove(); startKaraoke(); });
    $('.kk-toast-x', toast).addEventListener('click', () => toast.remove());
  }
  BB.karaoke = startKaraoke;
})();
