import { Injectable, Inject } from '@nestjs/common';
import { IUserAdapter } from '../../domain/interfaces/IUserAdapter';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { User } from '../../domain/entities/user.entity';
import { USER_REPOSITORY_TOKEN } from '../../domain/tokens/user-repository.token';
import { UserForAdapter } from './dtos/user-for-adapter.dto';

@Injectable()
export class UserAdapter implements IUserAdapter {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository
  ) {}

  async getUserByEmail(email: string): Promise<UserForAdapter | null> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) return null;
    return fromEntity(user);
  }

  async getUserById(userId: string): Promise<UserForAdapter | null> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) return null;
    return fromEntity(user);
  }
}

function fromEntity(entity: User): UserForAdapter {
  return new UserForAdapter(
    entity.getId(),
    entity.getEmail(),
    entity.getPassword(),
    entity.getRole()
  );
}