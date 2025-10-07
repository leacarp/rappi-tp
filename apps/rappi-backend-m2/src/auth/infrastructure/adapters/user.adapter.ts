import { Injectable, Inject } from '@nestjs/common';
import { IUserAdapter } from '../../domain/interfaces/IUserAdapter';
import { IUserRepository } from '../../../users/domain/interfaces/IUserRepository';
import { User } from '../../domain/entitites/user.entity';
import { User as UserEntity } from '../../../users/domain/entities/user.entity';
import { USER_REPOSITORY_TOKEN } from '../constants/user-repository.token';

@Injectable()
export class UserAdapter implements IUserAdapter {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.getUserByEmail(email);
    return user ? mapUserFromEntity(user) : null;
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.getUserById(userId);
    return user ? mapUserFromEntity(user) : null;
  }
}

function mapUserFromEntity(entity: UserEntity): User {
    return new User(entity.getId(), entity.getEmail(), entity.getPassword(), entity.getRole());
}
