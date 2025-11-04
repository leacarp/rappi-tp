import { CreateOrderDto } from '../../services/dtos/order/create-order-service.dto';
import { GetOrderResponseDto } from '../../presentation/dtos/get-order-response.dto';
import { GetUserOrdersResponseDto } from '../../presentation/dtos/get-orders-response.dto';
import { ProductOfItem } from '../entities/product-of-item.entity';
import { OrderStatus } from '../enum/order-status';
import { SummaryDto } from '../../presentation/dtos/order-dto-response/summary.dto';

export interface IOrderService {
  createOrder(createOrderDto: CreateOrderDto): Promise<GetOrderResponseDto>;
  getOrderById(orderId: string): Promise<GetOrderResponseDto>;
  getOrdersByUserRole(userId: string, role: 'customer' | 'vendor' | 'driver', status?: string): Promise<GetUserOrdersResponseDto>;
  getOrdersByStatus(status?: string): Promise<GetUserOrdersResponseDto>;
  getDriverCompletedOrders(driverId: string): Promise<GetUserOrdersResponseDto>;
  getProductById(id: string): Promise<ProductOfItem>;
  UpdateOrderStatus(orderId: string, newStatus: OrderStatus): Promise<void>;
  getOrderSummary(orderId: string): Promise<SummaryDto>;
  confirmOrder(orderId: string): Promise<GetOrderResponseDto>;
  getWhatsAppLink(orderId: string): Promise<{ url: string }>;
  acceptOrderByDriver(orderId: string, driverId: string): Promise<void>;
}