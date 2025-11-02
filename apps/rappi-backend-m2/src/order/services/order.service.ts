import { Types } from 'mongoose'; 
import { Injectable, Inject, BadRequestException} from '@nestjs/common';
import { IOrderRepository } from '../domain/interfaces/IOrderRepository';
import { ORDER_REPOSITORY } from '../infrastructure/constants/order.constants';
import { PRODUCT_ADAPTER } from '../../products/infrastructure/constants/product-adapter.constants';
import { CreateOrderDto } from './dtos/order/create-order-service.dto';
import { GetOrderResponseDto } from '../presentation/dtos/get-order-response.dto';
import { GetUserOrdersResponseDto } from '../presentation/dtos/get-orders-response.dto';
import { Items } from '../domain/entities/items.entity';
import { ProductOfItem } from '../domain/entities/product-of-item.entity';
import { IProductAdapter } from '../../products/domain/interfaces/IProductAdapter';
import { OrderStatus } from '../domain/enum/order-status';
import { ItemsDtoService } from './dtos/order/items-service.dto';
import { USER_ADAPTER } from '../../users/infrastructure/constants/user-adapter.constants';
import { IUserAdapter } from '../../users/domain/interfaces/IUserAdapter';
import { SummaryDto } from '../presentation/dtos/order-dto-response/summary.dto';
import { OrderFilter } from '../domain/interfaces/IOrderRepository';


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
    const existingOrder = await this.orderRepository.findByTrackingNumber(createOrderDto.getTrackingNumber());
    if(existingOrder) throw new BadRequestException(`El tracking number ${createOrderDto.getTrackingNumber()} ya existe`)
      
    await this.loadAndValidateUsers(createOrderDto.getCustomerId(), createOrderDto.getVendorId());
    
    const items = await this.loadAndValidateItems(createOrderDto.getItems());  

    const orderEntity = CreateOrderDto.toEntity(createOrderDto, items);
    const savedOrder = await this.orderRepository.create(orderEntity);

    return GetOrderResponseDto.fromEntity(savedOrder);
  }

  async getOrderById(orderId: string): Promise<GetOrderResponseDto> {
    const orderEntity = await this.orderRepository.findById(orderId);
    if (!orderEntity) throw new BadRequestException(`Orden con id ${orderId} no encontrada`);

    return GetOrderResponseDto.fromEntity(orderEntity);
  }

  async getOrdersByUserRole(userId: string, role: 'customer' | 'vendor' | 'driver', status?: string): Promise<GetUserOrdersResponseDto> {
    const field = role === 'vendor' ? 'vendorId' : 
    role === 'driver' ? 'driverId' :
    'customerId';

    const filter : OrderFilter = { [field]: new Types.ObjectId(userId) };

    if(status) filter.status = status;

    const orders = await this.orderRepository.findByFilter(filter);

    if(!orders.length)
      return new GetUserOrdersResponseDto([]);

    return GetUserOrdersResponseDto.fromEntities(orders)
  }

  async getOrdersByStatus(status?: string): Promise<GetUserOrdersResponseDto> {
    const filter: OrderFilter = status ? { status } : {};
    const orders = await this.orderRepository.findByFilter(filter);
    if(!orders.length) return new GetUserOrdersResponseDto([]);
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

        const productOfItem = new ProductOfItem(
            product.getId(),
            product.getName(),
            product.getPrice()
          );

        return new Items(productOfItem, itemDto.getQuantity());
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

  private async loadAndValidateUsers(customerId: string, vendorId: string): Promise<void> {
    const [customer, vendor] = await Promise.all([
      this.userAdapter.existsUser(customerId),
      this.userAdapter.existsUser(vendorId),
    ]);
  
    const errors = [];
    if (!customer) errors.push({ role: 'customer', id: customerId });
    if (!vendor) errors.push({ role: 'vendor', id: vendorId });
  
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
    if (!updated) throw new BadRequestException(`Orden con id ${orderId} no encontrada`);
    return GetOrderResponseDto.fromEntity(updated);
  }
  
  async getWhatsAppLink(orderId: string): Promise<{ url: string }> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new BadRequestException(`Orden con id ${orderId} no encontrada`);

    const phone = order.getVendor()?.getPhone() || '';
    const vendorName = order.getVendor()?.getName() ?? 'Desconocido';
    const customerName = order.getCustomer()?.getName() ?? 'Desconocido';

    const itemsText = order.getItems()
      .map(i => `${i.getQuantity()} x ${i.getName()} (${new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(i.getPrice())})`)
      .join(', ');

    const totalFmt = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(order.getSummary().getTotal());
    const tracking = order.getTrackingNumber();
    const orderIdText = order.getId().toString();

    const createdAt = order.getCreatedAt();
    const whenLocal = createdAt.toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' });

    const delivery = order.getDeliveryLocation();
    const deliveryCoords = delivery ? `(${delivery.getLatitude()}, ${delivery.getLongitude()})` : 'No especificada';

    const pay = order.getPayment();
    const methodPretty = (pay?.getMethod() ?? '-').toLowerCase().replace(/^\w/, c => c.toUpperCase());
    const statusPretty = (pay?.getStatus() ?? '-').toLowerCase().replace(/^\w/, c => c.toUpperCase());
    const tx = pay?.getTransactionId();
    const paymentLine = `Pago: ${methodPretty} • Estado: ${statusPretty}${tx ? ` • TX: ${tx}` : ''}`;

    const message =
      `Hola! Quiero confirmar mi pedido.\n` +
      `Pedido: ${orderIdText}\n` +
      `Fecha: ${whenLocal}\n` +
      `Cliente: ${customerName}\n` +
      `Vendor: ${vendorName}\n` +
      `Entrega: ${deliveryCoords}\n` +
      `Items: ${itemsText}\n` +
      `Total: ${totalFmt}\n` +
      `${paymentLine}\n` +
      `Tracking: ${tracking}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    return { url };
  }

  async acceptOrderByDriver(orderId: string, driverId: string): Promise<void> {
      const order = await this.orderRepository.findById(orderId);
      if (!order) throw new BadRequestException(`Orden ${orderId} no encontrada`);
      const driver = await this.userAdapter.existsUser(driverId);
      if(!driver) throw new BadRequestException('El driver asignado no existe');

      // Validar que la orden esté en estado correcto
      if (order.getStatus() !== OrderStatus.ReadyForPickup) {
        throw new BadRequestException(
          `Solo se puede aceptar una orden en estado 'Ready for pickup'. Estado actual: '${order.getStatus()}'`
        );
      }

      // Validar que no tenga driver asignado ya
      if (order.getDriverId()) {
        throw new BadRequestException('Esta orden ya tiene un driver asignado');
      }

      // Asignar driver y cambiar estado
      order.setDriverId(new Types.ObjectId(driverId));
      order.setStatus(OrderStatus.InTransit);

      await this.orderRepository.updateOrderDriver(order);
      
  }


}







