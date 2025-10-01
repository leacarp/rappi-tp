import { VendorInfo } from '../../domain/entities/vendor-info.entity';

export class RestaurantSearchResultService {
  private readonly restaurantName: string;
  private readonly description: string;
  private readonly rating: number;
  private readonly isAvailable: boolean;
  private readonly schedule: string;

  constructor(
    restaurantName: string,
    description: string,
    rating: number,
    isAvailable: boolean,
    schedule: string
  ) {
    this.restaurantName = restaurantName;
    this.description = description;
    this.rating = rating;
    this.isAvailable = isAvailable;
    this.schedule = schedule;
  }

  getRestaurantName(): string {
    return this.restaurantName;
  }

  getDescription(): string {
    return this.description;
  }

  getRating(): number {
    return this.rating;
  }

  getIsAvailable(): boolean {
    return this.isAvailable;
  }

  getSchedule(): string {
    return this.schedule;
  }

  static fromVendorInfo(vendorInfo: VendorInfo): RestaurantSearchResultService {
    return new RestaurantSearchResultService(
      vendorInfo.getRestaurantName(),
      vendorInfo.getDescription(),
      vendorInfo.getRating(),
      vendorInfo.getIsAvailable(),
      vendorInfo.getSchedule()
    );
  }
}

export class SearchRestaurantsResponseService {
  private readonly restaurants: RestaurantSearchResultService[];
  private readonly total: number;

  constructor(
    restaurants: RestaurantSearchResultService[],
    total: number
  ) {
    this.restaurants = restaurants;
    this.total = total;
  }

  getRestaurants(): RestaurantSearchResultService[] {
    return this.restaurants;
  }

  getTotal(): number {
    return this.total;
  }

  static fromVendorInfoEntities(vendorInfos: VendorInfo[]): SearchRestaurantsResponseService {
    const restaurants = vendorInfos.map((vendorInfo) => 
      RestaurantSearchResultService.fromVendorInfo(vendorInfo)
    );

    return new SearchRestaurantsResponseService(restaurants, restaurants.length);
  }
}
