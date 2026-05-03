/* ================================================================
   SUSHI BUILDER — app.js
   ================================================================
   STRUCTURE DU FICHIER :
   1. DATA       — les données (sushis, ingrédients, recettes)
   2. STATE      — les variables qui évoluent (le panier)
   3. MENU       — affichage et interaction du panel Menu
   4. PANIER     — calcul et mise à jour de la barre de panier
   5. LISTE      — génération de la liste de courses
   6. RECETTES   — génération du panel recettes
   7. NAVIGATION — changement d'onglets
   8. INIT       — démarrage de l'application
   ================================================================ */


/* ================================================================
   1. DATA — Les données de l'application
   On les écrit "en dur" ici. Si tu veux ajouter un sushi,
   il suffit d'ajouter un objet dans le bon tableau.
   ================================================================ */

/*
  SUSHI : organisé par catégorie
  Chaque sushi a :
    id          → identifiant unique (doit être unique dans tout le fichier)
    name        → nom affiché
    emoji       → l'icône
    desc        → description courte
    priceUnit   → prix estimé d'un plateau
    pieces      → nombre de pièces par plateau
    ingredients → liste d'IDs d'ingrédients (doit correspondre à INGREDIENTS ci-dessous)
    recipeKey   → clé de la recette dans RECIPES
*/
const SUSHI = {
  maki: [
    {
      id: 'maki_saumon',
      name: 'Maki Saumon',
      emoji: '🐟',
      desc: 'Saumon frais · nori · riz vinaigré',
      priceUnit: 4.50,
      pieces: 6,
      ingredients: ['saumon_cru', 'riz', 'nori', 'vinaigre_riz'],
      recipeKey: 'maki_base',
    },
    {
      id: 'maki_thon',
      name: 'Maki Thon',
      emoji: '🥫',
      desc: 'Thon en conserve · mayo · nori · riz',
      priceUnit: 3.50,
      pieces: 6,
      ingredients: ['thon_conserve', 'mayonnaise', 'riz', 'nori', 'vinaigre_riz'],
      recipeKey: 'maki_thon',
    },
    {
      id: 'maki_concombre',
      name: 'Maki Concombre',
      emoji: '🥒',
      desc: 'Concombre · nori · riz vinaigré',
      priceUnit: 2.50,
      pieces: 6,
      ingredients: ['concombre', 'riz', 'nori', 'vinaigre_riz'],
      recipeKey: 'maki_base',
    },
    {
      id: 'maki_avocat',
      name: 'Maki Avocat',
      emoji: '🥑',
      desc: 'Avocat · nori · riz vinaigré',
      priceUnit: 3.00,
      pieces: 6,
      ingredients: ['avocat', 'riz', 'nori', 'vinaigre_riz'],
      recipeKey: 'maki_base',
    },
  ],

  california: [
    {
      id: 'cali_saumon_avocat',
      name: 'California Saumon–Avocat',
      emoji: '🍱',
      desc: 'Saumon · avocat · riz · sésame · nori',
      priceUnit: 5.50,
      pieces: 8,
      ingredients: ['saumon_cru', 'avocat', 'riz', 'nori', 'vinaigre_riz', 'sesame'],
      recipeKey: 'california',
    },
    {
      id: 'cali_thon_avocat',
      name: 'California Thon–Avocat',
      emoji: '🌀',
      desc: 'Thon · avocat · mayo · riz · sésame',
      priceUnit: 5.00,
      pieces: 8,
      ingredients: ['thon_conserve', 'avocat', 'mayonnaise', 'riz', 'nori', 'vinaigre_riz', 'sesame'],
      recipeKey: 'california',
    },
    {
      id: 'cali_thon_cheese',
      name: 'California Thon–Cream Cheese',
      emoji: '🧀',
      desc: 'Thon · cream cheese · concombre · riz',
      priceUnit: 5.00,
      pieces: 8,
      ingredients: ['thon_conserve', 'cream_cheese', 'concombre', 'riz', 'nori', 'vinaigre_riz', 'sesame'],
      recipeKey: 'california',
    },
    {
      id: 'cali_saumon_cheese',
      name: 'California Saumon–Cream Cheese',
      emoji: '🌸',
      desc: 'Saumon · cream cheese · avocat · riz',
      priceUnit: 6.00,
      pieces: 8,
      ingredients: ['saumon_cru', 'cream_cheese', 'avocat', 'riz', 'nori', 'vinaigre_riz', 'sesame'],
      recipeKey: 'california',
    },
  ],

  nigiri: [
    {
      id: 'nigiri_saumon',
      name: 'Nigiri Saumon',
      emoji: '🍣',
      desc: 'Tranche de saumon · riz moulé · wasabi',
      priceUnit: 4.00,
      pieces: 6,
      ingredients: ['saumon_cru', 'riz', 'vinaigre_riz', 'wasabi'],
      recipeKey: 'nigiri',
    },
    {
      id: 'nigiri_thon',
      name: 'Nigiri Thon Sauté',
      emoji: '🔥',
      desc: 'Thon poêlé · riz moulé · sauce soja · wasabi',
      priceUnit: 4.00,
      pieces: 6,
      ingredients: ['thon_conserve', 'riz', 'vinaigre_riz', 'sauce_soja', 'wasabi'],
      recipeKey: 'nigiri_thon',
    },
  ],

  temaki: [
    {
      id: 'temaki_saumon',
      name: 'Temaki Saumon–Avocat',
      emoji: '🌮',
      desc: 'Saumon · avocat · concombre · riz · nori',
      priceUnit: 4.00,
      pieces: 2,
      ingredients: ['saumon_cru', 'avocat', 'concombre', 'riz', 'nori', 'vinaigre_riz'],
      recipeKey: 'temaki',
    },
    {
      id: 'temaki_thon',
      name: 'Temaki Thon–Cream Cheese',
      emoji: '🌯',
      desc: 'Thon · cream cheese · concombre · riz',
      priceUnit: 3.50,
      pieces: 2,
      ingredients: ['thon_conserve', 'cream_cheese', 'concombre', 'riz', 'nori', 'vinaigre_riz'],
      recipeKey: 'temaki',
    },
  ],
};


/*
  INGREDIENTS : catalogue complet
  Chaque ingrédient a :
    name      → nom affiché dans la liste de courses
    unit      → unité de mesure utilisée (doit matcher le "type" pour le calcul de prix)
    perPlate  → quantité utilisée par plateau sélectionné
    priceKg / priceL / priceUnit → prix selon l'unité
    cat       → catégorie pour le regroupement dans la liste de courses
*/
const INGREDIENTS = {
  saumon_cru:    { name: 'Saumon frais (sashimi-grade)',    unit: 'g',        perPlate: 80,   priceKg: 28,   cat: 'Poisson & Protéines' },
  thon_conserve: { name: 'Thon en conserve (au naturel)',   unit: 'boîte',    perPlate: 0.5,  priceUnit: 1.20, cat: 'Poisson & Protéines' },
  riz:           { name: 'Riz japonais rond (à sushi)',     unit: 'g',        perPlate: 100,  priceKg: 3.50, cat: 'Épicerie sèche' },
  nori:          { name: 'Feuilles de nori',                unit: 'feuille',  perPlate: 1.5,  priceUnit: 0.40, cat: 'Épicerie sèche' },
  vinaigre_riz:  { name: 'Vinaigre de riz',                unit: 'cl',       perPlate: 4,    priceL: 6.00,  cat: 'Épicerie sèche' },
  avocat:        { name: 'Avocat',                          unit: 'pièce',    perPlate: 0.5,  priceUnit: 1.20, cat: 'Fruits & Légumes' },
  concombre:     { name: 'Concombre',                       unit: 'pièce',    perPlate: 0.25, priceUnit: 0.90, cat: 'Fruits & Légumes' },
  sesame:        { name: 'Graines de sésame',               unit: 'g',        perPlate: 10,   priceKg: 8.00, cat: 'Épicerie sèche' },
  cream_cheese:  { name: 'Cream cheese (Philadelphia)',     unit: 'g',        perPlate: 40,   priceKg: 14.00, cat: 'Frais' },
  mayonnaise:    { name: 'Mayonnaise',                      unit: 'g',        perPlate: 20,   priceKg: 5.00, cat: 'Épicerie sèche' },
  sauce_soja:    { name: 'Sauce soja',                      unit: 'fixe',     perPlate: 0,    priceUnit: 2.50, cat: 'Condiments' },
  wasabi:        { name: 'Wasabi (tube)',                   unit: 'fixe',     perPlate: 0,    priceUnit: 2.50, cat: 'Condiments' },
  gari:          { name: 'Gingembre mariné (gari)',         unit: 'fixe',     perPlate: 0,    priceUnit: 2.80, cat: 'Condiments' },
};

/*
  ALWAYS : ingrédients toujours ajoutés à la liste
  (peu importe les sushis choisis)
*/
const ALWAYS = ['sauce_soja', 'wasabi', 'gari'];


/*
  RECIPES : les recettes
  Chaque recette a :
    name             → nom affiché
    emoji, time, diff, desc → infos d'en-tête
    baseIngredients  → tableau { name, qty }
    steps            → tableau de strings (les étapes)
    tip              → astuce affichée en vert
*/
const RECIPES = {
  maki_base: {
    name: 'Makis classiques',
    emoji: '🌿',
    time: '30 min',
    diff: 'Facile',
    desc: 'Maki saumon, avocat ou concombre',
    baseIngredients: [
      { name: 'Riz à sushi cuit et vinaigré', qty: '300g' },
      { name: 'Feuilles de nori',              qty: '3 feuilles' },
      { name: 'Garniture au choix',            qty: 'en lamelles' },
      { name: 'Wasabi',                        qty: 'selon goût' },
    ],
    steps: [
      'Cuire le riz à sushi selon le paquet (environ 200g cru → 300g cuit). Laisser tiédir 10 min.',
      'Mélanger le riz chaud avec 3 c. à soupe de vinaigre de riz + 1 c. à café de sucre + 1 pincée de sel. Remuer délicatement.',
      'Poser une feuille de nori, côté brillant vers le bas, sur la natte (makisu) recouverte de film alimentaire.',
      'Étaler une fine couche de riz sur les 2/3 de la feuille, en laissant 2 cm libres en haut.',
      'Déposer la garniture en ligne horizontale au centre du riz.',
      'Soulever la natte et rouler fermement en appuyant. Mouiller le bord de nori libre avec un peu d\'eau pour sceller.',
      'Trancher le rouleau en 6 morceaux nets avec un couteau mouillé.',
    ],
    tip: '💡 Garde les mains humides pour manipuler le riz sans qu\'il colle. Coupe d\'un seul mouvement sans scier.',
  },

  maki_thon: {
    name: 'Makis Thon Mayo',
    emoji: '🥫',
    time: '25 min',
    diff: 'Facile',
    desc: 'Spicy tuna roulé façon maki',
    baseIngredients: [
      { name: 'Thon en conserve égoutté', qty: '140g' },
      { name: 'Mayonnaise',               qty: '2 c. à soupe' },
      { name: 'Riz à sushi vinaigré',     qty: '300g' },
      { name: 'Feuilles de nori',         qty: '3 feuilles' },
    ],
    steps: [
      'Égoutter soigneusement le thon. L\'émietter et le mélanger avec la mayo.',
      'Cuire et vinaigriner le riz (voir recette maki base).',
      'Poser le nori sur la natte, étaler le riz sur les 2/3 de la feuille.',
      'Déposer une ligne de mélange thon-mayo.',
      'Rouler fermement et sceller avec un peu d\'eau.',
      'Trancher en 6 morceaux avec un couteau humide.',
    ],
    tip: '💡 Ajoute une petite touche de sriracha dans le mélange thon-mayo pour une version épicée !',
  },

  california: {
    name: 'California Rolls',
    emoji: '🍱',
    time: '40 min',
    diff: 'Intermédiaire',
    desc: 'Uramaki — le riz est à l\'extérieur',
    baseIngredients: [
      { name: 'Riz à sushi vinaigré',           qty: '300g' },
      { name: 'Feuilles de nori',               qty: '3 feuilles' },
      { name: 'Garniture (saumon/thon/avocat)', qty: 'en lamelles' },
      { name: 'Graines de sésame',              qty: '2 c. à soupe' },
      { name: 'Film alimentaire',               qty: '' },
    ],
    steps: [
      'Préparer le riz à sushi vinaigré et laisser tiédir.',
      'Couvrir la natte de film alimentaire (important pour les california !). Poser le nori par-dessus.',
      'Étaler une couche de riz SUR TOUTE la feuille de nori. Saupoudrer de graines de sésame sur le riz.',
      'Retourner délicatement : maintenant le riz est en dessous, côté film alimentaire.',
      'Déposer les garnitures en ligne au centre du nori (maintenant côté visible).',
      'Rouler en serrant bien, en aidant avec la natte. Le riz se retrouvera à l\'extérieur.',
      'Retirer le film, trancher en 8 morceaux avec un couteau humide et essuyé entre chaque coupe.',
    ],
    tip: '💡 Le film alimentaire est essentiel pour que le riz ne colle pas à la natte. Prépare-les dans l\'ordre inverse : étale le riz, sème le sésame, retourne, garnis, roule.',
  },

  nigiri: {
    name: 'Nigiris Saumon',
    emoji: '🍣',
    time: '20 min',
    diff: 'Facile',
    desc: 'Petits pains de riz avec tranche de saumon',
    baseIngredients: [
      { name: 'Riz à sushi vinaigré', qty: '300g' },
      { name: 'Saumon sashimi-grade', qty: '200g' },
      { name: 'Wasabi',               qty: 'une pointe' },
    ],
    steps: [
      'Préparer le riz à sushi vinaigré. Laisser tiédir à température ambiante.',
      'Trancher le saumon en tranches obliques de ~5mm, en biais par rapport aux fibres.',
      'Prendre ~25g de riz, façonner un ovale compact dans la paume : 2-3 compressions fermes suffisent.',
      'Déposer une toute petite pointe de wasabi sur le dessus du pain de riz.',
      'Placer la tranche de saumon par-dessus et appuyer légèrement pour qu\'elle adhère.',
      'Servir immédiatement, côté saumon vers le haut.',
    ],
    tip: '💡 La taille idéale d\'un nigiri = une bouchée. Trempe-les dans la sauce soja côté poisson, pas côté riz.',
  },

  nigiri_thon: {
    name: 'Nigiris Thon Sauté',
    emoji: '🔥',
    time: '20 min',
    diff: 'Facile',
    desc: 'Thon en conserve façonné et légèrement poêlé',
    baseIngredients: [
      { name: 'Thon en conserve égoutté', qty: '140g' },
      { name: 'Sauce soja',               qty: '1 c. à soupe' },
      { name: 'Riz à sushi vinaigré',     qty: '300g' },
      { name: 'Wasabi',                   qty: 'une pointe' },
    ],
    steps: [
      'Égoutter le thon et l\'émietter grossièrement. Mélanger avec 1 c. à soupe de sauce soja.',
      'Faire revenir le thon 2 minutes à la poêle à feu vif, juste pour le sécher légèrement. Laisser refroidir.',
      'Préparer le riz à sushi vinaigré. Façonner des petits ovals de riz (~25g).',
      'Déposer une pointe de wasabi sur chaque pain de riz.',
      'Poser une belle cuillerée de thon sauté par-dessus et tasser légèrement.',
      'Optionnel : ajouter une petite ceinture de nori autour pour maintenir la garniture.',
    ],
    tip: '💡 Tu peux aussi mélanger le thon avec un peu de mayo avant de le poêler pour un résultat encore plus savoureux.',
  },

  temaki: {
    name: 'Temakis',
    emoji: '🌮',
    time: '15 min',
    diff: 'Très facile',
    desc: 'Cônes à rouler soi-même à table',
    baseIngredients: [
      { name: 'Feuilles de nori',    qty: '1 par personne' },
      { name: 'Riz à sushi vinaigré', qty: '2 grosses c. à soupe' },
      { name: 'Garnitures variées',  qty: 'en lamelles' },
      { name: 'Wasabi, sauce soja',  qty: 'à discrétion' },
    ],
    steps: [
      'Couper les feuilles de nori en deux (rectangle).',
      'Tenir le demi-nori dans la main gauche, face brillante vers le bas.',
      'Déposer 2 c. à soupe de riz sur le tiers gauche, en laissant les bords libres.',
      'Disposer les garnitures en diagonale sur le riz, du coin inférieur gauche vers le coin supérieur droit.',
      'Rouler en cône en ramenant le coin inférieur gauche vers le haut, comme un cornet de glace.',
      'Le bord de nori libre scelle naturellement le cône. Déguster immédiatement avant que le nori ne ramollisse.',
    ],
    tip: '💡 L\'idéal c\'est de rouler les temakis à table, au fur et à mesure — le nori croustillant est ce qui les rend délicieux. Prépare tous les ingrédients à l\'avance !',
  },
};


/* ================================================================
   2. STATE — L'état de l'application (ce qui change)
   ================================================================ */

/*
  Le panier : un objet simple { id_sushi: quantité }
  Exemple : { 'maki_saumon': 2, 'cali_thon_avocat': 1 }
  Les IDs absents = quantité 0
*/
const cart = {};


/* ================================================================
   3. MENU — Affichage et interactions du panel Menu
   ================================================================ */

/*
  renderMenu() — Génère les cartes sushi pour chaque catégorie
  Appelée une seule fois au démarrage (dans init())
*/
function renderMenu() {
  // Association catégorie → id de la div dans le HTML
  const gridMap = {
    maki:       'grid-maki',
    california: 'grid-california',
    nigiri:     'grid-nigiri',
    temaki:     'grid-temaki',
  };

  // On boucle sur chaque catégorie
  for (const [categorie, listeSushis] of Object.entries(SUSHI)) {
    const conteneur = document.getElementById(gridMap[categorie]);

    // On génère le HTML de toutes les cartes en une fois (plus performant)
    conteneur.innerHTML = listeSushis.map(sushi => `
      <div class="sushi-card" id="card-${sushi.id}">
        <div class="sushi-emoji">${sushi.emoji}</div>
        <div class="sushi-info">
          <div class="sushi-name">${sushi.name}</div>
          <div class="sushi-desc">${sushi.desc}</div>
          <div class="sushi-price">~${sushi.priceUnit.toFixed(2)} € · ${sushi.pieces} pièces</div>
        </div>
        <div class="qty-control">
          <button class="qty-btn minus" onclick="changerQuantite('${sushi.id}', -1)">−</button>
          <span class="qty-num" id="qty-${sushi.id}">0</span>
          <button class="qty-btn plus"  onclick="changerQuantite('${sushi.id}', +1)">+</button>
        </div>
      </div>
    `).join(''); // join('') pour ne pas avoir de virgule entre les cartes
  }
}

/*
  changerQuantite(id, delta) — Modifie la quantité d'un sushi dans le panier
  Appelée par les boutons + et − dans le HTML via onclick
  delta = +1 ou -1
*/
function changerQuantite(id, delta) {
  // Math.max(0, ...) : on ne peut pas aller en dessous de 0
  cart[id] = Math.max(0, (cart[id] || 0) + delta);

  // Met à jour le chiffre affiché sur la carte
  document.getElementById(`qty-${id}`).textContent = cart[id];

  // Ajoute/retire la classe CSS "selected" selon si qty > 0
  const carte = document.getElementById(`card-${id}`);
  carte.classList.toggle('selected', cart[id] > 0);

  // Met à jour la barre de panier en bas
  mettreAJourPanier();
}


/* ================================================================
   4. PANIER — Calcul et affichage de la barre du bas
   ================================================================ */

/*
  mettreAJourPanier() — Recalcule le total et met à jour la barre
*/
function mettreAJourPanier() {
  const total = calculerTotalPrix();
  const nombrePlateaux = Object.values(cart).reduce((acc, val) => acc + val, 0);

  // Met à jour les textes
  document.getElementById('cart-summary').textContent = nombrePlateaux === 0
    ? '0 plateau sélectionné'
    : `${nombrePlateaux} plateau${nombrePlateaux > 1 ? 'x' : ''} sélectionné${nombrePlateaux > 1 ? 's' : ''}`;

  // toFixed(2) = 2 décimales | replace('.', ',') = format français
  document.getElementById('cart-total').textContent =
    total.toFixed(2).replace('.', ',') + ' €';

  // Affiche/cache la barre selon s'il y a des articles
  document.getElementById('cart-bar').classList.toggle('visible', nombrePlateaux > 0);
}

/*
  calculerTotalPrix() — Additionne le prix de tous les plateaux sélectionnés
*/
function calculerTotalPrix() {
  let total = 0;
  for (const [id, qty] of Object.entries(cart)) {
    if (!qty) continue; // ignore les quantités à 0
    const sushi = trouverSushi(id);
    if (sushi) total += sushi.priceUnit * qty;
  }
  return total;
}

/*
  trouverSushi(id) — Cherche un sushi par son id dans toutes les catégories
  Retourne l'objet sushi ou null si introuvable
*/
function trouverSushi(id) {
  for (const listeSushis of Object.values(SUSHI)) {
    const trouve = listeSushis.find(s => s.id === id);
    if (trouve) return trouve;
  }
  return null;
}


/* ================================================================
   5. LISTE DE COURSES — Calcul et génération HTML
   ================================================================ */

/*
  calculerIngredients() — Agrège tous les ingrédients nécessaires
  Retourne un objet { ingId: quantitéTotale }
*/
function calculerIngredients() {
  const totaux = {};

  for (const [id, qty] of Object.entries(cart)) {
    if (!qty) continue;
    const sushi = trouverSushi(id);
    if (!sushi) continue;

    for (const ingId of sushi.ingredients) {
      const ing = INGREDIENTS[ingId];
      if (!ing || ing.unit === 'fixe') continue; // les condiments fixes sont traités séparément
      totaux[ingId] = (totaux[ingId] || 0) + ing.perPlate * qty;
    }
  }

  // Ajouter les condiments de base si au moins un sushi est sélectionné
  const aDesArticles = Object.values(cart).some(v => v > 0);
  if (aDesArticles) {
    for (const ingId of ALWAYS) {
      if (!totaux[ingId]) totaux[ingId] = 1; // valeur symbolique = présent dans la liste
    }
  }

  return totaux;
}

/*
  estimerPrix(ingId, quantite) — Calcule le prix estimé selon le type d'unité
*/
function estimerPrix(ingId, quantite) {
  const ing = INGREDIENTS[ingId];
  if (!ing) return 0;

  if (ing.unit === 'g')      return (quantite / 1000) * ing.priceKg;
  if (ing.unit === 'cl')     return (quantite / 100) * ing.priceL;
  if (ing.unit === 'boîte')  return Math.ceil(quantite) * ing.priceUnit;
  if (ing.unit === 'feuille' || ing.unit === 'pièce') return Math.ceil(quantite) * ing.priceUnit;
  if (ing.unit === 'fixe')   return ing.priceUnit; // condiment : prix forfaitaire
  return 0;
}

/*
  formaterQuantite(ingId, quantite) — Formate l'affichage de la quantité
*/
function formaterQuantite(ingId, quantite) {
  const ing = INGREDIENTS[ingId];
  if (ing.unit === 'g')      return Math.ceil(quantite) + 'g';
  if (ing.unit === 'cl')     return Math.ceil(quantite) + 'cl';
  if (ing.unit === 'boîte')  return Math.ceil(quantite) + ' boîte(s)';
  if (ing.unit === 'feuille') return Math.ceil(quantite) + ' feuille(s)';
  if (ing.unit === 'pièce')  return Math.ceil(quantite) + ' pièce(s)';
  if (ing.unit === 'fixe')   return '1 unité';
  return '—';
}

/*
  renderListe() — Génère le HTML complet du panel "Liste de courses"
  Appelée à chaque fois qu'on navigue vers cet onglet
*/
function renderListe() {
  const conteneur = document.getElementById('liste-content');
  const aDesArticles = Object.values(cart).some(v => v > 0);

  // État vide
  if (!aDesArticles) {
    conteneur.innerHTML = `
      <div class="empty-state">
        <div class="big">🛒</div>
        <p>Sélectionne tes sushis dans le menu pour générer ta liste de courses</p>
      </div>
    `;
    return;
  }

  const totaux = calculerIngredients();

  // Regrouper par catégorie
  const parCategorie = {};
  for (const [ingId, quantite] of Object.entries(totaux)) {
    const ing = INGREDIENTS[ingId];
    if (!ing) continue;
    if (!parCategorie[ing.cat]) parCategorie[ing.cat] = [];
    parCategorie[ing.cat].push({ ingId, quantite, ing });
  }

  // Construire les lignes du tableau
  let lignesTableau = '';
  let totalGeneral = 0;

  for (const [categorie, items] of Object.entries(parCategorie)) {
    // Ligne de titre de catégorie
    lignesTableau += `<tr class="cat-row"><td colspan="3">${categorie}</td></tr>`;

    for (const { ingId, quantite, ing } of items) {
      const prix = estimerPrix(ingId, quantite);
      totalGeneral += prix;
      lignesTableau += `
        <tr>
          <td>${ing.name}</td>
          <td>${formaterQuantite(ingId, quantite)}</td>
          <td class="price-cell">~${prix.toFixed(2).replace('.', ',')} €</td>
        </tr>
      `;
    }
  }

  // Résumé de commande (colonne droite)
  let lignesCommande = '';
  let totalCommande = 0;

  for (const [id, qty] of Object.entries(cart)) {
    if (!qty) continue;
    const sushi = trouverSushi(id);
    if (!sushi) continue;
    const cout = sushi.priceUnit * qty;
    totalCommande += cout;
    lignesCommande += `
      <div class="order-item">
        <div class="order-item-name">${sushi.emoji} ${sushi.name}</div>
        <span class="order-item-qty">${qty}×</span>
      </div>
    `;
  }

  conteneur.innerHTML = `
    <div class="list-layout">

      <!-- Colonne gauche : tableau des ingrédients -->
      <div>
        <div class="section-title">Ingrédients à acheter</div>
        <table class="ingredient-table">
          <thead>
            <tr>
              <th>Ingrédient</th>
              <th>Quantité</th>
              <th style="text-align:right">Prix estimé</th>
            </tr>
          </thead>
          <tbody>
            ${lignesTableau}
            <tr class="total-row">
              <td colspan="2">Total estimé courses</td>
              <td class="price-cell">~${totalGeneral.toFixed(2).replace('.', ',')} €</td>
            </tr>
          </tbody>
        </table>
        <p style="font-size:10px;color:#8a7a5a;margin-top:12px;letter-spacing:0.05em">
          * Prix moyens indicatifs en grande surface France 2026. Les prix réels peuvent varier.
        </p>
        <button class="print-btn" onclick="window.print()">🖨 Imprimer la liste</button>
      </div>

      <!-- Colonne droite : résumé de commande -->
      <div>
        <div class="section-title">Ta commande</div>
        <div class="order-summary">
          ${lignesCommande}
          <div class="order-grand-total">
            <span>Total sushis</span>
            <span>~${totalCommande.toFixed(2).replace('.', ',')} €</span>
          </div>
        </div>
      </div>

    </div>
  `;
}


/* ================================================================
   6. RECETTES — Génération du panel Recettes
   ================================================================ */

/*
  renderRecettes() — Génère les cartes recettes pour les sushis sélectionnés
  Appelée à chaque fois qu'on navigue vers l'onglet Recettes
*/
function renderRecettes() {
  const conteneur = document.getElementById('recettes-content');
  const aDesArticles = Object.values(cart).some(v => v > 0);

  // État vide
  if (!aDesArticles) {
    conteneur.innerHTML = `
      <div class="empty-state">
        <div class="big">📖</div>
        <p>Sélectionne tes sushis dans le menu pour voir les recettes correspondantes</p>
      </div>
    `;
    return;
  }

  // Collecter les clés de recettes uniques des sushis sélectionnés
  const recettesUtilisees = new Set();
  for (const [id, qty] of Object.entries(cart)) {
    if (!qty) continue;
    const sushi = trouverSushi(id);
    if (sushi) recettesUtilisees.add(sushi.recipeKey);
  }

  // Toujours afficher la recette du riz en premier
  let cartesHTML = genererCarteRiz();

  // Puis les recettes des sushis sélectionnés
  for (const cle of recettesUtilisees) {
    const recette = RECIPES[cle];
    if (!recette) continue;

    const listeIngredients = recette.baseIngredients
      .map(ing => `<li>${ing.name} <span class="ing-qty">${ing.qty}</span></li>`)
      .join('');

    const listeEtapes = recette.steps
      .map(etape => `<li>${etape}</li>`)
      .join('');

    cartesHTML += `
      <div class="recipe-card" id="recipe-${cle}">
        <div class="recipe-header" onclick="basculerRecette('${cle}')">
          <span class="recipe-emoji">${recette.emoji}</span>
          <div class="recipe-title-block">
            <div class="recipe-title">${recette.name}</div>
            <div class="recipe-meta">⏱ ${recette.time} · ${recette.diff} · ${recette.desc}</div>
          </div>
          <span class="recipe-toggle">+</span>
        </div>
        <div class="recipe-body">
          <div>
            <div class="recipe-section-title">Ingrédients (4 pers.)</div>
            <ul class="recipe-ingredients">${listeIngredients}</ul>
          </div>
          <div>
            <div class="recipe-section-title">Étapes</div>
            <ol class="recipe-steps">${listeEtapes}</ol>
          </div>
          <div class="recipe-tip">${recette.tip}</div>
        </div>
      </div>
    `;
  }

  conteneur.innerHTML = `<div class="recipe-list">${cartesHTML}</div>`;
}

/*
  genererCarteRiz() — Génère le HTML de la recette de base du riz
  (Toujours affichée en premier, quelle que soit la sélection)
*/
function genererCarteRiz() {
  return `
    <div class="recipe-card" id="recipe-riz">
      <div class="recipe-header" onclick="basculerRecette('riz')">
        <span class="recipe-emoji">🍚</span>
        <div class="recipe-title-block">
          <div class="recipe-title">Le riz à sushi — la base</div>
          <div class="recipe-meta">⏱ 30 min · Essentiel pour tous les sushis</div>
        </div>
        <span class="recipe-toggle">+</span>
      </div>
      <div class="recipe-body">
        <div>
          <div class="recipe-section-title">Ingrédients (4 pers.)</div>
          <ul class="recipe-ingredients">
            <li>Riz japonais rond <span class="ing-qty">400g cru</span></li>
            <li>Vinaigre de riz   <span class="ing-qty">6 c. à soupe</span></li>
            <li>Sucre             <span class="ing-qty">2 c. à café</span></li>
            <li>Sel               <span class="ing-qty">1 c. à café</span></li>
          </ul>
        </div>
        <div>
          <div class="recipe-section-title">Étapes</div>
          <ol class="recipe-steps">
            <li>Rincer le riz 3-4 fois jusqu'à ce que l'eau soit claire. Égoutter 30 min.</li>
            <li>Cuire avec le même volume d'eau + un peu plus (ex: 400g riz → 500ml eau). Ébullition, couvrir, feu doux 12 min, éteindre et reposer 10 min.</li>
            <li>Mélanger vinaigre + sucre + sel jusqu'à dissolution.</li>
            <li>Verser le mélange sur le riz chaud et mélanger délicatement avec une spatule.</li>
            <li>Éventer le riz en mélangeant pour le refroidir rapidement. Il doit être tiède et brillant.</li>
            <li>Couvrir d'un torchon humide et utiliser dans l'heure.</li>
          </ol>
        </div>
        <div class="recipe-tip">💡 Le riz ne doit être ni trop chaud ni trop froid. Tiède = idéal. Ne le mets surtout pas au frigo — il durcirait.</div>
      </div>
    </div>
  `;
}

/*
  basculerRecette(cle) — Ouvre/ferme une carte recette (accordéon)
*/
function basculerRecette(cle) {
  const carte = document.getElementById(`recipe-${cle}`);
  // toggle('open') = ajoute si absent, retire si présent
  carte.classList.toggle('open');
}


/* ================================================================
   7. NAVIGATION — Changement d'onglets
   ================================================================ */

/*
  switchTab(onglet) — Active le panel correspondant à l'onglet cliqué
  Appelée depuis les boutons du HTML via onclick
*/
function switchTab(onglet) {
  // Met à jour les boutons d'onglet
  document.querySelectorAll('.tab').forEach((bouton, index) => {
    const onglets = ['menu', 'liste', 'recettes'];
    bouton.classList.toggle('active', onglets[index] === onglet);
  });

  // Masque tous les panels
  document.querySelectorAll('.panel').forEach(panel => {
    panel.classList.remove('active');
  });

  // Affiche uniquement le panel correspondant
  document.getElementById(`panel-${onglet}`).classList.add('active');

  // Si on navigue vers liste ou recettes, on régénère le contenu
  // (pour prendre en compte les modifications du panier)
  if (onglet === 'liste')    renderListe();
  if (onglet === 'recettes') renderRecettes();
}


/* ================================================================
   8. INIT — Démarrage de l'application
   ================================================================ */

/*
  init() — Fonction principale, appelée au chargement de la page
  Le script est placé en fin de <body> donc le HTML est déjà chargé
  quand cette ligne s'exécute — pas besoin de DOMContentLoaded
*/
function init() {
  renderMenu();
}

// Démarrage !
init();
