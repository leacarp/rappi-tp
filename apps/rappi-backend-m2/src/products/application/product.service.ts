import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProductRepository } from '../infrastructure/repositories/product.repository';
import { Product } from '../domain/entities/product.entity';
import { Types } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository
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
    // Validar que vendorId sea un ObjectId válido
    if (!Types.ObjectId.isValid(vendorId)) {
      throw new BadRequestException('El vendorId debe ser un ObjectId válido');
    }

    // TODO: Aquí deberíamos validar que el vendor existe y tiene role 'vendor'
    // Pero como no queremos tocar otros módulos, dejamos el TODO para futuras mejoras
    
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
    // Validar que vendorId sea un ObjectId válido
    if (!Types.ObjectId.isValid(vendorId)) {
      throw new BadRequestException('El vendorId debe ser un ObjectId válido');
    }
    
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
      throw new BadRequestException('El precio debe ser mayor a 0');
    }

    if (updateData.name !== undefined && (!updateData.name || updateData.name.trim().length === 0)) {
      throw new BadRequestException('El nombre no puede estar vacío');
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
