import { UserBasicEntity } from "./user-basic";
import { Types } from "mongoose";

export class CustomerBasicEntity extends UserBasicEntity{
    constructor(
    id: Types.ObjectId,
    name: string,
    email: string,
    phone: string,
    private readonly address?: string
  ) {
    super(id, name, email, phone);
  }

  getAddress(): string | undefined { return this.address; }
  
}