import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { ProductModule } from '../products/product.module';
import { OrderModule } from '../order/orders.module';

@Module({
  imports: [DatabaseModule, UsersModule, ProductModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
