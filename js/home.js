/* ═══════════════════════════════════════════════════════════
   BENTO & BASKET · home
   count-up loader → yellow poster with draggable snacks →
   Uncle Bao's soup (pinned) → flyer → aisles → owners → visit
   ═══════════════════════════════════════════════════════════ */
(() => {
  const { $, $$, motion, hasGsap } = window.BB;
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs = {}, parent) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  };
  // small seeded random, so the drawings look the same on every visit
  const rng = (seed) => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

  /* ═════════════ the green basket, drawn top-down ═════════════ */
  (function drawBasket(svg) {
    if (!svg) return;
    const defs = el('defs', {}, svg);
    const mask = el('mask', { id: 'bkHoles', maskUnits: 'userSpaceOnUse', x: 0, y: 0, width: 600, height: 470 }, defs);
    el('rect', { x: 0, y: 0, width: 600, height: 470, fill: '#fff' }, mask);
    // floor: a grid of rounded slots
    for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) el('rect', { x: 138 + c * 38, y: 120 + r * 27, width: 24, height: 12, rx: 6, fill: '#000' }, mask);
    // walls: slots that follow the perspective, rim → floor
    const slot = (x1, y1, x2, y2) => el('line', { x1: x1 + (x2 - x1) * .2, y1: y1 + (y2 - y1) * .2, x2: x1 + (x2 - x1) * .78, y2: y1 + (y2 - y1) * .78, stroke: '#000', 'stroke-width': 12, 'stroke-linecap': 'round' }, mask);
    for (let i = 0; i < 12; i++) {
      const t = (i + .5) / 12;
      slot(36 + t * 528, 36, 120 + t * 360, 105);
      slot(36 + t * 528, 434, 120 + t * 360, 365);
    }
    for (let j = 0; j < 9; j++) {
      const t = (j + .5) / 9;
      slot(36, 36 + t * 398, 120, 105 + t * 260);
      slot(564, 36 + t * 398, 480, 105 + t * 260);
    }
    const body = el('g', { mask: 'url(#bkHoles)' }, svg);
    el('polygon', { points: '36,36 564,36 480,105 120,105', fill: '#33C963' }, body);
    el('polygon', { points: '36,36 120,105 120,365 36,434', fill: '#22B04B' }, body);
    el('polygon', { points: '564,36 564,434 480,365 480,105', fill: '#1A9C43' }, body);
    el('polygon', { points: '120,365 480,365 564,434 36,434', fill: '#14883A' }, body);
    el('rect', { x: 118, y: 103, width: 364, height: 264, rx: 14, fill: '#1FA749' }, body);
    // rim + handles
    el('rect', { x: 28, y: 28, width: 544, height: 414, rx: 38, fill: 'none', stroke: '#2BC25A', 'stroke-width': 20 }, svg);
    el('rect', { x: 19, y: 19, width: 562, height: 432, rx: 46, fill: 'none', stroke: '#0f6b37', 'stroke-width': 3 }, svg);
    el('rect', { x: 37, y: 37, width: 526, height: 396, rx: 30, fill: 'none', stroke: '#0f6b37', 'stroke-width': 2, 'stroke-opacity': .6 }, svg);
    el('rect', { x: 26, y: 24, width: 548, height: 6, rx: 3, fill: '#fff', 'fill-opacity': .45 }, svg);
    [[2, 180], [568, 180]].forEach(([x, y]) => {
      el('rect', { x, y, width: 30, height: 110, rx: 15, fill: '#1A9C43', stroke: '#0f6b37', 'stroke-width': 3 }, svg);
      el('rect', { x: x + 9, y: y + 14, width: 12, height: 82, rx: 6, fill: '#0f6b37', 'fill-opacity': .5 }, svg);
    });
    const t = el('text', { x: 300, y: 33, 'text-anchor': 'middle', 'font-family': 'Space Mono, monospace', 'font-weight': 700, 'font-size': 10, 'letter-spacing': 3, fill: '#0f6b37', 'fill-opacity': .7 }, svg);
    t.textContent = 'BENTO & BASKET · PLEASE RETURN ME';
  })($('#basketSvg'));

  /* ═════════════ the finished soup, drawn until RECIPE/dish.png exists ═════════════ */
  (function drawDish(svg) {
    if (!svg) return;
    const r = rng(88);
    const defs = el('defs', {}, svg);
    const g1 = el('radialGradient', { id: 'brothGrad', cx: '45%', cy: '40%', r: '65%' }, defs);
    el('stop', { offset: '0', 'stop-color': '#D2733A' }, g1);
    el('stop', { offset: '.7', 'stop-color': '#A4481F' }, g1);
    el('stop', { offset: '1', 'stop-color': '#7A3012' }, g1);
    const cp = el('clipPath', { id: 'brothClip' }, defs);
    el('circle', { cx: 200, cy: 200, r: 166 }, cp);

    el('circle', { cx: 200, cy: 200, r: 198, fill: '#fff' }, svg);
    el('circle', { cx: 200, cy: 200, r: 189, fill: 'none', stroke: '#1E3BD8', 'stroke-width': 6 }, svg);
    el('circle', { cx: 200, cy: 200, r: 181, fill: 'none', stroke: '#1E3BD8', 'stroke-width': 2 }, svg);
    el('circle', { cx: 200, cy: 200, r: 176, fill: '#E9E2D4' }, svg);
    el('circle', { cx: 200, cy: 200, r: 166, fill: 'url(#brothGrad)' }, svg);
    const soup = el('g', { 'clip-path': 'url(#brothClip)' }, svg);

    // chili oil
    for (let i = 0; i < 46; i++) {
      const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 160;
      el('circle', { cx: 200 + Math.cos(a) * d, cy: 200 + Math.sin(a) * d, r: 2 + r() * 7, fill: '#FF8A1F', 'fill-opacity': .35 + r() * .35 }, soup);
    }
    // noodles: long lazy curves
    for (let i = 0; i < 11; i++) {
      const y0 = 70 + r() * 260, x0 = 30 + r() * 40;
      const d = `M${x0} ${y0} C ${120 + r() * 40} ${y0 - 60 + r() * 120}, ${220 + r() * 40} ${y0 - 60 + r() * 120}, ${370 - r() * 30} ${y0 - 30 + r() * 60}`;
      el('path', { d, fill: 'none', stroke: '#B88A4E', 'stroke-width': 10, 'stroke-linecap': 'round' }, soup);
      el('path', { d, fill: 'none', stroke: '#F6E2B0', 'stroke-width': 6.5, 'stroke-linecap': 'round' }, soup);
    }
    // tomato wedges
    for (let i = 0; i < 3; i++) {
      const a = 2.2 + i * .9, cx = 200 + Math.cos(a) * 112, cy = 200 + Math.sin(a) * 112;
      const w = el('g', { transform: `translate(${cx} ${cy}) rotate(${a * 57 + 90})` }, soup);
      el('path', { d: 'M-26 0 A26 26 0 0 0 26 0 Z', fill: '#E8361E', stroke: '#171311', 'stroke-width': 3 }, w);
      el('path', { d: 'M-16 4 A16 14 0 0 0 16 4 Z', fill: '#FF8A6A' }, w);
    }
    // beef chunks
    for (let i = 0; i < 7; i++) {
      const a = -.6 + i * .62, d = 74 + r() * 36, cx = 200 + Math.cos(a) * d, cy = 200 + Math.sin(a) * d;
      const pts = [];
      const n = 7, base = 24 + r() * 8;
      for (let k = 0; k < n; k++) { const aa = (k / n) * Math.PI * 2, rr = base * (.75 + r() * .4); pts.push((cx + Math.cos(aa) * rr).toFixed(1) + ',' + (cy + Math.sin(aa) * rr * .8).toFixed(1)); }
      el('polygon', { points: pts.join(' '), fill: '#6E3B22', stroke: '#3a1d0e', 'stroke-width': 3, 'stroke-linejoin': 'round' }, soup);
      el('path', { d: `M${cx - 10} ${cy - 6} q 8 -6 18 0`, fill: 'none', stroke: '#A8673D', 'stroke-width': 4, 'stroke-linecap': 'round' }, soup);
    }
    // bok choy halves
    [[262, 138, -30], [150, 262, 140], [282, 266, 60]].forEach(([x, y, rot]) => {
      const b = el('g', { transform: `translate(${x} ${y}) rotate(${rot})` }, soup);
      el('ellipse', { cx: -16, cy: 0, rx: 46, ry: 24, fill: '#2F9E44', stroke: '#171311', 'stroke-width': 3 }, b);
      el('path', { d: 'M-50 0 Q -16 -8 18 0', fill: 'none', stroke: '#9fe07a', 'stroke-width': 3 }, b);
      el('ellipse', { cx: 26, cy: 0, rx: 26, ry: 15, fill: '#EAF6D6', stroke: '#171311', 'stroke-width': 3 }, b);
    });
    // star anise
    const sa = el('g', { transform: 'translate(118 150) rotate(12)' }, soup);
    for (let k = 0; k < 8; k++) el('ellipse', { cx: 0, cy: -12, rx: 5.5, ry: 12, fill: '#5A2A14', stroke: '#2a1206', 'stroke-width': 1.5, transform: `rotate(${k * 45})` }, sa);
    el('circle', { cx: 0, cy: 0, r: 4, fill: '#C98A4A' }, sa);
    // scallion rings on top
    for (let i = 0; i < 34; i++) {
      const a = r() * Math.PI * 2, d = 20 + r() * 130;
      el('circle', { cx: 200 + Math.cos(a) * d, cy: 200 + Math.sin(a) * d, r: 4 + r() * 3, fill: '#B6EB7A', stroke: '#3C8C2A', 'stroke-width': 2.2 }, soup);
    }
    // glossy broth highlight
    el('ellipse', { cx: 150, cy: 120, rx: 70, ry: 26, fill: '#fff', 'fill-opacity': .12, transform: 'rotate(-30 150 120)' }, svg);
    // red chopsticks resting across
    const cs = el('g', { transform: 'rotate(-28 200 200)' }, svg);
    [[-6, 0], [12, 10]].forEach(([dy, dx]) => {
      el('rect', { x: -40 + dx, y: 96 + dy, width: 480, height: 11, rx: 5.5, fill: '#EE3524', stroke: '#171311', 'stroke-width': 3 }, cs);
      el('rect', { x: 340 + dx, y: 96 + dy, width: 100, height: 11, rx: 5.5, fill: '#FFD83D', stroke: '#171311', 'stroke-width': 3 }, cs);
    });
  })($('#dishArt'));

  /* ═════════════ Uncle Bao's soup: the ingredients ═════════════ */
  // x/y = desktop position in % of the stage, mx/my = phones and tablets
  const INGS = [
    { id: 'beef', file: 'beef-shank-recipe.webp', name: 'Beef shank', zh: '牛腱', price: 8.90, x: 13, y: 44, mx: 14, my: 37, note: 'ask Bao for the good cut' },
    { id: 'noodles', file: 'wheat-noodles-recipe.webp', name: 'Wheat noodles', zh: '麵條', price: 2.20, x: 36, y: 38, mx: 38, my: 34, note: 'fresh, never instant' },
    { id: 'bokchoy', file: 'bok-choy-recipe.webp', name: 'Bok choy', zh: '青江菜', price: 1.80, x: 62, y: 39, mx: 62, my: 37 },
    { id: 'doubanjiang', file: 'chili-bean-paste-recipe.png.webp', name: 'Chili bean paste', zh: '豆瓣醬', price: 3.40, x: 87, y: 45, mx: 86, my: 34, note: 'the spicy one!' },
    { id: 'staranise', file: 'star-anise-recipe.webp', name: 'Star anise', zh: '八角', price: 1.20, x: 9, y: 74, mx: 14, my: 55, note: 'only 2!! — Mei' },
    { id: 'ginger', file: 'ginger-recipe.webp', name: 'Ginger', zh: '薑', price: 0.90, x: 24, y: 66, mx: 38, my: 53 },
    { id: 'tomato', file: 'tomato-recipe.webp', name: 'Tomato', zh: '番茄', price: 0.80, x: 76, y: 66, mx: 62, my: 56 },
    { id: 'scallion', file: 'scallion-recipe.webp', name: 'Scallion', zh: '蔥', price: 0.70, x: 91, y: 74, mx: 86, my: 53 },
  ];
  const TOTAL = INGS.reduce((a, i) => a + i.price, 0);
  const stage = $('#spStage');
  const ingWrap = $('#spIngs');
  const splash = $('#splash');
  $('#spTotal').textContent = INGS.length;

  INGS.forEach((d, i) => {
    const n = document.createElement('div');
    n.className = 'ing';
    n.innerHTML =
      `<figure class="slot cut" data-img="img/RECIPE/${d.file}" data-alt="${d.name}"><span class="ph"><b>${d.name.replace(' ', '<br>')}</b></span></figure>` +
      `<p class="ing-tag" style="--tr:${i % 2 ? 3 : -3}deg"><b>${d.name}</b><span class="zh">${d.zh}</span><em>$${d.price.toFixed(2)}</em></p>` +
      (d.note ? `<span class="ing-note">${d.note}</span>` : '');
    ingWrap.appendChild(n);
    d.el = n;
    d.fig = n.querySelector('figure');
    d.tag = n.querySelector('.ing-tag');
    d.noteEl = n.querySelector('.ing-note');
    d.drops = [...Array(5)].map(() => { const s = document.createElement('i'); s.className = 'drop'; splash.appendChild(s); return s; });
    window.BB.slot(d.fig);
  });
  const isNarrow = () => window.innerWidth < 900;
  const placeIngs = () => INGS.forEach((d) => {
    d.el.style.left = (isNarrow() ? d.mx : d.x) + '%';
    d.el.style.top = (isNarrow() ? d.my : d.y) + '%';
  });
  placeIngs();

  /* ═════════════ LOADER · red panel, logo, count to 100 ═════════════ */
  const finishLoading = () => {
    window.BB.toTop();
    document.body.classList.remove('is-loading');
    if (window.BB.lenis) window.BB.lenis.start();
    window.dispatchEvent(new Event('bb:ready'));
    if (hasGsap && window.ScrollTrigger) ScrollTrigger.refresh();
  };

  if (!hasGsap || !motion) {
    finishLoading();
  } else {
    const countEl = $('#wipeCount'), msgEl = $('#wipeMsg');
    const MSGS = ['stocking the shelves', 'waking up Uncle Bao', 'feeding Mochi', 'counting the change', 'open!'];
    const c = { v: 0 };
    let seen = false;
    try { seen = sessionStorage.getItem('bb-seen') === '1'; sessionStorage.setItem('bb-seen', '1'); } catch (e) { /* no storage: full count */ }
    gsap.set('.wl > span', { yPercent: 110 });
    gsap.set('.wipe-sub, .wipe-msg', { opacity: 0 });
    const tl = gsap.timeline();
    tl.to('.wl > span', { yPercent: 0, duration: .8, ease: 'expo.out', stagger: .1 }, 0)
      .to('.wipe-sub, .wipe-msg', { opacity: 1, duration: .4 }, .3)
      .to(c, {
        v: 100, duration: 1.5, ease: 'power2.inOut',
        onUpdate: () => {
          countEl.textContent = String(Math.round(c.v)).padStart(3, '0');
          msgEl.textContent = MSGS[Math.min(MSGS.length - 1, Math.floor(c.v / 100 * (MSGS.length - 1) + .001))];
        },
      }, .1)
      .to({}, { duration: .15 });
    tl.timeScale(seen ? 1.8 : 1);
    // the CJK font comes in many slices: wait for it, but never more than a beat
    const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
    new Promise((res) => tl.eventCallback('onComplete', res))
      .then(() => Promise.race([fonts, new Promise((res) => setTimeout(res, 900))]))
      .then(() => {
        gsap.to('.wl > span, .wipe-sub, .wipe-msg, .wipe-count', { yPercent: -60, opacity: 0, duration: .45, ease: 'power3.in', stagger: .03 });
        window.BB.wipeOut(.3).then(finishLoading);
        gsap.delayedCall(.75, heroIntro);
      });
  }

  /* ═════════════ HERO ═════════════ */
  // titles break into letters
  $$('.ht-in').forEach((h) => {
    const frag = document.createDocumentFragment();
    [...h.childNodes].forEach((n) => {
      if (n.nodeType === 3) [...n.textContent].forEach((ch) => { const s = document.createElement('span'); s.className = 'ch'; s.textContent = ch; frag.appendChild(s); });
      else { n.classList.add('ch'); frag.appendChild(n); }
    });
    h.textContent = ''; h.appendChild(frag);
  });
  const hero = $('#hero');
  const items = $$('.hb-item');

  if (hasGsap && motion) {
    gsap.set('.ht .ch', { yPercent: 110, rotation: () => gsap.utils.random(-25, 25), opacity: 0 });
    gsap.set('#heroBasket', { scale: .5, rotation: -14, opacity: 0, yPercent: 30 });
    gsap.set('.hb-item, .ptag, .burst--since', { scale: 0 });
    gsap.set('.auntie', { yPercent: 120 });
    gsap.set('.hero-copy, .hero-meta, .hero-hint', { opacity: 0, y: 20 });
  }

  function heroIntro() {
    const tl = gsap.timeline();
    tl.to('.ht--a .ch', { yPercent: 0, rotation: 0, opacity: 1, duration: .9, stagger: .05, ease: 'back.out(2)' }, 0)
      .to('.ht--b .ch', { yPercent: 0, rotation: 0, opacity: 1, duration: .9, stagger: .04, ease: 'back.out(2)' }, .15)
      .to('#heroBasket', { scale: 1, rotation: 0, opacity: 1, yPercent: 0, duration: 1.1, ease: 'elastic.out(1, .6)' }, .25)
      .to('.hb-item', { scale: 1, duration: .6, stagger: { each: .07, from: 'random' }, ease: 'back.out(2.6)' }, .6)
      .to('.ptag', { scale: 1, duration: .5, stagger: .1, ease: 'back.out(3)' }, .95)
      .to('.burst--since', { scale: 1, duration: .8, ease: 'elastic.out(1, .45)' }, .9)
      .to('.auntie', { yPercent: 0, duration: .9, ease: 'back.out(1.4)' }, .8)
      .to('.hero-copy, .hero-meta, .hero-hint', { opacity: 1, y: 0, duration: .6, ease: 'power3.out', stagger: .08 }, 1);
  }

  // drag the snacks out of the basket (and throw them around a bit)
  items.forEach((it) => {
    let down = false, sx = 0, sy = 0, ox = 0, oy = 0, lx = 0;
    it.addEventListener('pointerdown', (e) => {
      if (!hasGsap) return;
      down = true; it.setPointerCapture(e.pointerId);
      sx = e.clientX; sy = e.clientY; lx = e.clientX;
      ox = gsap.getProperty(it, 'x'); oy = gsap.getProperty(it, 'y');
      gsap.killTweensOf(it, 'x,y,rotation');
      it.classList.add('is-drag');
    });
    it.addEventListener('pointermove', (e) => {
      if (!down) return;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      gsap.set(it, { x: ox + dx, y: oy + dy });
      gsap.to(it, { rotation: gsap.utils.clamp(-30, 30, (e.clientX - lx) * 1.5), duration: .3, overwrite: 'auto' });
      lx = e.clientX;
      if (Math.abs(dx) + Math.abs(dy) > 6) hero.classList.add('is-messy');
    });
    const up = () => {
      if (!down) return;
      down = false; it.classList.remove('is-drag');
      gsap.to(it, { rotation: 0, duration: 1, ease: 'elastic.out(1, .35)' });
    };
    it.addEventListener('pointerup', up);
    it.addEventListener('pointercancel', up);
  });
  $('#heroReset').addEventListener('click', () => {
    hero.classList.remove('is-messy');
    if (hasGsap) gsap.to(items, { x: 0, y: 0, rotation: 0, duration: .9, ease: 'back.out(1.5)', stagger: .05 });
  });

  // pointer parallax on the big type, the badge and Auntie
  if (hasGsap && motion && matchMedia('(hover: hover)').matches) {
    const movers = $$('#hero [data-depth]').map((n) => ({
      d: +n.dataset.depth,
      x: gsap.quickTo(n, 'x', { duration: 1, ease: 'power3.out' }),
      y: gsap.quickTo(n, 'y', { duration: 1, ease: 'power3.out' }),
    }));
    hero.addEventListener('pointermove', (e) => {
      const nx = e.clientX / window.innerWidth - .5, ny = e.clientY / window.innerHeight - .5;
      movers.forEach((m) => { m.x(nx * m.d * 1.5); m.y(ny * m.d); });
    });
  }

  /* ═════════════ THE HOUSE SPECIAL · pinned timeline ═════════════ */
  const bowl = $('#bowl'), back = $('.bowl-back'), front = $('.bowl-front'), steam = $('.steam');
  const broth = $('#broth'), dish = $('#dish'), rcpt = $('#rcpt'), pops = $$('.pop');
  const stepEl = $('#spStep'), stepTxt = $('#spStepTxt'), countEl = $('#spCount'), totEl = $('#rcptTot'), replay = $('#spReplay');

  const mouth = () => ({ x: bowl.offsetLeft, y: bowl.offsetTop + bowl.offsetHeight * (44 / 200), h: bowl.offsetHeight });

  if (hasGsap && window.ScrollTrigger) {
    gsap.set(INGS.map((d) => d.el), { xPercent: -50, yPercent: -50 });
    gsap.set(dish, { clipPath: 'circle(0% at 50% 62%)' });
    gsap.set(pops, { scale: 0 });

    const INTRO = 1.2, GAP = .5, FLY = .55;
    const COOK = INTRO + .3;
    const SERVE = COOK + INGS.length * GAP + .35;
    const lands = INGS.map((_, i) => COOK + i * GAP + FLY);

    const tl = gsap.timeline({ paused: !motion, defaults: { ease: 'none' } });

    // 01 · grab the goods: everything pops onto the counter
    INGS.forEach((d, i) => {
      tl.fromTo(d.el, { scale: 0, rotation: gsap.utils.random(-70, 70) }, { scale: 1, rotation: gsap.utils.random(-10, 10), duration: .45, ease: 'back.out(2.2)' }, i * .09);
      tl.fromTo(d.tag, { rotationX: -90, opacity: 0 }, { rotationX: 0, opacity: 1, duration: .3, ease: 'back.out(2)' }, .35 + i * .08);
      if (d.noteEl) tl.fromTo(d.noteEl, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25 }, .6 + i * .06);
    });

    // 02 · into the bowl, one by one, in a little arc
    INGS.forEach((d, i) => {
      const T = COOK + i * GAP, L = T + FLY;
      const spread = (i % 2 ? 1 : -1) * (8 + (i * 7) % 26);
      tl.to([d.tag, d.noteEl].filter(Boolean), { opacity: 0, y: -12, duration: .14 }, T);
      tl.to(d.el, { x: () => mouth().x - d.el.offsetLeft + spread, duration: FLY, ease: 'power1.inOut' }, T);
      tl.to(d.el, { y: () => Math.min(0, mouth().y - d.el.offsetTop) - mouth().h * .55, duration: FLY * .42, ease: 'power2.out' }, T);
      tl.to(d.el, { y: () => mouth().y - d.el.offsetTop, duration: FLY * .58, ease: 'power2.in' }, T + FLY * .42);
      tl.to(d.el, { rotation: (i % 2 ? 1 : -1) * 200, scale: .42, duration: FLY, ease: 'power1.in' }, T);
      tl.to(d.el, { y: () => mouth().y - d.el.offsetTop + mouth().h * .2, scale: .28, duration: .14, ease: 'power1.in' }, L);
      tl.set(d.el, { autoAlpha: 0 }, L + .15);
      // splash + squash + the broth rises a little
      tl.to([back, front], { scaleY: .92, scaleX: 1.05, duration: .06 }, L)
        .to([back, front], { scaleY: 1, scaleX: 1, duration: .2, ease: 'back.out(4)' }, L + .06);
      tl.to(broth, { attr: { cy: 162 - (i + 1) * 2.8, rx: 96 + (i + 1) * 5, ry: 10 + (i + 1) * 2.5 }, duration: .2 }, L);
      d.drops.forEach((dr, k) => {
        const a = -Math.PI / 2 + (k - 2) * .5 + (i % 3 - 1) * .15;
        const dist = 50 + ((i * 13 + k * 29) % 50);
        tl.fromTo(dr, { x: 0, y: 0, opacity: 1, scale: .4, rotation: a * 57 - 45 },
          { x: Math.cos(a) * dist, y: Math.sin(a) * dist, scale: 1, duration: .12, ease: 'power2.out', immediateRender: false }, L)
          .to(dr, { y: `+=${40 + k * 8}`, opacity: 0, duration: .16, ease: 'power2.in' }, L + .12);
      });
    });

    // 03 · 開動! the bowl steams, shakes and turns into the real thing
    tl.to(steam, { opacity: 1, duration: .25 }, SERVE)
      .to([back, front], { rotation: -3, duration: .05 }, SERVE + .1)
      .to([back, front], { rotation: 3, duration: .08 }, SERVE + .15)
      .to([back, front], { rotation: -2, duration: .08 }, SERVE + .23)
      .to([back, front], { rotation: 0, duration: .08 }, SERVE + .31)
      .to([back, front, steam], { scale: 1.5, autoAlpha: 0, y: -30, duration: .4, ease: 'power2.in' }, SERVE + .45)
      .fromTo(dish, { clipPath: 'circle(0% at 50% 62%)', rotation: -50, scale: .7 },
        { clipPath: 'circle(75% at 50% 50%)', rotation: 0, scale: 1, duration: .65, ease: 'power3.out', immediateRender: false }, SERVE + .55)
      .to(pops[0], { scale: 1, duration: .3, ease: 'back.out(3)' }, SERVE + .95)
      .to(pops[1], { scale: 1, duration: .3, ease: 'back.out(3)' }, SERVE + 1.05)
      .fromTo(rcpt, { xPercent: () => (isNarrow() ? 0 : 130), yPercent: () => (isNarrow() ? 130 : 0) },
        { xPercent: 0, yPercent: 0, duration: .5, ease: 'power3.out', immediateRender: true }, SERVE + 1)
      .to({}, { duration: .7 });

    // the giant words behind slide across for the whole sequence
    const D = tl.duration();
    tl.fromTo('.bt--1 span', { xPercent: 0 }, { xPercent: -28, duration: D }, 0)
      .fromTo('.bt--2 span', { xPercent: -28 }, { xPercent: 0, duration: D }, 0)
      .fromTo('.bt--3 span', { xPercent: -6 }, { xPercent: -34, duration: D }, 0);

    const RC_FROM = SERVE + 1.1;
    let lastStep = 0;
    const steps = [['STEP 01', 'grab the goods'], ['STEP 02', 'into the bowl'], ['STEP 03', '開動! let’s eat']];
    const update = () => {
      const t = tl.time();
      countEl.textContent = lands.filter((l) => t >= l).length;
      const s = t < COOK ? 0 : t < SERVE ? 1 : 2;
      if (s !== lastStep) {
        lastStep = s;
        stepEl.textContent = steps[s][0]; stepTxt.textContent = steps[s][1];
        gsap.fromTo(stepEl, { scale: 1.4, rotation: -8 }, { scale: 1, rotation: 0, duration: .5, ease: 'back.out(3)' });
      }
      totEl.textContent = '$' + (TOTAL * gsap.utils.clamp(0, 1, (t - RC_FROM) / .45)).toFixed(2);
      replay.classList.toggle('is-on', tl.progress() > .97);
    };
    tl.eventCallback('onUpdate', update);

    if (motion) {
      ScrollTrigger.create({
        animation: tl,
        trigger: stage,
        start: 'top top',
        end: () => '+=' + window.innerHeight * 5,
        pin: true,
        scrub: .9,
        invalidateOnRefresh: true,
      });
      replay.addEventListener('click', () => {
        const st = ScrollTrigger.getAll().find((s) => s.animation === tl);
        if (st) window.BB.scrollTo(st.start + 2);
      });
      // positions change between phone and desktop layouts
      let narrow = isNarrow();
      window.addEventListener('resize', () => { if (isNarrow() !== narrow) { narrow = isNarrow(); placeIngs(); ScrollTrigger.refresh(); } });
    } else {
      tl.progress(1); update();
    }
  }

  /* ═════════════ FLYER ═════════════ */
  // deals reset every Sunday at 8 PM
  const flCount = $('#flCount');
  if (flCount) {
    const b = $$('b', flCount);
    const next = () => {
      // Sunday 8 PM in New York
      const t = window.BB.nyNow(); t.setDate(t.getDate() + ((7 - t.getDay()) % 7)); t.setHours(20, 0, 0, 0);
      if (t <= window.BB.nyNow()) t.setDate(t.getDate() + 7);
      return t;
    };
    let target = next();
    const tick = () => {
      let s = Math.max(0, Math.floor((target - window.BB.nyNow()) / 1000));
      if (!s) target = next();
      const v = [Math.floor(s / 86400), Math.floor(s / 3600) % 24, Math.floor(s / 60) % 60, s % 60];
      v.forEach((n, i) => { b[i].textContent = String(n).padStart(2, '0'); });
    };
    tick(); setInterval(tick, 1000);
  }

  // + basket: the product flies into the basket in the header
  $$('.deal').forEach((card) => {
    const btn = $('.deal-add', card), id = card.dataset.id;
    const label = () => { const n = window.BB.basket.count(id); if (n) { btn.textContent = `in basket ×${n}`; btn.classList.add('is-added'); } };
    label();
    btn.addEventListener('click', () => {
      window.BB.fly($('figure', card), id, label);
      if (!hasGsap || !motion) return;
      gsap.fromTo($('.deal-burst', card), { scale: 1.25 }, { scale: 1, duration: .6, ease: 'elastic.out(1, .4)' });
    });
  });

  /* ═════════════ AISLES ═════════════ */
  const nd = new Date();
  $('#newsDate').textContent = `${nd.getFullYear()}年${nd.getMonth() + 1}月${nd.getDate()}日(${'日月火水木金土'[nd.getDay()]})`;
  const aisles = $('#aisles'), float = $('#aiFloat');
  if (hasGsap && motion && matchMedia('(hover: hover)').matches) {
    const figs = $$('figure', float);
    gsap.set(float, { xPercent: -50, yPercent: -50 });
    const qx = gsap.quickTo(float, 'x', { duration: .55, ease: 'power3.out' });
    const qy = gsap.quickTo(float, 'y', { duration: .55, ease: 'power3.out' });
    let px = 0;
    aisles.addEventListener('pointermove', (e) => {
      const r = aisles.getBoundingClientRect();
      qx(e.clientX - r.left); qy(e.clientY - r.top);
      gsap.to(float, { rotation: gsap.utils.clamp(-18, 18, (e.clientX - px) * .8), duration: .5, overwrite: 'auto' });
      px = e.clientX;
    });
    $$('#aiList a').forEach((a, i) => a.addEventListener('pointerenter', () => figs.forEach((f, k) => f.classList.toggle('is-on', k === i))));
    $('#aiList').addEventListener('pointerleave', () => figs.forEach((f) => f.classList.remove('is-on')));
  }

  /* ═════════════ scroll reveals ═════════════ */
  if (hasGsap && window.ScrollTrigger && motion) {
    const once = (trigger, start = 'top 80%') => ({ trigger, start, once: true });

    gsap.from('.sale', { scale: .3, rotation: -30, opacity: 0, duration: 1.2, ease: 'elastic.out(1, .5)', scrollTrigger: once('.flyer') });
    gsap.from('.fl-info > *', { y: 40, opacity: 0, duration: .7, stagger: .1, ease: 'power3.out', scrollTrigger: once('.flyer') });
    gsap.from('.deal', { y: 90, scale: .7, rotation: () => gsap.utils.random(-14, 14), opacity: 0, duration: .8, ease: 'back.out(1.8)', stagger: .08, scrollTrigger: once('.fl-grid', 'top 85%') });

    $$('.big').forEach((h) => gsap.from(h, { y: 80, opacity: 0, duration: 1, ease: 'power4.out', scrollTrigger: once(h, 'top 88%') }));
    gsap.from('.news-bar', { clipPath: 'inset(0 100% 0 0)', duration: 1.2, ease: 'expo.out', scrollTrigger: once('.news-bar', 'top 90%') });
    gsap.from('.ai-list li', { y: 60, opacity: 0, duration: .7, ease: 'power3.out', stagger: .07, scrollTrigger: once('.ai-list', 'top 85%') });

    gsap.from('.neon', { opacity: 0, duration: .05, repeat: 5, yoyo: true, ease: 'steps(1)', scrollTrigger: once('.owners', 'top 60%') });
    $$('.polaroid').forEach((p) => { p.dataset.rot = parseFloat(getComputedStyle(p).getPropertyValue('--rot')) || 0; p.style.rotate = 'none'; });
    gsap.fromTo('.polaroid', { y: 160, rotation: () => gsap.utils.random(-30, 30), opacity: 0 },
      { y: 0, rotation: (i, p) => +p.dataset.rot, opacity: 1, duration: 1, ease: 'back.out(1.5)', stagger: .14, scrollTrigger: once('.ow-photos') });
    gsap.from('.tape', { scaleX: 0, duration: .4, stagger: .1, delay: .6, ease: 'power2.out', scrollTrigger: once('.ow-photos') });
    gsap.from('.bubble', { scale: .4, rotation: -10, opacity: 0, duration: .8, ease: 'elastic.out(1, .5)', scrollTrigger: once('.bubble', 'top 88%') });
    gsap.from('.rules li', { x: 40, opacity: 0, duration: .5, stagger: .08, ease: 'power3.out', scrollTrigger: once('.rules', 'top 88%') });

    gsap.fromTo('.vi-type span:first-child', { xPercent: -30 }, { xPercent: 12, ease: 'none', scrollTrigger: { trigger: '.visit', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.fromTo('.vi-type span:last-child', { xPercent: 30 }, { xPercent: -12, ease: 'none', scrollTrigger: { trigger: '.visit', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.from('.vi-receipt', { clipPath: 'inset(0 0 100% 0)', duration: 1.4, ease: 'steps(14)', scrollTrigger: once('.vi-receipt', 'top 80%') });
  }

  /* ═════════════ visit: today's row + right now ═════════════ */
  const row = $(`#vrHours li[data-d="${window.BB.nyNow().getDay()}"]`);
  if (row) row.classList.add('is-today');
  const vrNow = $('#vrNow');
  const paintNow = () => { const s = window.BB.status(); vrNow.textContent = s.long; vrNow.className = s.open ? 'is-open' : 'is-closed'; };
  paintNow(); setInterval(paintNow, 30000);
})();
