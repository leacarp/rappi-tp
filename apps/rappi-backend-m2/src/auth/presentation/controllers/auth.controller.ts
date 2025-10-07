import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../dtos/login-request';
import { LoginResponse } from '../dtos/login-response';

@Controller('auth')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginRequest): Promise<LoginResponse> {
    const requestService = body.toServiceDto();
    const serviceResponse = await this.authService.login(requestService);
    
    return LoginResponse.fromServiceDto(serviceResponse);
  }
}
