// constants/data.js
export const RECIPES = [
  {
    id: '1',
    title: 'Zesty Mediterranean Salmon Bowl',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop',
    time: '15m',
    calories: '420',
    protein: '32g',
    isNew: true,
    categories: ['Quick', 'Easy Prep'],
    description: 'En let og frisk bowl med perfekt stegt laks, knasende grøntsager og en syrlig middelhavsdressing. Perfekt til en hurtig frokost eller let aftensmad.',
    ingredients: [
      '200g Laks',
      '1/2 Quinoa',
      'Cherrytomater',
      'Agurk & Rødløg',
      'Fetaost',
      'Olivenolie & Citron'
    ],
    steps: [
      'Skyl quinoa og kog den i letsaltet vand i ca. 12 minutter.',
      'Krydr laks med salt, peber og lidt citron, og steg den 3-4 minutter pr. side.',
      'Skær cherrytomater, agurk og rødløg i små stykker.',
      'Fordel quinoa i en skål, top med grønt og laks, og drys feta over.',
      'Afslut med olivenolie og frisk citronsaft før servering.'
    ]
  },
  {
    id: '2',
    title: 'Creamy Roasted Pumpkin Ginger Soup',
    image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?q=80&w=800&auto=format&fit=crop',
    time: '25m',
    calories: '280',
    protein: '8g',
    isNew: false,
    categories: ['Vegetarian'],
    description: 'Varmende og cremet græskarsuppe med et kick af frisk ingefær. Serveret med ristede græskarkerner for det perfekte knas.',
    ingredients: [
      '1 Hokkaido Græskar',
      'Frisk Ingefær (3cm)',
      '1 Løg & 2 Fed Hvidløg',
      '400ml Kokosmælk',
      'Grøntsagsbouillon'
    ],
    steps: [
      'Skær græskar, løg, hvidløg og ingefær i grove stykker.',
      'Sautér løg, hvidløg og ingefær i en gryde i lidt olie.',
      'Tilsæt græskar og bouillon, og lad det simre i 15-18 minutter.',
      'Blend suppen glat og rør kokosmælk i.',
      'Smag til med salt og peber, og server varm.'
    ]
  },
  {
    id: '3',
    title: 'Herb-Crusted Lemon Chicken',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800&auto=format&fit=crop',
    time: '30m',
    calories: '540',
    protein: '45g',
    isNew: true,
    categories: ['Easy Prep'],
    description: 'Saftig kylling med sprød krydderurtpanering og frisk citronsauce. Perfekt til hverdagsmiddage.',
    ingredients: [
      '2 Kyllingebryster',
      'Frisk Persille & Timian',
      '2 spsk Smør',
      '1 Citron',
      'Salt & Peber'
    ],
    steps: [
      'Dup kyllingen tør, og krydr med salt, peber og hakkede urter.',
      'Varm en pande op med smør ved middel varme.',
      'Steg kyllingen 5-6 minutter pr. side til gennemstegt.',
      'Tilsæt citronsaft de sidste 1-2 minutter af stegningen.',
      'Lad kyllingen hvile kort og skær den i skiver ved servering.'
    ]
  },
  {
    id: '4',
    title: 'Vegan Chickpea Buddha Bowl',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
    time: '20m',
    calories: '450',
    protein: '18g',
    isNew: false,
    categories: ['Vegetarian', 'Quick'],
    description: 'Farverig bowl med krydrede kikærter, avocado og quinoa — mættende og nærende.',
    ingredients: [
      '200g Kikærter',
      '1 Avocado',
      '1/2 Quinoa',
      'Spinat',
      'Tahindressing'
    ],
    steps: [
      'Kog quinoa efter anvisning og lad den køle let af.',
      'Skyl kikærter og rist dem på pande med krydderier i 5-7 minutter.',
      'Skær avocado i skiver og skyl spinat.',
      'Anret quinoa, spinat, kikærter og avocado i en bowl.',
      'Top med tahindressing og server med det samme.'
    ]
  },
 {
    id: '5',
    title: 'Garlic Shrimp Spaghetti',
    // Nyt 100% fungerende pastabillede
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=800&auto=format&fit=crop',
    time: '25m',
    calories: '630',
    protein: '28g',
    isNew: false,
    categories: ['Quick'],
    description: 'Lækker spaghetti med saftige rejer, hvidløg og et strejf af chili — enkel og velsmagende.',
    ingredients: [
      '200g Spaghetti',
      '200g Rejer',
      '3 Fed Hvidløg',
      'Chili Flakes',
      'Persille & Olivenolie'
    ],
    steps: [
      'Kog spaghetti al dente i letsaltet vand.',
      'Sautér hakket hvidløg og chili flakes i olivenolie ved lav varme.',
      'Tilsæt rejer og steg dem kort til de er lyserøde.',
      'Vend den kogte spaghetti i panden med lidt pastavand.',
      'Top med frisk persille og server straks.'
    ]
  },
  {
    id: '6',
    title: 'Chocolate Avocado Mousse',
    // Nyt 100% fungerende chokoladedessert-billede
    image: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?q=80&w=800&auto=format&fit=crop',
    time: '10m',
    calories: '320',
    protein: '5g',
    isNew: true,
    categories: ['Easy Prep'],
    description: 'Silkeagtig og sund chokolademousse lavet på avocado — dessert uden skyld.',
    ingredients: [
      '2 Modne Avocadoer',
      '3 spsk Kakao',
      '2 spsk Ahornsirup',
      '1 tsk Vanilje'
    ],
    steps: [
      'Skrab avocado-kødet ud i en blender eller foodprocessor.',
      'Tilsæt kakao, ahornsirup og vanilje.',
      'Blend massen helt glat og cremet.',
      'Smag til med ekstra sødme eller kakao efter behov.',
      'Sæt på køl i 15 minutter og server.'
    ]
  }
];

export const CATEGORIES = ['All Recipes', 'Easy Prep', 'Quick', 'Vegetarian'];