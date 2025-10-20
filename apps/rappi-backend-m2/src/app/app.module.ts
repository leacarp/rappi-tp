import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { ProductModule } from '../products/product.module';
import { OrderModule } from '../order/orders.module';
import { AuthModule } from '../auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { CartModule } from '../cart/cart.module'; // REMOVED: no existe módulo de carrito

@Module({
  imports: [DatabaseModule, UsersModule, ProductModule, OrderModule, AuthModule], // REMOVED CartModule
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
