export interface CartItem {
  id: string;
  brandId: string;
  brandName: string;
  brandSlug: string;
  category: string;
  denomination: number;
  discount: number;
  logoUrl: string | null;
  description: string | null;
}
