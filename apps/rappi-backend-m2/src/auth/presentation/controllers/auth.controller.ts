import { Controller, Post, Body, UsePipes, ValidationPipe, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';

import { IAuthService } from '../../domain/interfaces/IAuthService';
import { AUTH_SERVICE } from '../../infrastructure/constants/auth-service.constants';
import { LoginRequest } from '../dtos/login-request';
import { LoginResponse } from '../dtos/login-response';

@ApiTags('auth')
@Controller('auth')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authService: IAuthService
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: LoginRequest })
  @ApiResponse({ status: 200, type: LoginResponse })
  async login(@Body() body: LoginRequest): Promise<LoginResponse> {
    const requestService = body.toServiceDto();
    const serviceResponse = await this.authService.login(requestService);
    
    return LoginResponse.fromServiceDto(serviceResponse);
  }
}