import { User } from "../entitites/user.entity";

export interface IUserAdapter {
    getUserByEmail(email: string): Promise<User>;
    getUserById(userId: string): Promise<User>;
}