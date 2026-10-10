/* ═══════════════════════════════════════════════════════════
   BENTO & BASKET · the catalog
   every aisle and every product, with the ids the basket counts by.
   read by the aisles, the flyer and the basket receipt
   ═══════════════════════════════════════════════════════════ */
(() => {
  const C = 'AISLES/cut/';
  window.BB_AISLES = [
    {
      id: 'snacks', no: 'A01', name: 'Snacks', zh: '零食', c: 'var(--red)', t: 'var(--yellow)', map: '#E8261B',
      note: "Bao's 3am department", who: 'Bao', say: 'Pocky goes fast. Take two. Take three, I won\'t tell Mei.',
      items: [
        { id: 'pocky', name: 'Pocky, chocolate', zh: '百奇', price: '2.49', img: 'HOME/pocky.webp', note: 'one box is never one box', tags: ['pocky', 'sticks', 'biscuit', 'chocolate'] },
        { id: 'umaibo', name: 'Umaibo ×30', zh: 'うまい棒', price: '6.90', img: C + 'umaibo.webp', note: '30 flavours of corn puff', tags: ['umaibo', 'corn puff', 'puffs'] },
        { id: 'senbei', name: 'Want Want senbei', zh: '旺旺仙貝', price: '3.20', img: C + 'senbei.webp', note: 'crunch heard from the till', tags: ['senbei', 'rice crackers', 'want want', 'crackers'] },
        { id: 'dorayaki', name: 'Dorayaki ×2', zh: 'どら焼き', price: '3.80', img: C + 'dorayaki.webp', note: 'red bean, warm them up', tags: ['dorayaki', 'pancake', 'red bean', 'anko'] },
        { id: 'onigiri', name: 'Onigiri, tuna mayo', zh: '飯糰', price: '2.20', img: 'HOME/onigiri.webp', note: 'Mei makes them at 7am', tags: ['onigiri', 'rice ball', 'tuna', 'triangle'] },
        { id: 'mochi', name: 'Mochi box', zh: '麻糬', price: '4.50', img: 'FLYER/mochi-box.webp', note: 'peanut, sesame, taro', tags: ['mochi', 'dessert', 'daifuku', 'sweet'] },
        { id: 'hellopanda', name: 'Hello Panda, milk', zh: '熊貓餅', price: '1.90', img: C + 'hello-panda.webp', note: 'pandas doing sports', tags: ['hello panda', 'panda', 'biscuits', 'meiji'] },
        { id: 'koala', name: 'Koala\'s March', zh: '小熊餅乾', price: '1.80', img: C + 'koalas-march.webp', note: 'find the koala with eyebrows', tags: ['koala', 'koalas march', 'koala march', 'lotte', 'biscuits'] },
        { id: 'calbee', name: 'Calbee honey butter chips', zh: '卡樂比', price: '2.60', img: C + 'calbee.webp', note: 'sweet, salty, gone', tags: ['calbee', 'chips', 'crisps', 'potato chips', 'honey butter'] },
        { id: 'whiterabbit', name: 'White Rabbit candy', zh: '大白兔', price: '3.40', img: C + 'white-rabbit.webp', note: 'you can eat the paper', tags: ['white rabbit', 'candy', 'milk candy', 'sweets'] },
        { id: 'kasugai', name: 'Kasugai peach gummies', zh: 'ピーチグミ', price: '2.90', img: C + 'kasugai.webp', note: 'at kid eye level, on purpose', tags: ['kasugai', 'gummies', 'gummy', 'peach', 'candy'] },
      ],
    },
    {
      id: 'noodles', no: 'A02', name: 'Noodles & rice', zh: '麵飯', c: 'var(--yellow)', t: 'var(--red)', map: '#FFD400',
      note: 'by the crate, if you want', who: 'Mei', say: 'Instant is for emergencies. Fresh noodles come in Tuesday and Friday.',
      items: [
        { id: 'ramyun', name: 'Spicy instant ramen', zh: '辛拉麵', price: '1.60', img: 'HOME/instant-noodles.webp', note: 'add an egg. add two.', tags: ['ramen', 'ramyun', 'instant noodles', 'shin', 'cup noodles'] },
        { id: 'udon', name: 'Fresh udon', zh: '生うどん', price: '1.90', img: C + 'udon.webp', note: 'boil 2 minutes, no more', tags: ['udon', 'fresh udon', 'thick noodles'] },
        { id: 'yakisoba', name: 'Yakisoba, original', zh: '焼きそば', price: '2.40', img: C + 'yakisoba.webp', note: 'ready before the kettle', tags: ['yakisoba', 'stir fry noodles', 'fried noodles'] },
        { id: 'wheatnoodles', name: 'Fresh wheat noodles', zh: '麵條', price: '2.20', img: 'RECIPE/wheat-noodles-recipe.webp', note: 'for Bao\'s soup', tags: ['wheat noodles', 'fresh noodles', 'lo mein', 'noodles'] },
        { id: 'rice', name: 'Thai jasmine rice 5kg', zh: '香米', price: '12.90', img: C + 'jasmine-rice.webp', note: 'Bao carries it to your car', tags: ['rice', 'jasmine rice', 'jasmine', 'thai rice'] },
        { id: 'curry', name: 'Japanese curry mix', zh: 'カレー', price: '5.40', img: C + 'curry.webp', note: 'medium hot, Bao says mild', tags: ['curry', 'japanese curry', 'curry roux', 'golden curry'] },
        { id: 'donburi', name: 'Donburi meal kit', zh: '丼', price: '7.90', img: C + 'donburi.webp', note: 'dinner for two in 15 min', tags: ['donburi', 'rice bowl', 'meal kit', 'teriyaki'] },
        { id: 'soba', name: 'Soba, buckwheat', zh: '蕎麦', price: '3.10', img: C + 'soba.webp', note: 'rinse it cold, always', tags: ['soba', 'buckwheat noodles', 'cold noodles'] },
        { id: 'vermicelli', name: 'Rice vermicelli', zh: '米粉', price: '1.70', img: C + 'vermicelli.webp', note: 'soak, don\'t boil', tags: ['vermicelli', 'rice noodles', 'mi fen', 'bee hoon', 'glass noodles'] },
        { id: 'wrappers', name: 'Dumpling wrappers', zh: '水餃皮', price: '2.80', img: C + 'dumpling-wrappers.webp', note: 'for Sunday folding', tags: ['dumpling wrappers', 'wrappers', 'gyoza skins', 'wonton'] },
        { id: 'mama', name: 'Mama tom yum noodles', zh: '媽媽麵', price: '0.90', img: C + 'mama.webp', note: 'the student dinner', tags: ['mama', 'tom yum', 'instant noodles', 'thai noodles'] },
      ],
    },
    {
      id: 'sauces', no: 'A03', name: 'Sauces & spice', zh: '醬料', c: 'var(--blue)', t: '#fff', map: '#1E3BD8',
      note: '23 kinds of soy. yes.', who: 'Bao', say: 'Chili crisp goes on everything. Yes, ice cream too. Don\'t look at me like that.',
      items: [
        { id: 'soy', name: 'Japanese soy sauce', zh: '醤油', price: '4.20', img: C + 'soy-sauce.webp', note: 'Mei\'s favourite of the 23', tags: ['soy sauce', 'soy', 'shoyu'] },
        { id: 'miso', name: 'Miso paste, koji', zh: '味噌', price: '6.80', img: C + 'miso.webp', note: 'don\'t boil it, ever', tags: ['miso', 'miso paste', 'soup'] },
        { id: 'rayu', name: 'Taberu rayu', zh: '食べるラー油', price: '5.20', img: C + 'rayu.webp', note: 'crunchy garlic, extra hot', tags: ['rayu', 'la yu', 'garlic chili oil', 'momoya'] },
        { id: 'chilicrisp', name: 'Chili crisp', zh: '辣椒油', price: '3.90', img: 'HOME/chili-crisp.webp', note: 'on everything', tags: ['chili crisp', 'chili oil', 'lao gan ma', 'chilli', 'hot sauce', 'spicy'] },
        { id: 'gomadare', name: 'Goma dare', zh: 'ごまだれ', price: '4.60', img: C + 'gomadare.webp', note: 'sesame dip for hot pot', tags: ['goma dare', 'gomadare', 'sesame sauce', 'sesame dressing', 'hot pot'] },
        { id: 'furikake', name: 'Furikake, bonito', zh: 'ふりかけ', price: '3.30', img: C + 'furikake.webp', note: 'shake it on plain rice', tags: ['furikake', 'rice seasoning', 'bonito', 'katsuo'] },
        { id: 'doubanjiang', name: 'Chili bean paste', zh: '豆瓣醬', price: '3.40', img: 'RECIPE/chili-bean-paste-recipe.png.webp', note: 'the soul of the soup', tags: ['doubanjiang', 'chili bean paste', 'bean paste', 'toban'] },
        { id: 'staranise', name: 'Star anise', zh: '八角', price: '1.20', img: 'RECIPE/star-anise-recipe.webp', note: 'only 2!! — Mei', tags: ['star anise', 'anise', 'spice', 'five spice'] },
        { id: 'oyster', name: 'Oyster sauce', zh: '蠔油', price: '3.80', img: C + 'oyster-sauce.webp', note: 'garlic + greens + this', tags: ['oyster sauce', 'lee kum kee', 'oyster'] },
        { id: 'sesameoil', name: 'Toasted sesame oil', zh: '麻油', price: '5.90', img: C + 'sesame-oil.webp', note: 'three drops. not four.', tags: ['sesame oil', 'toasted sesame oil', 'sesame'] },
        { id: 'vinegar', name: 'Rice vinegar', zh: '米酢', price: '3.60', img: C + 'rice-vinegar.webp', note: 'for sushi rice and pickles', tags: ['rice vinegar', 'vinegar', 'su', 'marukan'] },
        { id: 'chinkiang', name: 'Chinkiang black vinegar', zh: '鎮江香醋', price: '3.20', img: C + 'chinkiang.webp', note: 'the dumpling dip', tags: ['chinkiang', 'black vinegar', 'zhenjiang', 'vinegar'] },
        { id: 'mirin', name: 'Mirin', zh: 'みりん', price: '4.40', img: C + 'mirin.webp', note: 'a little sweet, a lot shiny', tags: ['mirin', 'rice wine', 'sweet cooking wine'] },
        { id: 'gochujang', name: 'Gochujang', zh: '고추장', price: '6.20', img: C + 'gochujang.webp', note: 'Bao puts it in everything now', tags: ['gochujang', 'korean chili paste', 'red pepper paste'] },
        { id: 'sichuan', name: 'Sichuan pepper', zh: '花椒', price: '4.90', img: C + 'sichuan-pepper.webp', note: 'your lips will buzz. normal.', tags: ['sichuan pepper', 'szechuan pepper', 'huajiao', 'numbing'] },
      ],
    },
    {
      id: 'fresh', no: 'A04', name: 'Fresh & frozen', zh: '冷凍', c: 'var(--orange)', t: '#fff', map: '#F2471C',
      note: 'the fridge hums, ignore it', who: 'Mei', say: 'The pork dumplings are from Mrs. Wu on 3rd street. Better than mine. Don\'t tell her.',
      items: [
        { id: 'gyoza', name: 'Chicken gyoza ×30', zh: 'ギョーザ', price: '9.50', img: C + 'gyoza.webp', note: 'frozen, straight in the pan', tags: ['gyoza', 'potstickers', 'frozen dumplings', 'ajinomoto'] },
        { id: 'dumplings', name: 'Pork dumplings ×6', zh: '水餃', price: '5.90', img: 'FLYER/dumpling-cut.webp', note: 'Mrs. Wu\'s, made this morning', tags: ['dumplings', 'dumpling', 'jiaozi', 'pork dumplings'] },
        { id: 'tempura', name: 'Shrimp tempura ×4', zh: '天ぷら', price: '6.50', img: C + 'tempura.webp', note: 'oven 10 min, still crispy', tags: ['tempura', 'shrimp', 'prawn', 'ebi'] },
        { id: 'salmon', name: 'Salmon, sashimi grade', zh: '鮭', price: '14.90', unit: '/lb', img: C + 'salmon.webp', note: 'Thursdays only', tags: ['salmon', 'sashimi', 'fish', 'sake'] },
        { id: 'seitan', name: 'Seitan strips', zh: '麵筋', price: '4.80', img: C + 'seitan.webp', note: 'the vegans\' beef shank', tags: ['seitan', 'wheat gluten', 'mian jin', 'vegan'] },
        { id: 'tofu', name: 'Extra firm tofu', zh: '豆腐', price: '2.20', img: 'FLYER/tofu-cut.webp', note: '2 for $4 this week', tags: ['tofu', 'bean curd'] },
        { id: 'beef', name: 'Beef shank', zh: '牛腱', price: '8.90', unit: '/lb', img: 'RECIPE/beef-shank-recipe.webp', note: 'ask Bao for the good cut', tags: ['beef', 'beef shank', 'meat', 'shank'] },
        { id: 'eggs', name: 'Brown eggs ×6', zh: '雞蛋', price: '3.20', img: C + 'eggs.webp', note: 'from Bao\'s cousin\'s farm', tags: ['egg', 'eggs', 'brown eggs'] },
        { id: 'kimchi', name: 'Mei\'s kimchi', zh: '김치', price: '6.50', img: C + 'kimchi.webp', note: 'she will ask if you liked it', tags: ['kimchi', 'kimchee', 'fermented cabbage'] },
        { id: 'tempeh', name: 'Tempeh', zh: '天貝', price: '3.90', img: C + 'tempeh.webp', note: 'nutty, crispy, very veggie', tags: ['tempeh', 'tempe', 'vegan', 'soy'] },
        { id: 'fishballs', name: 'Fish balls, cheese', zh: '魚丸', price: '4.70', img: C + 'fish-balls.webp', note: 'hot pot is not hot pot without', tags: ['fish balls', 'fishballs', 'hot pot', 'cheese balls'] },
      ],
    },
    {
      id: 'greens', no: 'A05', name: 'Greens', zh: '青菜', c: 'var(--lime)', t: 'var(--ink)', map: '#D4F55A',
      note: 'in at 6am, gone by noon', who: 'Mei', say: 'Squeeze the tomatoes, not the bok choy. I can see you.',
      items: [
        { id: 'napa', name: 'Napa cabbage', zh: '白菜', price: '2.49', img: 'FLYER/napa-cabbage.webp', note: 'kimchi season!', tags: ['napa', 'cabbage', 'chinese cabbage', 'wombok'] },
        { id: 'choysum', name: 'Choy sum', zh: '菜心', price: '1.99', img: 'FLYER/choy-sum.webp', note: 'garlic + oyster sauce', tags: ['choy sum', 'greens'] },
        { id: 'bokchoy', name: 'Baby bok choy', zh: '青江菜', price: '1.80', img: 'RECIPE/bok-choy-recipe.webp', note: 'blanch 40 seconds', tags: ['bok choy', 'pak choi', 'pok choy'] },
        { id: 'shiitake', name: 'Shiitake', zh: '香菇', price: '3.60', img: C + 'shiitake.webp', note: 'dried ones are by the soy', tags: ['shiitake', 'mushroom', 'mushrooms'] },
        { id: 'renkon', name: 'Lotus root', zh: '蓮藕', price: '3.20', img: C + 'renkon.webp', note: 'the holes are normal', tags: ['lotus root', 'renkon', 'lotus'] },
        { id: 'edamame', name: 'Edamame', zh: '枝豆', price: '2.80', img: C + 'edamame.webp', note: 'salt them while hot', tags: ['edamame', 'soy beans', 'soybeans', 'beans'] },
        { id: 'tomato', name: 'Tomato', zh: '番茄', price: '0.80', img: 'RECIPE/tomato-recipe.webp', note: 'with eggs, always', tags: ['tomato', 'tomatoes'] },
        { id: 'scallion', name: 'Scallion', zh: '蔥', price: '0.70', img: 'RECIPE/scallion-recipe.webp', note: 'on top of everything', tags: ['scallion', 'spring onion', 'green onion'] },
        { id: 'ginger', name: 'Ginger root', zh: '薑', price: '0.90', img: 'RECIPE/ginger-recipe.webp', note: 'for colds and for soup', tags: ['ginger'] },
        { id: 'garlic', name: 'Garlic', zh: '蒜頭', price: '0.60', img: C + 'garlic.webp', note: 'never too much', tags: ['garlic'] },
        { id: 'daikon', name: 'Daikon', zh: '白蘿蔔', price: '1.50', img: C + 'daikon.webp', note: 'sweet in winter', tags: ['daikon', 'radish', 'white radish', 'mooli'] },
        { id: 'enoki', name: 'Enoki', zh: '金針菇', price: '1.40', img: C + 'enoki.webp', note: 'see you tomorrow mushroom', tags: ['enoki', 'enoki mushroom', 'mushroom'] },
        { id: 'sprouts', name: 'Bean sprouts', zh: '豆芽', price: '0.90', img: C + 'bean-sprouts.webp', note: 'crunch for the noodles', tags: ['bean sprouts', 'sprouts', 'mung bean'] },
        { id: 'basil', name: 'Thai basil', zh: '九層塔', price: '1.60', img: C + 'thai-basil.webp', note: 'smells like a holiday', tags: ['thai basil', 'basil', 'krapow', 'holy basil'] },
      ],
    },
    {
      id: 'drinks', no: 'A06', name: 'Drinks & tea', zh: '飲料', c: 'var(--pink)', t: 'var(--ink)', map: '#FF9FC6',
      note: 'the cold wall at the back', who: 'Bao', say: 'Push the marble in the ramune. Slowly. Slower. There.',
      items: [
        { id: 'ramune', name: 'Ramune, original', zh: '彈珠汽水', price: '1.99', img: 'HOME/ramune.webp', note: 'the marble stays in', tags: ['ramune', 'soda', 'marble soda', 'pop'] },
        { id: 'yakult', name: 'Yakult 5-pack', zh: '養樂多', price: '3.50', img: 'HOME/yakult.webp', note: 'one a day, Mei says', tags: ['yakult', 'yogurt drink', 'probiotic'] },
        { id: 'horoyoi', name: 'Horoyoi, strawberry milk', zh: 'ほろよい', price: '2.90', img: C + 'horoyoi.webp', note: '3% — Mei\'s secret', tags: ['horoyoi', 'chuhai', 'strawberry', 'sour', 'beer', 'alcohol'] },
        { id: 'matcha', name: 'Matcha milk powder', zh: '抹茶ミルク', price: '8.40', img: C + 'matcha.webp', note: 'just add cold milk', tags: ['matcha', 'matcha latte', 'green tea latte', 'tsujiri'] },
        { id: 'genmaicha', name: 'Genmaicha 400g', zh: '玄米茶', price: '7.20', img: C + 'genmaicha.webp', note: 'tastes like popcorn', tags: ['genmaicha', 'brown rice tea', 'green tea', 'tea'] },
        { id: 'hojicha', name: 'Hojicha tea bags', zh: 'ほうじ茶', price: '5.90', img: C + 'hojicha.webp', note: 'roasted, low caffeine', tags: ['hojicha', 'roasted tea', 'tea bags'] },
        { id: 'mugicha', name: 'Mugicha ×54', zh: 'むぎ茶', price: '4.90', img: C + 'mugicha.webp', note: 'cold barley tea all summer', tags: ['mugicha', 'barley tea', 'cold tea'] },
        { id: 'oolong', name: 'Oolong, loose leaf', zh: '烏龍茶', price: '12.90', img: 'FLYER/ooloi.webp', note: 'Bao\'s private stock', tags: ['oolong', 'loose leaf', 'oolong tea'] },
        { id: 'jasmine', name: 'Jasmine tea tin', zh: '茉莉花茶', price: '9.80', img: C + 'jasmine-tea.webp', note: 'the dim sum tea', tags: ['jasmine tea', 'jasmine', 'flower tea', 'tea'] },
        { id: 'soymilk', name: 'Vitamilk soy milk', zh: '豆奶', price: '1.50', img: C + 'soy-milk.webp', note: 'glass bottle, ice cold', tags: ['soy milk', 'soymilk', 'vitamilk', 'vita', 'plant milk'] },
        { id: 'coconut', name: 'Coconut water', zh: '椰子水', price: '2.70', img: C + 'coconut-water.webp', note: 'after the karaoke', tags: ['coconut water', 'coconut', 'kara'] },
        { id: 'bubbletea', name: 'Bubble tea kit', zh: '珍珠奶茶', price: '7.90', img: C + 'bubble-tea.webp', note: 'brown sugar pearls, 5 cups', tags: ['bubble tea', 'boba', 'pearl milk tea', 'tapioca', 'milk tea'] },
      ],
    },
  ];

  // sale price · the shelf price it beats · optional sticker
  window.BB_DEALS = {
    bubbletea: { now: 5.90, was: 7.90 },
    napa: { now: 2.49, was: 3.29, tag: 'kimchi season' },
    choysum: { now: 1.99, was: 2.80 },
    tofu: { now: 2.20, was: 2.60, tag: '2 for $4' },
    dumplings: { now: 5.90, was: 6.90, tag: 'Mrs. Wu\'s' },
    enoki: { now: 0.99, was: 1.40 },
    eggs: { now: 2.79, was: 3.20 },
    kimchi: { now: 5.50, was: 6.50, tag: 'Mei\'s own' },
    oolong: { now: 12.90, was: 15.90, tag: 'Bao\'s stash' },
    mama: { now: 0.69, was: 0.90 },
    sesameoil: { now: 4.90, was: 5.90 },
    gochujang: { now: 4.99, was: 6.20 },
    soba: { now: 2.49, was: 3.10 },
    mochi: { now: 4.50, was: 5.50 },
    calbee: { now: 1.99, was: 2.60 },
    whiterabbit: { now: 2.80, was: 3.40 },
    ramune: { now: 1.49, was: 1.99 },
    hellopanda: { now: 1.29, was: 1.90 },
  };

  // id → product (and the aisle it sits in)
  window.BB_PRODUCTS = {};
  window.BB_AISLES.forEach((a) => a.items.forEach((p) => { window.BB_PRODUCTS[p.id] = { ...p, aisle: a.id }; }));
  // what it costs today: the flyer price if it's on sale, the shelf price otherwise
  window.BB_PRICE = (id) => (window.BB_DEALS[id] ? window.BB_DEALS[id].now : parseFloat(window.BB_PRODUCTS[id].price));
})();
