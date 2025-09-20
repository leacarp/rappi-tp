import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './infrastructure/schemas/user.schema';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { USER_REPOSITORY_TOKEN } from './domain/tokens/user-repository.token';
import { UserService } from './services/user.service';
import { UserController } from './presentation/controllers/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository
    },
    UserService
  ],
  exports: [UserService]
})
export class UsersModule {}
