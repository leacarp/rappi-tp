import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from './services/order.service';
import { OrderController } from './presentation/controllers/order.controller';
import { Order, OrderSchema } from './infrastructure/schemas/order.schema';
import { OrderRepository } from './infrastructure/repositories/order.repository';
import { ORDER_REPOSITORY } from './infrastructure/constants/order.constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: ORDER_REPOSITORY,
      useClass: OrderRepository
    }
  ],
  exports: [ORDER_REPOSITORY]
})
export class OrderModule {}
