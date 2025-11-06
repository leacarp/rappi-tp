import { Types } from "mongoose";

import { User } from "../entities/user.entity";

export class UserForAuth {
  private readonly _id: Types.ObjectId;
  private readonly _name: string;
  private readonly _email: string;
  private readonly _password: string;
  private readonly _role: string;

  constructor(id: Types.ObjectId, name: string, email: string, password: string, role: string) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
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

  getPassword(): string {
    return this._password;
  }

  getRole(): string {
    return this._role;
  }

  static fromEntity(entity: User): UserForAuth {
    return new UserForAuth(
      new Types.ObjectId(entity.getId()),
      entity.getProfile().getName(),
      entity.getEmail(),
      entity.getPassword(),
      entity.getRole()
    );
  }
}