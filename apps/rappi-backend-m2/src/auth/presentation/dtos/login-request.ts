import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { LoginRequestService } from '../../services/dtos/login-request-service';

export class LoginRequest {
  @ApiProperty({ type: String })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  password: string;

  toServiceDto(): LoginRequestService {
    return new LoginRequestService(this.email, this.password);
  }
}