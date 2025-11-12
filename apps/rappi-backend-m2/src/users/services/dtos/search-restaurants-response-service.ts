import { VendorInfo } from '../../domain/entities/vendor-info.entity';

export class RestaurantSearchResultService {
  private readonly _restaurantId: string;
  private readonly _restaurantName: string;
  private readonly _description: string;
  private readonly _rating: number;
  private readonly _isAvailable: boolean;
  private readonly _schedule: string;

  constructor(
    restaurantId: string,
    restaurantName: string,
    description: string,
    rating: number,
    isAvailable: boolean,
    schedule: string
  ) {
    this._restaurantId = restaurantId;
    this._restaurantName = restaurantName;
    this._description = description;
    this._rating = rating;
    this._isAvailable = isAvailable;
    this._schedule = schedule;
  }

  getRestaurantId(): string {
    return this._restaurantId;
  }

  getRestaurantName(): string {
    return this._restaurantName;
  }

  getDescription(): string {
    return this._description;
  }

  getRating(): number {
    return this._rating;
  }

  getIsAvailable(): boolean {
    return this._isAvailable;
  }

  getSchedule(): string {
    return this._schedule;
  }

  static fromVendorInfo(vendorInfo: VendorInfo, userId: string): RestaurantSearchResultService {
    return new RestaurantSearchResultService(
      userId,
      vendorInfo.getRestaurantName(),
      vendorInfo.getDescription(),
      vendorInfo.getRating(),
      vendorInfo.getIsAvailable(),
      vendorInfo.getSchedule()
    );
  }
}

export class SearchRestaurantsResponseService {
  private readonly _restaurants: RestaurantSearchResultService[];
  private readonly _total: number;

  constructor(
    restaurants: RestaurantSearchResultService[],
    total: number
  ) {
    this._restaurants = restaurants;
    this._total = total;
  }

  getRestaurants(): RestaurantSearchResultService[] {
    return this._restaurants;
  }

  getTotal(): number {
    return this._total;
  }

  static fromVendorInfoEntities(vendorInfos: { vendorInfo: VendorInfo, userId: string }[]): SearchRestaurantsResponseService {
    const restaurants = vendorInfos.map(({ vendorInfo, userId }) => 
      RestaurantSearchResultService.fromVendorInfo(vendorInfo, userId)
    );

    return new SearchRestaurantsResponseService(restaurants, restaurants.length);
  }
}