import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './infrastructure/schemas/user.schema';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { USER_REPOSITORY_TOKEN } from './domain/tokens/user-repository.token';
import { UserService } from './services/user.service';
import { UserController } from './presentation/controllers/user.controller';
import { UserAdapter } from './infrastructure/adapters/user.adapter';
import { USER_ADAPTER } from './infrastructure/constants/user-adapter.constants';
import { USER_SERVICE } from './infrastructure/constants/user-service.constants';
import { ProductModule } from '../products/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ProductModule
  ],
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository
    },
    {
      provide: USER_SERVICE,
      useClass: UserService
    },
    {
      provide: USER_ADAPTER,
      useClass: UserAdapter
    }
  ],
  exports: [USER_SERVICE, USER_ADAPTER]
})
export class UsersModule {}
