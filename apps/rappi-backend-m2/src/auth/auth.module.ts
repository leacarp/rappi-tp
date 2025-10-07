import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './services/auth.service';
import { AuthController } from './presentation/controllers/auth.controller';
import { User, UserSchema } from '../users/infrastructure/schemas/user.schema';
import { UserRepository } from '../users/infrastructure/repositories/user.repository';
import { USER_ADAPTER_TOKEN } from './infrastructure/constants/user-adapter.constants';
import { UserAdapter } from './infrastructure/adapters/user.adapter';
import { USER_REPOSITORY_TOKEN } from './infrastructure/constants/user-repository.token';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      signOptions: { expiresIn: '24h' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy, 
    JwtAuthGuard,
    AuthService,
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository
    },
    {
      provide: USER_ADAPTER_TOKEN,
      useClass: UserAdapter
    }
  ],
  exports: [JwtAuthGuard, JwtModule, AuthService],
})
export class AuthModule {}
