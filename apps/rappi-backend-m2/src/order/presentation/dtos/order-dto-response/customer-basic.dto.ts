import { CustomerBasicService } from "../../../services/dtos/order-response/customer-basic-service.dto";
import { UserBasicDto } from "./user-basic.dto";

export class CustomerBasicDto extends UserBasicDto {
  private readonly address?: string;

  constructor(
    id: string,
    name: string,
    email: string,
    address?: string
  ) {
    super(id, name, email);
    this.address = address;
  }

  getAddress(): string | undefined {
    return this.address;
  }

  static fromServiceDto(serviceDto: CustomerBasicService): CustomerBasicDto {
    return new CustomerBasicDto(
      serviceDto.getId(),
      serviceDto.getName(),
      serviceDto.getEmail(),
      serviceDto.getAddress()
    );
  }
}