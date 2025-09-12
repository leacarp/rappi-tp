import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateAddressRequest {
  @IsString({ message: 'La calle es requerida' })
  @IsNotEmpty({ message: 'La calle no puede estar vacía' })
  private readonly street: string;

  @IsString({ message: 'La ciudad es requerida' })
  @IsNotEmpty({ message: 'La ciudad no puede estar vacía' })
  private readonly city: string;

  @IsString({ message: 'El código postal es requerido' })
  @IsNotEmpty({ message: 'El código postal no puede estar vacío' })
  private readonly zipCode: string;

  @IsBoolean({ message: 'isFavorite debe ser un valor booleano' })
  private readonly isFavorite: boolean;

  constructor(
    street: string,
    city: string,
    zipCode: string,
    isFavorite: boolean
  ) {
    this.street = street;
    this.city = city;
    this.zipCode = zipCode;
    this.isFavorite = isFavorite;
  }

  getStreet(): string {
    return this.street;
  }

  getCity(): string {
    return this.city;
  }

  getZipCode(): string {
    return this.zipCode;
  }

  getIsFavorite(): boolean {
    return this.isFavorite;
  }
}
