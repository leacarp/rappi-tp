import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Schema
import { Product, ProductSchema } from './infrastructure/schemas/product.schema';

// Repository 
import { ProductRepository } from './infrastructure/repositories/product.repository';
import { PRODUCT_REPOSITORY_TOKEN } from './domain/tokens/product-repository.token';

// Service
import { ProductService } from './application/product.service';

// Controller
import { ProductController } from './presentation/controllers/product.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
  ],
  controllers: [ProductController],
  providers: [
    {
      provide: PRODUCT_REPOSITORY_TOKEN,
      useClass: ProductRepository
    },
    ProductService,
  ],
  exports: [ProductService],
})
export class ProductModule {}
