import { UserOfAdapter } from "../dtos/user-of-adapter.dto";

export interface IUserAdapter {
    getUserById(userId: string): Promise<UserOfAdapter | null>;
    getUserByEmail(email: string): Promise<UserOfAdapter | null>;
}