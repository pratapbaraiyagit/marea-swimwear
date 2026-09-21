export const MAREA_CONFIG = {
  brand: 'MAREA',
  descriptor: 'Swimwear, made to move.',
  whatsappNumber: '34600148271',
  whatsappDisplay: '+34 600 148 271',
  instagram: '@marea.studio',
  instagramUrl: 'https://instagram.com/marea.studio',
  email: 'hello@marea-studio.com',
  currency: '€',
  shippingThreshold: 180,
};

export type Product = {
  slug: string;
  name: string;
  category: 'One-piece' | 'Bikini' | 'Cover-up';
  collection: string;
  price: number;
  color: string;
  colorHex: string;
  description: string;
  details: string[];
  sizes: string[];
  image: string;
  secondaryImage?: string;
  badge?: string;
  createdAt: number;
};

export const products: Product[] = [
  // — Core collection —
  {
    slug: 'sol-one-piece',
    name: 'Sol one-piece',
    category: 'One-piece',
    collection: 'core',
    price: 145,
    color: 'Burnt terracotta',
    colorHex: '#a75d4d',
    description:
      'A clean, sculpted silhouette with an open back and a line that follows the body without holding it still.',
    details: [
      'Recycled Italian fabric',
      'Double-layered for coverage',
      'Adjustable back tie',
      'Made in Portugal',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/images/marea-hero.jpg',
    secondaryImage: '/images/marea-clay.jpg',
    badge: 'New arrival',
    createdAt: 12,
  },
  {
    slug: 'lido-bikini',
    name: 'Lido bikini',
    category: 'Bikini',
    collection: 'core',
    price: 118,
    color: 'Charcoal',
    colorHex: '#34302e',
    description:
      'A considered two-piece with a straight neckline and low-rise brief. Minimal, supportive, quietly striking.',
    details: [
      'Recycled Italian fabric',
      'Soft brushed finish',
      'Adjustable straps',
      'Made in Portugal',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/images/marea-editorial.jpg',
    secondaryImage: '/images/marea-detail.jpg',
    createdAt: 11,
  },
  {
    slug: 'dune-high-waist',
    name: 'Dune high-waist',
    category: 'Bikini',
    collection: 'core',
    price: 128,
    color: 'Warm sand',
    colorHex: '#c9ae8f',
    description:
      'A high-waisted brief with a soft, wide band and a barely-there triangle top. Designed for long afternoons.',
    details: [
      'Ribbed recycled fabric',
      'High-rise brief',
      'Removable cups',
      'Made in Portugal',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/images/marea-sand.jpg',
    secondaryImage: '/images/marea-rose.jpg',
    badge: 'Best seller',
    createdAt: 10,
  },
  // — After sun collection —
  {
    slug: 'luna-bandeau',
    name: 'Luna bandeau',
    category: 'Bikini',
    collection: 'after-sun',
    price: 112,
    color: 'Faded rose',
    colorHex: '#ba827b',
    description:
      'An effortless bandeau top with a gathered front and a brief that sits exactly where you want it.',
    details: [
      'Recycled Italian fabric',
      'Removable cups',
      'Adjustable side ties',
      'Made in Portugal',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    image: '/images/marea-rose.jpg',
    secondaryImage: '/images/marea-hero.jpg',
    createdAt: 9,
  },
  {
    slug: 'mare-wrap',
    name: 'Mare wrap skirt',
    category: 'Cover-up',
    collection: 'after-sun',
    price: 96,
    color: 'Ivory',
    colorHex: '#eee6d8',
    description:
      'A weightless cotton voile wrap that turns swim into the rest of the day in one easy gesture.',
    details: [
      'Organic cotton voile',
      'Adjustable waist tie',
      'Hand-finished hem',
      'Made in Portugal',
    ],
    sizes: ['One size'],
    image: '/images/marea-detail.jpg',
    secondaryImage: '/images/marea-sand.jpg',
    createdAt: 8,
  },
  {
    slug: 'terra-sculpt',
    name: 'Terra sculpt',
    category: 'One-piece',
    collection: 'after-sun',
    price: 152,
    color: 'Clay red',
    colorHex: '#9b5148',
    description:
      'A one-piece with an architectural neckline and a low, fluid back. Wear it in the water or as a bodysuit.',
    details: [
      'Recycled Italian fabric',
      'Sculpted neckline',
      'Low back',
      'Made in Portugal',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/images/marea-clay.jpg',
    secondaryImage: '/images/marea-editorial.jpg',
    badge: 'New arrival',
    createdAt: 7,
  },
  {
    slug: 'sunlit-sarong',
    name: 'Sunlit sarong',
    category: 'Cover-up',
    collection: 'after-sun',
    price: 88,
    color: 'Amber rose',
    colorHex: '#c97a5a',
    description:
      'A generous rectangle of silk-feel fabric — wrap it as a skirt, a dress, or throw it over your shoulders.',
    details: [
      'Recycled satin-finish fabric',
      'Multi-way styling',
      'Fringed edges',
      'Made in Portugal',
    ],
    sizes: ['One size'],
    image: '/images/marea-sunlit.jpg',
    secondaryImage: '/images/marea-rose.jpg',
    createdAt: 6,
  },
  // — Solstice collection —
  {
    slug: 'cobalt-plunge',
    name: 'Cobalt plunge',
    category: 'One-piece',
    collection: 'solstice',
    price: 158,
    color: 'Deep cobalt',
    colorHex: '#1a3a6b',
    description:
      'A deep plunge one-piece with a minimal silhouette. Bold in colour, quiet in structure — built for the open water.',
    details: [
      'Recycled Italian fabric',
      'Deep V plunge',
      'Cross-back straps',
      'Made in Portugal',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/images/marea-cobalt.jpg',
    secondaryImage: '/images/marea-tide.jpg',
    badge: 'New arrival',
    createdAt: 5,
  },
  {
    slug: 'tide-triangle',
    name: 'Tide triangle',
    category: 'Bikini',
    collection: 'solstice',
    price: 122,
    color: 'Sea green',
    colorHex: '#2e7d6a',
    description:
      'A classic triangle top and low-rise brief in a saturated sea green. The kind of set you wear until the sun disappears.',
    details: [
      'Recycled Italian fabric',
      'Triangle top with adjustable ties',
      'Low-rise brief',
      'Made in Portugal',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/images/marea-tide.jpg',
    secondaryImage: '/images/marea-cobalt.jpg',
    badge: 'Best seller',
    createdAt: 4,
  },
  {
    slug: 'quiet-halter',
    name: 'Quiet halter',
    category: 'One-piece',
    collection: 'solstice',
    price: 148,
    color: 'Muted olive',
    colorHex: '#7a7a55',
    description:
      'A halter-neck one-piece with a ruched centre and a minimal back. It moves like water, holds like structure.',
    details: [
      'Recycled Italian fabric',
      'Halter neck',
      'Ruched front panel',
      'Made in Portugal',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    image: '/images/marea-quiet.jpg',
    secondaryImage: '/images/marea-sunlit.jpg',
    createdAt: 3,
  },
  {
    slug: 'sunlit-bikini',
    name: 'Sunlit bikini',
    category: 'Bikini',
    collection: 'solstice',
    price: 132,
    color: 'Golden dusk',
    colorHex: '#c98b4a',
    description:
      'A warm-toned set for golden-hour swims. The top balances coverage and cut; the brief is low and easy.',
    details: [
      'Recycled Italian fabric',
      'Underwire-free support',
      'Adjustable ties',
      'Made in Portugal',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/images/marea-sunlit.jpg',
    secondaryImage: '/images/marea-quiet.jpg',
    createdAt: 2,
  },
  {
    slug: 'tide-kaftan',
    name: 'Tide kaftan',
    category: 'Cover-up',
    collection: 'solstice',
    price: 138,
    color: 'Cobalt wash',
    colorHex: '#2c4f8a',
    description:
      'A fluid kaftan in a lightweight washed cotton. Loose, long, unhurried — the perfect layer between sea and street.',
    details: [
      'Washed organic cotton',
      'Side splits',
      'Relaxed oversized fit',
      'Made in Portugal',
    ],
    sizes: ['XS/S', 'M/L', 'XL'],
    image: '/images/marea-cobalt.jpg',
    secondaryImage: '/images/marea-tide.jpg',
    badge: 'New arrival',
    createdAt: 1,
  },
];

export const collections = [
  {
    slug: 'core',
    name: 'The core edit',
    eyebrow: '01 / The essentials',
    description: 'The silhouettes we return to, refined until nothing extra remains.',
    image: '/images/marea-editorial.jpg',
  },
  {
    slug: 'after-sun',
    name: 'After sun',
    eyebrow: '02 / Beyond the water',
    description: 'Soft layers and easy shapes for wherever the afternoon takes you.',
    image: '/images/marea-rose.jpg',
  },
  {
    slug: 'solstice',
    name: 'Solstice',
    eyebrow: '03 / High summer',
    description: 'Saturated tones and bold silhouettes for the longest days of the year.',
    image: '/images/marea-cobalt.jpg',
  },
];

export function getProduct(slug?: string) {
  return products.find((product) => product.slug === slug);
}

export function getCollection(slug?: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getWhatsAppUrl(message: string) {
  return `https://wa.me/${MAREA_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}