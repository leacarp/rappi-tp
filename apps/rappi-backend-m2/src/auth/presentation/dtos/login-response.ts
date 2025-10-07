import { LoginResponseService } from '../../services/dtos/login-response-service';

export class LoginResponse {
  private readonly userId: string;
  private readonly email: string;
  private readonly role: string;
  private readonly token: string;

  constructor(userId: string, email: string, role: string, token: string) {
    this.userId = userId;
    this.email = email;
    this.role = role;
    this.token = token;
  }

  static fromServiceDto(serviceDto: LoginResponseService): LoginResponse {
    return new LoginResponse(
      serviceDto.getUserId(),
      serviceDto.getEmail(),
      serviceDto.getRole(),
      serviceDto.getToken()
    );
  }
}
