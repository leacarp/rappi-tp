import { VendorInfo } from '../../domain/entities/vendor-info.entity';

export class RestaurantSearchResultService {
  private readonly id: string;
  private readonly restaurantName: string;
  private readonly description: string;
  private readonly rating: number;
  private readonly isAvailable: boolean;
  private readonly schedule: string;

  constructor(
    id: string,
    restaurantName: string,
    description: string,
    rating: number,
    isAvailable: boolean,
    schedule: string
  ) {
    this.id = id;
    this.restaurantName = restaurantName;
    this.description = description;
    this.rating = rating;
    this.isAvailable = isAvailable;
    this.schedule = schedule;
  }

  getId(): string {
    return this.id;
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

  static fromVendorInfo(vendorInfo: VendorInfo, id: string): RestaurantSearchResultService {
    return new RestaurantSearchResultService(
      id,
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
    const restaurants = vendorInfos.map((vendorInfo, index) => 
      RestaurantSearchResultService.fromVendorInfo(vendorInfo, `vendor_${index}`)
    );

    return new SearchRestaurantsResponseService(restaurants, restaurants.length);
  }
}
