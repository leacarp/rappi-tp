import { UserBasicEntity } from "./user-basic";
import { Types } from "mongoose";

export class CustomerBasicEntity extends UserBasicEntity{
    constructor(
    id: Types.ObjectId,
    name: string,
    email: string,
    private readonly address?: string
  ) {
    super(id, name, email);
  }

  getAddress(): string | undefined { return this.address; }
  
}