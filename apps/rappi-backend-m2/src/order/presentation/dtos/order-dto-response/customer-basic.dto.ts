import { CustomerBasicEntity } from "../../../domain/entities/customer-basic";
import { UserBasicDto } from "./user-basic.dto";

export class CustomerBasicDto extends UserBasicDto {
  private readonly _address?: string;

  constructor(
    id: string,
    name: string,
    email: string,
    address?: string
  ) {
    super(id, name, email);
    this._address = address;
  }

  getAddress(): string | undefined {
    return this._address;
  }

  static fromEntity(customer: CustomerBasicEntity): CustomerBasicDto {
    return new CustomerBasicDto(
      customer.getId().toHexString(),
      customer.getName(),
      customer.getEmail(),
      customer.getAddress()
    );
  }
}