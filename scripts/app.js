# /* ================================================================
SUSHI BUILDER — app.js

STRUCTURE DU FICHIER :

1. DATA       — les données (sushis, ingrédients, recettes)
1. STATE      — les variables qui évoluent (le panier)
1. MENU       — affichage et interaction du panel Menu
1. PANIER     — calcul et mise à jour de la barre de panier
1. LISTE      — génération de la liste de courses
1. RECETTES   — génération du panel recettes
1. NAVIGATION — changement d’onglets
1. INIT       — démarrage de l’application
   ================================================================ */

/* ================================================================

1. DATA — Les données de l’application
   ================================================================ */

const SUSHI = {
maki: [
// — Saumon —
{
id: ‘maki_saumon’,
name: ‘Maki Saumon’,
emoji: ‘🐟’,
desc: ‘Saumon frais · nori · riz vinaigré’,
priceUnit: 4.50,
pieces: 6,
ingredients: [‘saumon_cru’, ‘riz’, ‘nori’, ‘vinaigre_riz’],
recipeKey: ‘maki_base’,
},
{
id: ‘maki_saumon_avocat’,
name: ‘Maki Saumon Avocat’,
emoji: ‘🐟’,
desc: ‘Saumon · avocat · nori · riz vinaigré’,
priceUnit: 5.00,
pieces: 6,
ingredients: [‘saumon_cru’, ‘avocat’, ‘riz’, ‘nori’, ‘vinaigre_riz’],
recipeKey: ‘maki_base’,
},
{
id: ‘maki_saumon_concombre’,
name: ‘Maki Saumon Concombre’,
emoji: ‘🐟’,
desc: ‘Saumon · concombre · nori · riz vinaigré’,
priceUnit: 4.50,
pieces: 6,
ingredients: [‘saumon_cru’, ‘concombre’, ‘riz’, ‘nori’, ‘vinaigre_riz’],
recipeKey: ‘maki_base’,
},
{
id: ‘maki_saumon_cream_cheese’,
name: ‘Maki Saumon Cream Cheese’,
emoji: ‘🐟’,
desc: ‘Saumon · cream cheese · nori · riz’,
priceUnit: 5.50,
pieces: 6,
ingredients: [‘saumon_cru’, ‘cream_cheese’, ‘riz’, ‘nori’, ‘vinaigre_riz’],
recipeKey: ‘maki_base’,
},
{
id: ‘maki_saumon_avocat_cheese’,
name: ‘Maki Saumon Avocat Cream Cheese’,
emoji: ‘🐟’,
desc: ‘Saumon · avocat · cream cheese · nori · riz’,
priceUnit: 6.00,
pieces: 6,
ingredients: [‘saumon_cru’, ‘avocat’, ‘cream_cheese’, ‘riz’, ‘nori’, ‘vinaigre_riz’],
recipeKey: ‘maki_base’,
},
{
id: ‘maki_saumon_sesame’,
name: ‘Maki Saumon Sésame’,
emoji: ‘🐟’,
desc: ‘Saumon · sésame · nori · riz vinaigré’,
priceUnit: 4.50,
pieces: 6,
ingredients: [‘saumon_cru’, ‘sesame’, ‘riz’, ‘nori’, ‘vinaigre_riz’],
recipeKey: ‘maki_base’,
},
// — Thon —
{
id: ‘maki_thon’,
name: ‘Maki Thon Mayo’,
emoji: ‘🥫’,
desc: ‘Thon en conserve · mayo · nori · riz’,
priceUnit: 3.50,
pieces: 6,
ingredients: [‘thon_conserve’, ‘mayonnaise’, ‘riz’, ‘nori’, ‘vinaigre_riz’],
recipeKey: ‘maki_thon’,
},
{
id: ‘maki_thon_concombre’,
name: ‘Maki Thon Concombre’,
emoji: ‘🥫’,
desc: ‘Thon · concombre · nori · riz’,
priceUnit: 3.50,
pieces: 6,
ingredients: [‘thon_conserve’, ‘concombre’, ‘riz’, ‘nori’, ‘vinaigre_riz’],
recipeKey: ‘maki_thon’,
},
{
id: ‘maki_thon_avocat’,
name: ‘Maki Thon Avocat’,
emoji: ‘🥫’,
desc: ‘Thon · avocat · nori · riz’,
priceUnit: 4.00,
pieces: 6,
ingredients: [‘thon_conserve’, ‘avocat’, ‘riz’, ‘nori’, ‘vinaigre_riz’],
recipeKey: ‘maki_thon’,
},
{
id: ‘maki_thon_spicy’,
name: ‘Maki Thon Spicy Mayo’,
emoji: ‘🌶️’,
desc: ‘Thon · mayo épicée · sriracha · nori · riz’,
priceUnit: 4.00,
pieces: 6,
ingredients: [‘thon_conserve’, ‘mayonnaise’, ‘sriracha’, ‘riz’, ‘nori’, ‘vinaigre_riz’],
recipeKey: ‘maki_thon_spicy’,
},
{
id: ‘maki_thon_cream_cheese’,
name: ‘Maki Thon Cream Cheese’,
emoji: ‘🥫’,
desc: ‘Thon · cream cheese · nori · riz’,
priceUnit: 4.50,
pieces: 6,
ingredients: [‘thon_conserve’, ‘cream_cheese’, ‘riz’, ‘nori’, ‘vinaigre_riz’],
recipeKey: ‘maki_thon’,
},
{
id: ‘maki_thon_sesame’,
name: ‘Maki Thon Sésame’,
emoji: ‘🥫’,
desc: ‘Thon · sésame · nori · riz’,
priceUnit: 3.50,
pieces: 6,
ingredients: [‘thon_conserve’, ‘sesame’, ‘riz’, ‘nori’, ‘vinaigre_riz’],
recipeKey: ‘maki_thon’,
},
// — Végétariens —
{
id: ‘maki_avocat’,
name: ‘Maki Avocat’,
emoji: ‘🥑’,
desc: ‘Avocat · nori · riz vinaigré’,
priceUnit: 3.00,
pieces: 6,
ingredients: [‘avocat’, ‘riz’, ‘nori’, ‘vinaigre_riz’],
recipeKey: ‘maki_base’,
},
{
id: ‘maki_concombre’,
name: ‘Maki Concombre (Kappa Maki)’,
emoji: ‘🥒’,
desc: ‘Concombre · nori · riz vinaigré’,
priceUnit: 2.50,
pieces: 6,
ingredients: [‘concombre’, ‘riz’, ‘nori’, ‘vinaigre_riz’],
recipeKey: ‘maki_base’,
},
{
id: ‘maki_avocat_concombre’,
name: ‘Maki Avocat Concombre’,
emoji: ‘🥑’,
desc: ‘Avocat · concombre · nori · riz’,
priceUnit: 3.00,
pieces: 6,
ingredients: [‘avocat’, ‘concombre’, ‘riz’, ‘nori’, ‘vinaigre_riz’],
recipeKey: ‘maki_base’,
},
{
id: ‘maki_cream_cheese_avocat’,
name: ‘Maki Cream Cheese Avocat’,
emoji: ‘🧀’,
desc: ‘Cream cheese · avocat · nori · riz’,
priceUnit: 3.50,
pieces: 6,
ingredients: [‘cream_cheese’, ‘avocat’, ‘riz’, ‘nori’, ‘vinaigre_riz’],
recipeKey: ‘maki_base’,
},
{
id: ‘maki_concombre_sesame’,
name: ‘Maki Concombre Sésame’,
emoji: ‘🥒’,
desc: ‘Concombre · sésame · nori · riz’,
priceUnit: 2.50,
pieces: 6,
ingredients: [‘concombre’, ‘sesame’, ‘riz’, ‘nori’, ‘vinaigre_riz’],
recipeKey: ‘maki_base’,
},
],

california: [
// — Saumon —
{
id: ‘cali_saumon_avocat’,
name: ‘California Saumon–Avocat’,
emoji: ‘🍱’,
desc: ‘Saumon · avocat · riz · sésame · nori’,
priceUnit: 5.50,
pieces: 8,
ingredients: [‘saumon_cru’, ‘avocat’, ‘riz’, ‘nori’, ‘vinaigre_riz’, ‘sesame’],
recipeKey: ‘california’,
},
{
id: ‘cali_saumon_concombre’,
name: ‘California Saumon–Concombre’,
emoji: ‘🍱’,
desc: ‘Saumon · concombre · riz · sésame · nori’,
priceUnit: 5.00,
pieces: 8,
ingredients: [‘saumon_cru’, ‘concombre’, ‘riz’, ‘nori’, ‘vinaigre_riz’, ‘sesame’],
recipeKey: ‘california’,
},
{
id: ‘cali_saumon_cheese’,
name: ‘California Saumon–Cream Cheese’,
emoji: ‘🌸’,
desc: ‘Saumon · cream cheese · avocat · riz’,
priceUnit: 6.00,
pieces: 8,
ingredients: [‘saumon_cru’, ‘cream_cheese’, ‘avocat’, ‘riz’, ‘nori’, ‘vinaigre_riz’, ‘sesame’],
recipeKey: ‘california’,
},
{
id: ‘cali_saumon_avocat_sesame’,
name: ‘California Saumon Avocat Sésame’,
emoji: ‘🍱’,
desc: ‘Saumon · avocat · riz · sésame abondant’,
priceUnit: 5.50,
pieces: 8,
ingredients: [‘saumon_cru’, ‘avocat’, ‘riz’, ‘nori’, ‘vinaigre_riz’, ‘sesame’],
recipeKey: ‘california’,
},
{
id: ‘cali_spicy_saumon’,
name: ‘California Spicy Saumon’,
emoji: ‘🌶️’,
desc: ‘Saumon · mayo épicée · sriracha · riz · nori’,
priceUnit: 6.00,
pieces: 8,
ingredients: [‘saumon_cru’, ‘mayonnaise’, ‘sriracha’, ‘riz’, ‘nori’, ‘vinaigre_riz’, ‘sesame’],
recipeKey: ‘california_spicy’,
},
// — Thon —
{
id: ‘cali_thon_mayo’,
name: ‘California Thon Mayo’,
emoji: ‘🌀’,
desc: ‘Thon · mayo · riz · sésame · nori’,
priceUnit: 5.00,
pieces: 8,
ingredients: [‘thon_conserve’, ‘mayonnaise’, ‘riz’, ‘nori’, ‘vinaigre_riz’, ‘sesame’],
recipeKey: ‘california’,
},
{
id: ‘cali_thon_avocat’,
name: ‘California Thon–Avocat’,
emoji: ‘🌀’,
desc: ‘Thon · avocat · mayo · riz · sésame’,
priceUnit: 5.00,
pieces: 8,
ingredients: [‘thon_conserve’, ‘avocat’, ‘mayonnaise’, ‘riz’, ‘nori’, ‘vinaigre_riz’, ‘sesame’],
recipeKey: ‘california’,
},
{
id: ‘cali_thon_concombre’,
name: ‘California Thon–Concombre’,
emoji: ‘🌀’,
desc: ‘Thon · concombre · riz · sésame · nori’,
priceUnit: 4.50,
pieces: 8,
ingredients: [‘thon_conserve’, ‘concombre’, ‘riz’, ‘nori’, ‘vinaigre_riz’, ‘sesame’],
recipeKey: ‘california’,
},
{
id: ‘cali_thon_spicy’,
name: ‘California Thon Spicy’,
emoji: ‘🌶️’,
desc: ‘Thon · mayo épicée · sriracha · riz · nori’,
priceUnit: 5.50,
pieces: 8,
ingredients: [‘thon_conserve’, ‘mayonnaise’, ‘sriracha’, ‘riz’, ‘nori’, ‘vinaigre_riz’, ‘sesame’],
recipeKey: ‘california_spicy’,
},
{
id: ‘cali_thon_cheese’,
name: ‘California Thon–Cream Cheese’,
emoji: ‘🧀’,
desc: ‘Thon · cream cheese · concombre · riz’,
priceUnit: 5.00,
pieces: 8,
ingredients: [‘thon_conserve’, ‘cream_cheese’, ‘concombre’, ‘riz’, ‘nori’, ‘vinaigre_riz’, ‘sesame’],
recipeKey: ‘california’,
},
// — Veggie —
{
id: ‘cali_avocat_concombre’,
name: ‘California Avocat–Concombre’,
emoji: ‘🥑’,
desc: ‘Avocat · concombre · riz · sésame · nori’,
priceUnit: 4.00,
pieces: 8,
ingredients: [‘avocat’, ‘concombre’, ‘riz’, ‘nori’, ‘vinaigre_riz’, ‘sesame’],
recipeKey: ‘california’,
},
{
id: ‘cali_avocat_cheese’,
name: ‘California Avocat–Cream Cheese’,
emoji: ‘🥑’,
desc: ‘Avocat · cream cheese · riz · sésame · nori’,
priceUnit: 4.50,
pieces: 8,
ingredients: [‘avocat’, ‘cream_cheese’, ‘riz’, ‘nori’, ‘vinaigre_riz’, ‘sesame’],
recipeKey: ‘california’,
},
{
id: ‘cali_concombre_sesame’,
name: ‘California Concombre–Sésame’,
emoji: ‘🥒’,
desc: ‘Concombre · sésame · riz · nori’,
priceUnit: 3.50,
pieces: 8,
ingredients: [‘concombre’, ‘riz’, ‘nori’, ‘vinaigre_riz’, ‘sesame’],
recipeKey: ‘california’,
},
],

nigiri: [
{
id: ‘nigiri_saumon’,
name: ‘Nigiri Saumon’,
emoji: ‘🍣’,
desc: ‘Tranche de saumon · riz moulé · wasabi’,
priceUnit: 4.00,
pieces: 6,
ingredients: [‘saumon_cru’, ‘riz’, ‘vinaigre_riz’, ‘wasabi’],
recipeKey: ‘nigiri’,
},
{
id: ‘nigiri_saumon_wasabi’,
name: ‘Nigiri Saumon Wasabi’,
emoji: ‘🍣’,
desc: ‘Saumon · riz moulé · généreuse pointe de wasabi’,
priceUnit: 4.00,
pieces: 6,
ingredients: [‘saumon_cru’, ‘riz’, ‘vinaigre_riz’, ‘wasabi’],
recipeKey: ‘nigiri’,
},
{
id: ‘nigiri_thon’,
name: ‘Nigiri Thon Mayo’,
emoji: ‘🔥’,
desc: ‘Thon poêlé · mayo · riz moulé · sauce soja · wasabi’,
priceUnit: 4.00,
pieces: 6,
ingredients: [‘thon_conserve’, ‘mayonnaise’, ‘riz’, ‘vinaigre_riz’, ‘sauce_soja’, ‘wasabi’],
recipeKey: ‘nigiri_thon’,
},
{
id: ‘nigiri_avocat’,
name: ‘Nigiri Avocat’,
emoji: ‘🥑’,
desc: ‘Tranche d'avocat · riz moulé · sauce soja’,
priceUnit: 3.00,
pieces: 6,
ingredients: [‘avocat’, ‘riz’, ‘vinaigre_riz’, ‘sauce_soja’],
recipeKey: ‘nigiri_veggie’,
},
{
id: ‘nigiri_concombre’,
name: ‘Nigiri Concombre’,
emoji: ‘🥒’,
desc: ‘Concombre finement tranché · riz moulé · sésame’,
priceUnit: 2.50,
pieces: 6,
ingredients: [‘concombre’, ‘sesame’, ‘riz’, ‘vinaigre_riz’, ‘sauce_soja’],
recipeKey: ‘nigiri_veggie’,
},
],

temaki: [
{
id: ‘temaki_saumon_avocat’,
name: ‘Temaki Saumon–Avocat’,
emoji: ‘🌮’,
desc: ‘Saumon · avocat · concombre · riz · nori’,
priceUnit: 4.00,
pieces: 2,
ingredients: [‘saumon_cru’, ‘avocat’, ‘concombre’, ‘riz’, ‘nori’, ‘vinaigre_riz’],
recipeKey: ‘temaki’,
},
{
id: ‘temaki_saumon_concombre’,
name: ‘Temaki Saumon–Concombre’,
emoji: ‘🌮’,
desc: ‘Saumon · concombre · riz · nori’,
priceUnit: 3.50,
pieces: 2,
ingredients: [‘saumon_cru’, ‘concombre’, ‘riz’, ‘nori’, ‘vinaigre_riz’],
recipeKey: ‘temaki’,
},
{
id: ‘temaki_thon_mayo’,
name: ‘Temaki Thon Mayo’,
emoji: ‘🌯’,
desc: ‘Thon · mayo · riz · nori’,
priceUnit: 3.50,
pieces: 2,
ingredients: [‘thon_conserve’, ‘mayonnaise’, ‘riz’, ‘nori’, ‘vinaigre_riz’],
recipeKey: ‘temaki’,
},
{
id: ‘temaki_thon_avocat’,
name: ‘Temaki Thon–Avocat’,
emoji: ‘🌯’,
desc: ‘Thon · avocat · riz · nori’,
priceUnit: 3.50,
pieces: 2,
ingredients: [‘thon_conserve’, ‘avocat’, ‘riz’, ‘nori’, ‘vinaigre_riz’],
recipeKey: ‘temaki’,
},
{
id: ‘temaki_veggie’,
name: ‘Temaki Veggie Avocat–Concombre’,
emoji: ‘🥑’,
desc: ‘Avocat · concombre · sésame · riz · nori’,
priceUnit: 3.00,
pieces: 2,
ingredients: [‘avocat’, ‘concombre’, ‘sesame’, ‘riz’, ‘nori’, ‘vinaigre_riz’],
recipeKey: ‘temaki’,
},
],

condiment: [
{
id: ‘sauce_soja_add’,
name: ‘Sauce Soja’,
emoji: ‘🫙’,
desc: ‘’,
priceUnit: 2.50,
pieces: 1,
ingredients: [‘sauce_soja’],
recipeKey: ‘sauce_soja_recipe’,
},
{
id: ‘wasabi_add’,
name: ‘Wasabi’,
emoji: ‘🟢’,
desc: ‘’,
priceUnit: 2.50,
pieces: 1,
ingredients: [‘wasabi’],
recipeKey: ‘wasabi_recipe’,
},
{
id: ‘gari_add’,
name: ‘Gari’,
emoji: ‘🌸’,
desc: ‘’,
priceUnit: 2.50,
pieces: 1,
ingredients: [‘gari’],
recipeKey: ‘gari_recipe’,
},
],
};

const INGREDIENTS = {
saumon_cru:    { name: ‘Saumon frais (sashimi-grade)’,    unit: ‘g’,        perPlate: 80,   priceKg: 28,    cat: ‘Poisson & Protéines’ },
thon_conserve: { name: ‘Thon en conserve (au naturel)’,   unit: ‘boîte’,    perPlate: 0.5,  priceUnit: 1.20, cat: ‘Poisson & Protéines’ },
riz:           { name: ‘Riz japonais rond (à sushi)’,     unit: ‘g’,        perPlate: 100,  priceKg: 3.50,  cat: ‘Épicerie sèche’ },
nori:          { name: ‘Feuilles de nori’,                unit: ‘feuille’,  perPlate: 1.5,  priceUnit: 0.40, cat: ‘Épicerie sèche’ },
vinaigre_riz:  { name: ‘Vinaigre de riz’,                unit: ‘cl’,       perPlate: 4,    priceL: 6.00,   cat: ‘Épicerie sèche’ },
avocat:        { name: ‘Avocat’,                          unit: ‘pièce’,    perPlate: 0.5,  priceUnit: 1.20, cat: ‘Fruits & Légumes’ },
concombre:     { name: ‘Concombre’,                       unit: ‘pièce’,    perPlate: 0.25, priceUnit: 0.90, cat: ‘Fruits & Légumes’ },
sesame:        { name: ‘Graines de sésame’,               unit: ‘g’,        perPlate: 10,   priceKg: 8.00,  cat: ‘Épicerie sèche’ },
cream_cheese:  { name: ‘Cream cheese (Philadelphia)’,     unit: ‘g’,        perPlate: 40,   priceKg: 14.00, cat: ‘Frais’ },
mayonnaise:    { name: ‘Mayonnaise’,                      unit: ‘g’,        perPlate: 20,   priceKg: 5.00,  cat: ‘Épicerie sèche’ },
sriracha:      { name: ‘Sriracha (sauce piquante)’,       unit: ‘g’,        perPlate: 10,   priceKg: 12.00, cat: ‘Condiments’ },
sauce_soja:    { name: ‘Sauce soja’,                      unit: ‘cl’,       perPlate: 3,    priceL: 10.0,   cat: ‘Condiments’ },
wasabi:        { name: ‘Wasabi (tube)’,                   unit: ‘g’,        perPlate: 1,    priceKg: 60.0,  cat: ‘Condiments’ },
gari:          { name: ‘Gingembre mariné (gari)’,         unit: ‘g’,        perPlate: 10,   priceKg: 9.0,   cat: ‘Condiments’ },
};

const ALWAYS = [];

const RECIPES = {
maki_base: {
name: ‘Makis classiques’,
emoji: ‘🌿’,
time: ‘30 min’,
diff: ‘Facile’,
desc: ‘Saumon, avocat, concombre, cream cheese ou sésame’,
baseIngredients: [
{ name: ‘Riz à sushi cuit et vinaigré’, qty: ‘300g’ },
{ name: ‘Feuilles de nori’,              qty: ‘3 feuilles’ },
{ name: ‘Garniture au choix’,            qty: ‘en lamelles’ },
{ name: ‘Wasabi’,                        qty: ‘selon goût’ },
],
steps: [
‘Cuire le riz à sushi selon le paquet (environ 200g cru → 300g cuit). Laisser tiédir 10 min.’,
‘Mélanger le riz chaud avec 3 c. à soupe de vinaigre de riz + 1 c. à café de sucre + 1 pincée de sel. Remuer délicatement.’,
‘Poser une feuille de nori, côté brillant vers le bas, sur la natte (makisu) recouverte de film alimentaire.’,
‘Étaler une fine couche de riz sur les 2/3 de la feuille, en laissant 2 cm libres en haut.’,
‘Si cream cheese : étaler une fine bande au centre. Déposer ensuite la garniture (saumon/avocat/concombre) en lamelles.’,
‘Si sésame : saupoudrer sur le riz avant de placer la garniture.’,
‘Soulever la natte et rouler fermement en appuyant. Mouiller le bord de nori libre avec un peu d'eau pour sceller.’,
‘Trancher le rouleau en 6 morceaux nets avec un couteau mouillé.’,
],
tip: ‘💡 Garde les mains humides pour manipuler le riz. Pour les makis avec avocat, coupe-le en lamelles régulières au dernier moment pour éviter l'oxydation.’,
},

maki_thon: {
name: ‘Makis Thon’,
emoji: ‘🥫’,
time: ‘25 min’,
diff: ‘Facile’,
desc: ‘Thon mayo, thon concombre, thon avocat, thon cream cheese ou sésame’,
baseIngredients: [
{ name: ‘Thon en conserve égoutté’, qty: ‘140g’ },
{ name: ‘Mayonnaise (si version mayo)’, qty: ‘2 c. à soupe’ },
{ name: ‘Garniture complémentaire’, qty: ‘avocat / concombre / cream cheese’ },
{ name: ‘Riz à sushi vinaigré’,     qty: ‘300g’ },
{ name: ‘Feuilles de nori’,         qty: ‘3 feuilles’ },
],
steps: [
‘Égoutter soigneusement le thon. L'émietter et si version mayo, mélanger avec la mayonnaise.’,
‘Cuire et vinaigriner le riz (voir recette maki base).’,
‘Poser le nori sur la natte, étaler le riz sur les 2/3 de la feuille.’,
‘Déposer une ligne du mélange thon au centre. Ajouter la garniture choisie (concombre, avocat, cream cheese, sésame) par-dessus ou à côté.’,
‘Rouler fermement et sceller avec un peu d'eau.’,
‘Trancher en 6 morceaux avec un couteau humide.’,
],
tip: ‘💡 Pour la version “thon sésame”, saupoudre le sésame directement sur le riz avant de rouler. Pour le thon avocat, n'utilise pas forcément de mayo — c'est aussi délicieux nature.’,
},

maki_thon_spicy: {
name: ‘Maki Thon Spicy Mayo’,
emoji: ‘🌶️’,
time: ‘25 min’,
diff: ‘Facile’,
desc: ‘Version piquante avec sriracha’,
baseIngredients: [
{ name: ‘Thon en conserve égoutté’, qty: ‘140g’ },
{ name: ‘Mayonnaise’,               qty: ‘2 c. à soupe’ },
{ name: ‘Sriracha’,                 qty: ‘1 c. à café (ou plus)’ },
{ name: ‘Riz à sushi vinaigré’,     qty: ‘300g’ },
{ name: ‘Feuilles de nori’,         qty: ‘3 feuilles’ },
],
steps: [
‘Égoutter et émietter le thon. Mélanger avec la mayo et la sriracha selon ton goût.’,
‘Goûter et ajuster le piquant. La mixture doit être crémeuse et légèrement relevée.’,
‘Cuire et vinaigriner le riz (voir recette maki base).’,
‘Poser le nori sur la natte, étaler le riz sur les 2/3 de la feuille.’,
‘Déposer une ligne de mélange spicy tuna au centre.’,
‘Rouler fermement et sceller. Trancher en 6 morceaux avec un couteau humide.’,
],
tip: ‘💡 Ajoute quelques graines de sésame sur le riz avant de rouler pour encore plus de texture. La sriracha est forte — commence avec 1/2 c. à café et ajuste.’,
},

california: {
name: ‘California Rolls’,
emoji: ‘🍱’,
time: ‘40 min’,
diff: ‘Intermédiaire’,
desc: ‘Uramaki — le riz est à l'extérieur, toutes garnitures’,
baseIngredients: [
{ name: ‘Riz à sushi vinaigré’,           qty: ‘300g’ },
{ name: ‘Feuilles de nori’,               qty: ‘3 feuilles’ },
{ name: ‘Garniture (saumon/thon/avocat/concombre/cream cheese)’, qty: ‘en lamelles’ },
{ name: ‘Graines de sésame’,              qty: ‘2 c. à soupe’ },
{ name: ‘Film alimentaire’,               qty: ‘’ },
],
steps: [
‘Préparer le riz à sushi vinaigré et laisser tiédir.’,
‘Couvrir la natte de film alimentaire (important pour les california !). Poser le nori par-dessus.’,
‘Étaler une couche de riz SUR TOUTE la feuille de nori. Saupoudrer de graines de sésame sur le riz.’,
‘Retourner délicatement : maintenant le riz est en dessous, côté film alimentaire.’,
‘Déposer les garnitures en ligne au centre du nori (maintenant côté visible). Pour les versions “cream cheese”, étaler d'abord une bande de cream cheese avant les autres garnitures.’,
‘Rouler en serrant bien, en aidant avec la natte. Le riz se retrouvera à l'extérieur.’,
‘Retirer le film, trancher en 8 morceaux avec un couteau humide et essuyé entre chaque coupe.’,
],
tip: ‘💡 Le film alimentaire est essentiel pour que le riz ne colle pas à la natte. Pour les versions “spicy”, mélange la mayo et la sriracha avant de les déposer sur le nori.’,
},

california_spicy: {
name: ‘California Spicy’,
emoji: ‘🌶️’,
time: ‘40 min’,
diff: ‘Intermédiaire’,
desc: ‘California avec mayo épicée sriracha’,
baseIngredients: [
{ name: ‘Riz à sushi vinaigré’,   qty: ‘300g’ },
{ name: ‘Feuilles de nori’,       qty: ‘3 feuilles’ },
{ name: ‘Saumon ou thon’,         qty: ‘en lamelles / émietté’ },
{ name: ‘Mayonnaise’,             qty: ‘2 c. à soupe’ },
{ name: ‘Sriracha’,               qty: ‘1–2 c. à café’ },
{ name: ‘Graines de sésame’,      qty: ‘2 c. à soupe’ },
],
steps: [
‘Mélanger la mayo et la sriracha. Goûter et ajuster le piquant.’,
‘Préparer le riz à sushi vinaigré et laisser tiédir.’,
‘Couvrir la natte de film alimentaire, poser le nori par-dessus.’,
‘Étaler le riz sur toute la feuille, saupoudrer de sésame.’,
‘Retourner (riz côté film), déposer le poisson et la spicy mayo en ligne au centre.’,
‘Rouler fermement. Retirer le film et trancher en 8 morceaux.’,
],
tip: ‘💡 Pour finir, tu peux déposer un filet de spicy mayo sur le dessus des rouleaux avec une pipette ou un sac plastique percé. Effet restaurant garanti !’,
},

nigiri: {
name: ‘Nigiris Saumon’,
emoji: ‘🍣’,
time: ‘20 min’,
diff: ‘Facile’,
desc: ‘Petits pains de riz avec tranche de saumon et wasabi’,
baseIngredients: [
{ name: ‘Riz à sushi vinaigré’, qty: ‘300g’ },
{ name: ‘Saumon sashimi-grade’, qty: ‘200g’ },
{ name: ‘Wasabi’,               qty: ‘une pointe (généreuse selon goût)’ },
],
steps: [
‘Préparer le riz à sushi vinaigré. Laisser tiédir à température ambiante.’,
‘Trancher le saumon en tranches obliques de ~5mm, en biais par rapport aux fibres.’,
‘Prendre ~25g de riz, façonner un ovale compact dans la paume : 2-3 compressions fermes suffisent.’,
‘Déposer une toute petite pointe de wasabi sur le dessus du pain de riz (ou plus généreusement pour la version “wasabi”).’,
‘Placer la tranche de saumon par-dessus et appuyer légèrement pour qu'elle adhère.’,
‘Servir immédiatement, côté saumon vers le haut.’,
],
tip: ‘💡 La taille idéale d'un nigiri = une bouchée. Trempe-les dans la sauce soja côté poisson, pas côté riz. Pour la version “wasabi”, préviens tes convives !’,
},

nigiri_thon: {
name: ‘Nigiris Thon Mayo’,
emoji: ‘🔥’,
time: ‘20 min’,
diff: ‘Facile’,
desc: ‘Thon en conserve façonné avec mayo et légèrement poêlé’,
baseIngredients: [
{ name: ‘Thon en conserve égoutté’, qty: ‘140g’ },
{ name: ‘Mayonnaise’,               qty: ‘1 c. à soupe’ },
{ name: ‘Sauce soja’,               qty: ‘1 c. à soupe’ },
{ name: ‘Riz à sushi vinaigré’,     qty: ‘300g’ },
{ name: ‘Wasabi’,                   qty: ‘une pointe’ },
],
steps: [
‘Égoutter le thon et l'émietter grossièrement. Mélanger avec la mayo et 1 c. à soupe de sauce soja.’,
‘Faire revenir le thon 2 minutes à la poêle à feu vif, juste pour le sécher légèrement. Laisser refroidir.’,
‘Préparer le riz à sushi vinaigré. Façonner des petits ovales de riz (~25g).’,
‘Déposer une pointe de wasabi sur chaque pain de riz.’,
‘Poser une belle cuillerée de thon sauté par-dessus et tasser légèrement.’,
‘Optionnel : ajouter une petite ceinture de nori autour pour maintenir la garniture.’,
],
tip: ‘💡 Tu peux aussi mélanger le thon avec un peu de mayo avant de le poêler pour un résultat encore plus savoureux. La version sans poêle (thon froid) est aussi très bonne.’,
},

nigiri_veggie: {
name: ‘Nigiris Végétariens’,
emoji: ‘🥑’,
time: ‘15 min’,
diff: ‘Très facile’,
desc: ‘Nigiri avocat ou concombre finement tranché’,
baseIngredients: [
{ name: ‘Riz à sushi vinaigré’,   qty: ‘300g’ },
{ name: ‘Avocat mûr’,             qty: ‘1 avocat’ },
{ name: ‘Concombre’,              qty: ‘1/2 concombre’ },
{ name: ‘Sauce soja’,             qty: ‘pour servir’ },
{ name: ‘Sésame (pour concombre)’, qty: ‘1 c. à café’ },
],
steps: [
‘Préparer le riz à sushi vinaigré. Laisser tiédir.’,
‘Avocat : couper en deux, retirer le noyau, trancher finement en lamelles de ~4mm.’,
‘Concombre : éplucher partiellement (zébré), couper en tranches très fines en biais.’,
‘Façonner des petits ovales de riz (~25g) dans la paume.’,
‘Poser une tranche d'avocat ou de concombre par-dessus. Appuyer légèrement.’,
‘Pour le concombre, saupoudrer quelques graines de sésame sur le dessus.’,
‘Servir avec sauce soja. Manger rapidement (l'avocat s'oxyde vite).’,
],
tip: ‘💡 Pour une présentation soignée des nigiris avocat, fais chevaucher légèrement deux fines tranches sur le riz. Arrose d'un tout petit filet de jus de citron pour éviter l'oxydation.’,
},

temaki: {
name: ‘Temakis’,
emoji: ‘🌮’,
time: ‘15 min’,
diff: ‘Très facile’,
desc: ‘Cônes à rouler soi-même à table — toutes garnitures’,
baseIngredients: [
{ name: ‘Feuilles de nori’,      qty: ‘1 par personne’ },
{ name: ‘Riz à sushi vinaigré’,  qty: ‘2 grosses c. à soupe’ },
{ name: ‘Garnitures variées’,    qty: ‘saumon, thon mayo, avocat, concombre…’ },
{ name: ‘Wasabi, sauce soja’,    qty: ‘à discrétion’ },
],
steps: [
‘Couper les feuilles de nori en deux (rectangle).’,
‘Tenir le demi-nori dans la main gauche, face brillante vers le bas.’,
‘Déposer 2 c. à soupe de riz sur le tiers gauche, en laissant les bords libres.’,
‘Disposer les garnitures en diagonale sur le riz, du coin inférieur gauche vers le coin supérieur droit.’,
‘Pour les temakis thon : mélanger le thon avec la mayo avant de le déposer.’,
‘Rouler en cône en ramenant le coin inférieur gauche vers le haut, comme un cornet de glace.’,
‘Le bord de nori libre scelle naturellement le cône. Déguster immédiatement avant que le nori ne ramollisse.’,
],
tip: ‘💡 L'idéal c'est de rouler les temakis à table, au fur et à mesure — le nori croustillant est ce qui les rend délicieux. Prépare tous les ingrédients à l'avance dans des petits bols séparés !’,
},
};

/* ================================================================
2. STATE — L’état de l’application (ce qui change)
================================================================ */

const cart = {};

/* ================================================================
3. MENU — Affichage et interactions du panel Menu
================================================================ */

function renderMenu() {
const gridMap = {
maki:       ‘grid-maki’,
california: ‘grid-california’,
nigiri:     ‘grid-nigiri’,
temaki:     ‘grid-temaki’,
condiment:  ‘grid-condiment’,
};

for (const [categorie, listeSushis] of Object.entries(SUSHI)) {
const conteneur = document.getElementById(gridMap[categorie]);

```
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
`).join('');
```

}
}

function changerQuantite(id, delta) {
cart[id] = Math.max(0, (cart[id] || 0) + delta);
document.getElementById(`qty-${id}`).textContent = cart[id];
const carte = document.getElementById(`card-${id}`);
carte.classList.toggle(‘selected’, cart[id] > 0);
mettreAJourPanier();
}

/* ================================================================
4. PANIER — Calcul et affichage de la barre du bas
================================================================ */

function mettreAJourPanier() {
const total = calculerTotalPrix();
const nombrePlateaux = Object.values(cart).reduce((acc, val) => acc + val, 0);

document.getElementById(‘cart-summary’).textContent = nombrePlateaux === 0
? ‘0 plateau sélectionné’
: `${nombrePlateaux} plateau${nombrePlateaux > 1 ? 'x' : ''} sélectionné${nombrePlateaux > 1 ? 's' : ''}`;

document.getElementById(‘cart-total’).textContent =
total.toFixed(2).replace(’.’, ‘,’) + ’ €’;

document.getElementById(‘cart-bar’).classList.toggle(‘visible’, nombrePlateaux > 0);
}

function calculerTotalPrix() {
let total = 0;
for (const [id, qty] of Object.entries(cart)) {
if (!qty) continue;
const sushi = trouverSushi(id);
if (sushi) total += sushi.priceUnit * qty;
}
return total;
}

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

function calculerIngredients() {
const totaux = {};

for (const [id, qty] of Object.entries(cart)) {
if (!qty) continue;
const sushi = trouverSushi(id);
if (!sushi) continue;

```
for (const ingId of sushi.ingredients) {
  const ing = INGREDIENTS[ingId];
  if (!ing || ing.unit === 'fixe') continue;
  totaux[ingId] = (totaux[ingId] || 0) + ing.perPlate * qty;
}
```

}

const aDesArticles = Object.values(cart).some(v => v > 0);
if (aDesArticles) {
for (const ingId of ALWAYS) {
if (!totaux[ingId]) totaux[ingId] = 1;
}
}

return totaux;
}

function estimerPrix(ingId, quantite) {
const ing = INGREDIENTS[ingId];
if (!ing) return 0;

if (ing.unit === ‘g’)      return (quantite / 1000) * ing.priceKg;
if (ing.unit === ‘cl’)     return (quantite / 100) * ing.priceL;
if (ing.unit === ‘boîte’)  return Math.ceil(quantite) * ing.priceUnit;
if (ing.unit === ‘feuille’ || ing.unit === ‘pièce’) return Math.ceil(quantite) * ing.priceUnit;
if (ing.unit === ‘fixe’)   return ing.priceUnit;
return 0;
}

function formaterQuantite(ingId, quantite) {
const ing = INGREDIENTS[ingId];
if (ing.unit === ‘g’)      return Math.ceil(quantite) + ‘g’;
if (ing.unit === ‘cl’)     return Math.ceil(quantite) + ‘cl’;
if (ing.unit === ‘boîte’)  return Math.ceil(quantite) + ’ boîte(s)’;
if (ing.unit === ‘feuille’) return Math.ceil(quantite) + ’ feuille(s)’;
if (ing.unit === ‘pièce’)  return Math.ceil(quantite) + ’ pièce(s)’;
if (ing.unit === ‘fixe’)   return ‘1 unité’;
return ‘—’;
}

function renderListe() {
const conteneur = document.getElementById(‘liste-content’);
const aDesArticles = Object.values(cart).some(v => v > 0);

if (!aDesArticles) {
conteneur.innerHTML = `<div class="empty-state"> <div class="big">🛒</div> <p>Sélectionne tes sushis dans le menu pour générer ta liste de courses</p> </div>`;
return;
}

const totaux = calculerIngredients();

const parCategorie = {};
for (const [ingId, quantite] of Object.entries(totaux)) {
const ing = INGREDIENTS[ingId];
if (!ing) continue;
if (!parCategorie[ing.cat]) parCategorie[ing.cat] = [];
parCategorie[ing.cat].push({ ingId, quantite, ing });
}

let lignesTableau = ‘’;
let totalGeneral = 0;

for (const [categorie, items] of Object.entries(parCategorie)) {
lignesTableau += `<tr class="cat-row"><td colspan="3">${categorie}</td></tr>`;

```
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
```

}

let lignesCommande = ‘’;
let totalCommande = 0;

for (const [id, qty] of Object.entries(cart)) {
if (!qty) continue;
const sushi = trouverSushi(id);
if (!sushi) continue;
const cout = sushi.priceUnit * qty;
totalCommande += cout;
lignesCommande += `<div class="order-item"> <div class="order-item-name">${sushi.emoji} ${sushi.name}</div> <span class="order-item-qty">${qty}×</span> </div>`;
}

conteneur.innerHTML = `<div class="list-layout"> <div> <div class="section-title">Ingrédients à acheter</div> <table class="ingredient-table"> <thead> <tr> <th>Ingrédient</th> <th>Quantité</th> <th style="text-align:right">Prix estimé</th> </tr> </thead> <tbody> ${lignesTableau} <tr class="total-row"> <td colspan="2">Total estimé courses</td> <td class="price-cell">~${totalGeneral.toFixed(2).replace('.', ',')} €</td> </tr> </tbody> </table> <p style="font-size:10px;color:#8a7a5a;margin-top:12px;letter-spacing:0.05em"> * Prix moyens indicatifs en grande surface France 2026. Les prix réels peuvent varier. </p> <button class="print-btn" onclick="window.print()">🖨 Imprimer la liste</button> </div> <div> <div class="section-title">Ta commande</div> <div class="order-summary"> ${lignesCommande} </div> </div> </div>`;
}

/* ================================================================
6. RECETTES — Génération du panel Recettes
================================================================ */

function renderRecettes() {
const conteneur = document.getElementById(‘recettes-content’);
const aDesArticles = Object.values(cart).some(v => v > 0);

if (!aDesArticles) {
conteneur.innerHTML = `<div class="empty-state"> <div class="big">📖</div> <p>Sélectionne tes sushis dans le menu pour voir les recettes correspondantes</p> </div>`;
return;
}

const recettesUtilisees = new Set();
for (const [id, qty] of Object.entries(cart)) {
if (!qty) continue;
const sushi = trouverSushi(id);
if (sushi) recettesUtilisees.add(sushi.recipeKey);
}

let cartesHTML = genererCarteRiz();

for (const cle of recettesUtilisees) {
const recette = RECIPES[cle];
if (!recette) continue;

```
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
```

}

conteneur.innerHTML = `<div class="recipe-list">${cartesHTML}</div>`;
}

function genererCarteRiz() {
return `<div class="recipe-card" id="recipe-riz"> <div class="recipe-header" onclick="basculerRecette('riz')"> <span class="recipe-emoji">🍚</span> <div class="recipe-title-block"> <div class="recipe-title">Le riz à sushi — la base</div> <div class="recipe-meta">⏱ 30 min · Essentiel pour tous les sushis</div> </div> <span class="recipe-toggle">+</span> </div> <div class="recipe-body"> <div> <div class="recipe-section-title">Ingrédients (4 pers.)</div> <ul class="recipe-ingredients"> <li>Riz japonais rond <span class="ing-qty">400g cru</span></li> <li>Vinaigre de riz   <span class="ing-qty">6 c. à soupe</span></li> <li>Sucre             <span class="ing-qty">2 c. à café</span></li> <li>Sel               <span class="ing-qty">1 c. à café</span></li> </ul> </div> <div> <div class="recipe-section-title">Étapes</div> <ol class="recipe-steps"> <li>Rincer le riz 3-4 fois jusqu'à ce que l'eau soit claire. Égoutter 30 min.</li> <li>Cuire avec le même volume d'eau + un peu plus (ex: 400g riz → 500ml eau). Ébullition, couvrir, feu doux 12 min, éteindre et reposer 10 min.</li> <li>Mélanger vinaigre + sucre + sel jusqu'à dissolution.</li> <li>Verser le mélange sur le riz chaud et mélanger délicatement avec une spatule.</li> <li>Éventer le riz en mélangeant pour le refroidir rapidement. Il doit être tiède et brillant.</li> <li>Couvrir d'un torchon humide et utiliser dans l'heure.</li> </ol> </div> <div class="recipe-tip">💡 Le riz ne doit être ni trop chaud ni trop froid. Tiède = idéal. Ne le mets surtout pas au frigo — il durcirait.</div> </div> </div>`;
}

function basculerRecette(cle) {
const carte = document.getElementById(`recipe-${cle}`);
carte.classList.toggle(‘open’);
}

/* ================================================================
7. NAVIGATION — Changement d’onglets
================================================================ */

function switchTab(onglet) {
document.querySelectorAll(’.tab’).forEach((bouton, index) => {
const onglets = [‘menu’, ‘liste’, ‘recettes’];
bouton.classList.toggle(‘active’, onglets[index] === onglet);
});

document.querySelectorAll(’.panel’).forEach(panel => {
panel.classList.remove(‘active’);
});

document.getElementById(`panel-${onglet}`).classList.add(‘active’);

if (onglet === ‘liste’)    renderListe();
if (onglet === ‘recettes’) renderRecettes();
}

/* ================================================================
8. INIT — Démarrage de l’application
================================================================ */

function init() {
renderMenu();
}

init();