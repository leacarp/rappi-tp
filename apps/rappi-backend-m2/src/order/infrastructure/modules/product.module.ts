import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../../../products/infrastructure/schemas/product.schema';
import { ProductRepository } from '../../../products/infrastructure/repositories/product.repository';
import { ProductAdapter } from '../adapters/product.adapter';
import { PRODUCT_REPOSITORY } from '../constants/product-repository.constants';
import { PRODUCT_ADAPTER } from '../constants/product-adapter.constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
  ],
  providers: [
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepository
    },
    {
      provide: PRODUCT_ADAPTER,
      useClass: ProductAdapter
    }
  ],
  exports: [PRODUCT_REPOSITORY, PRODUCT_ADAPTER]
})
export class ProductModule {}
