import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Product, ProductSchema } from './infrastructure/schemas/product.schema';
import { ProductRepository } from './infrastructure/repositories/product.repository';
import { ProductService } from './services/product.service';
import { ProductController } from './presentation/controllers/product.controller';
import { ProductAdapter } from './infrastructure/adapters/product.adapter';
import { PRODUCT_REPOSITORY } from './infrastructure/constants/product-repository.constants';
import { PRODUCT_ADAPTER } from './infrastructure/constants/product-adapter.constants';
import { PRODUCT_SERVICE } from './infrastructure/constants/product-service.constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
  ],
  controllers: [ProductController],
  providers: [
    {
      provide: PRODUCT_SERVICE,
      useClass: ProductService
    },
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepository
    },
    {
      provide: PRODUCT_ADAPTER,
      useClass: ProductAdapter
    }
  ],
  exports: [PRODUCT_SERVICE, PRODUCT_ADAPTER],
})
export class ProductModule {}
