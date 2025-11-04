import { Controller, Post, Body, Get, Param, Query, Put, Inject } from '@nestjs/common';
import { IOrderService } from '../../domain/interfaces/IOrderService';
import { ORDER_SERVICE } from '../../infrastructure/constants/order-service.constants';
import { CreateOrderRequestDto } from '../dtos/create-order-request.dto';
import { GetOrderResponseDto } from '../dtos/get-order-response.dto';
import { GetUserOrdersResponseDto } from '../dtos/get-orders-response.dto';
import { UpdateOrderStatusRequestDto } from '../dtos/update-status.dto';
import { SummaryDto } from '../dtos/order-dto-response/summary.dto';
import { ConfirmOrderResponseDto } from '../dtos/confirm-order-response.dto';
import { AcceptOrderDto } from '../dtos/confirm-driver.dto';

@Controller('orders')
export class OrderController {
  constructor(
    @Inject(ORDER_SERVICE)
    private readonly orderService: IOrderService
  ) {}

  @Post()
  async createOrder(@Body() createOrderRequestDto: CreateOrderRequestDto): Promise<ConfirmOrderResponseDto> {
    const createOrderDto = createOrderRequestDto.toServiceDto();

    const newOrder = await this.orderService.createOrder(createOrderDto);

    const { url } = await this.orderService.getWhatsAppLink(newOrder.getId());
    
    return ConfirmOrderResponseDto.of(newOrder, url);
  }

  @Get('user/:userId')
  async getOrdersByUser(@Param('userId') userId: string, @Query('role') role: 'customer' | 'vendor' | 'driver', @Query('status') status?: string): Promise<GetUserOrdersResponseDto> {
    return this.orderService.getOrdersByUserRole(userId, role, status);
  }

  
  @Get('driver/:driverId/completed')
  async getDriverCompletedOrders(@Param('driverId') driverId: string): Promise<GetUserOrdersResponseDto> {
    return this.orderService.getDriverCompletedOrders(driverId);
  }
  
  @Get(':id/summary')
  async getOrderSummary(@Param('id') id: string): Promise<SummaryDto> { 
    return this.orderService.getOrderSummary(id);
  }
  
  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<GetOrderResponseDto> {
    return this.orderService.getOrderById(id);
  }
  
  @Get()
  async getAllOrders(@Query('status') status?: string): Promise<GetUserOrdersResponseDto> {
    return this.orderService.getOrdersByStatus(status);
  }
  @Put(':id/status')
  async updateOrderStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusRequestDto): Promise<{ message: string }> {
    await this.orderService.UpdateOrderStatus(id, dto.status);
    return { message: 'Estado actualizado correctamente' };
  }

  @Put(':id/confirm')
  async confirmOrder(@Param('id') id: string): Promise<ConfirmOrderResponseDto> {
    const order = await this.orderService.confirmOrder(id);
    return ConfirmOrderResponseDto.of(order, '');
  }

  @Put(':id/accept-driver')
  async acceptOrderByDriver(@Param('id') orderId: string, @Body() dto: AcceptOrderDto): Promise<{message: string}> {
    await this.orderService.acceptOrderByDriver(orderId, dto.driverId);
    return {message: 'Driver asignado correctamente'};
  }
}