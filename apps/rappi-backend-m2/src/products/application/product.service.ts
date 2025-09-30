import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IProductRepository } from '../domain/interfaces/IProductRepository';
import { PRODUCT_REPOSITORY_TOKEN } from '../domain/tokens/product-repository.token';
import { Product } from '../domain/entities/product.entity';
import { Types } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productRepository: IProductRepository
  ) {}

  async createProduct(
    vendorId: string,
    name: string,
    description: string,
    imageURL: string,
    price: number,
    category: string,
    isAvailable: boolean = true,
    promotions: { isOnPromotion: boolean; discountedPrice: number } = { isOnPromotion: false, discountedPrice: 0 }
  ): Promise<Product> {
    const product = new Product(
      new Types.ObjectId(),
      new Types.ObjectId(vendorId),
      name,
      description,
      imageURL,
      price,
      category,
      isAvailable,
      promotions
    );

    return await this.productRepository.create(product);
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async getProductsByVendor(vendorId: string): Promise<Product[]> {
    return await this.productRepository.findByVendorId(vendorId);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await this.productRepository.findByCategory(category);
  }

  async updateProduct(id: string, updateData: Partial<Omit<Product, 'id' | 'vendorId'>>): Promise<Product> {
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new NotFoundException('Producto no encontrado');
    }

    // Validaciones de negocio antes de actualizar
    if (updateData.price !== undefined && updateData.price <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }

    if (updateData.name !== undefined && (!updateData.name || updateData.name.trim().length === 0)) {
      throw new Error('El nombre no puede estar vacío');
    }

    const result = await this.productRepository.update(id, updateData);
    if (!result) {
      throw new NotFoundException('Producto no encontrado');
    }
    return result;
  }

  async deleteProduct(id: string): Promise<void> {
    const deleted = await this.productRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Producto no encontrado');
    }
  }

  async applyPromotionToProduct(id: string, discountedPrice: number): Promise<Product> {
    const product = await this.getProductById(id);
    
    // Validamos la promoción usando la lógica del dominio
    product.applyPromotion(discountedPrice);
    
    const result = await this.productRepository.update(id, { 
      promotions: product.promotions 
    });
    if (!result) {
      throw new NotFoundException('Producto no encontrado');
    }
    return result;
  }

  async removePromotionFromProduct(id: string): Promise<Product> {
    const product = await this.getProductById(id);
    product.removePromotion();
    
    const result = await this.productRepository.update(id, { 
      promotions: product.promotions 
    });
    if (!result) {
      throw new NotFoundException('Producto no encontrado');
    }
    return result;
  }
}
