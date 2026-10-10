/* ═══════════════════════════════════════════════════════════
   BENTO & BASKET · find us
   the shop front (its door sign follows New York time), Bao's map
   with three routes, the hours with a New York clock, good to know
   ═══════════════════════════════════════════════════════════ */
(() => {
  const NS = 'http://www.w3.org/2000/svg';
  const $ = (s, c = document) => c.querySelector(s);
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

  /* ═════════════ Bao's map ═════════════
     schematic Chinatown: Canal runs across, the north–south streets cross it.
     Lantern Lane is ours, a crooked lane between Mott and Elizabeth. */
  const canalY = (x) => 230 - .075 * x;
  const STREETS = [
    // [name, path, label x, label y, rotation, big]
    ['Canal St', `M0,${canalY(0)} L800,${canalY(800)}`, 40, canalY(40) - 10, -4.3, true],
    ['Grand St', 'M0,70 L800,46', 30, 60, -1.7],
    ['Bayard St', 'M250,330 L580,330', 262, 322, 0],
    ['Pell St', 'M410,420 L580,420', 470, 412, 0],
    ['Lafayette St', 'M120,0 L120,600', 112, 560, -90],
    ['Centre St', 'M170,0 L170,600', 162, 560, -90],
    ['Baxter St', 'M250,0 L250,600', 242, 590, -90],
    ['Mulberry St', 'M330,0 L330,600', 322, 590, -90],
    ['Mott St', 'M410,0 L410,600', 402, 590, -90],
    ['Elizabeth St', 'M490,0 L490,600', 482, 590, -90],
    ['Bowery', 'M580,0 L580,600', 572, 590, -90, true],
    ['Chrystie St', 'M680,0 L680,260', 672, 250, -90],
  ];
  const LANE = `M450,${canalY(450)} Q437,240 444,262 Q452,300 452,330`;
  const SHOP = [444, 262];
  const ROUTES = [
    {
      id: 'canal', name: 'Subway · Canal St', lines: [['6', '#00933C'], ['J', '#996633'], ['Z', '#996633'], ['N', '#FCCC0A'], ['Q', '#FCCC0A'], ['R', '#FCCC0A'], ['W', '#FCCC0A']], mins: '4 min',
      d: `M140,${canalY(140)} L450,${canalY(450)} Q437,240 ${SHOP.join(',')}`,
      steps: ['Take the exit for Canal & Lafayette.', 'Walk east on Canal, past the fish market. Hold your breath a little.', 'Cross Mott. Look for the laundromat.', 'Right into Lantern Lane. Green sign. Mei is waving.'],
    },
    {
      id: 'grand', name: 'Subway · Grand St', lines: [['B', '#FF6319'], ['D', '#FF6319']], mins: '7 min',
      d: `M680,58 L680,${canalY(680)} L450,${canalY(450)} Q437,240 ${SHOP.join(',')}`,
      steps: ['Exit on Chrystie, by the park.', 'Walk south to Canal, under the bridge noise.', 'West on Canal, past Bowery and Elizabeth.', 'Left into Lantern Lane, just after the laundromat.'],
    },
    {
      id: 'park', name: 'From Columbus Park', lines: [['☯', '#16A34A']], mins: '3 min',
      d: `M300,430 L330,330 L452,330 Q452,300 ${SHOP.join(',')}`,
      steps: ['After morning tai chi, leave the park by Mulberry.', 'East on Bayard, past the bakery. Buy a bun, Mei won\'t mind.', 'Lantern Lane is the crooked one on the left after Mott.', 'Walk up. If you smell soup, you\'re here.'],
    },
  ];
  const PLACES = [
    // [label, x, y, emoji]
    ['fish market', 372, 180, '🐟'],
    ['laundromat', 470, 236, '🧺'],
    ['bakery', 372, 352, '🥐'],
    ['Mrs. Wu\'s kitchen', 528, 380, '🥟'],
    ['Manhattan Bridge →', 700, 150, '🌉'],
  ];

  const svg = $('#mapSvg');
  const el = (tag, attrs = {}, parent = svg, text) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    parent.appendChild(n);
    return n;
  };
  // blocks, the park, the bridge
  el('rect', { x: 0, y: 0, width: 800, height: 600, class: 'm-ground' });
  el('rect', { x: 256, y: 380, width: 68, height: 160, rx: 6, class: 'm-park' });
  el('text', { x: 290, y: 466, class: 'm-park-t', 'text-anchor': 'middle', transform: 'rotate(-90 290 466)' }, svg, 'Columbus Park');
  el('path', { d: `M590,${canalY(590) - 4} L800,${canalY(800) - 34}`, class: 'm-bridge' });
  STREETS.forEach(([, d, , , , big]) => el('path', { d, class: 'm-street' + (big ? ' m-street--big' : '') }));
  STREETS.forEach(([name, , x, y, r]) => el('text', { x, y, class: 'm-label', transform: `rotate(${r} ${x} ${y})` }, svg, name.toUpperCase()));
  el('path', { d: LANE, class: 'm-lane' });
  el('text', { x: 430, y: 300, class: 'm-lane-t', transform: 'rotate(-78 430 300)' }, svg, 'Lantern Ln');
  PLACES.forEach(([t, x, y, e]) => {
    const g = el('g', { class: 'm-place', transform: `translate(${x} ${y})` });
    el('text', { class: 'm-place-e', 'text-anchor': 'middle', y: 6 }, g, e);
    el('text', { class: 'm-place-t', 'text-anchor': 'middle', y: 24 }, g, t);
  });
  // stations
  [['Canal St', 140, canalY(140) + 2], ['Grand St', 680, 58]].forEach(([t, x, y]) => {
    const g = el('g', { class: 'm-stn', transform: `translate(${x} ${y})` });
    el('rect', { x: -10, y: -10, width: 20, height: 20, rx: 4 }, g);
    el('text', { 'text-anchor': 'middle', y: 5, class: 'm-stn-m' }, g, 'M');
    el('text', { 'text-anchor': 'middle', y: 30, class: 'm-stn-t' }, g, t);
  });
  // the route, drawn on top
  const route = el('path', { d: ROUTES[0].d, class: 'm-route' });
  // the shop
  const pin = el('g', { class: 'm-pin', transform: `translate(${SHOP.join(' ')})` });
  el('circle', { r: 26, class: 'm-pin-pulse' }, pin);
  el('path', { d: 'M0,0 C-14,-16 -18,-24 -18,-32 A18,18 0 1 1 18,-32 C18,-24 14,-16 0,0Z', class: 'm-pin-s' }, pin);
  el('text', { y: -25, 'text-anchor': 'middle', class: 'm-pin-zh' }, pin, '梅');
  const tag = el('g', { class: 'm-shop', transform: 'translate(-150 -60)' }, pin);
  el('rect', { x: 0, y: 0, width: 116, height: 38, rx: 6 }, tag);
  el('text', { x: 58, y: 16, 'text-anchor': 'middle', class: 'm-shop-t' }, tag, 'BENTO & BASKET');
  el('text', { x: 58, y: 31, 'text-anchor': 'middle', class: 'm-shop-s' }, tag, '88 Lantern Ln');

  $('#routes').innerHTML = ROUTES.map((r, i) => `
    <button class="route" type="button" data-i="${i}" aria-pressed="${i === 0}">
      <span class="route-lines">${r.lines.map(([l, c]) => `<i style="--c:${c}">${l}</i>`).join('')}</span>
      <b>${esc(r.name)}</b>
      <span class="mono">${r.mins} walk</span>
    </button>`).join('');

  /* ═════════════ hours ═════════════ */
  const DAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const t12 = (m) => { const h = Math.floor(m / 60), mm = String(m % 60).padStart(2, '0'); return `${((h + 11) % 12) + 1}:${mm} ${h < 12 ? 'AM' : 'PM'}`; };

  /* ═════════════ good to know ═════════════ */
  const KNOW = [
    ['💵', 'Cash or card', 'cards over $10. Bao prefers cash. Bao prefers a lot of things.'],
    ['☎', '(212) 555-0188', 'Mei picks up on the third ring. Always the third.'],
    ['✉', 'No email', 'Mei doesn\'t believe in it. Come by, or call.'],
    ['🚲', 'No delivery', 'Bao\'s bike has a flat. It has had a flat since 2017.'],
    ['♿', 'One step at the door', 'ring the bell and Bao brings the ramp.'],
    ['🚗', 'Parking', 'no. take the train. you\'re in Manhattan.'],
    ['🐈', 'Pets welcome', 'if Mochi approves. Mochi rarely approves.'],
    ['🧧', 'Big orders', 'call two days ahead. dumplings by the hundred, ask Mrs. Wu.'],
  ];
  $('#knowGrid').innerHTML = KNOW.map(([e, t, s], i) => `
    <article class="kn" style="--r:${[-2, 1.5, -1, 2.5, -2.5, 1, -1.5, 2][i]}deg;--c:${['var(--yellow)', 'var(--pink)', '#fff', 'var(--lime)'][i % 4]}">
      <span class="kn-hole" aria-hidden="true"></span>
      <span class="kn-e" aria-hidden="true">${e}</span>
      <h3 class="kn-t">${esc(t)}</h3>
      <p class="kn-s">${esc(s)}</p>
    </article>`).join('');

  /* ═════════════ behaviour (needs main.js) ═════════════ */
  document.addEventListener('DOMContentLoaded', () => {
    const { $$, motion, hasGsap } = window.BB;
    const H = window.BB.HOURS;

    /* ---------- hours list, today in bold ---------- */
    const order = [1, 2, 3, 4, 5, 6, 0];
    $('#hrsList').innerHTML = order.map((d) => `<li data-d="${d}"><span>${DAY[d]}</span><b>${H[d] ? `${t12(H[d][0])} – ${t12(H[d][1])}` : 'closed · fishing'}</b></li>`).join('');

    /* ---------- now: status, the door sign, the clock ---------- */
    const hang = $('#hang'), dot = $('#nowDot'), nowTxt = $('#nowTxt'), nowClock = $('#nowClock');
    const ticks = $('#ticks');
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const l = document.createElementNS(NS, 'line');
      l.setAttribute('x1', 100 + Math.sin(a) * 80); l.setAttribute('y1', 100 - Math.cos(a) * 80);
      l.setAttribute('x2', 100 + Math.sin(a) * (i % 3 ? 86 : 90)); l.setAttribute('y2', 100 - Math.cos(a) * (i % 3 ? 86 : 90));
      l.setAttribute('class', i % 3 ? 'tick' : 'tick tick--big');
      ticks.appendChild(l);
    }
    const hand = (id, deg) => $(id).setAttribute('transform', `rotate(${deg} 100 100)`);
    let lastDay = -1;
    const paint = () => {
      const now = window.BB.nyNow(), s = window.BB.status(now);
      dot.classList.toggle('is-open', s.open);
      nowTxt.textContent = s.long;
      nowClock.textContent = `it's ${t12(now.getHours() * 60 + now.getMinutes())} in New York`;
      hang.classList.toggle('is-closed', !s.open);
      const h = now.getHours(), m = now.getMinutes(), sec = now.getSeconds();
      hand('#hH', (h % 12) * 30 + m / 2); hand('#hM', m * 6 + sec / 10); hand('#hS', sec * 6);
      $('#clockTxt').textContent = t12(h * 60 + m);
      if (now.getDay() !== lastDay) {
        lastDay = now.getDay();
        $$('#hrsList li').forEach((li) => li.classList.toggle('is-today', +li.dataset.d === lastDay));
      }
    };
    paint(); setInterval(paint, 1000);

    /* ---------- the door: ring the bell ---------- */
    const door = $('#door'), bell = $('#bell'), bubble = $('#bubble');
    let audio, open = false, hideT;
    const ding = () => {
      try {
        audio = audio || new (window.AudioContext || window.webkitAudioContext)();
        [1568, 1319].forEach((f, i) => {
          const o = audio.createOscillator(), g = audio.createGain(), t = audio.currentTime + i * .22;
          o.type = 'sine'; o.frequency.value = f;
          g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.25, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + 1.2);
          o.connect(g).connect(audio.destination); o.start(t); o.stop(t + 1.3);
        });
      } catch (e) { /* no sound, the bell still swings */ }
    };
    // what Mei says depends on the time in New York
    const greet = () => {
      const now = window.BB.nyNow(), s = window.BB.status(now), h = now.getHours();
      if (s.open && h < 11) return 'Good morning! Onigiri are still warm.';
      if (s.open && h < 15) return 'Come in! Have you eaten? Sit, sit.';
      if (s.open) return 'Come in, come in! Bao, we have a customer!';
      if (now.getDay() === 2) return 'Tuesday! Bao is fishing. Come back tomorrow.';
      if (h < 9) return 'Too early! Even Mochi is asleep.';
      return 'We\'re closed… but knock twice. Bao is still counting cans.';
    };
    door.addEventListener('click', () => {
      open = !open;
      door.classList.toggle('is-open', open);
      if (!open) { bubble.hidden = true; return; }
      ding();
      bubble.textContent = greet();
      bubble.hidden = false;
      bell.classList.remove('is-ring'); void bell.offsetWidth; bell.classList.add('is-ring');
      if (hasGsap && motion) gsap.fromTo(bubble, { scale: .4, rotation: -12, opacity: 0 }, { scale: 1, rotation: -3, opacity: 1, duration: .6, ease: 'back.out(2.2)', clearProps: 'transform' });
      clearTimeout(hideT);
      hideT = setTimeout(() => { open = false; door.classList.remove('is-open'); bubble.hidden = true; }, 6000);
    });

    /* ---------- the map: pick a route, it draws itself ---------- */
    const steps = $('#steps');
    const draw = (i) => {
      const r = ROUTES[i];
      $$('.route').forEach((b) => b.setAttribute('aria-pressed', +b.dataset.i === i));
      route.setAttribute('d', r.d);
      steps.innerHTML = r.steps.map((s, k) => `<li><i class="mono">${String(k + 1).padStart(2, '0')}</i><span>${esc(s)}</span></li>`).join('');
      const len = route.getTotalLength();
      route.style.strokeDasharray = `${len}`;
      if (hasGsap && motion) {
        gsap.fromTo(route, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' });
        gsap.from($$('li', steps), { x: -20, opacity: 0, duration: .5, stagger: .1, ease: 'power3.out', clearProps: 'transform,opacity' });
      } else route.style.strokeDashoffset = 0;
    };
    $$('.route').forEach((b) => b.addEventListener('click', () => draw(+b.dataset.i)));

    /* ---------- motion ---------- */
    if (!hasGsap || !motion) { draw(0); return; }
    gsap.set('.vl > span', { yPercent: 110 });
    gsap.set('.front', { y: 120, opacity: 0 });
    window.addEventListener('bb:ready', () => {
      gsap.timeline()
        .to('.vl > span', { yPercent: 0, duration: 1, ease: 'expo.out', stagger: .1 }, 0)
        .from('.vh-addr > *, .vh-now, .vh-txt .kicker', { y: 30, opacity: 0, duration: .7, stagger: .07, ease: 'power3.out' }, .3)
        .to('.front', { y: 0, opacity: 1, duration: 1, ease: 'back.out(1.3)', clearProps: 'transform' }, .2)
        .from('.fr-awning', { scaleY: 0, transformOrigin: 'top', duration: .6, ease: 'back.out(2)' }, .8);
    }, { once: true });

    // played when the section shows up (or is jumped past), then cleaned up for the CSS hovers
    const reveal = (targets, trigger, from, start = 'top 80%', after) => {
      const els = gsap.utils.toArray(targets); if (!els.length) return;
      gsap.set(els, { opacity: 0 });
      let done = false;
      const play = () => {
        if (done) return; done = true;
        gsap.fromTo(els, { ...from, opacity: 0 }, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: from.duration || .8, ease: from.ease || 'power3.out', stagger: from.stagger || 0, clearProps: 'transform,opacity' });
        if (after) after();
      };
      const st = ScrollTrigger.create({ trigger, start, once: true, onEnter: play, onLeave: play, onEnterBack: play });
      if (st.progress > 0) play();
    };
    route.style.strokeDasharray = '2000'; route.style.strokeDashoffset = '2000';
    reveal('.map-paper', '.map', { y: 80, rotation: 4, duration: 1, ease: 'back.out(1.4)' }, 'top 75%', () => setTimeout(() => draw(0), 500));
    reveal('.route', '.map', { x: -40, stagger: .08 }, 'top 75%');
    reveal('.clock-wrap', '.hrs', { scale: .6, rotation: -30, duration: 1, ease: 'elastic.out(1, .6)' });
    reveal('.hrs-list li', '.hrs', { x: 40, stagger: .05 });
    reveal('.kn', '.know-grid', { y: 90, rotation: () => gsap.utils.random(-20, 20), ease: 'back.out(1.6)', stagger: .06 }, 'top 85%');
    reveal('.bye-big, .bye-copy, .bye .btn', '.bye', { y: 50, stagger: .1 });
  });
})();
