import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { LoginRequestService } from '../../services/dtos/login-request-service';	

export class LoginRequest {
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;

  toServiceDto(): LoginRequestService {
    return new LoginRequestService(this.email, this.password);
  }
}
