import { Order } from "../entities/order.entity";

export interface IOrderRepository{
    create(order: Order): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    findByUserId(userId: string): Promise<Order[]>;
}