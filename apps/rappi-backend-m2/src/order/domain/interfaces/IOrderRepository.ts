import { Types } from 'mongoose';
import { OrderEntity } from "../entities/order.entity";
import { OrderStatus } from "../enum/order-status";

export type OrderFilter = {
  customerId?: Types.ObjectId;
  vendorId?: Types.ObjectId;
  driverId?: Types.ObjectId;
  status?: string;
};

export interface IOrderRepository {
  create(dto: OrderEntity): Promise<OrderEntity>;
  findById(id: string): Promise<OrderEntity | null>;
  findByFilter(filter: OrderFilter): Promise<OrderEntity[]>;
  findByDriverAndStatus(driverId: string, status: OrderStatus): Promise<OrderEntity[]>;
  updateStatus(id: string, status: string): Promise<void>;
  updateOrderDriver(order: OrderEntity): Promise<void>;
  findByTrackingNumber(trackingNumber: string): Promise<OrderEntity | null>;
}