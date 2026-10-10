/* ═══════════════════════════════════════════════════════════
   BENTO & BASKET · our story
   one list of years drives the album timeline and its year counter;
   the cast and the cork board are built from their own lists.
   notes you pin are kept on this device only
   ═══════════════════════════════════════════════════════════ */
(() => {
  // obj: what Mei glued on the page for that year
  const YEARS = [
    {
      y: 1975, zh: '結婚', t: 'The wedding lunch', c: 'var(--pink)',
      obj: { type: 'photo', img: 'STORY/cut/wedding-lunch.jpg', cap: 'Taipei, spring 1975', ratio: '3/2' },
      p: 'They skipped the banquet and walked to the noodle shop on the corner, still in the dress. Bao ordered two bowls of beef noodle soup. Mei said it needed less salt. They have been arguing about it ever since.',
    },
    {
      y: 1979, zh: '食譜', t: 'The first index card', c: 'var(--orange)',
      obj: { type: 'card' },
      p: 'Bao finally wrote the soup down. Mei corrected it in red the same evening. The card is still in the tin, splattered, in two handwritings.',
      link: ['recipes.html', 'Open the recipe box'],
    },
    {
      y: 1986, zh: '行李', t: 'Two suitcases', c: 'var(--yellow)',
      obj: { type: 'suitcase' },
      p: 'Taipei to JFK with two suitcases. Mei\'s held the clothes. Bao\'s held eleven jars of chili bean paste, wrapped in his sweaters. Customs let them through. Mei smiled a lot.',
    },
    {
      y: 1988, zh: '開張', t: 'Opening day', c: 'var(--red)',
      obj: { type: 'receipt' },
      p: '88 Lantern Lane, a crooked little street off Canal, opened on 8 August 1988. Lucky numbers, Mei says. The first customer bought three packs of instant noodles and a bag of White Rabbit. The receipt is framed behind the till.',
    },
    {
      y: 1994, zh: '貨架', t: 'The aisles, final version', c: 'var(--blue)',
      obj: { type: 'aisles' },
      p: 'After six years of moving shelves around, Mei drew the map one last time. Nothing has moved since. Bao is not allowed to move anything. Not even the soy sauce.',
      link: ['aisles.html', 'Walk the aisles'],
    },
    {
      y: 2003, zh: '卡拉OK', t: 'Karaoke Thursdays', c: 'var(--ink)',
      obj: { type: 'neon' },
      p: 'Bao won a karaoke machine in a raffle and parked it next to the freezer. Every Thursday after closing, the lights go down and the regulars sing. It is not for sale. Stop asking.',
    },
    {
      y: 2011, zh: '釣魚', t: 'Tuesday is fishing day', c: 'var(--green)',
      obj: { type: 'sign' },
      p: 'Bao\'s doctor said "take a day off". Bao heard "go fishing". The shop has been closed on Tuesdays ever since. He has caught four fish in fifteen years.',
    },
    {
      y: 2019, zh: '貓', t: 'Mochi moves in', c: 'var(--lime)',
      obj: { type: 'photo', img: 'STORY/cut/mochi-moves-in.jpg', cap: 'night one, on the cookie shelf', ratio: '3/4' },
      p: 'A soaked calico walked in during a storm warning and fell asleep on the bottom shelf, between the cookies. Mei named her Mochi. She never left, and now runs the place from the rice bags.',
    },
    {
      y: 2026, zh: '今天', t: 'Still here', c: 'var(--pink)',
      obj: { type: 'photo', img: 'HOME/mei-bao-old.jpg', cap: 'the winter trip, last year', ratio: '4/3' },
      p: 'Fifty-one years married, thirty-eight behind the same counter. Mei still does the books. Bao still makes the soup. Less salt. Mostly.',
      link: ['visit.html', 'Come say hi'],
    },
  ];

  const CAST = [
    { zh: '梅', img: 'cast-mei', n: 'Auntie Mei', role: 'the books, the kimchi, the talking', fact: 'remembers every face since 1988', c: 'var(--red)' },
    { zh: '寶', img: 'cast-bao', n: 'Uncle Bao', role: 'the soup, the shelves, the karaoke', fact: 'denies all heavy lifting', c: 'var(--blue)' },
    { zh: '貓', img: 'cast-mochi', n: 'Mochi', role: 'head of security', fact: 'asleep on the rice bags. do not wake', c: 'var(--yellow)' },
    { zh: '吳', img: 'cast-wu', n: 'Mrs. Wu', role: 'the dumplings, every morning', fact: 'six per tray, never seven', c: 'var(--green)' },
    { zh: '表', img: 'cast-cousin', n: 'Bao\'s cousin', role: 'the eggs, from his farm', fact: 'nobody knows his real name', c: 'var(--pink)' },
  ];

  const NOTES = [
    { t: 'the beef noodle soup got me through my thesis. thank you Bao', n: 'Jun, 2019' },
    { t: 'Mei gave my son a White Rabbit every Saturday for ten years. he is 24 now and still comes in', n: 'Linda' },
    { t: 'sang My Way at karaoke Thursday. nobody clapped. Mochi did not wake up. 10/10', n: 'Tom' },
    { t: 'came in for one bag of rice, left with a recipe, a dumpling and a hug', n: 'a regular' },
    { t: 'please never move the soy sauce', n: 'everyone' },
    { t: 'closed on a Tuesday. again. see you Wednesday Bao', n: 'Priya' },
  ];
  const REPLIES = ['thank you! have you eaten?', 'come back Sunday, new card in the box', 'Bao read it twice. he pretends he didn\'t.', 'bring your mother next time', 'Mochi says hi (Mochi is asleep)'];

  const $ = (s, c = document) => c.querySelector(s);
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

  /* ═════════════ what's glued on each page ═════════════ */
  const OBJ = {
    photo: (o, y) => `
      <figure class="pol"><div class="slot" data-img="img/${o.img}" data-alt="${esc(y.t)}, ${y.y}" data-ratio="${o.ratio}"><span class="ph"><b>${y.y}</b></span></div><figcaption class="script">${esc(o.cap)}</figcaption></figure>`,
    card: () => `
      <div class="o-card">
        <p class="o-card-tab mono">Bao's card</p>
        <p class="o-card-t">Beef noodle soup <span class="zh">紅燒牛肉麵</span></p>
        <ol class="o-card-steps">
          <li>sear the shank, loud</li>
          <li>2 star anise, ginger, chili paste</li>
          <li>salt: <s>3 spoons</s> <span class="script">1!!</span></li>
          <li>simmer 3h. nap.</li>
        </ol>
        <p class="o-card-red script">less salt than Bao says — M.</p>
        <i class="o-card-stain"></i>
      </div>`,
    suitcase: () => `
      <div class="o-case">
        <figure class="o-case-bao slot cut" data-img="img/STORY/cut/suitcase-bao.webp" data-alt="Bao's black suitcase"><span class="ph"><b>Bao's</b></span></figure>
        <figure class="o-case-mei slot cut" data-img="img/STORY/cut/suitcase-mei.webp" data-alt="Mei's pink suitcase"><span class="ph"><b>Mei's</b></span></figure>
        <span class="o-case-st o-case-st--a mono">TPE<br>✈<br>JFK</span>
        <span class="o-case-st o-case-st--b zh">福</span>
        <span class="o-case-tag mono">BAO · no. 2 of 2<br>FRAGILE: chili inside</span>
        <figure class="o-case-jar slot cut" data-img="img/RECIPE/chili-bean-paste-recipe.png.webp" data-alt="A jar of chili bean paste"><span class="ph"><b>chili paste</b></span></figure>
      </div>`,
    receipt: () => `
      <div class="o-rcpt">
        <i class="rc-teeth rc-teeth--top"></i>
        <p class="o-rcpt-logo">BENTO<i>&amp;</i>BASKET</p>
        <p class="mono o-rcpt-sub">08/08/1988 · 09:02 · till 01</p>
        <p class="rc-dash" aria-hidden="true">- - - - - - - - - - - - - - - - - - - -</p>
        <p class="mono o-rcpt-l"><span>INSTANT NOODLES ×3</span><span>0.87</span></p>
        <p class="mono o-rcpt-l"><span>WHITE RABBIT</span><span>0.65</span></p>
        <p class="rc-dash" aria-hidden="true">- - - - - - - - - - - - - - - - - - - -</p>
        <p class="mono o-rcpt-l o-rcpt-tot"><span>TOTAL</span><span>$1.52</span></p>
        <p class="script o-rcpt-note">our first customer ♥</p>
        <i class="rc-teeth"></i>
      </div>`,
    aisles: () => `
      <div class="o-map">
        <p class="o-map-t mono">store plan · v.14 · <b>FINAL</b></p>
        <div class="o-map-grid">
          ${[['A01', 'snacks', 'var(--red)'], ['A02', 'noodles', 'var(--yellow)'], ['A03', 'sauces', 'var(--blue)'], ['A04', 'frozen', 'var(--orange)'], ['A05', 'greens', 'var(--lime)'], ['A06', 'tea', 'var(--pink)']]
            .map(([no, n, c]) => `<span style="--c:${c}"><b class="mono">${no}</b>${n}</span>`).join('')}
        </div>
        <p class="o-map-door mono">▲ door · till · Mei</p>
        <p class="o-map-red script">DO NOT MOVE. — Mei</p>
      </div>`,
    neon: () => `
      <div class="o-neon" data-karaoke role="button" tabindex="0" aria-label="Karaoke Thursday sign. Press to sing" title="press to sing">
        <p class="o-neon-zh zh">卡拉OK</p>
        <p class="o-neon-en">every THU</p>
        <p class="o-neon-mic" aria-hidden="true">🎤</p>
        <p class="o-neon-try mono">press to sing ▸</p>
      </div>`,
    sign: () => `
      <div class="o-sign">
        <p class="o-sign-t">CLOSED</p>
        <p class="o-sign-zh zh">釣魚去</p>
        <p class="o-sign-s script">gone fishing! back Wednesday 8:30</p>
        <p class="o-sign-fish" aria-hidden="true">🐟</p>
        <p class="o-sign-by script">— Bao</p>
      </div>`,
  };

  /* ═════════════ the timeline ═════════════ */
  $('#tlTrack').innerHTML = YEARS.map((y, i) => `
    <article class="ch ch--${y.obj.type}" data-i="${i}" style="--c:${y.c}">
      <div class="ch-obj">${OBJ[y.obj.type](y.obj, y)}</div>
      <div class="ch-txt">
        <p class="ch-year" aria-hidden="true">${y.y}</p>
        <p class="ch-zh zh">${y.zh}</p>
        <h2 class="ch-t"><span class="sr">${y.y}: </span>${esc(y.t)}</h2>
        <p class="ch-p">${esc(y.p)}</p>
        ${y.link ? `<a class="ch-link mono" href="${y.link[0]}">${esc(y.link[1])} <i aria-hidden="true">→</i></a>` : ''}
      </div>
      <p class="ch-no mono" aria-hidden="true">p. ${String(i + 1).padStart(2, '0')} / ${String(YEARS.length).padStart(2, '0')}</p>
    </article>`).join('');

  // the year counter: four rolling digits
  $('#tlOdo').innerHTML = [0, 1, 2, 3].map(() => `<span class="od"><span class="od-strip">${[...'0123456789'].map((d) => `<i>${d}</i>`).join('')}</span></span>`).join('');

  /* ═════════════ the cast ═════════════ */
  $('#castRow').innerHTML = CAST.map((p, i) => `
    <article class="tag" style="--c:${p.c};--r:${[-3, 2, -1, 3, -2][i]}deg">
      <p class="tag-hello"><b>HELLO</b><span class="mono">my name is</span></p>
      <div class="tag-body">
        <figure class="tag-pic slot" data-img="img/STORY/cut/${p.img}.jpg" data-alt="${esc(p.n)}" data-ratio="1/1"><span class="ph"><b>${esc(p.n)}</b></span></figure>
        <span class="tag-av zh" aria-hidden="true">${p.zh}</span>
        <h3 class="tag-n script">${esc(p.n)}</h3>
        <p class="tag-role">${esc(p.role)}</p>
        <p class="tag-fact mono">${esc(p.fact)}</p>
      </div>
    </article>`).join('');

  /* ═════════════ behaviour (needs main.js) ═════════════ */
  document.addEventListener('DOMContentLoaded', () => {
    const { $$, motion, hasGsap } = window.BB;

    /* ---------- year counter follows the page you're on ---------- */
    const strips = $$('.od-strip'), bar = $('#tlBar'), chs = $$('.ch');
    let cur = -1;
    const setYear = (i) => {
      if (i === cur) return; cur = i;
      String(YEARS[i].y).split('').forEach((d, k) => { strips[k].style.transform = `translateY(${-d * 10}%)`; });
      bar.style.width = `${((i + 1) / YEARS.length) * 100}%`;
      chs.forEach((c, k) => c.classList.toggle('is-on', k === i));
    };
    setYear(0);
    // whichever page sits closest to the middle of the screen
    const nearest = (axis) => {
      const mid = axis === 'x' ? innerWidth / 2 : innerHeight / 2;
      let best = 0, d = Infinity;
      chs.forEach((c, k) => {
        const r = c.getBoundingClientRect(), m = axis === 'x' ? r.left + r.width / 2 : r.top + r.height / 2;
        if (Math.abs(m - mid) < d) { d = Math.abs(m - mid); best = k; }
      });
      return best;
    };

    const track = $('#tlTrack');
    const wide = matchMedia('(min-width: 900px)');
    if (hasGsap && motion && window.ScrollTrigger) {
      ScrollTrigger.matchMedia({
        // big screens: the album scrolls sideways, pinned
        '(min-width: 900px)': () => {
          const dist = () => track.scrollWidth - innerWidth;
          const tw = gsap.to(track, {
            x: () => -dist(), ease: 'none',
            // on the tween, not the trigger: scrub keeps sliding after the scroll stops
            onUpdate: () => setYear(nearest('x')),
            scrollTrigger: { trigger: '.tl', pin: '.tl-pin', start: 'top top', end: () => '+=' + dist(), scrub: .6, invalidateOnRefresh: true },
          });
          // each glued object swings in as its page slides past
          chs.forEach((c) => {
            gsap.from($('.ch-obj > *', c), { rotation: -18, scale: .7, opacity: 0, ease: 'back.out(1.6)', scrollTrigger: { trigger: c, containerAnimation: tw, start: 'left 85%', end: 'left 45%', scrub: true } });
          });
        },
        '(max-width: 899px)': () => {
          ScrollTrigger.create({ trigger: '.tl', start: 'top bottom', end: 'bottom top', onUpdate: () => setYear(nearest('y')) });
        },
      });
    } else {
      window.addEventListener('scroll', () => setYear(nearest(wide.matches ? 'x' : 'y')), { passive: true });
    }

    /* ---------- the cork board ---------- */
    const KEY = 'bb-notes';
    let mine = [];
    try { mine = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { /* nothing pinned yet */ }
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(mine)); } catch (e) { /* private mode */ } };
    const cork = $('#cork');
    const note = (n, i, own) => `
      <article class="note${own ? ' note--mine' : ''}" style="--r:${((i * 37) % 9) - 4}deg;--k:${i % 4}">
        <i class="pin" aria-hidden="true"></i>
        <p class="note-t">${esc(n.t)}</p>
        <p class="note-n mono">— ${esc(n.n || 'a regular')}</p>
        ${own ? `<p class="note-re script">Mei: ${esc(n.re)}</p><button class="note-x mono" type="button" data-i="${mine.indexOf(n)}" aria-label="Take your note down">unpin ×</button>` : ''}
      </article>`;
    const paint = () => { cork.innerHTML = [...mine.slice().reverse().map((n, i) => note(n, i, true)), ...NOTES.map((n, i) => note(n, i + mine.length, false))].join(''); };
    paint();
    $('#gbForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const t = $('#gbText').value.trim(); if (!t) return;
      mine.push({ t, n: $('#gbName').value.trim(), re: REPLIES[Math.floor(Math.random() * REPLIES.length)] });
      save(); paint(); e.target.reset();
      const fresh = $('.note--mine', cork);
      if (hasGsap && motion && fresh) gsap.from(fresh, { y: -120, rotation: 25, scale: 1.3, opacity: 0, duration: .8, ease: 'bounce.out', clearProps: 'transform,opacity' });
    });
    cork.addEventListener('click', (e) => {
      const x = e.target.closest('.note-x'); if (!x) return;
      mine.splice(+x.dataset.i, 1); save(); paint();
    });

    /* ---------- motion ---------- */
    if (!hasGsap || !motion) return;
    gsap.set('.sl > span', { yPercent: 110 });
    gsap.set('.sh-pics .pol', { y: 200, rotation: 25, opacity: 0 });
    window.addEventListener('bb:ready', () => {
      gsap.timeline()
        .to('.sl > span', { yPercent: 0, duration: 1, ease: 'expo.out', stagger: .08 }, 0)
        .from('.sh-copy, .sh-hint, .sh-txt .kicker', { y: 30, opacity: 0, duration: .7, stagger: .08, ease: 'power3.out' }, .3)
        .to('.sh-pics .pol', { y: 0, rotation: 0, opacity: 1, duration: 1.1, ease: 'back.out(1.4)', stagger: .15, clearProps: 'transform' }, .2)
        .from('.sh-stamp', { scale: 0, duration: .5, ease: 'back.out(3)' }, .9);
    }, { once: true });

    // played when the section shows up (or is jumped past), then cleaned up for the CSS hovers
    const reveal = (targets, trigger, from, start = 'top 80%') => {
      const els = gsap.utils.toArray(targets); if (!els.length) return;
      gsap.set(els, { opacity: 0 });
      let done = false;
      const play = () => {
        if (done) return; done = true;
        gsap.fromTo(els, { ...from, opacity: 0 }, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: from.duration || .8, ease: from.ease || 'power3.out', stagger: from.stagger || 0, clearProps: 'transform,opacity' });
      };
      const st = ScrollTrigger.create({ trigger, start, once: true, onEnter: play, onLeave: play, onEnterBack: play });
      if (st.progress > 0) play();
    };
    reveal('.tag', '.cast-row', { y: 120, rotation: () => gsap.utils.random(-25, 25), ease: 'back.out(1.6)', stagger: .08 }, 'top 85%');
    reveal('.note', '.cork', { y: -80, rotation: () => gsap.utils.random(-30, 30), scale: 1.2, ease: 'bounce.out', duration: .9, stagger: .07 }, 'top 75%');
    reveal('.next-big, .next-copy, .next .btn', '.next', { y: 50, stagger: .1 });
  });
})();
