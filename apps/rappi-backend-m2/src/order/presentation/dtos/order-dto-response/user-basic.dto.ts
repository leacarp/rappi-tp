import { UserBasicService } from "../../../services/dtos/order-response/user-basic-service.dto";

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

  static fromServiceDto(serviceDto: UserBasicService | null): UserBasicDto | null {
    if (!serviceDto) return null;
    return new UserBasicDto(serviceDto.getId(), serviceDto.getName(), serviceDto.getEmail());
  }
}