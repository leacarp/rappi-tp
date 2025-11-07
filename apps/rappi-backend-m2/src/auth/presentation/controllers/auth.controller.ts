import { Controller, Post, Body, UsePipes, ValidationPipe, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { IAuthService } from '../../domain/interfaces/IAuthService';
import { AUTH_SERVICE } from '../../infrastructure/constants/auth-service.constants';
import { LoginRequest } from '../dtos/login-request';
import { LoginResponse } from '../dtos/login-response';

@Controller('auth')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authService: IAuthService
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginRequest): Promise<LoginResponse> {
    const requestService = body.toServiceDto();
    const serviceResponse = await this.authService.login(requestService);
    
    return LoginResponse.fromServiceDto(serviceResponse);
  }
}