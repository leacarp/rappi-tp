import { Controller, Post, Body, Get, Param, Query, Put } from '@nestjs/common';
import { OrderService } from '../../services/order.service';
import { CreateOrderRequestDto } from '../dtos/create-order-request.dto';
import { GetOrderResponseDto } from '../dtos/get-order-response.dto';
import { GetUserOrdersResponseDto } from '../dtos/get-orders-response.dto';
import { UpdateOrderStatusRequestDto } from '../dtos/update-status.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderRequestDto: CreateOrderRequestDto): Promise<GetOrderResponseDto> {
    return this.orderService.createOrder(createOrderRequestDto);
  }

  @Get('user/:userId')
  async getOrdersByUser(@Param('userId') userId: string, @Query('role') role: 'customer' | 'vendor' | 'driver'): Promise<GetUserOrdersResponseDto> {
    return this.orderService.getOrdersByUser(userId, role);
  }
  
  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<GetOrderResponseDto> {
    return this.orderService.getOrderById(id);
  }

  @Put(':id/status')
  async updateOrderStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusRequestDto): Promise<{ message: string }> {
    await this.orderService.UpdateOrderStatus(id, dto.status);
    return { message: 'Estado actualizado correctamente' };
  }

   
}