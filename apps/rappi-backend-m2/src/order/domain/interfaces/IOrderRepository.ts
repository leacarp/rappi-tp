import { OrderEntity } from "../entities/order.entity";

export interface IOrderRepository{
    create(dto: OrderEntity): Promise<OrderEntity>; 
    findById(id: string): Promise<OrderEntity | null>;
    findByField(field: string, value: string): Promise<OrderEntity[]>;
    updateStatus(id: string ,status: string) : Promise<void>
}