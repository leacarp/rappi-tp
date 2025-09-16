import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './domain/models/user.schema';
import { UserRepository } from './domain/repositories/user.repository';
import { UserService } from './services/user.service';
import { UserController } from './presentation/controllers/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserRepository, UserService, MongooseModule],
})
export class UsersModule {}
