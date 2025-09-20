import { Profile } from './profile.entity';
import { RatingReview } from './rating-review.entity';
import { History } from './history.entity';

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
    updatedAt: Date
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
}
