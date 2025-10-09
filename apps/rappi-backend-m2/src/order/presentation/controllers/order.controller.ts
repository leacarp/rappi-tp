import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderService } from '../../services/order.service';
import { CreateOrderDto } from '../../services/dtos/order/create-order.dto';
import { GetOrderResponseDto } from '../../presentation/dtos/get-order-response';
import { GetUserOrdersResponseDto } from '../../presentation/dtos/get-orders-response';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<GetOrderResponseDto> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<GetOrderResponseDto> {
    return this.orderService.getOrderById(id);
  }

  @Get('user/:userId')
  async getOrdersByUser(@Param('userId') userId: string): Promise<GetUserOrdersResponseDto> {
    return this.orderService.getOrdersByUser(userId);
  }
   
}