import { ApiProperty } from '@nestjs/swagger';

import { LoginResponseService } from '../../services/dtos/login-response-service';

export class LoginResponse {
  @ApiProperty({ type: String })
  private readonly userId: string;

  @ApiProperty({ type: String })
  private readonly email: string;

  @ApiProperty({ type: String })
  private readonly role: string;

  @ApiProperty({ type: String })
  private readonly token: string;

  constructor(userId: string, email: string, role: string, token: string) {
    this.userId = userId;
    this.email = email;
    this.role = role;
    this.token = token;
  }

  getUserId(): string {
    return this.userId;
  }

  getEmail(): string {
    return this.email;
  }

  getRole(): string {
    return this.role;
  }

  getToken(): string {
    return this.token;
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