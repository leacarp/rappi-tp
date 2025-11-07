import { CreateOrderDto } from '../../services/dtos/order/create-order-service.dto';
import { GetOrderResponseService } from '../../services/dtos/get-order-response-service.dto';
import { GetOrdersResponseService } from '../../services/dtos/get-orders-response-service.dto';
import { SummaryServiceResponse } from '../../services/dtos/order-response/summary-service-response.dto';
import { ProductOfItem } from '../entities/product-of-item.entity';
import { OrderStatus } from '../enum/order-status';

export interface IOrderService {
  createOrder(createOrderDto: CreateOrderDto): Promise<GetOrderResponseService>;
  getOrderById(orderId: string): Promise<GetOrderResponseService>;
  getOrdersByUserRole(userId: string, role: 'customer' | 'vendor' | 'driver', status?: string): Promise<GetOrdersResponseService>;
  getOrdersByStatus(status?: string): Promise<GetOrdersResponseService>;
  getDriverCompletedOrders(driverId: string): Promise<GetOrdersResponseService>;
  getProductById(id: string): Promise<ProductOfItem>;
  UpdateOrderStatus(orderId: string, newStatus: OrderStatus): Promise<void>;
  getOrderSummary(orderId: string): Promise<SummaryServiceResponse>;
  confirmOrder(orderId: string): Promise<GetOrderResponseService>;
  getWhatsAppLink(orderId: string): Promise<{ url: string }>;
  acceptOrderByDriver(orderId: string, driverId: string): Promise<void>;
}