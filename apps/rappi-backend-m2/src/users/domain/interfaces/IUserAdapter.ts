import { UserForAuth } from "../dtos/user-for-auth.dto";
import { UserOfAdapter } from "../dtos/user-of-adapter.dto";

export interface IUserAdapter {
    getUserById(userId: string): Promise<UserOfAdapter | null>;
    getUserForAuth(email: string): Promise<UserForAuth | null>;
}