export interface AddressData {
  _id?: string;
  street: string;
  city: string;
  zipCode: string;
  isFavorite: boolean;
}

export interface RatingReviewData {
  reviewerId: string;
  score: number;
  comment?: string;
  date: Date;
}

export interface CartItemData {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface EarningsDetailData {
  deliveryId: string;
  amount: number;
  breakdown: {
    baseFare: number;
    distanceFee: number;
    timeFee: number;
    tips: number;
  };
}

export interface CreateUserData {
  email: string;
  password: string;
  role: string;
  profile: {
    name: string;
    phone: string;
    addresses: AddressData[];
    vendorInfo?: {
      restaurantName: string;
      description: string;
      schedule: string;
      rating: number;
      isAvailable: boolean;
      category: string;
    };
    driverInfo?: {
      vehicle: string;
      isAvailable: boolean;
      earnings: {
        total: number;
        details: EarningsDetailData[];
      };
    };
  };
  favorites: string[];
  history: {
    orders: string[];
    deliveries: string[];
  };
  ratingsAndReviews: RatingReviewData[];
  cart: CartItemData[];
}