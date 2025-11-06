import { Types } from "mongoose";

import { User } from "../entities/user.entity";

export class UserOfAdapter {
  private readonly _id: Types.ObjectId;
  private readonly _name: string;
  private readonly _email: string;
  private readonly _role: string;

  constructor(id: Types.ObjectId, name: string, email: string, role: string) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._role = role;
  }

  getId(): Types.ObjectId {
    return this._id;
  }

  getName(): string {
    return this._name;
  }
  
  getEmail(): string {
    return this._email;
  }

  getRole(): string {
    return this._role;
  }

  static fromEntity(entity: User): UserOfAdapter {
    return new UserOfAdapter(
      new Types.ObjectId(entity.getId()),
      entity.getProfile().getName(),
      entity.getEmail(),
      entity.getRole()
    );
  }
}