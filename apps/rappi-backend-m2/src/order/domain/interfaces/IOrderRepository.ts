import { OrderEntity } from "../entities/order.entity";
import { OrderStatus } from "../enum/order-status";

export interface IOrderRepository{
    create(dto: OrderEntity): Promise<OrderEntity>; 
    findById(id: string): Promise<OrderEntity | null>;
    findByField(field: string, value: string): Promise<OrderEntity[]>;
    findByDriverAndStatus(driverId: string, status: OrderStatus): Promise<OrderEntity[]>;
    updateStatus(id: string ,status: string) : Promise<void>
}