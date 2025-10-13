import { Injectable, Inject } from '@nestjs/common';
import { IUserAdapter } from '../../../order/domain/interfaces/IUserAdapter';
import { UserOfOrder } from '../../../order/domain/entities/user-of-order.entity';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { User } from '../../domain/entities/user.entity';
import { USER_REPOSITORY_TOKEN } from '../../domain/tokens/user-repository.token';
import { Types } from 'mongoose';

@Injectable()
export class UserAdapter implements IUserAdapter {
    constructor(
        @Inject(USER_REPOSITORY_TOKEN)
        private readonly userRepository: IUserRepository
    ) {}

    async getUserById(userId: string): Promise<UserOfOrder | null> {
        const user = await this.userRepository.getUserById(userId);
        if (!user) return null;
        return fromEntity(user);
    }
}

function fromEntity(user: User): UserOfOrder {
    return new UserOfOrder(
        new Types.ObjectId(user.getId()),  
        user.getProfile().getName(),        
        user.getEmail()                    
    );
}