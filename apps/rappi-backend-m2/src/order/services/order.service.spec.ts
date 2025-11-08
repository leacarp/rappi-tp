/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { OrderService } from './order.service';
import { IOrderRepository } from '../domain/interfaces/IOrderRepository';
import { ORDER_REPOSITORY } from '../infrastructure/constants/order.constants';
import { PRODUCT_ADAPTER } from '../../products/infrastructure/constants/product-adapter.constants';
import { USER_ADAPTER } from '../../users/infrastructure/constants/user-adapter.constants';
import { OrderEntity } from '../domain/entities/order.entity';
import { OrderStatus } from '../domain/enum/order-status';
import { PickUpLocation } from '../domain/entities/pickup-location.entity';
import { Summary } from '../domain/entities/summary.entity';
import { Payment } from '../domain/entities/payment.entity';
import { Items } from '../domain/entities/items.entity';
import { ProductOfItem } from '../domain/entities/product-of-item.entity';
import { CustomerBasicEntity } from '../domain/entities/customer-basic';
import { UserBasicEntity } from '../domain/entities/user-basic';
import { Types } from 'mongoose';

describe('OrderService', () => {
  let service: OrderService;
  let orderRepository: jest.Mocked<IOrderRepository>;

  beforeEach(async () => {
    const mockOrderRepository = {
      findById: jest.fn(),
    };

    const mockProductAdapter = {
      getProductById: jest.fn(),
    };

    const mockUserAdapter = {
      existsUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: ORDER_REPOSITORY, useValue: mockOrderRepository },
        { provide: PRODUCT_ADAPTER, useValue: mockProductAdapter },
        { provide: USER_ADAPTER, useValue: mockUserAdapter },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepository = module.get(ORDER_REPOSITORY);
  });

  it('debería retornar una orden existente', async () => {
    const orderId = new Types.ObjectId().toString();
    const customerId = new Types.ObjectId();
    const vendorId = new Types.ObjectId();
    
    const mockCustomer = new CustomerBasicEntity(customerId, 'Juan Pérez', 'juan@test.com', '123456789', 'Calle Test 123');
    const mockVendor = new UserBasicEntity(vendorId, 'Restaurante Test', 'rest@test.com', '987654321');
    const mockProduct = new ProductOfItem(new Types.ObjectId(), 'Pizza Test', 1000);
    const mockItem = new Items(mockProduct, 1);
    
    const mockOrder = new OrderEntity(
      new Types.ObjectId(orderId),
      customerId,
      vendorId,
      null,
      OrderStatus.Pending,
      new PickUpLocation(10.0, 20.0),
      null,
      [mockItem],
      new Summary(1000, 100, 1100, 0, 1100),
      new Payment('EFECTIVO', 'PENDIENTE', undefined),
      'TRACK-12345',
      'Sin extras',
      new Date(),
      mockCustomer,
      mockVendor,
      null
    );

    orderRepository.findById.mockResolvedValue(mockOrder);

    const result = await service.getOrderById(orderId);

    expect(orderRepository.findById).toHaveBeenCalledWith(orderId);
    expect(orderRepository.findById).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result.getTrackingNumber()).toBe('TRACK-12345');
  });

  it('debería lanzar BadRequestException cuando la orden no existe', async () => {
    const orderId = 'ordenInexistente';

    orderRepository.findById.mockResolvedValue(null);

    await expect(service.getOrderById(orderId)).rejects.toThrow(NotFoundException);
    await expect(service.getOrderById(orderId)).rejects.toThrow(`Orden con id ${orderId} no encontrada`);
    expect(orderRepository.findById).toHaveBeenCalledWith(orderId);
  });
});

