import { UserOfOrder } from "../entities/user-of-order.entity";

export interface IUserAdapter {
    getUserById(userId: string): Promise<UserOfOrder | null>;
}