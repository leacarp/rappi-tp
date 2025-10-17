import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { UpdateVendorProfile } from '../../services/dtos/update-vendor-profile-service';

export class UpdateVendorProfileRequest {
  @IsOptional()
  @IsString({ message: 'El nombre del restaurante debe ser un string' })
  @IsNotEmpty({ message: 'El nombre del restaurante no puede estar vacío' })
  private readonly restaurantName?: string;

  @IsOptional()
  @IsString({ message: 'El horario debe ser un string' })
  @IsNotEmpty({ message: 'El horario no puede estar vacío' })
  private readonly schedule?: string;

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser un string' })
  @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
  private readonly phone?: string;

  constructor(
    restaurantName?: string,
    schedule?: string,
    phone?: string
  ) {
    this.restaurantName = restaurantName;
    this.schedule = schedule;
    this.phone = phone;
  }

  getRestaurantName(): string | undefined {
    return this.restaurantName;
  }

  getSchedule(): string | undefined {
    return this.schedule;
  }

  getPhone(): string | undefined {
    return this.phone;
  }

  toServiceDto(): UpdateVendorProfile {
    return new UpdateVendorProfile(
      this.restaurantName,
      this.schedule,
      this.phone
    );
  }
}