import { OrderEntity } from "../entities/order.entity";

export interface IOrderRepository{
    create(dto: OrderEntity): Promise<OrderEntity>; 
    findById(id: string): Promise<OrderEntity | null>;
    findByUserId(userId: string): Promise<OrderEntity[]>;
}