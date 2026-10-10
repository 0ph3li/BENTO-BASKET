/* ═══════════════════════════════════════════════════════════
   BENTO & BASKET · recipes
   one list of recipe cards drives the tin, the grid, the filters,
   "shop it" and the open card with its kitchen timers
   ═══════════════════════════════════════════════════════════ */
(() => {
  // ingredients reuse the product ids from the aisles, so the basket counts add up
  const I = {
    beef: { n: 'Beef shank', p: 8.90, img: 'RECIPE/beef-shank-recipe.webp' },
    wheatnoodles: { n: 'Wheat noodles', p: 2.20, img: 'RECIPE/wheat-noodles-recipe.webp' },
    bokchoy: { n: 'Bok choy', p: 1.80, img: 'RECIPE/bok-choy-recipe.webp' },
    doubanjiang: { n: 'Chili bean paste', p: 3.40, img: 'RECIPE/chili-bean-paste-recipe.png.webp' },
    staranise: { n: 'Star anise', p: 1.20, img: 'RECIPE/star-anise-recipe.webp' },
    ginger: { n: 'Ginger', p: 0.90, img: 'RECIPE/ginger-recipe.webp' },
    tomato: { n: 'Tomato', p: 0.80, img: 'RECIPE/tomato-recipe.webp' },
    scallion: { n: 'Scallion', p: 0.70, img: 'RECIPE/scallion-recipe.webp' },
    salmon: { n: 'Salmon', p: 14.90, img: 'AISLES/cut/salmon.webp' },
    miso: { n: 'Miso paste', p: 6.80, img: 'AISLES/cut/miso.webp' },
    rice: { n: 'Jasmine rice', p: 12.90, img: 'AISLES/cut/jasmine-rice.webp' },
    furikake: { n: 'Furikake', p: 3.30, img: 'AISLES/cut/furikake.webp' },
    gyoza: { n: 'Chicken gyoza', p: 9.50, img: 'AISLES/cut/gyoza.webp' },
    soy: { n: 'Soy sauce', p: 4.20, img: 'AISLES/cut/soy-sauce.webp' },
    rayu: { n: 'Taberu rayu', p: 5.20, img: 'AISLES/cut/rayu.webp' },
    yakisoba: { n: 'Yakisoba', p: 2.40, img: 'AISLES/cut/yakisoba.webp' },
    napa: { n: 'Napa cabbage', p: 2.49, img: 'FLYER/napa-cabbage.webp' },
    shiitake: { n: 'Shiitake', p: 3.60, img: 'AISLES/cut/shiitake.webp' },
    tofu: { n: 'Tofu', p: 2.20, img: 'FLYER/tofu-cut.webp' },
    chilicrisp: { n: 'Chili crisp', p: 3.90, img: 'HOME/chili-crisp.webp' },
    curry: { n: 'Curry mix', p: 5.40, img: 'AISLES/cut/curry.webp' },
    seitan: { n: 'Seitan', p: 4.80, img: 'AISLES/cut/seitan.webp' },
    renkon: { n: 'Lotus root', p: 3.20, img: 'AISLES/cut/renkon.webp' },
    udon: { n: 'Fresh udon', p: 1.90, img: 'AISLES/cut/udon.webp' },
    tempura: { n: 'Shrimp tempura', p: 6.50, img: 'AISLES/cut/tempura.webp' },
    edamame: { n: 'Edamame', p: 2.80, img: 'AISLES/cut/edamame.webp' },
    gomadare: { n: 'Goma dare', p: 4.60, img: 'AISLES/cut/gomadare.webp' },
    matcha: { n: 'Matcha milk', p: 8.40, img: 'AISLES/cut/matcha.webp' },
    dorayaki: { n: 'Dorayaki', p: 3.80, img: 'AISLES/cut/dorayaki.webp' },
    eggs: { n: 'Brown eggs', p: 3.20, img: 'AISLES/cut/eggs.webp' },
    kimchi: { n: 'Kimchi', p: 6.50, img: 'AISLES/cut/kimchi.webp' },
    tempeh: { n: 'Tempeh', p: 3.90, img: 'AISLES/cut/tempeh.webp' },
    garlic: { n: 'Garlic', p: 0.60, img: 'AISLES/cut/garlic.webp' },
    daikon: { n: 'Daikon', p: 1.50, img: 'AISLES/cut/daikon.webp' },
    enoki: { n: 'Enoki', p: 1.40, img: 'AISLES/cut/enoki.webp' },
    sprouts: { n: 'Bean sprouts', p: 0.90, img: 'AISLES/cut/bean-sprouts.webp' },
    basil: { n: 'Thai basil', p: 1.60, img: 'AISLES/cut/thai-basil.webp' },
    soba: { n: 'Soba', p: 3.10, img: 'AISLES/cut/soba.webp' },
    vermicelli: { n: 'Rice vermicelli', p: 1.70, img: 'AISLES/cut/vermicelli.webp' },
    wrappers: { n: 'Dumpling wrappers', p: 2.80, img: 'AISLES/cut/dumpling-wrappers.webp' },
    sesameoil: { n: 'Sesame oil', p: 5.90, img: 'AISLES/cut/sesame-oil.webp' },
    vinegar: { n: 'Rice vinegar', p: 3.60, img: 'AISLES/cut/rice-vinegar.webp' },
    chinkiang: { n: 'Black vinegar', p: 3.20, img: 'AISLES/cut/chinkiang.webp' },
    gochujang: { n: 'Gochujang', p: 6.20, img: 'AISLES/cut/gochujang.webp' },
    sichuan: { n: 'Sichuan pepper', p: 4.90, img: 'AISLES/cut/sichuan-pepper.webp' },
    mirin: { n: 'Mirin', p: 4.40, img: 'AISLES/cut/mirin.webp' },
    soymilk: { n: 'Soy milk', p: 1.50, img: 'AISLES/cut/soy-milk.webp' },
    bubbletea: { n: 'Bubble tea kit', p: 7.90, img: 'AISLES/cut/bubble-tea.webp' },
  };

  const RECIPES = [
    {
      id: 'beef-noodle', name: 'Beef noodle soup', zh: '紅燒牛肉麵', by: 'bao', mins: 180, time: '3 h', heat: 2, tags: ['spicy'], serves: 4, c: 'var(--orange)',
      dish: 'RECIPE/beef-noodles-soup-cut.webp', line: 'The house special. The one people cross town for.',
      ings: ['beef', 'wheatnoodles', 'bokchoy', 'doubanjiang', 'staranise', 'ginger', 'tomato', 'scallion'],
      steps: [
        ['Cut the beef shank in big chunks and sear it until it\'s brown and loud.'],
        ['Fry ginger, scallion, 2 star anise and 2 tbsp chili bean paste for one minute.'],
        ['Add tomato, the beef and 2 L of water. Simmer gently. Nap optional.', 150 * 60],
        ['Boil the noodles for 3 minutes. Blanch the bok choy for the last 40 seconds.', 180],
        ['Noodles in the bowl, broth and beef on top, scallion last. Slurp loudly, it\'s polite.'],
      ],
      tip: 'less salt than Bao says — Mei',
    },
    {
      id: 'miso-salmon', name: 'Miso salmon donburi', zh: '味噌鮭丼', by: 'mei', mins: 20, time: '20 min', heat: 0, tags: [], serves: 2, c: 'var(--pink)',
      ings: ['salmon', 'miso', 'rice', 'furikake', 'scallion'],
      steps: [
        ['Rinse the rice until the water runs clear, then cook it.'],
        ['Mix 1 tbsp miso, 1 tsp soy and 1 tsp honey. Brush it all over the salmon.'],
        ['Grill the salmon, skin side down.', 8 * 60],
        ['Rice in a bowl, flake the salmon on top, furikake and scallion. Done.'],
      ],
      tip: 'burn the edges a little. that\'s the good part.',
    },
    {
      id: 'gyoza', name: 'Gyoza night', zh: '煎餃', by: 'bao', mins: 12, time: '12 min', heat: 1, tags: ['quick', 'spicy'], serves: 2, c: 'var(--yellow)',
      ings: ['gyoza', 'soy', 'rayu', 'scallion'],
      steps: [
        ['A little oil in a cold pan. Gyoza flat side down, medium heat.', 120],
        ['Add 1/3 cup of water, lid on, let them steam.', 5 * 60],
        ['Lid off, fry until the bottoms are crispy again.', 60],
        ['Dip: soy sauce and a spoon of rayu. Bao uses two spoons.'],
      ],
      tip: 'flip the whole pan onto a plate. practise first.',
    },
    {
      id: 'mapo', name: 'Mapo tofu, Bao style', zh: '麻婆豆腐', by: 'bao', mins: 25, time: '25 min', heat: 3, tags: ['spicy', 'veggie'], serves: 3, c: 'var(--red)',
      ings: ['tofu', 'doubanjiang', 'sichuan', 'chilicrisp', 'ginger', 'scallion', 'rice'],
      steps: [
        ['Cut the tofu in cubes and keep them in hot salted water while you cook.'],
        ['Fry ginger, 2 tbsp chili bean paste and a pinch of Sichuan pepper until the oil goes red.'],
        ['Add a cup of water, slide in the tofu, simmer.', 4 * 60],
        ['Thicken with a little cornstarch, top with chili crisp and scallion. Over rice.'],
      ],
      tip: 'Mei makes it with half the chili. Bao doubles it. Both are right.',
    },
    {
      id: 'yakisoba', name: 'Ten-minute yakisoba', zh: '焼きそば', by: 'mei', mins: 10, time: '10 min', heat: 0, tags: ['quick', 'veggie'], serves: 2, c: 'var(--lime)',
      ings: ['yakisoba', 'napa', 'shiitake', 'scallion'],
      steps: [
        ['Slice the napa and the shiitake. Fry them hot and fast.', 3 * 60],
        ['Add the noodles and a splash of water, loosen them with chopsticks.', 2 * 60],
        ['Stir in the sauce packet, toss, scallion on top.'],
      ],
      tip: 'a fried egg on top makes it dinner.',
    },
    {
      id: 'udon', name: 'Tempura udon', zh: '天ぷらうどん', by: 'bao', mins: 15, time: '15 min', heat: 0, tags: ['quick'], serves: 2, c: 'var(--blue)',
      ings: ['udon', 'tempura', 'shiitake', 'soy', 'scallion'],
      steps: [
        ['Tempura in a hot oven until it crackles.', 10 * 60],
        ['Simmer 600 ml water, 3 tbsp soy and the shiitake.', 5 * 60],
        ['Udon in the broth for 2 minutes, no more.', 120],
        ['Into bowls, tempura on top at the very last second so it stays crunchy.'],
      ],
      tip: 'eat the tempura first. Bao never waits.',
    },
    {
      id: 'curry', name: 'Seitan curry rice', zh: '咖哩飯', by: 'mei', mins: 40, time: '40 min', heat: 1, tags: ['veggie'], serves: 4, c: 'var(--green)',
      ings: ['curry', 'seitan', 'renkon', 'shiitake', 'rice'],
      steps: [
        ['Fry the seitan, sliced lotus root and shiitake until golden.'],
        ['Add 800 ml water and simmer until the lotus root is soft.', 15 * 60],
        ['Heat off, melt in the curry blocks, then simmer and stir.', 5 * 60],
        ['Serve over rice. It\'s better tomorrow, everyone knows.'],
      ],
      tip: 'grate an apple in. don\'t tell Bao.',
    },
    {
      id: 'miso-soup', name: 'Miso soup, daikon & tofu', zh: '味噌汁', by: 'mei', mins: 15, time: '15 min', heat: 0, tags: ['quick', 'veggie'], serves: 3, c: 'var(--yellow)',
      ings: ['miso', 'daikon', 'tofu', 'enoki', 'scallion'],
      steps: [
        ['Daikon in thin half-moons, into 800 ml water with a few shiitake stems.', 8 * 60],
        ['Add tofu cubes and enoki for a minute.', 60],
        ['Heat off. Dissolve 3 tbsp miso through a ladle. Never boil it again.'],
        ['Scallion on top. Drink it out of the bowl.'],
      ],
      tip: 'breakfast at 6am before the delivery van.',
    },
    {
      id: 'matcha', name: 'Matcha milk & dorayaki', zh: '抹茶ミルク', by: 'mei', mins: 3, time: '3 min', heat: 0, tags: ['quick', 'sweet', 'veggie'], serves: 1, c: 'var(--lime)',
      ings: ['matcha', 'dorayaki'],
      steps: [
        ['Two spoons of matcha milk powder in a glass of cold milk. Stir hard.'],
        ['Warm the dorayaki for 10 seconds.', 10],
        ['Sit down. Close the shop for five minutes. You earned it.'],
      ],
      tip: 'Mei\'s 4pm. do not disturb.',
    },
    {
      id: 'tomato-egg', name: 'Tomato & egg', zh: '番茄炒蛋', by: 'mei', mins: 10, time: '10 min', heat: 0, tags: ['veggie'], serves: 2, c: 'var(--red)',
      ings: ['tomato', 'eggs', 'scallion', 'garlic', 'rice'],
      steps: [
        ['Beat 4 eggs with a pinch of salt. Scramble them soft and take them out.', 60],
        ['Garlic in the pan, then the tomatoes in wedges, a pinch of sugar. Let them slump.', 3 * 60],
        ['Eggs back in, fold twice, scallion on top. Over rice, with the juice.'],
      ],
      tip: 'the first thing Mei ever cooked for Bao. he still asks for it.',
    },
    {
      id: 'tempeh-krapow', name: 'Tempeh krapow', zh: '打拋天貝', by: 'bao', mins: 15, time: '15 min', heat: 2, tags: ['spicy', 'veggie'], serves: 2, c: 'var(--green)',
      ings: ['tempeh', 'basil', 'garlic', 'soy', 'eggs', 'rice'],
      steps: [
        ['Crumble the tempeh with your hands, small like mince.'],
        ['Lots of garlic and a chopped chili in hot oil, then the tempeh. Fry until crispy.', 5 * 60],
        ['1 tbsp soy, 1 tsp sugar, a splash of water. Heat off, a whole fistful of Thai basil.'],
        ['Fry an egg with crispy edges. Rice, krapow, egg on top.', 2 * 60],
      ],
      tip: 'Bao says nobody notices it\'s not pork. everybody notices.',
    },
    {
      id: 'kimchi-rice', name: 'Kimchi fried rice', zh: '김치볶음밥', by: 'bao', mins: 15, time: '15 min', heat: 2, tags: ['spicy', 'veggie'], serves: 2, c: 'var(--orange)',
      ings: ['kimchi', 'rice', 'gochujang', 'eggs', 'sesameoil', 'scallion'],
      steps: [
        ['Chop a cup of kimchi. Fry it in a little oil until it caramelises.', 3 * 60],
        ['Add yesterday\'s rice, 1 tbsp gochujang and a splash of kimchi juice. Toss hard.', 3 * 60],
        ['Make a well, fry an egg right in the pan.', 2 * 60],
        ['Three drops of sesame oil, scallion, eat from the pan.'],
      ],
      tip: 'cold rice only. fresh rice goes mushy. ask Mei how she knows.',
    },
    {
      id: 'sesame-soba', name: 'Cold sesame soba', zh: 'ごまそば', by: 'mei', mins: 12, time: '12 min', heat: 0, tags: ['veggie'], serves: 2, c: 'var(--yellow)',
      ings: ['soba', 'gomadare', 'sprouts', 'vinegar', 'sesameoil', 'scallion'],
      steps: [
        ['Boil the soba.', 4 * 60],
        ['Rinse it under cold water, rubbing with your hands, until it squeaks.'],
        ['Blanch the bean sprouts for 30 seconds, then ice water.', 30],
        ['Goma dare, a splash of rice vinegar, a drop of sesame oil. Toss, scallion on top.'],
      ],
      tip: 'August lunch. eat it standing next to the fridge.',
    },
    {
      id: 'enoki-vermicelli', name: 'Garlic enoki vermicelli', zh: '蒜蓉金針菇', by: 'mei', mins: 15, time: '15 min', heat: 1, tags: ['spicy', 'veggie'], serves: 2, c: 'var(--pink)',
      ings: ['enoki', 'vermicelli', 'garlic', 'soy', 'chilicrisp', 'scallion'],
      steps: [
        ['Soak the vermicelli in warm water until soft. Lay it on a plate.', 8 * 60],
        ['Tear the enoki into little bunches and pile them on top.'],
        ['Fry a whole head of chopped garlic in oil with 2 tbsp soy, pour it over.'],
        ['Steam the plate.', 8 * 60],
        ['Chili crisp and scallion on top. Splash with hot oil so it sizzles.'],
      ],
      tip: 'the noodles drink all the garlic. that\'s the point.',
    },
    {
      id: 'veggie-dumplings', name: 'Sunday veggie dumplings', zh: '素水餃', by: 'mei', mins: 60, time: '1 h', heat: 0, tags: ['veggie'], serves: 4, c: 'var(--lime)',
      ings: ['wrappers', 'napa', 'shiitake', 'tofu', 'ginger', 'sesameoil', 'chinkiang'],
      steps: [
        ['Chop the napa fine, salt it, squeeze out every drop of water.', 10 * 60],
        ['Mix with crumbled tofu, minced shiitake, ginger, soy and sesame oil.'],
        ['A spoon of filling in each wrapper. Wet the edge, fold, pinch pleats. Bao counts.'],
        ['Boil. When they float, add a cup of cold water. Twice.', 6 * 60],
        ['Dip: black vinegar, a little soy, ginger in strips.'],
      ],
      tip: 'ugly ones are for the cook.',
    },
    {
      id: 'bubble-tea', name: 'Brown sugar bubble tea', zh: '黑糖珍珠奶茶', by: 'bao', mins: 25, time: '25 min', heat: 0, tags: ['sweet', 'veggie'], serves: 2, c: 'var(--blue)',
      ings: ['bubbletea', 'soymilk'],
      steps: [
        ['Boil the pearls, stirring so they don\'t stick.', 15 * 60],
        ['Lid on, heat off, let them sit.', 5 * 60],
        ['Drain, roll them in the brown sugar syrup from the kit.'],
        ['Syrup up the sides of the glass, pearls, ice, cold soy milk. Fat straw.'],
      ],
      tip: 'after closing. lights off. karaoke on.',
    },
  ];

  // the finished dish, cut out, sits beside the open card: img/RECIPE/dishes/cut/<id>.webp
  const photo = (r) => `img/${r.dish || `RECIPE/dishes/cut/${r.id}.webp`}`;

  const $ = (s, c = document) => c.querySelector(s);
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const total = (r) => r.ings.reduce((a, k) => a + I[k].p, 0);
  const chili = (n) => n ? `<span class="heat" aria-label="${['', 'mild', 'medium', 'hot'][n]}">${'<i></i>'.repeat(n)}</span>` : '<span class="heat heat--0">no chili</span>';
  const who = (b) => (b === 'mei' ? 'Mei' : 'Bao');
  const veg = (r) => r.tags.includes('veggie');
  const stamp = '<span class="veg" title="Vegetarian"><b class="zh">素</b><i>veggie</i></span>';

  /* ═════════════ the tin: one tab per recipe ═════════════ */
  // the tin holds nine tabs, a mix of old favourites and new cards (all sixteen are in the grid)
  const TIN = ['beef-noodle', 'miso-salmon', 'gyoza', 'mapo', 'tomato-egg', 'tempeh-krapow', 'kimchi-rice', 'matcha', 'bubble-tea'];
  $('#tinCards').innerHTML = TIN.map((id) => RECIPES.find((r) => r.id === id)).map((r, i) => `
    <button class="tcard" type="button" data-id="${r.id}" style="--c:${r.c};--i:${i};--x:${(i * 27) % 72}%" aria-label="Open ${esc(r.name)}">
      <span class="tcard-tab">${esc(r.name)}</span>
    </button>`).join('');

  /* ═════════════ the grid of index cards ═════════════ */
  $('#grid').innerHTML = RECIPES.map((r, i) => `
    <article class="rcard${r.dish ? ' rcard--hero' : ''}" id="r-${r.id}" data-id="${r.id}" data-tags="${[r.by, r.mins <= 15 ? 'quick' : '', ...r.tags].join(' ')}" style="--c:${r.c};--r:${[-1.5, 1.2, -.6, 1.8, -1.2, .8, -1.8, 1, -.4][i % 9]}deg">
      <span class="rc-tab mono">${who(r.by)}'s card</span>
      ${r.dish ? `<figure class="rc-dish slot cut" data-img="img/${r.dish}" data-alt="${esc(r.name)}"><span class="ph"><b>${esc(r.name)}</b></span></figure>` : ''}
      <div class="rc-stickers" aria-hidden="true">
        ${r.ings.map((k, j) => `<figure class="rc-st slot cut" data-k="${k}" data-img="img/${I[k].img}" style="--j:${j}"><span class="ph"><b>${esc(I[k].n)}</b></span></figure>`).join('')}
      </div>
      ${veg(r) ? stamp : ''}
      <h2 class="rc-name">${esc(r.name)}</h2>
      <p class="rc-zh zh">${r.zh}</p>
      ${r.line ? `<p class="rc-line">${esc(r.line)}</p>` : ''}
      <p class="rc-meta mono"><span>⏱ ${r.time}</span><span>serves ${r.serves}</span>${chili(r.heat)}</p>
      <p class="rc-tip script">${esc(r.tip)}</p>
      <div class="rc-btns">
        <button class="rc-cook" type="button">Cook it <i aria-hidden="true">→</i></button>
        <button class="rc-shop mono" type="button">+ shop it · $${total(r).toFixed(2)}</button>
      </div>
    </article>`).join('');

  /* ═════════════ behaviour (needs main.js) ═════════════ */
  document.addEventListener('DOMContentLoaded', () => {
    const { $$, motion, hasGsap } = window.BB;
    const byId = Object.fromEntries(RECIPES.map((r) => [r.id, r]));

    // shop it: every ingredient sticker flies into the basket, one after the other
    $$('.rcard').forEach((card) => {
      const r = byId[card.dataset.id];
      $('.rc-cook', card).addEventListener('click', () => open(r.id));
      $('.rc-shop', card).addEventListener('click', (e) => {
        const btn = e.currentTarget;
        $$('.rc-st', card).forEach((st, j) => setTimeout(() => window.BB.fly(st, st.dataset.k), j * 110));
        btn.textContent = `✓ ${r.ings.length} items in the basket`;
        btn.classList.add('is-done');
      });
    });
    $$('.tcard').forEach((t) => t.addEventListener('click', () => open(t.dataset.id)));

    /* ---------- filters (and the Mei / Bao buttons in the hero) ---------- */
    const count = $('#cardsCount');
    const paintCount = (n, f) => { count.textContent = f === 'all' ? `${n} cards in the box` : `${n} card${n === 1 ? '' : 's'} · ${f === 'mei' ? 'Mei is cooking' : f === 'bao' ? 'Bao is cooking' : f}`; };
    const filter = (f) => {
      $$('#filters button').forEach((b) => b.classList.toggle('is-on', b.dataset.f === f));
      $$('.who-btn').forEach((b) => b.classList.toggle('is-on', b.dataset.f === f));
      const cards = $$('.rcard');
      const show = cards.filter((c) => f === 'all' || c.dataset.tags.split(' ').includes(f));
      const hide = cards.filter((c) => !show.includes(c));
      paintCount(show.length, f);
      if (!hasGsap || !motion) { cards.forEach((c) => { c.hidden = !show.includes(c); }); return; }
      gsap.to(hide, { scale: .8, opacity: 0, duration: .25, ease: 'power2.in', onComplete: () => { hide.forEach((c) => { c.hidden = true; }); show.forEach((c) => { c.hidden = false; }); gsap.fromTo(show, { y: 50, scale: .9, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: .55, ease: 'back.out(1.6)', stagger: .05, onComplete: () => ScrollTrigger.refresh() }); } });
      if (!hide.length) gsap.fromTo(show, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .45, stagger: .04 });
    };
    $$('#filters button').forEach((b) => b.addEventListener('click', () => filter(b.dataset.f)));
    $$('.who-btn').forEach((b) => b.addEventListener('click', () => {
      const f = b.classList.contains('is-on') ? 'all' : b.dataset.f;
      filter(f);
      window.BB.scrollTo('#cards');
    }));
    paintCount(RECIPES.length, 'all');

    /* ---------- the open card ---------- */
    const modal = $('#modal'), mcard = $('#mcard'), mdish = $('#mdish');
    let lastFocus = null, timers = [];
    const fmt = (s) => s >= 3600 ? `${Math.floor(s / 3600)}:${String(Math.floor(s / 60) % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}` : `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
    let audio;
    const ding = () => {
      try {
        audio = audio || new (window.AudioContext || window.webkitAudioContext)();
        [880, 1320].forEach((f, i) => {
          const o = audio.createOscillator(), g = audio.createGain();
          o.type = 'triangle'; o.frequency.value = f;
          g.gain.setValueAtTime(.0001, audio.currentTime + i * .18);
          g.gain.exponentialRampToValueAtTime(.3, audio.currentTime + i * .18 + .02);
          g.gain.exponentialRampToValueAtTime(.0001, audio.currentTime + i * .18 + .9);
          o.connect(g).connect(audio.destination); o.start(audio.currentTime + i * .18); o.stop(audio.currentTime + i * .18 + 1);
        });
      } catch (e) { /* no sound, the button still flashes */ }
    };
    function open(id) {
      const r = byId[id]; if (!r) return;
      lastFocus = document.activeElement;
      mcard.style.setProperty('--c', r.c);
      mcard.innerHTML = `
        <button class="m-close" type="button" data-close aria-label="Close the card">×</button>
        <header class="m-head">
          <p class="m-by mono">${who(r.by)}'s card · serves ${r.serves} · ⏱ ${r.time}</p>
          ${veg(r) ? stamp : ''}
          <h2 class="m-title" id="mTitle">${esc(r.name)}</h2>
          <p class="m-zh zh">${r.zh}</p>
        </header>
        <div class="m-body">
          <div class="m-ings">
            <p class="m-h mono">you'll need</p>
            <ul>${r.ings.map((k) => `<li><label><input type="checkbox"><img src="img/${I[k].img}" alt=""><span>${esc(I[k].n)}</span><b>$${I[k].p.toFixed(2)}</b></label></li>`).join('')}</ul>
            <p class="m-tot mono"><span>all of it</span><b>$${total(r).toFixed(2)}</b></p>
          </div>
          <div class="m-steps">
            <p class="m-h mono">then</p>
            <ol>${r.steps.map(([t, sec], i) => `<li><label><input type="checkbox"><i>${String(i + 1).padStart(2, '0')}</i><span>${esc(t)}</span></label>${sec ? `<button class="timer mono" type="button" data-s="${sec}">⏱ ${fmt(sec)}</button>` : ''}</li>`).join('')}</ol>
            <p class="m-tip script">${esc(r.tip)}</p>
          </div>
        </div>`;
      mdish.classList.remove('has-img');
      mdish.innerHTML = `<img src="${photo(r)}" alt="${esc(r.name)}, ready to eat" draggable="false">`;
      $('img', mdish).onload = () => mdish.classList.add('has-img');
      // kitchen timers: tap to start, tap again to stop
      $$('.timer', mcard).forEach((b) => {
        let left = +b.dataset.s, iv = null;
        b.addEventListener('click', () => {
          if (iv) { clearInterval(iv); iv = null; left = +b.dataset.s; b.textContent = `⏱ ${fmt(left)}`; b.classList.remove('is-run', 'is-ding'); return; }
          b.classList.add('is-run'); b.classList.remove('is-ding');
          iv = setInterval(() => {
            left -= 1; b.textContent = `⏱ ${fmt(left)}`;
            if (left <= 0) {
              clearInterval(iv); iv = null; left = +b.dataset.s;
              b.classList.remove('is-run'); b.classList.add('is-ding'); b.textContent = 'DING!';
              ding();
              if (hasGsap && motion) gsap.fromTo(mcard, { rotation: -1.5 }, { rotation: 0, duration: .8, ease: 'elastic.out(1.4, .2)' });
              setTimeout(() => { b.classList.remove('is-ding'); b.textContent = `⏱ ${fmt(left)}`; }, 4000);
            }
          }, 1000);
          timers.push(() => clearInterval(iv));
        });
      });
      modal.hidden = false;
      document.body.classList.add('modal-open');
      if (window.BB.lenis) window.BB.lenis.stop();
      if (hasGsap && motion) {
        gsap.fromTo('.modal-bg', { opacity: 0 }, { opacity: 1, duration: .3 });
        gsap.fromTo(mcard, { y: 140, rotation: 8, opacity: 0 }, { y: 0, rotation: -1, opacity: 1, duration: .7, ease: 'back.out(1.5)' });
        // the plate slides in from the side, spinning to a stop
        gsap.fromTo(mdish, { x: 160, scale: .4, rotation: -160, opacity: 0 }, { x: 0, scale: 1, rotation: 0, opacity: 1, duration: 1.1, ease: 'back.out(1.3)', delay: .2 });
      }
      $('.m-close', mcard).focus();
    }
    const close = () => {
      timers.forEach((f) => f()); timers = [];
      const done = () => { modal.hidden = true; document.body.classList.remove('modal-open'); if (window.BB.lenis) window.BB.lenis.start(); if (lastFocus) lastFocus.focus(); };
      if (hasGsap && motion) {
        gsap.to('.modal-bg', { opacity: 0, duration: .25 });
        gsap.to(mdish, { x: 120, rotation: 90, scale: .5, opacity: 0, duration: .3, ease: 'power2.in' });
        gsap.to(mcard, { y: 120, rotation: -6, opacity: 0, duration: .35, ease: 'power2.in', onComplete: done });
      } else done();
    };
    modal.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) close(); });

    /* ---------- motion ---------- */
    if (hasGsap && motion) {
      gsap.set('.rl > span', { yPercent: 110 });
      gsap.set('.tcard', { yPercent: 70 });
      window.addEventListener('bb:ready', () => {
        gsap.timeline()
          .to('.rl > span', { yPercent: 0, duration: 1, ease: 'expo.out', stagger: .08 }, 0)
          .from('.rh-copy, .who', { y: 30, opacity: 0, duration: .7, stagger: .1, ease: 'power3.out' }, .3)
          .from('.tin', { y: 120, rotation: 6, duration: 1, ease: 'back.out(1.3)' }, .1)
          .to('.tcard', { yPercent: 0, duration: .8, ease: 'back.out(2)', stagger: .06 }, .6);
      }, { once: true });

      gsap.from('.filters button', { y: 20, opacity: 0, duration: .5, stagger: .04, scrollTrigger: { trigger: '.filters', start: 'top 88%', once: true } });
      $$('.rcard').forEach((c) => {
        const st = { trigger: c, start: 'top 88%', once: true };
        gsap.from(c, { y: 120, rotation: () => gsap.utils.random(-12, 12), opacity: 0, duration: .9, ease: 'back.out(1.4)', scrollTrigger: st });
        gsap.from($$('.rc-st', c), { scale: 0, rotation: -40, duration: .6, ease: 'back.out(2.5)', stagger: .05, delay: .35, scrollTrigger: st });
      });
      gsap.from('.sun-big', { yPercent: 40, opacity: 0, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '.sunday', start: 'top 75%', once: true } });
    }
  });
})();
