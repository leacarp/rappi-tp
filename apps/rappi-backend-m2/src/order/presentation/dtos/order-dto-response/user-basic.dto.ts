import { UserBasicEntity } from "../../../domain/entities/user-basic";

export class UserBasicDto {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _email: string;

  constructor(id: string, name: string, email: string) {
    this._id = id;
    this._name = name;
    this._email = email;
  }

  getId(): string {
    return this._id;
  }

  getName(): string {
    return this._name;
  }

  getEmail(): string {
    return this._email;
  }

  static fromEntity(user: UserBasicEntity | undefined): UserBasicDto | null {
    if (!user) return null;
    return new UserBasicDto(user.getId().toHexString(), user.getName(), user.getEmail());
  }
}