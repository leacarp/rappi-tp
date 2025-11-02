import { Types } from 'mongoose';

import { Injectable, Inject } from '@nestjs/common';
import { IUserAdapter } from '../../domain/interfaces/IUserAdapter';
import { UserOfAdapter } from '../../domain/dtos/user-of-adapter.dto';
import { UserForAuth } from '../../domain/dtos/user-for-auth.dto';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { User } from '../../domain/entities/user.entity';
import { USER_REPOSITORY_TOKEN } from '../../domain/tokens/user-repository.token';

@Injectable()
export class UserAdapter implements IUserAdapter {
    constructor(
        @Inject(USER_REPOSITORY_TOKEN)
        private readonly userRepository: IUserRepository
    ) {}

    async getUserById(userId: string): Promise<UserOfAdapter | null> {
        const user = await this.userRepository.getUserById(userId);
        if (!user) return null;
        return fromEntity(user);
    }

    async getUserForAuth(email: string): Promise<UserForAuth | null> {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) return null;
        return fromEntityForAuth(user);
    }

    async existsUser(userId: string): Promise<boolean> {
        return this.userRepository.existsUser(userId);
    }
}

function fromEntity(user: User): UserOfAdapter {
    return new UserOfAdapter(
        new Types.ObjectId(user.getId()),  
        user.getProfile().getName(),        
        user.getEmail(),
        user.getRole()
    );
}

function fromEntityForAuth(user: User): UserForAuth {
    return new UserForAuth(
        new Types.ObjectId(user.getId()),
        user.getProfile().getName(),
        user.getEmail(),
        user.getPassword(),
        user.getRole()
    );
}