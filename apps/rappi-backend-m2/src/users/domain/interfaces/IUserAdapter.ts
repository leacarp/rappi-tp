import { UserForAdapter } from "../../infrastructure/adapters/dtos/user-for-adapter.dto";

export interface IUserAdapter {
    getUserByEmail(email: string): Promise<UserForAdapter | null>;
    getUserById(userId: string): Promise<UserForAdapter | null>;
}
