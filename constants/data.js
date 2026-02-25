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
    ]
  }
];

export const CATEGORIES = ['All Recipes', 'Easy Prep', 'Quick', 'Vegetarian'];