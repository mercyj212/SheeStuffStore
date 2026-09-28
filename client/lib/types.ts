export type ProductCategory = 
  | 'All' 
  | 'Skincare' 
  | 'Serums' 
  | 'Moisturizers' 
  | 'Lip Care' 
  | 'Sunscreen' 
  | 'Makeup' 
  | 'Sets & Kits';

export interface ProductShade {
  name: string;
  colorHex: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  skinType?: string;
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  secondaryImage?: string;
  description: string;
  volume: string; // e.g. "50ml / 1.7 fl. oz."
  badges?: string[]; // e.g. ["BEST SELLER", "NEW", "ORGANIC", "20% OFF"]
  benefits: string[];
  ingredients: string[];
  howToUse: string;
  skinTypes: string[]; // e.g. ["All Skin Types", "Dry", "Sensitive"]
  shades?: ProductShade[];
  inStock: boolean;
  isFeatured?: boolean;
  reviewsList?: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedShade?: ProductShade;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  productName: string;
  verified: boolean;
}
