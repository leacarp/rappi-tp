import { LoginRequestService } from '../../services/dtos/login-request-service';
import { LoginResponseService } from '../../services/dtos/login-response-service';

export interface IAuthService {
  login(loginRequest: LoginRequestService): Promise<LoginResponseService>;
  verifyPassword(password: string, hash: string): Promise<boolean>;
}