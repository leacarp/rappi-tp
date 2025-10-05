import { ProductResponseDto } from './product-response.dto';

export class RestaurantInfoDto {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _description: string;
  private readonly _rating: number;
  private readonly _isAvailable: boolean;
  private readonly _schedule: string;

  constructor(
    id: string,
    name: string,
    description: string,
    rating: number,
    isAvailable: boolean,
    schedule: string
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._rating = rating;
    this._isAvailable = isAvailable;
    this._schedule = schedule;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get rating(): number {
    return this._rating;
  }

  get isAvailable(): boolean {
    return this._isAvailable;
  }

  get schedule(): string {
    return this._schedule;
  }

  static fromEntity(restaurant: any): RestaurantInfoDto {
    return new RestaurantInfoDto(
      restaurant.id.toString(),
      restaurant.name || restaurant.restaurantName,
      restaurant.description,
      restaurant.rating || 0,
      restaurant.isAvailable !== undefined ? restaurant.isAvailable : true,
      restaurant.schedule || ''
    );
  }
}

export class RestaurantMenuResponseDto {
  private readonly _restaurantInfo: RestaurantInfoDto;
  private readonly _menuItems: ProductResponseDto[];
  private readonly _categories: string[];

  constructor(
    restaurantInfo: RestaurantInfoDto,
    menuItems: ProductResponseDto[],
    categories: string[]
  ) {
    this._restaurantInfo = restaurantInfo;
    this._menuItems = menuItems;
    this._categories = categories;
  }

  get restaurantInfo(): RestaurantInfoDto {
    return this._restaurantInfo;
  }

  get menuItems(): ProductResponseDto[] {
    return this._menuItems;
  }

  get categories(): string[] {
    return this._categories;
  }
}