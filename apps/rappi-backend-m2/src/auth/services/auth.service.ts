import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { USER_ADAPTER } from '../../users/infrastructure/constants/user-adapter.constants';
import { IUserAdapter } from '../../users/domain/interfaces/IUserAdapter';
import { USER_SERVICE } from '../../users/infrastructure/constants/user-service.constants';
import { IUserService } from '../../users/domain/interfaces/IUserService';
import { LoginRequestService } from './dtos/login-request-service';
import { LoginResponseService } from './dtos/login-response-service';
import { RegisterCustomerRequestService } from './dtos/register-customer-request-service';
import { IAuthService } from '../domain/interfaces/IAuthService';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(USER_ADAPTER)
    private readonly userAdapter: IUserAdapter,
    @Inject(USER_SERVICE)
    private readonly userService: IUserService,
    private readonly jwtService: JwtService
  ) {}

  async login(loginRequest: LoginRequestService): Promise<LoginResponseService> {
    const user = await this.userAdapter.getUserForAuth(loginRequest.getEmail());
    if (!user) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    const isPasswordValid = await this.verifyPassword(loginRequest.getPassword(), user.getPassword());
    if (!isPasswordValid) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    const payload = {
      sub: user.getId(),
      email: user.getEmail(),
      role: user.getRole(),
    };
    const token = this.jwtService.sign(payload);

    return new LoginResponseService(
      user.getId().toString(),
      user.getEmail(),
      user.getRole(),
      token
    );
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async register(registerRequest: RegisterCustomerRequestService): Promise<LoginResponseService> {
    const createdUser = await this.userService.createCustomer(
      registerRequest.getEmail(),
      registerRequest.getPassword(),
      registerRequest.getName(),
      registerRequest.getPhone()
    );

    const payload = {
      sub: createdUser.getId(),
      email: createdUser.getEmail(),
      role: createdUser.getRole(),
    };
    const token = this.jwtService.sign(payload);

    return new LoginResponseService(
      createdUser.getId(),
      createdUser.getEmail(),
      createdUser.getRole(),
      token
    );
  }
}