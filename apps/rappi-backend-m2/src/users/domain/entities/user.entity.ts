import { Profile } from './profile.entity';
import { RatingReview } from './rating-review.entity';
import { History } from './history.entity';
import { CartItem } from './cart-item.entity';

export class User {
  private _id: string;
  private _email: string;
  private _password: string;
  private _role: string;
  private _profile: Profile;
  private _favorites: string[];
  private _history: History;
  private _ratingsAndReviews: RatingReview[];
  private _createdAt: Date;
  private _updatedAt: Date;
  private _cart: CartItem[];

  constructor(
    id: string,
    email: string,
    password: string,
    role: string,
    profile: Profile,
    favorites: string[],
    history: History,
    ratingsAndReviews: RatingReview[],
    createdAt: Date,
    updatedAt: Date,
    cart: CartItem[] = []
  ) {
    this._id = id;
    this._email = email;
    this._password = password;
    this._role = role;
    this._profile = profile;
    this._favorites = favorites;
    this._history = history;
    this._ratingsAndReviews = ratingsAndReviews;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._cart = cart;
  }

  getId(): string {
    return this._id;
  }

  getEmail(): string {
    return this._email;
  }

  getPassword(): string {
    return this._password;
  }

  getRole(): string {
    return this._role;
  }

  getProfile(): Profile {
    return this._profile;
  }

  getFavorites(): string[] {
    return this._favorites;
  }

  getHistory(): History {
    return this._history;
  }

  getRatingsAndReviews(): RatingReview[] {
    return this._ratingsAndReviews;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getUpdatedAt(): Date {
    return this._updatedAt;
  }
  
  getCart(): CartItem[] {
    return this._cart;
  }

  addOrIncrementCartItem(newItem: CartItem): void {
    const idx = this._cart.findIndex(i => i.getProductId() === newItem.getProductId());
    if (idx >= 0) {
      const existing = this._cart[idx];
      this._cart[idx] = new CartItem(
        existing.getProductId(),
        existing.getName(),
        existing.getPrice(),
        existing.getQuantity() + 1
      );
    } else {
      this._cart.push(newItem);
    }
  }
 
  setCartItemQuantity(productId: string, quantity: number): void {
    const idx = this._cart.findIndex(i => i.getProductId() === productId);
    if (idx === -1) {
      throw new Error('Producto no encontrado en el carrito');
    }
    if (quantity <= 0) {
      this._cart.splice(idx, 1);
    } else {
      const existing = this._cart[idx];
      this._cart[idx] = new CartItem(
        existing.getProductId(),
        existing.getName(),
        existing.getPrice(),
        quantity
      );
    }
  }
}