/* ═══════════════════════════════════════════════════════════
   BENTO & BASKET · making of
   numbers, moodboard, palette, type specimens, the six pages and
   a before/after of one cutout
   ═══════════════════════════════════════════════════════════ */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

  const STATS = [['6', 'pages, one shop'], ['74', 'products on the shelves'], ['16', 'recipe cards'], ['80+', 'photos cut out, one by one'], ['1', 'very sleepy cat']];
  const PAL = [
    ['Ink', '--ink', '#141210', 'the type, the counter'], ['Paper', '--paper', '#F7F3EA', 'receipts and index cards'],
    ['Red', '--red', '#E8261B', 'prices, always'], ['Orange', '--orange', '#F2471C', 'the kitchen'],
    ['Yellow', '--yellow', '#FFD400', 'starbursts and stickers'], ['Lime', '--lime', '#D4F55A', 'the street outside'],
    ['Green', '--green', '#16A34A', 'the shop sign'], ['Blue', '--blue', '#1E3BD8', 'the flyer, Mei\'s pen'],
    ['Pink', '--pink', '#FF9FC6', 'the album'],
  ];
  const TYPES = [
    ['Dela Gothic One', 'var(--f-display)', 'Headlines and prices', 'SALE $2.49'],
    ['Bricolage Grotesque', 'var(--f-sans)', 'Body text, buttons', 'Have you eaten yet?'],
    ['Space Mono', 'var(--f-mono)', 'Receipts, labels, timers', 'TOTAL $12.20'],
    ['Yellowtail', 'var(--f-script)', 'Mei\'s handwriting', 'less salt than Bao says'],
    ['Noto Sans TC', 'var(--f-zh)', 'Chinese, Japanese, Korean', '便當與菜籃'],
  ];
  const PAGES = [
    ['index.html', 'Home', '入口', 'var(--yellow)', 'a sale poster', 'Drag the snacks out of the basket. Bao\'s soup builds itself as you scroll.'],
    ['aisles.html', 'Aisles', '貨架', 'var(--red)', 'a store map', 'Six shelves, a top-down map that follows you, and Ask Bao, who knows where everything is.'],
    ['recipes.html', 'Recipes', '食譜', 'var(--orange)', 'a recipe tin', 'Index cards in two handwritings. Open one: the dish spins in, the timers ding.'],
    ['flyer.html', 'Flyer', '特價', 'var(--blue)', 'a weekly flyer', '感謝祭 under a blue sky, coupons to clip, and your basket printed as a receipt.'],
    ['story.html', 'Our story', '故事', 'var(--pink)', 'a photo album', 'Fifty-one years, sideways. The year rolls on a till counter as you turn the pages.'],
    ['visit.html', 'Find us', '地址', 'var(--lime)', 'the shop front', 'The door sign follows New York time. Ring the bell. Bao drew the map.'],
  ];

  $('#coStats').innerHTML = STATS.map(([n, l]) => `<div><dt>${n}</dt><dd class="mono">${l}</dd></div>`).join('');
  $('#mood').innerHTML = [...Array(16)].map((_, i) => `<figure class="mood-i" style="--r:${[-2, 1.5, -1, 2, -1.5, 1, -2.5, 2.5][i % 8]}deg"><img src="img/COLOPHON/vibe-${String(i + 1).padStart(2, '0')}.webp" alt="" loading="lazy"></figure>`).join('');
  $('#pal').innerHTML = PAL.map(([n, v, hex, use]) => `
    <button class="sw" type="button" data-hex="${hex}" style="--c:var(${v})" aria-label="Copy ${n}, ${hex}">
      <span class="sw-chip"></span>
      <b>${n}</b><span class="mono">${hex}</span><small>${esc(use)}</small>
    </button>`).join('');
  $('#types').innerHTML = TYPES.map(([n, f, use, sample]) => `
    <div class="ty">
      <p class="ty-sample" style="font-family:${f}">${esc(sample)}</p>
      <p class="ty-meta"><b>${n}</b><span class="mono">${esc(use)}</span></p>
    </div>`).join('');
  $('#pages').innerHTML = PAGES.map(([href, n, zh, c, obj, d], i) => `
    <a class="pg" href="${href}" style="--c:${c}">
      <span class="pg-no mono">A0${i + 1}</span>
      <b class="pg-n">${n} <span class="zh">${zh}</span></b>
      <span class="pg-obj script">${obj}</span>
      <span class="pg-d">${esc(d)}</span>
      <span class="pg-go mono">visit →</span>
    </a>`).join('');

  document.addEventListener('DOMContentLoaded', () => {
    const { $$, motion, hasGsap } = window.BB;

    // before / after: drag to cut
    const ba = $('#ba'), range = $('.ba-range', ba);
    const set = () => ba.style.setProperty('--p', `${range.value}%`);
    range.addEventListener('input', set); set();

    // copy a colour
    $$('.sw').forEach((b) => b.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(b.dataset.hex); } catch (e) { /* no clipboard: the label still says it */ }
      const t = $('.mono', b), old = t.textContent;
      t.textContent = 'copied!'; b.classList.add('is-copied');
      setTimeout(() => { t.textContent = old; b.classList.remove('is-copied'); }, 1200);
    }));

    if (!hasGsap || !motion) return;
    gsap.set('.co-title > span', { yPercent: 110 });
    window.addEventListener('bb:ready', () => {
      gsap.timeline()
        .to('.co-title > span', { yPercent: 0, duration: 1, ease: 'expo.out', stagger: .1 })
        .from('.co-lede, .co-stats > div', { y: 30, opacity: 0, duration: .6, stagger: .06, ease: 'power3.out' }, .3);
    }, { once: true });
    // played when the section shows up (or is jumped past), then cleaned up for the CSS hovers
    const reveal = (targets, trigger, from) => {
      const els = gsap.utils.toArray(targets); if (!els.length) return;
      gsap.set(els, { opacity: 0 });
      let done = false;
      const play = () => {
        if (done) return; done = true;
        gsap.fromTo(els, { ...from, opacity: 0 }, { y: 0, rotation: 0, scale: 1, opacity: 1, duration: .7, ease: from.ease || 'power3.out', stagger: from.stagger || 0, clearProps: 'transform,opacity' });
      };
      const st = ScrollTrigger.create({ trigger, start: 'top 80%', once: true, onEnter: play, onLeave: play, onEnterBack: play });
      if (st.progress > 0) play();
    };
    reveal('.mood-i', '.mood', { y: 60, rotation: () => gsap.utils.random(-12, 12), stagger: .04, ease: 'back.out(1.6)' });
    reveal('.sw', '.pal', { y: 40, scale: .8, stagger: .04, ease: 'back.out(2)' });
    reveal('.ty', '.types', { y: 40, stagger: .07 });
    reveal('.pg', '.pages', { y: 60, rotation: () => gsap.utils.random(-6, 6), stagger: .06, ease: 'back.out(1.6)' });
  });
})();
