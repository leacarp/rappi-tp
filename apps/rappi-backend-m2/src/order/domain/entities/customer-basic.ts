import { UserBasicEntity } from "./user-basic";
import { Types } from "mongoose";

export class CustomerBasicEntity extends UserBasicEntity {
  private readonly _address?: string;

  constructor(
    id: Types.ObjectId,
    name: string,
    email: string,
    phone: string,
    address?: string
  ) {
    super(id, name, email, phone);
    this._address = address;
  }

  getAddress(): string | undefined {
    return this._address;
  }
}