import { Address } from '../entities/address.entity';
import { User } from '../entities/user.entity';

export interface IUserRepository {
  getUserById(userId: string): Promise<User | null>;

  updateUserAddress(userId: string, addresses: Address[]): Promise<User | null>;
}
