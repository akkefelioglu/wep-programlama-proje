export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
  description: string;
  shortDescription: string;
  category: string;
  categorySlug: string;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  specs: Record<string, string>;
  reviews: Review[];
  inStock: boolean;
  badge?: string;
  colors?: string[];
}

export interface Review {
  id: number;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
  gradient: string;
}
