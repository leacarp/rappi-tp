import { Types } from 'mongoose';
import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';

import { Product } from '../domain/entities/product.entity';
import { IProductRepository } from '../domain/interfaces/IProductRepository';
import { IProductService } from '../domain/interfaces/IProductService';
import { CreateProductServiceDto } from './dtos/create-product-service.dto';
import { UpdateProductServiceDto } from './dtos/update-product-service.dto';
import { ProductResponseService } from './dtos/product-response-service.dto';
import { ProductsResponseService } from './dtos/products-response-service.dto';
import { MenuResponseService } from './dtos/menu-response-service.dto';
import { PRODUCT_REPOSITORY } from '../infrastructure/constants/product-repository.constants';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository
  ) {}

  async createProduct(createProductDto: CreateProductServiceDto): Promise<ProductResponseService> {
    if (!Types.ObjectId.isValid(createProductDto.getVendorId())) {
      throw new BadRequestException('El vendorId debe ser un ObjectId válido');
    }

    const product = createProductDto.toEntity();

    const createdProduct = await this.productRepository.create(product);
    return ProductResponseService.fromEntity(createdProduct);
  }

  async getProductById(id: string): Promise<ProductResponseService> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    return ProductResponseService.fromEntity(product);
  }

  async getAllProducts(): Promise<ProductsResponseService> {
    const products = await this.productRepository.findAll();
    return ProductsResponseService.fromEntities(products);
  }

  async getProductsByVendor(vendorId: string): Promise<ProductsResponseService> {
    if (!Types.ObjectId.isValid(vendorId)) {
      throw new BadRequestException('El vendorId debe ser un ObjectId válido');
    }
    
    const products = await this.productRepository.findByVendorId(vendorId);
    return ProductsResponseService.fromEntities(products);
  }

  async getProductsByCategory(category: string): Promise<ProductsResponseService> {
    const products = await this.productRepository.findByCategory(category);
    return ProductsResponseService.fromEntities(products);
  }

  async getVendorMenu(vendorId: string): Promise<MenuResponseService> {
    if (!Types.ObjectId.isValid(vendorId)) {
      throw new BadRequestException('El vendorId debe ser un ObjectId válido');
    }
    
    const products = await this.productRepository.findByVendorId(vendorId);
    return MenuResponseService.fromEntities(products, vendorId);
  }

  async updateProduct(id: string, updateProductDto: UpdateProductServiceDto): Promise<ProductResponseService> {
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new NotFoundException('Producto no encontrado');
    }

    if (updateProductDto.price !== undefined && updateProductDto.price <= 0) {
      throw new BadRequestException('El precio debe ser mayor a 0');
    }

    if (updateProductDto.name !== undefined && (!updateProductDto.name || updateProductDto.name.trim().length === 0)) {
      throw new BadRequestException('El nombre no puede estar vacío');
    }

    const result = await this.productRepository.update(id, updateProductDto.toUpdateData());
    if (!result) {
      throw new NotFoundException('Producto no encontrado');
    }
    return ProductResponseService.fromEntity(result);
  }

  async deleteProduct(id: string): Promise<void> {
    const deleted = await this.productRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Producto no encontrado');
    }
  }

  async applyPromotionToProduct(id: string, discountedPrice: number): Promise<ProductResponseService> {
    const productEntity = await this.productRepository.findById(id);
    if (!productEntity) {
      throw new NotFoundException('Producto no encontrado');
    }
    
    productEntity.applyPromotion(discountedPrice);
    
    const result = await this.productRepository.update(id, { 
      promotions: productEntity.getPromotions() 
    } as Partial<Product>);
    if (!result) {
      throw new NotFoundException('Producto no encontrado');
    }
    return ProductResponseService.fromEntity(result);
  }

  async removePromotionFromProduct(id: string): Promise<ProductResponseService> {
    const productEntity = await this.productRepository.findById(id);
    if (!productEntity) {
      throw new NotFoundException('Producto no encontrado');
    }
    
    productEntity.removePromotion();
    
    const result = await this.productRepository.update(id, { 
      promotions: productEntity.getPromotions() 
    } as Partial<Product>);
    if (!result) {
      throw new NotFoundException('Producto no encontrado');
    }
    return ProductResponseService.fromEntity(result);
  }
}