import { UserBasicService } from "../../../services/dtos/order-response/user-basic-service.dto";

export class UserBasicDto {
  private readonly id: string;
  private readonly name: string;
  private readonly email: string;

  constructor(id: string, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  static fromServiceDto(serviceDto: UserBasicService | null): UserBasicDto | null {
    if (!serviceDto) return null;
    return new UserBasicDto(serviceDto.getId(), serviceDto.getName(), serviceDto.getEmail());
  }
}