import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from './services/order.service';
import { OrderController } from './presentation/controllers/order.controller';
import { Order, OrderSchema } from './infrastructure/schemas/order.schema';
import { OrderRepository } from './infrastructure/repositories/order.repository';
import { ORDER_REPOSITORY } from './infrastructure/constants/order.constants';
import { ORDER_SERVICE } from './infrastructure/constants/order-service.constants';
import { ProductModule } from '../products/product.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ProductModule,
    UsersModule
  ],
  controllers: [OrderController],
  providers: [
    {
      provide: ORDER_SERVICE,
      useClass: OrderService
    },
    {
      provide: ORDER_REPOSITORY,
      useClass: OrderRepository
    }
  ],
  exports: [ORDER_SERVICE, ORDER_REPOSITORY]
})

export class OrderModule {}