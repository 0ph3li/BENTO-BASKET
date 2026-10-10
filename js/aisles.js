/* ═══════════════════════════════════════════════════════════
   BENTO & BASKET · the aisles
   one list of aisles + products drives everything on the page:
   the shelves, the store map, the navigator and Ask Bao
   ═══════════════════════════════════════════════════════════ */
(() => {
  // the products live in js/catalog.js (the flyer and the basket read them too)
  const AISLES = window.BB_AISLES;

  // things that aren't on a shelf but people ask about anyway
  const EXTRA = [
    { k: ['beer', 'soju', 'wine', 'whisky'], a: 'drinks', say: 'No beer. Only Horoyoi, the strawberry one, aisle 6. Mei says it\'s for guests. It\'s not for guests.' },
    { k: ['ice cream', 'ice pop', 'popsicle', 'melona'], a: 'fresh', say: 'Freezer in aisle 4, under the dumplings. Melona is the green one.' },
    { k: ['sweets', 'chocolate'], a: 'snacks', say: 'Aisle 1, at eye level so the kids find it. That was Mei\'s idea.' },
    { k: ['shrimp chips', 'seaweed', 'nori'], a: 'snacks', say: 'Aisle 1, top shelf, next to the senbei. The shrimp ones crunch the loudest.' },
    { k: ['mochi the cat', 'cat', 'mochi cat'], a: null, say: 'Mochi is asleep on the rice bags. Not for sale. Do not wake.' },
    { k: ['bao', 'uncle bao'], a: null, say: 'I\'m right here. Behind you. Hello.' },
    { k: ['mei', 'auntie mei', 'auntie'], a: null, say: 'At the counter. She already saw you come in.' },
    { k: ['toilet', 'bathroom', 'restroom'], a: null, say: 'Through the back, past the boxes. Don\'t touch the boxes.' },
    { k: ['karaoke'], a: null, say: 'Not for sale. Thursdays after closing. You can come if you sing.' },
  ];
  const NOPE = [
    'Hmm. Not here. Mei will order it, come back Thursday.',
    'Never heard of it. Ask Mei, she knows everything.',
    'We don\'t have that. We have Umaibo, though. Thirty of them.',
  ];

  /* ═════════════ build the aisles ═════════════ */
  const list = document.getElementById('aisleList');
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  list.innerHTML = AISLES.map((a) => `
    <section class="aisle" id="${a.id}" data-aisle="${a.id}" style="--c:${a.c};--t:${a.t}">
      <div class="al-head">
        <p class="al-no mono">${a.no}</p>
        <h2 class="al-name"><span>${esc(a.name)}</span></h2>
        <p class="al-zh zh" aria-hidden="true">${a.zh}</p>
        <p class="al-note script">${esc(a.note)}</p>
        <p class="al-say"><span class="mono">${a.who} says</span>“${esc(a.say)}”</p>
      </div>
      <div class="shelf">
        ${a.items.map((p) => `
        <article class="prod" id="p-${p.id}" data-id="${p.id}">
          <button class="prod-pic slot cut" type="button" data-img="img/${p.img}" data-alt="${esc(p.name)}" aria-label="Add ${esc(p.name)} to the basket"><span class="ph"><b>${esc(p.name)}</b></span><em class="prod-plus">+</em></button>
          <i class="plank" aria-hidden="true"></i>
          <div class="prod-tag">
            <span class="pt-face"><b>$${p.price}<small>${p.unit || ''}</small></b><span class="pt-name">${esc(p.name)}</span><span class="pt-zh zh">${p.zh}</span></span>
            <span class="pt-back script">${esc(p.note)}</span>
          </div>
        </article>`).join('')}
      </div>
    </section>`).join('');

  /* ═════════════ aisle navigator ═════════════ */
  const anav = document.getElementById('anav');
  anav.innerHTML = AISLES.map((a) => `<a href="#${a.id}" data-aisle="${a.id}" style="--c:${a.map}"><i></i><b>${a.no}</b><span>${esc(a.name)}</span></a>`).join('');

  /* ═════════════ the store map, drawn top-down ═════════════ */
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.getElementById('mapSvg');
  const el = (tag, attrs = {}, parent = svg, text) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    parent.appendChild(n);
    return n;
  };
  const defs = el('defs');
  const pat = el('pattern', { id: 'tiles', width: 30, height: 30, patternUnits: 'userSpaceOnUse' }, defs);
  el('rect', { width: 30, height: 30, fill: '#F7F3EA' }, pat);
  el('rect', { width: 15, height: 15, fill: '#EEE7D8' }, pat);
  el('rect', { x: 15, y: 15, width: 15, height: 15, fill: '#EEE7D8' }, pat);
  // walls, with a gap for the door
  el('rect', { x: 12, y: 12, width: 576, height: 416, rx: 16, fill: 'url(#tiles)' });
  el('path', { d: 'M150 428 H28 Q12 428 12 412 V28 Q12 12 28 12 H572 Q588 12 588 28 V412 Q588 428 572 428 H250', fill: 'none', stroke: '#141210', 'stroke-width': 6, 'stroke-linecap': 'round' });
  el('path', { d: 'M150 428 A100 100 0 0 1 250 428', fill: 'none', stroke: '#141210', 'stroke-width': 2, 'stroke-dasharray': '5 6' });
  el('text', { x: 200, y: 414, 'text-anchor': 'middle', class: 'map-t map-t--s' }, svg, 'ENTRANCE · 入口');
  // you are here
  const you = el('g', { class: 'map-you', transform: 'translate(200 366)' });
  el('circle', { r: 16, class: 'map-you-ring' }, you);
  el('circle', { r: 7, fill: '#E8261B' }, you);
  el('text', { x: 14, y: -12, class: 'map-t map-t--you' }, you, 'YOU ARE HERE');
  // counter, rice sacks and the cat
  el('rect', { x: 420, y: 352, width: 150, height: 58, rx: 8, fill: '#141210' });
  el('text', { x: 495, y: 386, 'text-anchor': 'middle', class: 'map-t map-t--y' }, svg, 'COUNTER · MEI');
  [[36, 356], [70, 360], [52, 388]].forEach(([x, y]) => el('rect', { x, y, width: 34, height: 26, rx: 6, fill: '#E9DFC6', stroke: '#141210', 'stroke-width': 2 }));
  el('text', { x: 60, y: 346, 'text-anchor': 'middle', class: 'map-t map-t--s' }, svg, 'mochi zzz');
  // A06 is the cold wall along the back, A01–A05 are the shelves
  const shelves = {};
  AISLES.forEach((a, i) => {
    const g = el('g', { class: 'map-aisle', 'data-aisle': a.id, tabindex: 0, role: 'link', 'aria-label': `${a.no} ${a.name}` });
    if (i === 5) {
      el('rect', { x: 40, y: 28, width: 520, height: 46, rx: 8, fill: a.map, stroke: '#141210', 'stroke-width': 3 }, g);
      el('text', { x: 300, y: 57, 'text-anchor': 'middle', class: 'map-t' }, g, `${a.no} · ${a.name.toUpperCase()} · ${a.zh}`);
    } else {
      const x = 52 + i * 104;
      el('rect', { x, y: 108, width: 58, height: 214, rx: 8, fill: a.map, stroke: '#141210', 'stroke-width': 3 }, g);
      el('text', { x: x + 29, y: 215, 'text-anchor': 'middle', class: 'map-t', transform: `rotate(-90 ${x + 29} 215)` }, g, a.name.toUpperCase());
      el('text', { x: x + 29, y: 100, 'text-anchor': 'middle', class: 'map-t map-t--no' }, g, a.no);
    }
    shelves[a.id] = g;
  });

  /* ═════════════ everything that needs main.js (BB) runs once the page is parsed ═════════════ */
  document.addEventListener('DOMContentLoaded', () => {
    const { $, $$, motion, hasGsap } = window.BB;

    // tap a shelf on the map → walk there
    const go = (id, pid) => {
      const target = pid ? document.getElementById('p-' + pid) : document.getElementById(id);
      if (!target) return;
      window.BB.scrollTo(pid ? target.getBoundingClientRect().top + window.scrollY - window.innerHeight * .3 : '#' + id);
      if (pid) {
        target.classList.remove('is-found'); target.offsetWidth; target.classList.add('is-found');
        setTimeout(() => target.classList.remove('is-found'), 3200);
      }
    };
    Object.entries(shelves).forEach(([id, g]) => {
      g.addEventListener('click', () => go(id));
      g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(id); } });
    });
    $$('a', anav).forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); go(a.dataset.aisle); }));

    // + basket: tap the product
    $$('.prod').forEach((p) => $('.prod-pic', p).addEventListener('click', () => {
      window.BB.fly($('.prod-pic', p), p.dataset.id);
      if (hasGsap && motion) gsap.fromTo($('.prod-tag', p), { rotation: -14 }, { rotation: 0, duration: 1.2, ease: 'elastic.out(1, .3)' });
    }));

    /* ---------- Ask Bao ---------- */
    const form = $('#ask'), input = $('#askInput'), answer = $('#askAnswer'), sayEl = $('#askSay'), goEl = $('#askGo');
    const norm = (s) => s.toLowerCase().replace(/[^a-z0-9一-鿿 ]/g, ' ').replace(/\s+/g, ' ').trim();
    const find = (q) => {
      q = norm(q); if (!q) return null;
      let best = null, score = 0;
      const test = (keys, hit) => keys.forEach((k) => {
        k = norm(k);
        const s = k === q ? 3 : (q.includes(k) || (q.length > 2 && k.includes(q))) ? 1 + Math.min(k.length, q.length) / 40 : 0;
        if (s > score) { score = s; best = hit; }
      });
      AISLES.forEach((a) => a.items.forEach((p) => test([...p.tags, p.name, p.zh], { aisle: a, prod: p })));
      EXTRA.forEach((x) => test(x.k, { aisle: AISLES.find((a) => a.id === x.a) || null, say: x.say }));
      return best;
    };
    let typing;
    const reply = (q) => {
      const hit = find(q);
      let text, aisle = null, prod = null;
      if (!hit) text = NOPE[Math.floor(Math.random() * NOPE.length)];
      else if (hit.prod) { aisle = hit.aisle; prod = hit.prod; text = `${prod.name}? Aisle ${+aisle.no.slice(1)}, ${aisle.name.toLowerCase()}. $${prod.price}${prod.unit || ''}. ${prod.note.charAt(0).toUpperCase() + prod.note.slice(1)}.`; }
      else { aisle = hit.aisle; text = hit.say; }
      answer.hidden = false;
      goEl.hidden = !aisle;
      if (aisle) { goEl.href = '#' + aisle.id; goEl.onclick = (e) => { e.preventDefault(); go(aisle.id, prod && prod.id); }; }
      Object.values(shelves).forEach((g) => g.classList.remove('is-hit'));
      if (aisle) shelves[aisle.id].classList.add('is-hit');
      // Bao types slowly
      clearInterval(typing);
      sayEl.textContent = '';
      let i = 0;
      typing = setInterval(() => { sayEl.textContent = text.slice(0, ++i); if (i >= text.length) clearInterval(typing); }, motion ? 18 : 0);
      if (hasGsap && motion) gsap.fromTo(answer, { scale: .85, rotation: -3, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: .6, ease: 'back.out(2)' });
    };
    form.addEventListener('submit', (e) => { e.preventDefault(); reply(input.value); });
    $$('.ask-chips button').forEach((b) => b.addEventListener('click', () => { input.value = b.dataset.q; reply(b.dataset.q); }));

    /* ---------- where am I: navigator + map follow the scroll ---------- */
    const setActive = (id) => {
      $$('a', anav).forEach((a) => a.classList.toggle('is-on', a.dataset.aisle === id));
    };
    if (hasGsap && window.ScrollTrigger) {
      $$('.aisle').forEach((s) => ScrollTrigger.create({ trigger: s, start: 'top 55%', end: 'bottom 55%', onToggle: (st) => { if (st.isActive) setActive(s.dataset.aisle); } }));
      ScrollTrigger.create({ trigger: '#aisleList', start: 'top 70%', end: 'bottom 40%', onToggle: (st) => anav.classList.toggle('is-up', st.isActive) });
    } else anav.classList.add('is-up');

    /* ---------- motion ---------- */
    if (hasGsap && motion) {
      const enter = () => {
        const tl = gsap.timeline();
        tl.from('.ah-l1, .ah-l2', { yPercent: 110, duration: 1, ease: 'expo.out', stagger: .08 }, 0)
          .from('.ah-zh', { opacity: 0, x: 30, duration: .6 }, .3)
          .from('.ah-copy, .ask', { y: 30, opacity: 0, duration: .7, stagger: .1, ease: 'power3.out' }, .35)
          .from('.map', { y: 80, rotation: 6, opacity: 0, duration: 1, ease: 'back.out(1.4)' }, .2)
          .from('.map-aisle', { y: -40, opacity: 0, duration: .6, stagger: .07, ease: 'back.out(2.5)' }, .6);
      };
      gsap.set('.ah-l1, .ah-l2', { yPercent: 110 });
      window.addEventListener('bb:ready', () => { gsap.set('.ah-l1, .ah-l2', { clearProps: 'transform' }); enter(); }, { once: true });

      $$('.aisle').forEach((s) => {
        const once = { trigger: s, start: 'top 72%', once: true };
        gsap.from($('.al-name span', s), { yPercent: 105, duration: 1, ease: 'expo.out', scrollTrigger: once });
        gsap.from([$('.al-no', s), $('.al-zh', s), $('.al-note', s), $('.al-say', s)], { y: 30, opacity: 0, duration: .7, stagger: .08, ease: 'power3.out', scrollTrigger: once });
        // products drop onto the shelf, the price tags swing on the edge
        // built on enter (not with from()), so a jump-scroll can never leave them hanging mid-air
        const pics = $$('.prod-pic', s), tags = $$('.prod-tag', s);
        gsap.set(pics, { y: -160, opacity: 0 });
        ScrollTrigger.create({
          trigger: $('.shelf', s), start: 'top 85%', once: true,
          onEnter: () => {
            gsap.fromTo(pics, { y: -160, rotation: () => gsap.utils.random(-30, 30), opacity: 0 }, { y: 0, rotation: 0, opacity: 1, duration: 1, ease: 'bounce.out', stagger: .09, clearProps: 'transform' });
            gsap.fromTo(tags, { rotation: () => gsap.utils.random(-35, 35) }, { rotation: 0, duration: 2, ease: 'elastic.out(1, .25)', stagger: .09, delay: .5 });
          },
        });
      });
      gsap.from('.cant-big', { scale: .4, rotation: -10, opacity: 0, duration: 1, ease: 'elastic.out(1, .5)', scrollTrigger: { trigger: '.cant', start: 'top 75%', once: true } });
    }

    // arriving from the home with #sauces etc.: walk straight there once the page is uncovered
    if (location.hash && document.getElementById(location.hash.slice(1))) {
      window.addEventListener('bb:ready', () => setTimeout(() => {
        if (window.BB.lenis) window.BB.lenis.scrollTo(location.hash, { immediate: true, force: true });
        else document.getElementById(location.hash.slice(1)).scrollIntoView();
      }, 50), { once: true });
    }
  });
})();
