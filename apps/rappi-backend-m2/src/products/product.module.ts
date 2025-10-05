import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

// Schema
import { Product, ProductSchema } from './infrastructure/schemas/product.schema';

// Repository 
import { ProductRepository } from './infrastructure/repositories/product.repository';

// Service
import { ProductService } from './application/product.service';

// Controller
import { ProductController } from './presentation/controllers/product.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    HttpModule
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
  ],
  exports: [ProductService],
})
export class ProductModule {}
