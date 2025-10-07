import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from './services/order.service';
import { OrderController } from './presentation/controllers/order.controller';
import { Order, OrderSchema } from './infrastructure/schemas/order.schema';
import { OrderRepository } from './infrastructure/repositories/order.repository';
import { ORDER_REPOSITORY } from './infrastructure/constants/order.constants';
import { PRODUCT_ADAPTER } from './infrastructure/constants/product-adapter.constants';
import { ProductAdapter } from './infrastructure/adapters/product.adapter';

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
    },
    {
      provide: PRODUCT_ADAPTER,
      useClass: ProductAdapter
    }
  ],
  exports: [ORDER_REPOSITORY]
})
export class OrderModule {}
