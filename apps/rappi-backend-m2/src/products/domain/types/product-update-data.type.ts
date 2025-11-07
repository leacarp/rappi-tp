export interface ProductUpdateData {
  name?: string;
  description?: string;
  imageURL?: string;
  price?: number;
  category?: string;
  isAvailable?: boolean;
  promotions?: {
    isOnPromotion: boolean;
    discountedPrice: number;
  };
}