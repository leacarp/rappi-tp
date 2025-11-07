import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { AuthService } from './services/auth.service';
import { AuthController } from './presentation/controllers/auth.controller';
import { AUTH_SERVICE } from './infrastructure/constants/auth-service.constants';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      signOptions: { expiresIn: '24h' },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy, 
    JwtAuthGuard,
    RolesGuard,
    {
      provide: AUTH_SERVICE,
      useClass: AuthService
    },
  ],
  exports: [JwtAuthGuard, RolesGuard, JwtModule, AUTH_SERVICE],
})

export class AuthModule {}