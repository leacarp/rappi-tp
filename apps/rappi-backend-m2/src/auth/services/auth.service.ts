import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { USER_ADAPTER_TOKEN } from '../infrastructure/constants/user-adapter.constants';
import { LoginRequestService } from './dtos/login-request-service';
import { LoginResponseService } from './dtos/login-response-service';
import { IUserAdapter } from '../domain/interfaces/IUserAdapter';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_ADAPTER_TOKEN)
    private readonly userAdapter: IUserAdapter,
    private readonly jwtService: JwtService
  ) {}

  async login(loginRequest: LoginRequestService): Promise<LoginResponseService> {
    const user = await this.userAdapter.getUserByEmail(loginRequest.getEmail());
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
      user.getId(),
      user.getEmail(),
      user.getRole(),
      token
    );
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
