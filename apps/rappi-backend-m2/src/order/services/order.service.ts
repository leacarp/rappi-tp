import { Types } from 'mongoose'; 
import { Injectable, Inject, NotFoundException, Logger } from '@nestjs/common';
import { IOrderRepository } from '../domain/interfaces/IOrderRepository';
import { ORDER_REPOSITORY } from '../infrastructure/constants/order.constants';
import { CreateOrderDto } from './dtos/order/create-order.dto';
import { GetOrderResponseDto } from '../presentation/dtos/get-order-response';
import { GetUserOrdersResponseDto } from '../presentation/dtos/get-orders-response';
import { OrderSummaryDto } from '../presentation/dtos/order/order-summary.dto';
import { Order } from '../domain/entities/order.entity';
import { PickUpLocation } from '../domain/entities/pickup-location.entity';
import { DeliveryLocation } from '../domain/entities/deliveryLocation.entity';
import { Items } from '../domain/entities/items.entity';
import { Summary } from '../domain/entities/summary.entity';
import { Payment } from '../domain/entities/payment.entity';


@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) 
    private readonly orderRepository: IOrderRepository
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<GetOrderResponseDto> {
    const orderEntity = this.toOrderEntity(createOrderDto);

    const savedOrder = await this.orderRepository.create(orderEntity);
    return this.toGetOrderResponseDto(savedOrder);
  }

  async getOrderById(id: string): Promise<GetOrderResponseDto> {
    const orderEntity = await this.orderRepository.findById(id);
    if (!orderEntity) {
      throw new Error(`Order with id ${id} not found`);
    }
    return this.toGetOrderResponseDto(orderEntity);
  }

  async getOrdersByUser(userId: string): Promise<GetUserOrdersResponseDto> {
    const orders = await this.orderRepository.findByUserId(userId);
    const ordersSummary = orders.map(order => this.toOrderSummaryDto(order));

    return { orders: ordersSummary };
  }


  // CreateOrderDto → OrderEntit
  private toOrderEntity(dto: CreateOrderDto): Order {
    return new Order(
      undefined,
      new Types.ObjectId(dto.customerId),
      new Types.ObjectId(dto.vendorId),
      new Types.ObjectId(dto.driverId),
      'pending',
      new PickUpLocation(dto.pickupLocation.latitude, dto.pickupLocation.longitude),
      new DeliveryLocation(dto.deliveryLocation.latitude, dto.deliveryLocation.longitude),
      dto.items.map(item => new Items(item.productId, item.name, item.quantity, item.price)),
      new Summary(
        dto.summary.subtotal,
        dto.summary.shippingCost,
        dto.summary.taxes,
        dto.summary.discount,
        dto.summary.total
      ),
      new Payment(dto.payment.method, dto.payment.status, dto.payment.transactionId),
      dto.trackingNumber,
      dto.notes,
      new Date()
    );
  } 

  // Mapper: OrderEntity → GetOrderResponseDto
  private toGetOrderResponseDto(order: Order): GetOrderResponseDto {
  return {
    id: order.getId().toHexString(),
    
    customer: {
      id: order.getCustomerId().toHexString(),
      name: (order.getCustomerId() as any).name || '', 
      email: (order.getCustomerId() as any).email || ''
    },
    vendor: {
      id: order.getVendorId().toHexString(),
      name: (order.getVendorId() as any).name || '',
      email: (order.getVendorId() as any).email || ''
    },
    driver: {
      id: order.getDriverId().toHexString(),
      name: (order.getDriverId() as any).name || '',
      email: (order.getDriverId() as any).email || ''
    },

    status: order.getStatus(),
    createdAt: order.getCreatedAt(),

    pickupLocation: {
      latitude: order.getPickupLocation().getLatitude(),
      longitude: order.getPickupLocation().getLongitude()
    },
    deliveryLocation: {
      latitude: order.getDeliveryLocation().getLatitude(),
      longitude: order.getDeliveryLocation().getLongitude()
    },

    items: order.getItems().map(item => ({
      productId: item.getProductId(),
      name: item.getName(),
      quantity: item.getQuantity(),
      price: item.getPrice()
    })),

    summary: {
      subtotal: order.getSummary().getSubTotal(),
      shippingCost: order.getSummary().getShippingCost(),
      taxes: order.getSummary().getTaxes(),
      discount: order.getSummary().getDiscount(),
      total: order.getSummary().getTotal()
    },

    payment: {
      method: order.getPayment().getMethod(),
      status: order.getPayment().getStatus(),
      transactionId: order.getPayment().getTransactionId()
    },

    trackingNumber: order.getTrackingNumber(),
    notes: order.getNotes()
  };
  }

  private toOrderSummaryDto(order: Order): OrderSummaryDto {
    return {
      id: order.getId().toHexString(),
      status: order.getStatus(),
      createdAt: order.getCreatedAt(),
      trackingNumber: order.getTrackingNumber()
    };
  }

}




