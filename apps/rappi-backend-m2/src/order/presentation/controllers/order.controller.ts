import { Controller, Post, Body, Get, Param, Query, Put } from '@nestjs/common';
import { OrderService } from '../../services/order.service';
import { CreateOrderRequestDto } from '../dtos/create-order-request.dto';
import { GetOrderResponseDto } from '../dtos/get-order-response.dto';
import { GetUserOrdersResponseDto } from '../dtos/get-orders-response.dto';
import { UpdateOrderStatusRequestDto } from '../dtos/update-status.dto';
import { SummaryDto } from '../dtos/order-dto-response/summary.dto';
import { OrderStatus } from '../../domain/enum/order-status';
import { ConfirmOrderResponseDto } from '../dtos/confirm-order-response.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderRequestDto: CreateOrderRequestDto): Promise<GetOrderResponseDto> {
    return this.orderService.createOrder(createOrderRequestDto);
  }

  @Get('user/:userId')
  async getOrdersByUser(@Param('userId') userId: string, @Query('role') role: 'customer' | 'vendor' | 'driver', @Query('status') status?: string): Promise<GetUserOrdersResponseDto> {
    return this.orderService.getOrdersByUserRole(userId, role, status);
  }

  @Get('driver/:driverId/completed')
  async getDriverCompletedOrders(@Param('driverId') driverId: string): Promise<GetUserOrdersResponseDto> {
    return this.orderService.getDriverCompletedOrders(driverId);
  }
  
  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<GetOrderResponseDto> {
    return this.orderService.getOrderById(id);
  }

  @Get(':id/summary')
  async getOrderSummary(@Param('id') id: string): Promise<SummaryDto> { 
    return this.orderService.getOrderSummary(id);
  }

  @Put(':id/status')
  async updateOrderStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusRequestDto): Promise<{ message: string }> {
    await this.orderService.UpdateOrderStatus(id, dto.status);
    return { message: 'Estado actualizado correctamente' };
  }

  @Put(':id/confirm')
  async confirmOrder(@Param('id') id: string, @Query('phone') phone?: string): Promise<ConfirmOrderResponseDto> {
    const order = await this.orderService.confirmOrder(id);
    let whatsappLink = '';
    if (phone) {
      const { url } = await this.orderService.getWhatsAppLink(id, phone);
      whatsappLink = url;
    }
    return ConfirmOrderResponseDto.of(order, whatsappLink);
  }
   
}