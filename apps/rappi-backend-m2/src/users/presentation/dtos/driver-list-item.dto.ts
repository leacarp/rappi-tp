import { DriverListItemService } from '../../services/dtos/driver-list-item-service.dto';

export class DriverListItem {
  private readonly id: string;
  private readonly email: string;
  private readonly name: string;
  private readonly phone: string;
  private readonly vehicle?: string;
  private readonly isAvailable?: boolean;
  private readonly totalEarnings?: number;
  private readonly createdAt: Date;

  constructor(
    id: string,
    email: string,
    name: string,
    phone: string,
    createdAt: Date,
    vehicle?: string,
    isAvailable?: boolean,
    totalEarnings?: number
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.createdAt = createdAt;
    this.vehicle = vehicle;
    this.isAvailable = isAvailable;
    this.totalEarnings = totalEarnings;
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

  getVehicle(): string | undefined {
    return this.vehicle;
  }

  getIsAvailable(): boolean | undefined {
    return this.isAvailable;
  }

  getTotalEarnings(): number | undefined {
    return this.totalEarnings;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  static fromServiceDto(serviceDto: DriverListItemService): DriverListItem {
    return new DriverListItem(
      serviceDto.getId(),
      serviceDto.getEmail(),
      serviceDto.getName(),
      serviceDto.getPhone(),
      serviceDto.getCreatedAt(),
      serviceDto.getVehicle(),
      serviceDto.getIsAvailable(),
      serviceDto.getTotalEarnings()
    );
  }
}

