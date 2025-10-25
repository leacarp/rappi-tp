import { Types } from 'mongoose'; 
import { Injectable, Inject, BadRequestException} from '@nestjs/common';
import { IOrderRepository } from '../domain/interfaces/IOrderRepository';
import { ORDER_REPOSITORY } from '../infrastructure/constants/order.constants';
import { PRODUCT_ADAPTER } from '../infrastructure/constants/product-adapter.constants';
import { CreateOrderDto } from './dtos/order/create-order-service.dto';
import { GetOrderResponseDto } from '../presentation/dtos/get-order-response.dto';
import { GetUserOrdersResponseDto } from '../presentation/dtos/get-orders-response.dto';
import { OrderSummaryDto } from '../presentation/dtos/order-dto-response/order-summary.dto';
import { OrderEntity } from '../domain/entities/order.entity';
import { PickUpLocation } from '../domain/entities/pickup-location.entity';
import { DeliveryLocation } from '../domain/entities/deliveryLocation.entity';
import { Items } from '../domain/entities/items.entity';
import { Summary } from '../domain/entities/summary.entity';
import { Payment } from '../domain/entities/payment.entity';
import { ProductOfItem } from '../domain/entities/product-of-item.entity';
import { IProductAdapter } from '../domain/interfaces/IProductAdapter';
import { OrderStatus } from '../domain/enum/order-status';
import { ItemsDtoService } from './dtos/order/items-service.dto';
import { CreateOrderRequestDto } from '../presentation/dtos/create-order-request.dto';
import { ProductOfItemDtoService } from './dtos/order/productOfItem.dto';
import { SummaryDtoService } from './dtos/order/summary-service.dto';
import { PaymentDtoService } from './dtos/order/payment-service.dto';
import { DeliveryLocationDtoService } from './dtos/order/deliveryLocation-service.dto';
import { PickupLocationDtoService } from './dtos/order/pickupLocation-service.dto';
import { USER_ADAPTER } from '../../users/infrastructure/constants/user-adapter.constants';
import { IUserAdapter } from '../../users/domain/interfaces/IUserAdapter';
import { SummaryDto } from '../presentation/dtos/order-dto-response/summary.dto';


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

  async createOrder(requestDto: CreateOrderRequestDto): Promise<GetOrderResponseDto> {
    const createOrderDto = this.toCreateOrderDto(requestDto);

    const items = await this.loadAndValidateItems(createOrderDto.getItems());  

    await this.loadAndValidateUsers(
      createOrderDto.getCustomerId(),
      createOrderDto.getVendorId(),
      createOrderDto.getDriverId()
    );


    const orderEntity = this.toOrderEntity(createOrderDto, items);

    const savedOrder = await this.orderRepository.create(orderEntity);


    return GetOrderResponseDto.fromEntity(savedOrder);
  }

  async getOrderById(orderId: string): Promise<GetOrderResponseDto> {
    const orderEntity = await this.orderRepository.findById(orderId);
    if (!orderEntity) throw new BadRequestException(`Orden con id ${orderId} no encontrada`);

    return GetOrderResponseDto.fromEntity(orderEntity);
  }

  async getOrdersByUser(userId: string, role: 'customer' | 'vendor' | 'driver'): Promise<GetUserOrdersResponseDto> {
    const field = role === 'vendor' ? 'vendorId' : 
    role === 'driver' ? 'driverId' :
    'customerId';

    const orders = await this.orderRepository.findByField(field, userId);

    if(!orders.length)
      return new GetUserOrdersResponseDto([]);

    return GetUserOrdersResponseDto.fromEntities(orders)
  }

  async getDriverCompletedOrders(driverId: string): Promise<GetUserOrdersResponseDto> {
    const orders = await this.orderRepository.findByDriverAndStatus(driverId, OrderStatus.Delivered);

    if(!orders.length) {
      return new GetUserOrdersResponseDto([]);
    }

    return GetUserOrdersResponseDto.fromEntities(orders);
  }

  async getProductById(id: string): Promise<ProductOfItem>{
    return this.productAdapter.getProductById(id);
  }

  async UpdateOrderStatus(orderId: string, newStatus: OrderStatus) : Promise<void>{
    const order = await this.orderRepository.findById(orderId);
    if(!order) throw new BadRequestException(`Orden con id ${orderId} no encontrada`);

    order.changeStatus(newStatus);

    await this.orderRepository.updateStatus( orderId, order.getStatus());

  }






  private toCreateOrderDto(request: CreateOrderRequestDto): CreateOrderDto {
  const itemsDto = request.items.map(item =>
      new ItemsDtoService(
        new ProductOfItemDtoService(
          item.product.productId,
          item.product.name,
          item.product.price,
        ),
        item.quantity,
      )
  );

  const summaryDto = new SummaryDtoService(
    request.summary.subtotal,
    request.summary.shippingCost,
    request.summary.taxes,
    request.summary.discount,
    request.summary.total,
  );

  const paymentDto = new PaymentDtoService(
    request.payment.method,
    request.payment.status,
    request.payment.transactionId,
  );

  return new CreateOrderDto(
    request.customerId,
    request.vendorId,
    request.driverId,
    new PickupLocationDtoService(request.pickupLocation.latitude, request.pickupLocation.longitude),
    new DeliveryLocationDtoService(request.deliveryLocation.latitude, request.deliveryLocation.longitude),
    itemsDto,
    summaryDto,
    paymentDto,
    request.trackingNumber,
    request.notes,
  );
}



  // CreateOrderDto → OrderEntit
    private toOrderEntity(dto: CreateOrderDto, 
      items: Items[]
    ): OrderEntity {
    return new OrderEntity(
      undefined,
      new Types.ObjectId(dto.getCustomerId()),
      new Types.ObjectId(dto.getVendorId()),
      new Types.ObjectId(dto.getDriverId()),
      OrderStatus.Pending,
      new PickUpLocation(dto.getPickupLocation().getLatitude(), dto.getPickupLocation().getLongitude()),
      new DeliveryLocation(dto.getDeliveryLocation().getLatitude(), dto.getDeliveryLocation().getLongitude()),
      items,
      new Summary(
        dto.getSummary().getSubtotal(),
        dto.getSummary().getShippingCost(),
        dto.getSummary().getTaxes(),
        dto.getSummary().getDiscount(),
        dto.getSummary().getTotal()
      ),
      new Payment(dto.getPayment().getMethod(), dto.getPayment().getStatus(), dto.getPayment().getTransactionId()),
      dto.getTrackingNumber(),
      dto.getNotes(),
      new Date()
    );
  } 

  private async loadAndValidateItems(dtoItems: ItemsDtoService[]): Promise<Items[]> {
    const invalidProducts: string[] = [];


    const items = await Promise.all(
    dtoItems.map(async (itemDto) => {
      const product = await this.productAdapter.getProductById(itemDto.getProduct().getId());

      if (!product) {
        invalidProducts.push(itemDto.getProduct().getId());
        return null;
      }

      if (itemDto.getQuantity() <= 0) {
        throw new BadRequestException({
          message: `Cantidad inválida para el producto ${product.getName()}`,
          productId: itemDto.getProduct().getId()
        });
      }

      return new Items(product, itemDto.getQuantity());
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

  private async loadAndValidateUsers(customerId: string,vendorId: string,driverId: string): Promise<void> {
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
     };

     async getOrderSummary(orderId: string): Promise<SummaryDto> {
    const orderEntity = await this.orderRepository.findById(orderId);
    if (!orderEntity) throw new BadRequestException(`Orden con id ${orderId} no encontrada`);
    return SummaryDto.fromEntity(orderEntity.getSummary());
  }
  
  async confirmOrder(orderId: string): Promise<GetOrderResponseDto> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new BadRequestException(`Orden con id ${orderId} no encontrada`);

    if (order.getStatus() !== OrderStatus.Pending) {
      throw new BadRequestException(`Solo se puede confirmar una orden en estado 'pending'. Estado actual: '${order.getStatus()}'`);
    }

    await this.UpdateOrderStatus(orderId, OrderStatus.Accepted);

    const updated = await this.orderRepository.findById(orderId);
    return GetOrderResponseDto.fromEntity(updated!);
  }
}







