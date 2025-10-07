import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { LoginRequestService } from '../../services/dtos/login-request-service';

export class LoginRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  toServiceDto(): LoginRequestService {
    return new LoginRequestService(this.email, this.password);
  }
}
