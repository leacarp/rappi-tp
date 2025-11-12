import { LoginRequestService } from '../../services/dtos/login-request-service';
import { LoginResponseService } from '../../services/dtos/login-response-service';
import { RegisterCustomerRequestService } from '../../services/dtos/register-customer-request-service';

export interface IAuthService {
  login(loginRequest: LoginRequestService): Promise<LoginResponseService>;
  register(registerRequest: RegisterCustomerRequestService): Promise<LoginResponseService>;
  verifyPassword(password: string, hash: string): Promise<boolean>;
}