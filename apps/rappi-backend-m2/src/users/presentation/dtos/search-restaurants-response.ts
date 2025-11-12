import { SearchRestaurantsResponseService } from '../../services/dtos/search-restaurants-response-service';

export class RestaurantSearchResult {
  private readonly restaurantId: string;
  private readonly restaurantName: string;
  private readonly description: string;
  private readonly rating: number;
  private readonly isAvailable: boolean;
  private readonly schedule: string;

  constructor(
    restaurantId: string,
    restaurantName: string,
    description: string,
    rating: number,
    isAvailable: boolean,
    schedule: string
  ) {
    this.restaurantId = restaurantId;
    this.restaurantName = restaurantName;
    this.description = description;
    this.rating = rating;
    this.isAvailable = isAvailable;
    this.schedule = schedule;
  }

  getRestaurantId(): string {
    return this.restaurantId;
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
}

export class SearchRestaurantsResponse {
  private readonly restaurants: RestaurantSearchResult[];
  private readonly total: number;

  constructor(
    restaurants: RestaurantSearchResult[],
    total: number
  ) {
    this.restaurants = restaurants;
    this.total = total;
  }

  getRestaurants(): RestaurantSearchResult[] {
    return this.restaurants;
  }

  getTotal(): number {
    return this.total;
  }

  static fromServiceDto(serviceDto: SearchRestaurantsResponseService): SearchRestaurantsResponse {
    const restaurants = serviceDto.getRestaurants().map((restaurant) => 
      new RestaurantSearchResult(
        restaurant.getRestaurantId(),
        restaurant.getRestaurantName(),
        restaurant.getDescription(),
        restaurant.getRating(),
        restaurant.getIsAvailable(),
        restaurant.getSchedule()
      )
    );

    return new SearchRestaurantsResponse(restaurants, serviceDto.getTotal());
  }
}