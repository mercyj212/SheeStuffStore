import { Product, Review } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'shee-radiance-serum',
    name: 'Luminary Glow Vitamin C Serum',
    tagline: 'Triple-Action Radiance & Dark Spot Corrector',
    category: 'Serums',
    price: 48,
    originalPrice: 62,
    rating: 4.9,
    reviewCount: 342,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1608248597261-8f336a6a3375?auto=format&fit=crop&q=80&w=800',
    description: 'A transformative daily serum supercharged with 15% L-Ascorbic Acid, Ferulic Acid, and Hyaluronic Acid. Brightens hyperpigmentation, boosts collagen production, and shields skin against oxidative stressors.',
    volume: '30ml / 1.0 fl. oz.',
    badges: ['BEST SELLER', 'CRUELTY FREE', '22% OFF'],
    benefits: [
      'Visibly reduces dark spots & uneven tone in 14 days',
      'Provides 24-hour hydration with triple hyaluronic complex',
      'Neutralizes environmental free radicals',
      'Non-comedogenic, featherlight texture'
    ],
    ingredients: [
      'Water/Aqua', 'L-Ascorbic Acid (Vitamin C)', 'Hyaluronic Acid', 'Ferulic Acid', 
      'Tocopherol (Vitamin E)', 'Niacinamide', 'Aloe Barbadensis Leaf Juice', 'Glycerin'
    ],
    howToUse: 'Apply 4-5 drops every morning to clean, dry face and neck before moisturizer and sunscreen.',
    skinTypes: ['All Skin Types', 'Dull Skin', 'Hyperpigmented', 'Mature'],
    inStock: true,
    isFeatured: true,
    reviewsList: [
      {
        id: 'r1',
        author: 'Elena R.',
        rating: 5,
        date: '2 days ago',
        title: 'Literally my holy grail serum!',
        comment: 'My skin cleared up and cleared of hyperpigmentation in just 2 weeks. The glow is unreal under makeup!',
        verified: true,
        skinType: 'Combination',
        helpfulCount: 42
      },
      {
        id: 'r2',
        author: 'Sophia K.',
        rating: 5,
        date: '1 week ago',
        title: 'Obsessed with the texture',
        comment: 'Doesn’t feel sticky at all like other vitamin C serums. Absorbs instantly and smells so fresh!',
        verified: true,
        skinType: 'Sensitive',
        helpfulCount: 19
      }
    ]
  },
  {
    id: 'velvet-rose-cream',
    name: 'Velvet Petal Deep Dew Cream',
    tagline: 'Rich Peptide & Ceramides Moisture Barrier Repair',
    category: 'Moisturizers',
    price: 54,
    rating: 4.8,
    reviewCount: 218,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800',
    description: 'An ultra-nourishing whip infused with Bulgarian Rose Extract, 5 Essential Ceramides, and Multi-Peptides. Restores damaged moisture barriers and locks in plush, velvety hydration for 72 hours.',
    volume: '50ml / 1.7 fl. oz.',
    badges: ['ORGANIC', 'BARRIER REPAIR'],
    benefits: [
      'Soothes redness and skin sensitivity instantly',
      'Replenishes lipid barrier for soft, pillowy skin',
      'Improves skin elasticity and firmness',
      'Subtle natural botanical rose aroma'
    ],
    ingredients: [
      'Rosa Damascena Flower Water', 'Ceramide NP', 'Ceramide AP', 'Signal Peptides', 
      'Squalane', 'Shea Butter', 'Centella Asiatica Extract', 'Panthenol'
    ],
    howToUse: 'Smooth a dime-sized amount onto face and neck morning and evening as the final step in your routine.',
    skinTypes: ['Dry', 'Sensitive', 'Normal', 'Dehydrated'],
    inStock: true,
    isFeatured: true
  },
  {
    id: 'silk-nectar-lip-mask',
    name: 'Silk Nectar Hydrating Lip Butter',
    tagline: 'Overnight Plumping & Smoothing Lip Treatment',
    category: 'Lip Care',
    price: 24,
    originalPrice: 30,
    rating: 4.95,
    reviewCount: 512,
    image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800',
    description: 'Melt-on-contact lip conditioning treatment with Organic Peach Extract, Jojoba Butter, and Vegan Collagen. Erases chapped lines and gives your lips a glassy, pillowy shine.',
    volume: '15g / 0.5 oz.',
    badges: ['BEST SELLER', '20% OFF'],
    benefits: [
      'Instantly softens dry, flaky lips',
      'Plumps appearance of lip lines naturally',
      'Can be worn as an overnight mask or glossy day balm',
      'Non-sticky silky formula'
    ],
    ingredients: [
      'Organic Jojoba Oil', 'Shea Fruit Butter', 'Peach Kernel Extract', 
      'Vegan Collagen', 'Vitamin E', 'Coconut Nectar', 'Berry Wax'
    ],
    howToUse: 'Coat lips generously before bed for overnight repair, or swipe across lips anytime for instant high-shine hydration.',
    skinTypes: ['All Lip Types', 'Dry Lips'],
    shades: [
      { name: 'Peach Nectar', colorHex: '#e89e86' },
      { name: 'Rose Glaze', colorHex: '#d8707c' },
      { name: 'Honey Bare', colorHex: '#d4a373' },
      { name: 'Berry Bliss', colorHex: '#9e3d55' }
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: 'aura-invisible-shield',
    name: 'Aura Veil Invisible SPF 50 Gel',
    tagline: '100% Clear Broad Spectrum & Blue Light Protection',
    category: 'Sunscreen',
    price: 38,
    rating: 4.88,
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1556228722-d119f829c580?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=800',
    description: 'A revolutionary zero-white-cast weightless sunscreen gel. Grips like a blurring primer under makeup while offering high-potency PA++++ UVA/UVB and blue light defense.',
    volume: '50ml / 1.7 fl. oz.',
    badges: ['NEW', 'NO WHITE CAST'],
    benefits: [
      'Leaves 0% white cast on all skin tones',
      'Doubles as a gripping makeup primer',
      'Controls oil and minimizes pore appearance',
      'Reef-safe and oxygen-infused'
    ],
    ingredients: [
      'Zinc Oxide (Non-Nano)', 'Avobenzone', 'Niacinamide', 'Green Tea Extract', 
      'Blueberry Seed Oil', 'Hydrating Hyaluronate', 'Watermelon Extract'
    ],
    howToUse: 'Apply liberally 15 minutes before sun exposure. Reapply every 2 hours or after swimming.',
    skinTypes: ['All Skin Tones', 'Oily', 'Combination', 'Acne-Prone'],
    inStock: true,
    isFeatured: true
  },
  {
    id: 'cloud-cleansing-balm',
    name: 'Cloud Melt Cleansing Butter Balm',
    tagline: 'Gentle Makeup Dissolving & Pore Clarifying Elixir',
    category: 'Skincare',
    price: 36,
    rating: 4.75,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
    description: 'Transformative sorbet balm that melts waterproof makeup, SPF, and urban pollutants in seconds. Emulsifies cleanly with water, leaving skin soft, hydrated, and never stripped.',
    volume: '100g / 3.5 oz.',
    badges: ['CRUELTY FREE'],
    benefits: [
      'Dissolves tough waterproof mascara effortlessly',
      'Deeply cleanses pores without drying skin',
      'Soothing Chamomile & Sea Buckthorn extract',
      'Includes bamboo spatulas for hygienic scoops'
    ],
    ingredients: [
      'Caprylic/Capric Triglyceride', 'Sunflower Seed Wax', 'Chamomile Flower Extract', 
      'Sea Buckthorn Fruit Oil', 'Squalane', 'Vitamin E', 'Bergamot Essential Oil'
    ],
    howToUse: 'Scoop a pearl-sized amount onto dry skin. Massage gently in circular motions to melt makeup, rinse with warm water.',
    skinTypes: ['All Skin Types'],
    inStock: true
  },
  {
    id: 'glass-skin-toner-mist',
    name: 'Dew Drop Orchid & Rose Water Essence',
    tagline: 'pH-Balancing & Hydration Replenishing Mist',
    category: 'Skincare',
    price: 32,
    originalPrice: 40,
    rating: 4.82,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-fine micro-mist with Wild Orchid Extract, Organic Rose Hydrosol, and Fermented Rice Filtrate. Prep skin for serums while delivering immediate glass-skin radiance.',
    volume: '120ml / 4.0 fl. oz.',
    badges: ['ORGANIC', '20% OFF'],
    benefits: [
      'Refines skin texture & minimizes visible pore size',
      'Restores optimal 5.5 pH skin balance',
      'Refreshes makeup throughout the day',
      'Provides calming anti-inflammatory relief'
    ],
    ingredients: [
      'Rosa Damascena Flower Hydrosol', 'Orchid Extract', 'Galactomyces Ferment Filtrate', 
      'Glycerin', 'Centella Asiatica', 'Sodium Hyaluronate', 'Allantoin'
    ],
    howToUse: 'Mist 3-4 times onto cleansed face before serum, or spray anytime over makeup for instant radiance.',
    skinTypes: ['All Skin Types', 'Sensitive', 'Dehydrated'],
    inStock: true
  },
  {
    id: 'flawless-sculpt-blush',
    name: 'Satin Kiss Liquid Cheek & Lip Blush',
    tagline: 'Buildable Natural Flush with Skin-Loving Oils',
    category: 'Makeup',
    price: 28,
    rating: 4.91,
    reviewCount: 298,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
    description: 'Weightless liquid blush that blends seamlessly for a soft-focus, dewy wash of healthy color. Infused with Squalane and Rosehip Seed Oil to hydrate while sculpting.',
    volume: '10ml / 0.34 fl. oz.',
    badges: ['NEW', 'TRENDING'],
    benefits: [
      'Blends effortlessly with fingers or sponge',
      'Long-wearing 12-hour stain effect',
      'Does not disrupt base foundation or concealer',
      'Multipurpose for cheeks, eyelids, and lips'
    ],
    ingredients: [
      'Squalane', 'Rosehip Seed Oil', 'Mica', 'Jojoba Esters', 'Hyaluronic Spheres', 'Vitamin E'
    ],
    howToUse: 'Dot 1-2 drops onto the apples of cheeks and blend upwards toward the hairline using fingertips or a damp beauty sponge.',
    skinTypes: ['All Skin Types'],
    shades: [
      { name: 'Petal Flush', colorHex: '#e07a5f' },
      { name: 'Soft Coral', colorHex: '#f4a261' },
      { name: 'Plum Radiance', colorHex: '#81b29a' },
      { name: 'Dusty Rose', colorHex: '#c08552' }
    ],
    inStock: true
  },
  {
    id: 'ultimate-glow-bundle',
    name: 'The Golden Hour 4-Piece Ritual Kit',
    tagline: 'Complete Skincare & Glow Discovery Set',
    category: 'Sets & Kits',
    price: 110,
    originalPrice: 156,
    rating: 4.98,
    reviewCount: 420,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=800',
    description: 'The ultimate luxury gift box containing full-size Luminary Vitamin C Serum, Velvet Petal Dew Cream, Silk Nectar Lip Butter, and Dew Drop Orchid Mist in a vegan leather travel pouch.',
    volume: 'Full Size Set + Vanity Case',
    badges: ['BEST VALUE', 'SAVE $46'],
    benefits: [
      'Complete morning & night beauty ritual',
      'Saves 30% compared to buying items individually',
      'Includes custom SheeStuff Store limited vanity pouch',
      'Ideal high-end gift for skin lovers'
    ],
    ingredients: ['Refer to individual item packaging'],
    howToUse: 'Follow steps 1 to 4 daily: Cleansing mist -> Serum -> Moisture cream -> Lip butter.',
    skinTypes: ['All Skin Types'],
    inStock: true,
    isFeatured: true
  }
];

export const FEATURED_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Camilla Vance',
    rating: 5,
    date: 'September 2026',
    title: 'Transformed my dull skin!',
    comment: 'SheeStuffStore products feel like a high-end medical spa treatment right at home. The Vitamin C serum and Lip Butter are unmatched!',
    productName: 'Luminary Glow Serum',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Jessica Miller',
    rating: 5,
    date: 'September 2026',
    title: 'The packaging and formula are 10/10',
    comment: 'Everything arrived beautifully packaged. My skin has never looked so plump and dewy. I get compliments every single day!',
    productName: 'The Golden Hour Ritual Kit',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Amara Chen',
    rating: 5,
    date: 'August 2026',
    title: 'Finally an SPF that works with dark skin!',
    comment: 'No white cast at all! It feels like a blurring primer and keeps my face oil-free all day long. Reordering immediately.',
    productName: 'Aura Veil Invisible SPF 50',
    verified: true
  }
];
