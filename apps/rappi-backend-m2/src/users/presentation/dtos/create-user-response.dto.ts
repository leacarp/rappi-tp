import { CreateUserResponseService } from '../../services/dtos/create-user-response-service.dto';

export class CreateUserResponse {
  private readonly id: string;
  private readonly email: string;
  private readonly role: string;
  private readonly name: string;
  private readonly specificInfo?: string;

  constructor(
    id: string,
    email: string,
    role: string,
    name: string,
    specificInfo?: string
  ) {
    this.id = id;
    this.email = email;
    this.role = role;
    this.name = name;
    this.specificInfo = specificInfo;
  }

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getRole(): string {
    return this.role;
  }

  getName(): string {
    return this.name;
  }

  getSpecificInfo(): string | undefined {
    return this.specificInfo;
  }

  static fromServiceDto(serviceDto: CreateUserResponseService): CreateUserResponse {
    return new CreateUserResponse(
      serviceDto.getId(),
      serviceDto.getEmail(),
      serviceDto.getRole(),
      serviceDto.getName(),
      serviceDto.getSpecificInfo()
    );
  }
}