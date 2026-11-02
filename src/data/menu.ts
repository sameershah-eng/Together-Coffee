import { IMAGES } from './images';

export type Category = 
  | 'All' 
  | 'Coffee' 
  | 'Cold Drinks' 
  | 'Tea' 
  | 'Habesha Kitchen' 
  | 'Bites & Pastries' 
  | 'Specials';

export type DietaryTag = 'Vegan' | 'Vegetarian' | 'Gluten-Free' | 'Spicy' | 'Bestseller' | 'New';

export interface CustomisationOption {
  name: string;
  priceDelta: number;
}

export interface CustomisationGroup {
  id: string;
  label: string;
  options: CustomisationOption[];
  defaultIndex?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<Category, 'All'>;
  description: string;
  price: number;
  image: string;
  tags: DietaryTag[];
  allergens?: string[];
  customisationGroups?: CustomisationGroup[];
  isSpecial?: boolean;
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(price);
};

// Common customisation groups
const coffeeOptions: CustomisationGroup[] = [
  {
    id: 'size',
    label: 'Size',
    defaultIndex: 0,
    options: [
      { name: 'Regular (8oz)', priceDelta: 0 },
      { name: 'Large (12oz)', priceDelta: 0.50 },
    ],
  },
  {
    id: 'milk',
    label: 'Milk Choice',
    defaultIndex: 0,
    options: [
      { name: 'Whole Milk', priceDelta: 0 },
      { name: 'Semi-Skimmed Milk', priceDelta: 0 },
      { name: 'Oat Milk (Barista)', priceDelta: 0.40 },
      { name: 'Almond Milk', priceDelta: 0.40 },
    ],
  },
  {
    id: 'extraShot',
    label: 'Extra Espresso Shot',
    defaultIndex: 0,
    options: [
      { name: 'Standard (2 shots)', priceDelta: 0 },
      { name: 'Extra Shot (+1)', priceDelta: 0.60 },
    ],
  },
  {
    id: 'syrup',
    label: 'Flavour Syrup',
    defaultIndex: 0,
    options: [
      { name: 'No Syrup', priceDelta: 0 },
      { name: 'Vanilla Syrup', priceDelta: 0.50 },
      { name: 'Salted Caramel Syrup', priceDelta: 0.50 },
      { name: 'Hazelnut Syrup', priceDelta: 0.50 },
    ],
  },
];

const habeshaKitchenOptions: CustomisationGroup[] = [
  {
    id: 'spice',
    label: 'Spice Level',
    defaultIndex: 1,
    options: [
      { name: 'Mild', priceDelta: 0 },
      { name: 'Medium (Traditional)', priceDelta: 0 },
      { name: 'Hot (With Berbere)', priceDelta: 0 },
    ],
  },
  {
    id: 'extraInjera',
    label: 'Extra Injera Bread',
    defaultIndex: 0,
    options: [
      { name: 'Standard Portion', priceDelta: 0 },
      { name: 'Add Extra Injera Roll', priceDelta: 1.50 },
    ],
  },
  {
    id: 'sideSalad',
    label: 'Add Fresh Side Salad',
    defaultIndex: 0,
    options: [
      { name: 'No Side Salad', priceDelta: 0 },
      { name: 'Fresh Tomato, Cucumber & Green Salad', priceDelta: 2.00 },
    ],
  },
];

const pastryOptions: CustomisationGroup[] = [
  {
    id: 'warmed',
    label: 'Preparation',
    defaultIndex: 1,
    options: [
      { name: 'Serve Room Temp', priceDelta: 0 },
      { name: 'Warmed Up Crispy', priceDelta: 0 },
    ],
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // --- SPECIALS ---
  {
    id: 'spec-buna-ceremony',
    name: 'Traditional Buna Ceremony for 2',
    category: 'Specials',
    description: 'Fresh-roasted green coffee beans roasted before your eyes, brewed in a traditional clay jebena, and served in 3 rounds with freshly popped popcorn and aromatic frankincense.',
    price: 8.50,
    image: IMAGES.ceremonyBuna,
    tags: ['Bestseller', 'Vegetarian'],
    allergens: ['None'],
    isSpecial: true,
  },
  {
    id: 'spec-lunch-deal',
    name: 'Habesha Lunch Deal',
    category: 'Specials',
    description: 'Any traditional vegetarian stew (Shiro or Misir Wot) served with warm injera rolls and a hot Spiced Habesha Tea.',
    price: 10.50,
    image: IMAGES.injeraFeast,
    tags: ['Bestseller', 'Vegan'],
    allergens: ['Gluten (Injera contains teff and wheat)'],
    customisationGroups: habeshaKitchenOptions,
    isSpecial: true,
  },
  {
    id: 'spec-family-platter',
    name: 'Family Sharing Platter (Serves 3–4)',
    category: 'Specials',
    description: 'Generous feast with Shiro, Beef Tibs, Misir Wot, Gomen greens, fresh salad, 6 injera rolls, and complimentary sweet biscuits.',
    price: 32.00,
    image: IMAGES.veggiePlatter,
    tags: ['Bestseller'],
    allergens: ['Gluten'],
    customisationGroups: habeshaKitchenOptions,
  },
  {
    id: 'spec-coffee-croissant',
    name: 'Coffee & Croissant Morning Deal',
    category: 'Specials',
    description: 'Any regular espresso drink (Flat White, Latte, Cappuccino) paired with a freshly baked French all-butter croissant.',
    price: 5.00,
    image: IMAGES.croissants,
    tags: ['Vegetarian'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    customisationGroups: coffeeOptions,
  },

  // --- COFFEE ---
  {
    id: 'c-habesha-spiced',
    name: 'Habesha Spiced Coffee',
    category: 'Coffee',
    description: 'Traditional slow-brewed East African coffee infused with fragrant green cardamom pods, cinnamon, and a hint of ginger.',
    price: 3.60,
    image: IMAGES.spicedCoffee,
    tags: ['Bestseller', 'Vegetarian'],
    allergens: ['None'],
    customisationGroups: coffeeOptions,
  },
  {
    id: 'c-espresso',
    name: 'Single Espresso',
    category: 'Coffee',
    description: 'Rich, syrupy single origin espresso shot roasted to a dark chocolate finish with golden crema.',
    price: 2.50,
    image: IMAGES.espressoShot,
    tags: ['Vegan'],
    allergens: ['None'],
  },
  {
    id: 'c-double-espresso',
    name: 'Double Espresso',
    category: 'Coffee',
    description: 'Two rich espresso extractions balancing bold caramel notes, citrus brightness, and smooth mouthfeel.',
    price: 2.90,
    image: IMAGES.espressoShot,
    tags: ['Vegan'],
    allergens: ['None'],
  },
  {
    id: 'c-macchiato',
    name: 'Macchiato',
    category: 'Coffee',
    description: 'Double espresso stained with a velvety spoonful of textured steamed micro-foam.',
    price: 2.80,
    image: IMAGES.espressoShot,
    tags: ['Vegetarian'],
    allergens: ['Dairy (unless plant milk selected)'],
    customisationGroups: coffeeOptions,
  },
  {
    id: 'c-cortado',
    name: 'Cortado',
    category: 'Coffee',
    description: 'Equal parts bold espresso and silky warm milk in an authentic 4.5oz glass.',
    price: 3.00,
    image: IMAGES.flatWhite,
    tags: ['Vegetarian'],
    allergens: ['Dairy'],
    customisationGroups: coffeeOptions,
  },
  {
    id: 'c-americano',
    name: 'Americano',
    category: 'Coffee',
    description: 'Double shot of craft espresso poured over hot filtered Scottish water, retaining the rich aroma.',
    price: 2.90,
    image: IMAGES.espressoShot,
    tags: ['Vegan'],
    allergens: ['None'],
    customisationGroups: coffeeOptions,
  },
  {
    id: 'c-flat-white',
    name: 'Flat White',
    category: 'Coffee',
    description: 'Double ristretto with perfectly textured, thin microfoam milk and delicate latte art.',
    price: 3.40,
    image: IMAGES.latteArtTable,
    tags: ['Bestseller', 'Vegetarian'],
    allergens: ['Dairy'],
    customisationGroups: coffeeOptions,
  },
  {
    id: 'c-cappuccino',
    name: 'Cappuccino',
    category: 'Coffee',
    description: 'Espresso balanced with rich steamed milk and a deep, thick pillow of foam dusted with pure cocoa.',
    price: 3.40,
    image: IMAGES.spicedCoffee,
    tags: ['Vegetarian'],
    allergens: ['Dairy'],
    customisationGroups: coffeeOptions,
  },
  {
    id: 'c-latte',
    name: 'Caffe Latte',
    category: 'Coffee',
    description: 'Silky smooth steamed milk gently layered into freshly pulled espresso shots.',
    price: 3.50,
    image: IMAGES.chaiLatte,
    tags: ['Vegetarian'],
    allergens: ['Dairy'],
    customisationGroups: coffeeOptions,
  },
  {
    id: 'c-mocha',
    name: 'Caffe Mocha',
    category: 'Coffee',
    description: 'Dark Belgian chocolate ganache blended with double espresso and velvety textured milk.',
    price: 3.80,
    image: IMAGES.spicedCoffee,
    tags: ['Vegetarian'],
    allergens: ['Dairy'],
    customisationGroups: coffeeOptions,
  },
  {
    id: 'c-spanish-latte',
    name: 'Spanish Latte',
    category: 'Coffee',
    description: 'Sweetened condensed milk base topped with a double shot of espresso and silky steamed milk.',
    price: 3.90,
    image: IMAGES.spanishLatte,
    tags: ['Bestseller', 'Vegetarian'],
    allergens: ['Dairy'],
    customisationGroups: coffeeOptions,
  },

  // --- COLD DRINKS ---
  {
    id: 'cd-iced-latte',
    name: 'Iced Latte',
    category: 'Cold Drinks',
    description: 'Chilled milk poured over ice cubes and topped with a fresh double espresso float.',
    price: 3.80,
    image: IMAGES.icedDrinksMuffin,
    tags: ['Bestseller', 'Vegetarian'],
    allergens: ['Dairy'],
    customisationGroups: coffeeOptions,
  },
  {
    id: 'cd-iced-spanish',
    name: 'Iced Spanish Latte',
    category: 'Cold Drinks',
    description: 'Chilled condensed milk, whole milk, and double espresso served over crystal ice with caramel swirls.',
    price: 4.20,
    image: IMAGES.icedDrinksMuffin,
    tags: ['Bestseller', 'Vegetarian'],
    allergens: ['Dairy'],
    customisationGroups: coffeeOptions,
  },
  {
    id: 'cd-iced-americano',
    name: 'Iced Americano',
    category: 'Cold Drinks',
    description: 'Crisp, refreshing double espresso pulled directly over iced Scottish water.',
    price: 3.30,
    image: IMAGES.icedAmericano,
    tags: ['Vegan'],
    allergens: ['None'],
  },
  {
    id: 'cd-iced-mocha',
    name: 'Iced Mocha',
    category: 'Cold Drinks',
    description: 'Rich dark cocoa syrup, fresh espresso, and chilled milk over ice.',
    price: 4.20,
    image: IMAGES.icedMocha,
    tags: ['Vegetarian'],
    allergens: ['Dairy'],
    customisationGroups: coffeeOptions,
  },
  {
    id: 'cd-iced-matcha',
    name: 'Iced Matcha Green Tea Latte',
    category: 'Cold Drinks',
    description: 'Ceremonial grade Japanese green matcha whisked and poured over chilled oat milk and ice.',
    price: 4.20,
    image: IMAGES.icedMatcha,
    tags: ['Bestseller', 'Vegetarian'],
    allergens: ['Dairy'],
    customisationGroups: coffeeOptions,
  },
  {
    id: 'cd-fresh-orange',
    name: 'Freshly Squeezed Orange Juice',
    category: 'Cold Drinks',
    description: '100% freshly pressed Valencia oranges with pulp, naturally sweet and packed with Vitamin C.',
    price: 3.20,
    image: IMAGES.orangeJuice,
    tags: ['Vegan', 'Gluten-Free'],
    allergens: ['None'],
  },
  {
    id: 'cd-mango-smoothie',
    name: 'Alphonso Mango Smoothie',
    category: 'Cold Drinks',
    description: 'Thick crushed mango puree blended with chilled natural yogurt and a touch of honey.',
    price: 4.50,
    image: IMAGES.mangoSmoothie,
    tags: ['Vegetarian', 'Gluten-Free'],
    allergens: ['Dairy'],
  },
  {
    id: 'cd-strawberry-smoothie',
    name: 'Strawberry & Banana Smoothie',
    category: 'Cold Drinks',
    description: 'Sweet ripe strawberries, Scottish oats, and fresh banana blended with almond milk.',
    price: 4.50,
    image: IMAGES.mangoSmoothie,
    tags: ['Vegan', 'Gluten-Free'],
    allergens: ['Nuts (Almond)'],
  },

  // --- TEA ---
  {
    id: 't-habesha-shai',
    name: 'Spiced Habesha Tea (Shai)',
    category: 'Tea',
    description: 'Traditional East African spiced black tea slow-steeped with whole cloves, cinnamon bark, cardamom, and fresh ginger.',
    price: 2.50,
    image: IMAGES.habeshaTea,
    tags: ['Bestseller', 'Vegan'],
    allergens: ['None'],
  },
  {
    id: 't-fresh-mint',
    name: 'Fresh Mint & Honey Infusion',
    category: 'Tea',
    description: 'Handfuls of fragrant fresh mint leaves steeped with pure clover honey in hot water.',
    price: 2.40,
    image: IMAGES.habeshaTea,
    tags: ['Vegetarian', 'Gluten-Free'],
    allergens: ['None'],
  },
  {
    id: 't-english-breakfast',
    name: 'Scottish Breakfast Tea',
    category: 'Tea',
    description: 'Robust, full-bodied loose leaf black tea blend served with fresh milk on the side.',
    price: 2.20,
    image: IMAGES.habeshaTea,
    tags: ['Vegetarian'],
    allergens: ['Dairy (optional)'],
  },
  {
    id: 't-chai-latte',
    name: 'Artisan Spiced Chai Latte',
    category: 'Tea',
    description: 'Spiced black tea brew steamed with sweet microfoam milk and dusted with nutmeg.',
    price: 3.50,
    image: IMAGES.chaiLatte,
    tags: ['Vegetarian'],
    allergens: ['Dairy'],
    customisationGroups: coffeeOptions,
  },

  // --- HABESHA KITCHEN ---
  {
    id: 'hk-shiro-injera',
    name: 'Shiro with Injera',
    category: 'Habesha Kitchen',
    description: 'Silky, aromatic chickpea and broad bean stew slow-simmered with garlic, onions, and berbere spices. Served bubbling with soft rolled injera flatbread.',
    price: 9.50,
    image: IMAGES.injeraFeast,
    tags: ['Bestseller', 'Vegan', 'Spicy'],
    allergens: ['Gluten'],
    customisationGroups: habeshaKitchenOptions,
  },
  {
    id: 'hk-veggie-combo',
    name: 'Veggie Combo Platter',
    category: 'Habesha Kitchen',
    description: 'A vibrant platter of Shiro, Misir Wot (spicy lentils), Kik Alicha (yellow split peas), Gomen (collard greens), and fresh cabbage salad surrounded by injera rolls.',
    price: 11.50,
    image: IMAGES.veggiePlatter,
    tags: ['Bestseller', 'Vegan'],
    allergens: ['Gluten'],
    customisationGroups: habeshaKitchenOptions,
  },
  {
    id: 'hk-beef-tibs',
    name: 'Beef Tibs with Injera',
    category: 'Habesha Kitchen',
    description: 'Tender Scottish prime beef cubes pan-seared with rosemary, sliced red onions, garlic, and fresh green jalapeños in clarified niter kibbeh spiced butter.',
    price: 12.50,
    image: IMAGES.beefTibs,
    tags: ['Bestseller', 'Spicy'],
    allergens: ['Dairy', 'Gluten'],
    customisationGroups: habeshaKitchenOptions,
  },
  {
    id: 'hk-zigni-stew',
    name: 'Zigni (Spiced Beef Stew)',
    category: 'Habesha Kitchen',
    description: 'Slow-braised rich Eritrean beef stew simmered for four hours in deep fiery berbere and caramelized onion gravy. Served with warm injera.',
    price: 12.00,
    image: IMAGES.zigniStew,
    tags: ['Spicy'],
    allergens: ['Gluten'],
    customisationGroups: habeshaKitchenOptions,
  },
  {
    id: 'hk-doro-wot',
    name: 'Doro Wot (Chicken Stew with Egg)',
    category: 'Habesha Kitchen',
    description: 'The beloved celebration dish: tender chicken drumstick braised in thick berbere sauce with a hard-boiled egg steeped in savory gravy.',
    price: 12.50,
    image: IMAGES.doroWot,
    tags: ['Spicy'],
    allergens: ['Eggs', 'Gluten'],
    customisationGroups: habeshaKitchenOptions,
  },
  {
    id: 'hk-misir-wot',
    name: 'Misir Wot (Red Lentil Stew)',
    category: 'Habesha Kitchen',
    description: 'Spiced red lentils cooked to rich creaminess with crushed ginger, garlic, and vibrant red berbere peppers. Wholesome and warming.',
    price: 9.00,
    image: IMAGES.injeraFeast,
    tags: ['Vegan', 'Spicy'],
    allergens: ['Gluten'],
    customisationGroups: habeshaKitchenOptions,
  },
  {
    id: 'hk-ful-medames',
    name: 'Ful Medames with Bread',
    category: 'Habesha Kitchen',
    description: 'Mashed fava beans seasoned with cumin and olive oil, topped with diced avocado, fresh tomatoes, red onions, crumbled cheese, and sliced boiled egg with crusty warm baguette.',
    price: 7.50,
    image: IMAGES.fulMedames,
    tags: ['Bestseller', 'Vegetarian'],
    allergens: ['Eggs', 'Dairy', 'Gluten'],
  },
  {
    id: 'hk-firfir',
    name: 'Habesha Firfir',
    category: 'Habesha Kitchen',
    description: 'Torn pieces of injera pan-fried and soaked in richly spiced berbere sauce with fresh diced tomatoes, sliced avocado, and seasoned greens.',
    price: 8.50,
    image: IMAGES.firfirBowl,
    tags: ['Vegan', 'Spicy'],
    allergens: ['Gluten'],
  },

  // --- BITES & PASTRIES ---
  {
    id: 'bp-lentil-sambusa',
    name: 'Crispy Lentil Sambusa (2 pcs)',
    category: 'Bites & Pastries',
    description: 'Golden triangular pastry pockets stuffed with seasoned brown lentils, green onions, and fragrant herbs, fried crisp.',
    price: 3.50,
    image: IMAGES.sambusa,
    tags: ['Bestseller', 'Vegan'],
    allergens: ['Gluten'],
    customisationGroups: pastryOptions,
  },
  {
    id: 'bp-beef-sambusa',
    name: 'Spiced Beef Sambusa (2 pcs)',
    category: 'Bites & Pastries',
    description: 'Flaky pastry wrappers filled with minced Scottish beef sautéed with onions, garlic, and jalapeño chili.',
    price: 3.90,
    image: IMAGES.sambusa,
    tags: ['Bestseller', 'Spicy'],
    allergens: ['Gluten'],
    customisationGroups: pastryOptions,
  },
  {
    id: 'bp-butter-croissant',
    name: 'French Butter Croissant',
    category: 'Bites & Pastries',
    description: 'Flaky, golden-layered all-butter croissant baked fresh each morning.',
    price: 2.60,
    image: IMAGES.croissants,
    tags: ['Vegetarian'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    customisationGroups: pastryOptions,
  },
  {
    id: 'bp-almond-croissant',
    name: 'Almond Frangipane Croissant',
    category: 'Bites & Pastries',
    description: 'Twice-baked croissant loaded with rich almond cream and toasted flaked almonds.',
    price: 3.20,
    image: IMAGES.croissants,
    tags: ['Vegetarian'],
    allergens: ['Dairy', 'Gluten', 'Eggs', 'Nuts (Almond)'],
    customisationGroups: pastryOptions,
  },
  {
    id: 'bp-chocolate-cake',
    name: 'Decadent Chocolate Fudge Cake',
    category: 'Bites & Pastries',
    description: 'Triple-layer dark chocolate fudge cake with velvety chocolate ganache and chocolate curls.',
    price: 3.50,
    image: IMAGES.chocolateCake,
    tags: ['Bestseller', 'Vegetarian'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
  },
  {
    id: 'bp-banana-bread',
    name: 'Toasted Banana Bread',
    category: 'Bites & Pastries',
    description: 'Thick slice of moist spiced banana bread, toasted and served with a pat of Scottish salted butter.',
    price: 3.00,
    image: IMAGES.bananaBread,
    tags: ['Vegetarian'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    customisationGroups: pastryOptions,
  },
  {
    id: 'bp-toasted-panini',
    name: 'Toasted Panini / Sandwich',
    category: 'Bites & Pastries',
    description: 'Crisp pressed panini with melted mozzarella, seasoned meats, and herbs, served hot off the press with golden grill marks.',
    price: 5.50,
    image: IMAGES.toastedPanini,
    tags: ['Bestseller'],
    allergens: ['Dairy', 'Gluten'],
    customisationGroups: pastryOptions,
  },
  {
    id: 'bp-halloumi-sandwich',
    name: 'Toasted Halloumi & Pesto Sandwich',
    category: 'Bites & Pastries',
    description: 'Grilled Cypriot halloumi, sun-dried tomatoes, basil pesto, and rocket on artisan sourdough.',
    price: 5.50,
    image: IMAGES.halloumiToastie,
    tags: ['Vegetarian'],
    allergens: ['Dairy', 'Gluten', 'Nuts'],
    customisationGroups: pastryOptions,
  },
];
