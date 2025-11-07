import { CustomerBasicEntity } from "../../../domain/entities/customer-basic";
import { UserBasicService } from "./user-basic-service.dto";

export class CustomerBasicService extends UserBasicService {
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

  static fromEntity(customer: CustomerBasicEntity): CustomerBasicService {
    return new CustomerBasicService(
      customer.getId().toHexString(),
      customer.getName(),
      customer.getEmail(),
      customer.getAddress()
    );
  }
}