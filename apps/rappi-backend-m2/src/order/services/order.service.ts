import { Types } from 'mongoose'; 
import { Injectable, Inject, BadRequestException} from '@nestjs/common';
import { IOrderRepository } from '../domain/interfaces/IOrderRepository';
import { ORDER_REPOSITORY } from '../infrastructure/constants/order.constants';
import { PRODUCT_ADAPTER } from '../infrastructure/constants/product-adapter.constants';
import { CreateOrderDto } from './dtos/order/create-order.dto';
import { GetOrderResponseDto } from '../presentation/dtos/get-order-response';
import { GetUserOrdersResponseDto } from '../presentation/dtos/get-orders-response';
import { OrderSummaryDto } from '../presentation/dtos/order/order-summary.dto';
import { OrderEntity } from '../domain/entities/order.entity';
import { PickUpLocation } from '../domain/entities/pickup-location.entity';
import { DeliveryLocation } from '../domain/entities/deliveryLocation.entity';
import { Items } from '../domain/entities/items.entity';
import { Summary } from '../domain/entities/summary.entity';
import { Payment } from '../domain/entities/payment.entity';
import { ProductOfItem } from '../domain/entities/product-of-item.entity';
import { IProductAdapter } from '../domain/interfaces/IProductAdapter';
import { itemsDtoService } from './dtos/order/items.dto';
import { USER_ADAPTER } from '../../users/infrastructure/constants/user-adapter.constants';
import { IUserAdapter } from '../../users/domain/interfaces/IUserAdapter';
import { UserOfAdapter } from '../../users/domain/dtos/user-of-adapter.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) 
    private readonly orderRepository: IOrderRepository,
    @Inject(PRODUCT_ADAPTER)
    private readonly productAdapter: IProductAdapter,
    @Inject(USER_ADAPTER)
    private readonly userAdapter: IUserAdapter
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<GetOrderResponseDto> {
    const items = await this.loadAndValidateItems(createOrderDto.items);  

    const users = await this.loadAndValidateUsers(
      createOrderDto.customerId,
      createOrderDto.vendorId,
      createOrderDto.driverId
    );

    const orderEntity = this.toOrderEntity(createOrderDto, items, users);

    const savedOrder = await this.orderRepository.create(orderEntity);


    return this.toGetOrderResponseDto(savedOrder);
  }

  async getOrderById(id: string): Promise<GetOrderResponseDto> {
    const orderEntity = await this.orderRepository.findById(id);
    if (!orderEntity) throw new BadRequestException(`Orden con id ${id} no encontrada`);
    
    
    return this.toGetOrderResponseDto(orderEntity);
  }

  async getOrdersByUser(userId: string, role: 'customer' | 'vendor' | 'driver'): Promise<GetUserOrdersResponseDto> {
    const field = role === 'vendor' ? 'vendorId' : 
    role === 'driver' ? 'driverId' :
    'customerId';

    const orders = await this.orderRepository.findByField(field, userId);

    if(!orders.length) throw new BadRequestException(`Órdenes del usuario con id ${userId} y rol de ${role} no encontradas`)

    const ordersSummary = orders.map(order => this.toOrderSummaryDto(order));

    return { orders: ordersSummary };
  }

  async getProductById(id: string): Promise<ProductOfItem>{
    return this.productAdapter.getProductById(id);
  }

  private toOrderDocument(dto: CreateOrderDto) {
    return {
      customerId: new Types.ObjectId(dto.customerId),
      vendorId: new Types.ObjectId(dto.vendorId),
      driverId: new Types.ObjectId(dto.driverId),
      status: 'pending',
      pickUpLocation: {
        latitude: dto.pickupLocation.latitude,
        longitude: dto.pickupLocation.longitude
      },
      deliveryLocation: {
        latitude: dto.deliveryLocation.latitude,
        longitude: dto.deliveryLocation.longitude
      },
      items: dto.items.map(item => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      summary: {
        subtotal: dto.summary.subtotal,
        shippingCost: dto.summary.shippingCost,
        taxes: dto.summary.taxes,
        discount: dto.summary.discount,
        total: dto.summary.total
      },
      payment: {
        method: dto.payment.method,
        status: dto.payment.status,
        transactionId: dto.payment.transactionId
      },
      trackingNumber: dto.trackingNumber,
      notes: dto.notes,
      createdAt: new Date()
    };
  }


  // CreateOrderDto → OrderEntit
    private toOrderEntity(dto: CreateOrderDto, 
      items: Items[], 
      users: { customer: UserOfAdapter, vendor: UserOfAdapter, driver: UserOfAdapter }
    ): OrderEntity {
    return new OrderEntity(
      undefined,
      new Types.ObjectId(dto.customerId),
      new Types.ObjectId(dto.vendorId),
      new Types.ObjectId(dto.driverId),
      'pending',
      new PickUpLocation(dto.pickupLocation.latitude, dto.pickupLocation.longitude),
      new DeliveryLocation(dto.deliveryLocation.latitude, dto.deliveryLocation.longitude),
      items,
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
      new Date(),
      { id: users.customer.getId(), name: users.customer.getName(), email: users.customer.getEmail() },
      { id: users.vendor.getId(), name: users.vendor.getName(), email: users.vendor.getEmail() },
      { id: users.driver.getId(), name: users.driver.getName(), email: users.driver.getEmail() }
    );
  } 

 
  // Mapper: OrderEntity → GetOrderResponseDto
  private toGetOrderResponseDto(order: OrderEntity): GetOrderResponseDto {
  return {
    id: order.getId().toHexString(),
    
    customer: {
      id: order.getCustomerId().toHexString(),
      name: order.getCustomer()?.name || '',
      email: order.getCustomer()?.email || ''
    },
    vendor: {
      id: order.getVendorId().toHexString(),
      name: order.getVendor()?.name || '',
      email: order.getVendor()?.email || ''
    },
    driver: {
      id: order.getDriverId().toHexString(),
      name: order.getDriver()?.name || '',
      email: order.getDriver()?.email || ''
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
      productId: item.getProductId().toHexString(),
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

  private toOrderSummaryDto(order: OrderEntity): OrderSummaryDto {
    return {
      id: order.getId().toHexString(),
      status: order.getStatus(),
      createdAt: order.getCreatedAt(),
      trackingNumber: order.getTrackingNumber()
    };
  }

  private async loadAndValidateItems(dtoItems: itemsDtoService[]): Promise<Items[]> {
    const invalidProducts: string[] = [];

    const items = await Promise.all(
    dtoItems.map(async (itemDto) => {
      const product = await this.productAdapter.getProductById(itemDto.productId);

      if (!product) {
        invalidProducts.push(itemDto.productId);
        return null;
      }

      if (itemDto.quantity <= 0) {
        throw new BadRequestException({
          message: `Cantidad inválida para el producto ${product.getName()}`,
          productId: itemDto.productId
        });
      }

      return new Items(product, itemDto.quantity);
      })
    );

  
    const validItems = items.filter(i => i !== null);
  
    if (invalidProducts.length > 0) {
      throw new BadRequestException({
        message: 'Algunos productos no existen',
        invalidProducts
      });
    }

    return validItems;
  }

  private async loadAndValidateUsers(
    customerId: string,
    vendorId: string,
    driverId: string
  ): Promise<{
    customer: UserOfAdapter;
    vendor: UserOfAdapter;
    driver: UserOfAdapter;
  }> {
    // 1. Buscar los 3 usuarios en paralelo
    const [customer, vendor, driver] = await Promise.all([
      this.userAdapter.getUserById(customerId),
      this.userAdapter.getUserById(vendorId),
      this.userAdapter.getUserById(driverId)
    ]);
  
    // 2. Verificar cuáles NO existen
    const errors = [];
    if (!customer) errors.push({ role: 'customer', id: customerId });
    if (!vendor) errors.push({ role: 'vendor', id: vendorId });
    if (!driver) errors.push({ role: 'driver', id: driverId });
  
    // 3. Si hay errores, lanzar excepción
    if (errors.length > 0) {
      throw new BadRequestException({
        message: 'Algunos usuarios no existen',
        invalidUsers: errors
      });
    }
  
    // 4. Retornar los 3 usuarios validados
    return { customer, vendor, driver };
  }
}




