import { CustomerBasicEntity } from "../../../domain/entities/customer-basic";
import { UserBasicDto } from "./user-basic.dto";

export class CustomerBasicDto extends UserBasicDto {
    constructor(
        id: string,
        name: string,
        email: string,
        private readonly _address?: string
    ) {
        super(id, name, email);
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