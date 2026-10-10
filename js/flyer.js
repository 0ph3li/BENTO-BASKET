/* ═══════════════════════════════════════════════════════════
   BENTO & BASKET · the weekly flyer
   one list of deals drives the cover, the deal of the week and the
   flyer pages. coupons and the basket end up on one receipt.
   product names, pictures and shelf prices come from js/catalog.js
   ═══════════════════════════════════════════════════════════ */
(() => {
  const P = window.BB_PRODUCTS;

  // this week's sale prices live in js/catalog.js (the basket drawer uses them too)
  const DEALS = window.BB_DEALS;
  const DOW = 'bubbletea';
  const COVER = ['napa', 'enoki', 'calbee', 'gochujang'];
  const PAGES = [
    { no: '01', name: 'Fresh', zh: '新鮮', c: 'var(--green)', ids: ['napa', 'choysum', 'enoki', 'tofu', 'eggs', 'kimchi', 'dumplings'] },
    { no: '02', name: 'Pantry', zh: '乾貨', c: 'var(--red)', ids: ['mama', 'soba', 'gochujang', 'sesameoil', 'oolong'] },
    { no: '03', name: 'Sweet', zh: '甜', c: 'var(--pink)', ids: ['mochi', 'calbee', 'whiterabbit', 'hellopanda', 'ramune'] },
  ];
  // off: share of the total (only the basket one is worth money)
  const COUPONS = [
    { id: 'bag', big: '−5%', zh: '自備', t: 'Bring your own basket', s: 'the whole receipt, −5%', off: .05, c: 'var(--yellow)' },
    { id: 'ramune', big: 'FREE', zh: '卡拉OK', t: 'One ramune', s: 'karaoke Thursday only, if you sing', c: 'var(--lime)' },
    { id: 'mochi', big: '♥', zh: '貓', t: 'Pet Mochi the cat', s: 'priceless. she decides when', c: 'var(--pink)' },
    { id: 'tue', big: 'TUE', zh: '休息', t: 'Tuesday special', s: 'we are closed. the coupon is too', c: '#fff' },
  ];

  const $ = (s, c = document) => c.querySelector(s);
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const money = (n) => n.toFixed(2);
  // $2.49 → $2.<sup>49</sup>, like the stickers Mei writes
  const tag = (n) => { const [a, b] = money(n).split('.'); return `<sup>$</sup>${a}.<sub>${b}</sub>`; };
  const burst = '<svg viewBox="0 0 200 200" aria-hidden="true"><polygon class="burst-shape" points=""/></svg>';
  const pic = (id, cls = '') => `<figure class="slot cut ${cls}" data-img="img/${P[id].img}" data-alt="${esc(P[id].name)}"><span class="ph"><b>${esc(P[id].name)}</b></span></figure>`;

  /* ═════════════ cover: four starbursts on the sky ═════════════ */
  $('#fcPicks').innerHTML = COVER.map((id, i) => `
    <button class="pick" type="button" data-id="${id}" style="--i:${i}" aria-label="Add ${esc(P[id].name)} to the basket, $${money(DEALS[id].now)}">
      <span class="pick-in">
        <span class="pick-burst">${burst}</span>
        ${pic(id, 'pick-pic')}
        <span class="pick-price">${tag(DEALS[id].now)}</span>
        <span class="pick-zh zh">${P[id].zh}</span>
      </span>
    </button>`).join('');

  /* ═════════════ deal of the week ═════════════ */
  const dow = P[DOW], dd = DEALS[DOW];
  $('#dow').innerHTML = `
    <div class="dow-ticker" aria-hidden="true"><div class="ticker-track"><span>DEAL OF THE WEEK ★ 本週特價 ★</span><span>DEAL OF THE WEEK ★ 本週特價 ★</span><span>DEAL OF THE WEEK ★ 本週特價 ★</span></div></div>
    <div class="dow-in deal" data-id="${DOW}">
      <div class="dow-txt">
        <p class="kicker mono">this week only · Bao's idea</p>
        <h2 class="dow-name">${esc(dow.name)}</h2>
        <p class="dow-zh zh">${dow.zh}</p>
        <p class="dow-copy">Brown sugar pearls for five cups. Bao made one for every customer on Saturday and now everyone wants the kit. <b>Ask him for the karaoke version.</b></p>
        <button class="deal-add btn btn--ink" type="button">+ basket <i aria-hidden="true">→</i></button>
      </div>
      <div class="dow-pic">
        <span class="dow-burst">${burst}</span>
        ${pic(DOW, 'deal-pic')}
        <p class="dow-price"><s class="mono">was $${money(dd.was)}</s><span>${tag(dd.now)}</span></p>
      </div>
    </div>`;

  /* ═════════════ the flyer pages ═════════════ */
  $('#boardPages').innerHTML = PAGES.map((pg) => `
    <div class="page" style="--c:${pg.c}">
      <h3 class="page-bar"><i class="mono">${pg.no}</i><span>${pg.name}</span><span class="zh">${pg.zh}</span></h3>
      <div class="page-grid">
        ${pg.ids.map((id, j) => { const d = DEALS[id], p = P[id]; return `
        <article class="tile deal" data-id="${id}" style="--j:${j}">
          ${d.tag ? `<span class="tile-tag script">${esc(d.tag)}</span>` : ''}
          <span class="tile-burst">${burst}</span>
          ${pic(id, 'deal-pic')}
          <p class="tile-price">${tag(d.now)}${p.unit ? `<small>${p.unit}</small>` : ''}</p>
          <p class="tile-was mono">was $${money(d.was)} · save ${Math.round((1 - d.now / d.was) * 100)}%</p>
          <h4 class="tile-name">${esc(p.name)} <span class="zh">${p.zh}</span></h4>
          <button class="deal-add mono" type="button">+ basket</button>
        </article>`; }).join('')}
      </div>
    </div>`).join('');

  /* ═════════════ coupons ═════════════ */
  $('#cpnsRow').innerHTML = COUPONS.map((c, i) => `
    <button class="cpn" type="button" data-id="${c.id}" aria-pressed="false" style="--c:${c.c};--r:${[-3, 2, -1.5, 3][i]}deg">
      <span class="cpn-card"><span class="cpn-in">
        <b class="cpn-big">${c.big}</b>
        <span class="cpn-zh zh">${c.zh}</span>
        <span class="cpn-t">${esc(c.t)}</span>
        <span class="cpn-s mono">${esc(c.s)}</span>
        <span class="cpn-cta mono"><i aria-hidden="true">✂</i> <span>clip it</span></span>
      </span>
      <span class="cpn-stamp mono" aria-hidden="true">clipped</span></span>
    </button>`).join('');

  /* ═════════════ behaviour (needs main.js) ═════════════ */
  document.addEventListener('DOMContentLoaded', () => {
    const { $$, motion, hasGsap } = window.BB;
    const B = window.BB.basket;

    // week number on the cover strip
    // the week, the receipt and its clock are all New York time
    const now = window.BB.nyNow(), jan = new Date(now.getFullYear(), 0, 1);
    const wk = Math.ceil(((now - jan) / 864e5 + jan.getDay() + 1) / 7);
    const mon = new Date(now); mon.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    const sun = new Date(mon); sun.setDate(mon.getDate() + 6);
    const d = (x) => `${x.getDate()} ${x.toLocaleString('en', { month: 'short' }).toUpperCase()}`;
    $('#fcWeek').textContent = `WEEK ${wk} · ${d(mon)} — ${d(sun)}`;

    // deals reset every Sunday at 8 PM
    const cb = $$('b', $('#fcCount'));
    const next = () => {
      // Sunday 8 PM in New York, like everything else at the shop
      const t = window.BB.nyNow(); t.setDate(t.getDate() + ((7 - t.getDay()) % 7)); t.setHours(20, 0, 0, 0);
      if (t <= window.BB.nyNow()) t.setDate(t.getDate() + 7);
      return t;
    };
    let target = next();
    const tick = () => {
      const s = Math.max(0, Math.floor((target - window.BB.nyNow()) / 1000));
      if (!s) target = next();
      [Math.floor(s / 86400), Math.floor(s / 3600) % 24, Math.floor(s / 60) % 60, s % 60].forEach((n, i) => { cb[i].textContent = String(n).padStart(2, '0'); });
    };
    tick(); setInterval(tick, 1000);

    /* ---------- + basket: the product flies into the basket ---------- */
    // only on the svg: the burst wrappers are placed with CSS translate, which GSAP would overwrite
    const pop = (el) => { if (hasGsap && motion && el) gsap.fromTo(el, { scale: 1.25 }, { scale: 1, duration: .6, ease: 'elastic.out(1, .4)' }); };
    const labels = () => $$('.deal').forEach((card) => {
      const n = B.count(card.dataset.id), btn = $('.deal-add', card);
      btn.classList.toggle('is-added', n > 0);
      btn.firstChild.textContent = n ? `in basket ×${n} ` : '+ basket ';
    });
    $$('.deal').forEach((card) => {
      $('.deal-add', card).addEventListener('click', () => {
        window.BB.fly($('figure', card), card.dataset.id);
        pop($('.tile-burst svg, .dow-burst svg', card));
      });
    });
    $$('.pick').forEach((b) => b.addEventListener('click', () => { window.BB.fly($('figure', b), b.dataset.id); pop($('.pick-burst', b)); }));

    /* ---------- coupons: clipped ones are kept on this device ---------- */
    const CK = 'bb-coupons';
    let clipped = [];
    try { clipped = JSON.parse(localStorage.getItem(CK)) || []; } catch (e) { /* no storage, no memory */ }
    const saveC = () => { try { localStorage.setItem(CK, JSON.stringify(clipped)); } catch (e) { /* fine */ } };
    const paintC = () => $$('.cpn').forEach((c) => {
      const on = clipped.includes(c.dataset.id);
      c.classList.toggle('is-clipped', on); c.setAttribute('aria-pressed', on);
      $('.cpn-cta span', c).textContent = on ? 'on your receipt' : 'clip it';
    });
    $$('.cpn').forEach((c) => c.addEventListener('click', () => {
      const id = c.dataset.id, on = !clipped.includes(id);
      clipped = on ? [...clipped, id] : clipped.filter((x) => x !== id);
      saveC(); paintC(); receipt();
      if (hasGsap && motion && on) gsap.fromTo(c, { rotation: 14, scale: .9 }, { rotation: 0, scale: 1, duration: .8, ease: 'elastic.out(1, .4)' });
    }));
    paintC();

    /* ---------- the receipt ---------- */
    const rcpt = $('#rcpt');
    const price = (id) => (DEALS[id] ? DEALS[id].now : parseFloat(P[id].price));
    const pad = (l, r, w = 32) => esc(l) + ' '.repeat(Math.max(1, w - l.length - r.length)) + esc(r);
    // Mei reads every receipt
    const meiSays = (ids, items) => {
      if (!items) return 'an empty basket? Mochi is sleeping in it.';
      if (ids.some((id) => ['chilicrisp', 'rayu', 'gochujang', 'sichuan', 'ramyun'].includes(id))) return 'so much chili. drink some mugicha.';
      if (ids.includes('horoyoi')) return 'Horoyoi? for the guests, I\'m sure.';
      if (items > 25) return 'you need Bao to carry this.';
      if (ids.every((id) => P[id] && ['greens', 'fresh'].includes(P[id].aisle))) return 'all fresh. your grandma would be proud.';
      return 'good choices. see you Sunday.';
    };
    function receipt() {
      const all = B.all();
      const ids = Object.keys(all).filter((id) => P[id]);
      const items = ids.reduce((a, id) => a + all[id], 0);
      let sub = 0, saved = 0;
      const rows = ids.map((id) => {
        const p = P[id], n = all[id], line = price(id) * n;
        sub += line;
        if (DEALS[id]) saved += (DEALS[id].was - DEALS[id].now) * n;
        return `
          <li class="rl" data-id="${id}">
            <span class="rl-name">${esc(p.name)}${DEALS[id] ? ' <em>SALE</em>' : ''}</span>
            <span class="rl-qty"><button type="button" data-q="-1" aria-label="One less ${esc(p.name)}">−</button><b>${n}</b><button type="button" data-q="1" aria-label="One more ${esc(p.name)}">+</button></span>
            <span class="rl-sum">${money(line)}</span>
          </li>`;
      }).join('');
      const cps = COUPONS.filter((c) => clipped.includes(c.id));
      const off = cps.reduce((a, c) => a + (c.off ? sub * c.off : 0), 0);
      saved += off;
      const total = sub - off;
      const no = String(Math.floor(now / 1000) % 100000).padStart(5, '0');
      rcpt.innerHTML = `
        <i class="rc-teeth rc-teeth--top"></i>
        <p class="rc-logo">BENTO<i>&amp;</i>BASKET</p>
        <p class="rc-sub mono">便當與菜籃 · 88 Lantern Ln<br>Chinatown, New York, NY 10013<br>☎ (212) 555-0188 · since 1988</p>
        <p class="rc-meta mono"><span>${now.toLocaleDateString('en-GB')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}</span><span>till 01 · Mei</span><span>#${no}</span></p>
        <p class="rc-dash" aria-hidden="true">- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</p>
        ${items ? `<ul class="rc-rows">${rows}</ul>` : `<div class="rc-empty"><p class="script">nothing yet!</p><p class="mono">tap “+ basket” on the flyer, the aisles or a recipe card.</p></div>`}
        ${cps.length ? `<p class="rc-dash" aria-hidden="true">- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</p>
        <ul class="rc-cps mono">${cps.map((c) => `<li><span>✂ ${esc(c.t)}</span><span>${c.off ? '−' + money(sub * c.off) : '0.00'}</span></li>`).join('')}</ul>` : ''}
        <p class="rc-dash" aria-hidden="true">- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</p>
        <pre class="rc-sums mono">${pad('ITEMS', String(items))}
${pad('SUBTOTAL', money(sub))}
${saved > 0 ? pad('YOU SAVED', money(saved)) + '\n' : ''}</pre>
        <p class="rc-total"><span>TOTAL</span><b>$${money(total)}</b></p>
        <p class="rc-mei script">${esc(meiSays(ids, items))} — Mei</p>
        <div class="rc-bar" aria-hidden="true"></div>
        <p class="rc-thanks mono">THANK YOU · COME AGAIN<br><span class="zh">謝謝光臨</span></p>
        <i class="rc-teeth"></i>`;
      labels();
    }
    rcpt.addEventListener('click', (e) => {
      const b = e.target.closest('[data-q]'); if (!b) return;
      const id = b.closest('.rl').dataset.id;
      if (+b.dataset.q > 0) B.add(id); else B.remove(id);
    });
    $('#bkClear').addEventListener('click', () => {
      if (!Object.keys(B.all()).length) return;
      if (hasGsap && motion) gsap.fromTo(rcpt, { rotation: -4 }, { rotation: 0, duration: .8, ease: 'elastic.out(1.2, .3)' });
      B.clear();
    });
    window.addEventListener('bb:basket', receipt);
    // another tab (the aisles, a recipe) filled the basket
    window.addEventListener('storage', (e) => { if (e.key === 'bb-basket') location.reload(); });
    receipt();

    /* ---------- motion ---------- */
    if (!hasGsap || !motion) return;
    gsap.set('.fc-sale > span', { yPercent: -130, rotation: () => gsap.utils.random(-30, 30) });
    gsap.set('.fc-zh > span', { scale: 0 });
    gsap.set('.pick', { scale: 0, rotation: -60 });
    gsap.set('.fc-mei', { yPercent: 40, opacity: 0 });
    window.addEventListener('bb:ready', () => {
      gsap.timeline()
        .to('.fc-sale > span', { yPercent: 0, rotation: 0, duration: 1, ease: 'bounce.out', stagger: .08 }, .1)
        .to('.fc-zh > span', { scale: 1, duration: .7, ease: 'back.out(3)', stagger: .09 }, .2)
        .to('.fc-mei', { yPercent: 0, opacity: 1, duration: .9, ease: 'back.out(1.4)' }, .5)
        .to('.pick', { scale: 1, rotation: 0, duration: .9, ease: 'elastic.out(1, .5)', stagger: .1, clearProps: 'transform' }, .7)
        .from('.fc-foot > *, .fc-strip', { y: 30, opacity: 0, duration: .6, stagger: .08, ease: 'power3.out' }, .9);
    }, { once: true });

    // the clouds drift with the scroll
    gsap.to('.c1, .c3', { xPercent: 30, ease: 'none', scrollTrigger: { trigger: '.fc', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.c2, .c4', { xPercent: -30, ease: 'none', scrollTrigger: { trigger: '.fc', start: 'top top', end: 'bottom top', scrub: true } });

    // reveal: hidden until the section shows up, then played once and cleaned up, so the CSS
    // hovers keep working. it also plays when a jump (#basket) skips straight past the section
    const reveal = (targets, trigger, from, start = 'top 80%') => {
      const els = gsap.utils.toArray(targets); if (!els.length) return;
      gsap.set(els, { opacity: 0 });
      let done = false;
      const play = () => {
        if (done) return; done = true;
        gsap.fromTo(els, { ...from, opacity: 0 }, { x: 0, y: 0, xPercent: 0, rotation: 0, scale: 1, opacity: 1, duration: from.duration || .8, ease: from.ease || 'power3.out', stagger: from.stagger || 0, clearProps: 'transform,opacity' });
      };
      const st = ScrollTrigger.create({ trigger, start, once: true, onEnter: play, onLeave: play, onEnterBack: play });
      if (st.progress > 0) play();
    };
    reveal('.dow-name, .dow-zh, .dow-copy, .dow-txt .btn', '.dow', { y: 50, stagger: .08 });
    reveal('.dow-pic', '.dow', { scale: .4, rotation: -25, duration: 1.1, ease: 'elastic.out(1, .55)' });
    $$('.page').forEach((pg) => {
      reveal($('.page-bar', pg), pg, { xPercent: -30 }, 'top 85%');
      reveal($$('.tile', pg), pg, { y: 80, scale: .8, rotation: () => gsap.utils.random(-10, 10), ease: 'back.out(1.7)', stagger: .06 }, 'top 75%');
    });
    reveal('.cpn', '.cpns-row', { y: 100, rotation: () => gsap.utils.random(-20, 20), duration: .9, ease: 'back.out(1.6)', stagger: .08 }, 'top 85%');
    // the receipt prints, line by line
    let printed = false;
    const print = () => { if (printed) return; printed = true; gsap.fromTo(rcpt, { clipPath: 'inset(-20px -20px 100% -20px)' }, { clipPath: 'inset(-20px -20px -20px -20px)', duration: 1.6, ease: 'steps(18)', clearProps: 'clipPath' }); };
    const pst = ScrollTrigger.create({ trigger: '.rcpt-wrap', start: 'top 75%', once: true, onEnter: print, onLeave: print, onEnterBack: print });
    if (pst.progress > 0) print();
  });
})();
