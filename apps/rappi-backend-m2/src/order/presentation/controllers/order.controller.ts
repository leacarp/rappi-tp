import { Controller, Post, Body, Get, Param, Query, Put, Inject, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { IOrderService } from '../../domain/interfaces/IOrderService';
import { ORDER_SERVICE } from '../../infrastructure/constants/order-service.constants';
import { CreateOrderRequestDto } from '../dtos/create-order-request.dto';
import { GetOrderResponseDto } from '../dtos/get-order-response.dto';
import { GetUserOrdersResponseDto } from '../dtos/get-orders-response.dto';
import { UpdateOrderStatusRequestDto } from '../dtos/update-status.dto';
import { SummaryDto } from '../dtos/order-dto-response/summary.dto';
import { ConfirmOrderResponseDto } from '../dtos/confirm-order-response.dto';
import { AcceptOrderDto } from '../dtos/confirm-driver.dto';

@ApiTags('orders')
@ApiBearerAuth('JWT-auth')
@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(
    @Inject(ORDER_SERVICE)
    private readonly orderService: IOrderService
  ) {}

  @Post()
  async createOrder(@Body() createOrderRequestDto: CreateOrderRequestDto): Promise<ConfirmOrderResponseDto> {
    const createOrderDto = createOrderRequestDto.toServiceDto();

    const newOrderServiceDto = await this.orderService.createOrder(createOrderDto);
    const newOrder = GetOrderResponseDto.fromServiceDto(newOrderServiceDto);

    const { url } = await this.orderService.getWhatsAppLink(newOrder.getId());

    return ConfirmOrderResponseDto.of(newOrder, url);
  }

  @Get('user/:userId')
  async getOrdersByUser(@Param('userId') userId: string, @Query('role') role: 'customer' | 'vendor' | 'driver', @Query('status') status?: string): Promise<GetUserOrdersResponseDto> {
    const serviceDto = await this.orderService.getOrdersByUserRole(userId, role, status);
    return GetUserOrdersResponseDto.fromServiceDto(serviceDto);
  }

  @Get('driver/:driverId/completed')
  async getDriverCompletedOrders(@Param('driverId') driverId: string): Promise<GetUserOrdersResponseDto> {
    const serviceDto = await this.orderService.getDriverCompletedOrders(driverId);
    return GetUserOrdersResponseDto.fromServiceDto(serviceDto);
  }

  @Get(':id/summary')
  async getOrderSummary(@Param('id') id: string): Promise<SummaryDto> {
    const serviceDto = await this.orderService.getOrderSummary(id);
    return SummaryDto.fromServiceDto(serviceDto);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<GetOrderResponseDto> {
    const serviceDto = await this.orderService.getOrderById(id);
    return GetOrderResponseDto.fromServiceDto(serviceDto);
  }

  @Get()
  async getAllOrders(@Query('status') status?: string): Promise<GetUserOrdersResponseDto> {
    const serviceDto = await this.orderService.getOrdersByStatus(status);
    return GetUserOrdersResponseDto.fromServiceDto(serviceDto);
  }

  @Put(':id/status')
  async updateOrderStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusRequestDto): Promise<{ message: string }> {
    await this.orderService.UpdateOrderStatus(id, dto.status);
    return { message: 'Estado actualizado correctamente' };
  }

  @Put(':id/confirm')
  async confirmOrder(@Param('id') id: string): Promise<ConfirmOrderResponseDto> {
    const orderServiceDto = await this.orderService.confirmOrder(id);
    const order = GetOrderResponseDto.fromServiceDto(orderServiceDto);
    return ConfirmOrderResponseDto.of(order, '');
  }

  @Put(':id/accept-driver')
  async acceptOrderByDriver(@Param('id') orderId: string, @Body() dto: AcceptOrderDto): Promise<{ message: string }> {
    await this.orderService.acceptOrderByDriver(orderId, dto.driverId);
    return { message: 'Driver asignado correctamente' };
  }
}