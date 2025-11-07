import { VendorListItemService } from '../../services/dtos/vendor-list-item-service.dto';

export class VendorListItem {
  private readonly id: string;
  private readonly email: string;
  private readonly name: string;
  private readonly phone: string;
  private readonly restaurantName?: string;
  private readonly description?: string;
  private readonly schedule?: string;
  private readonly rating?: number;
  private readonly isAvailable?: boolean;
  private readonly createdAt: Date;

  constructor(
    id: string,
    email: string,
    name: string,
    phone: string,
    createdAt: Date,
    restaurantName?: string,
    description?: string,
    schedule?: string,
    rating?: number,
    isAvailable?: boolean
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.createdAt = createdAt;
    this.restaurantName = restaurantName;
    this.description = description;
    this.schedule = schedule;
    this.rating = rating;
    this.isAvailable = isAvailable;
  }

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getName(): string {
    return this.name;
  }

  getPhone(): string {
    return this.phone;
  }

  getRestaurantName(): string | undefined {
    return this.restaurantName;
  }

  getDescription(): string | undefined {
    return this.description;
  }

  getSchedule(): string | undefined {
    return this.schedule;
  }

  getRating(): number | undefined {
    return this.rating;
  }

  getIsAvailable(): boolean | undefined {
    return this.isAvailable;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  static fromServiceDto(serviceDto: VendorListItemService): VendorListItem {
    return new VendorListItem(
      serviceDto.getId(),
      serviceDto.getEmail(),
      serviceDto.getName(),
      serviceDto.getPhone(),
      serviceDto.getCreatedAt(),
      serviceDto.getRestaurantName(),
      serviceDto.getDescription(),
      serviceDto.getSchedule(),
      serviceDto.getRating(),
      serviceDto.getIsAvailable()
    );
  }
}

