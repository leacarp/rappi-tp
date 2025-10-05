import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProductRepository } from '../infrastructure/repositories/product.repository';
import { Product } from '../domain/entities/product.entity';
import { Types } from 'mongoose';
import { CreateProductServiceDto } from './dtos/create-product-service.dto';
import { UpdateProductServiceDto } from './dtos/update-product-service.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly httpService: HttpService
  ) {}

  async createProduct(createProductDto: CreateProductServiceDto): Promise<Product> {
    // Validar que vendorId sea un ObjectId válido
    if (!Types.ObjectId.isValid(createProductDto.vendorId)) {
      throw new BadRequestException('El vendorId debe ser un ObjectId válido');
    }

    // TODO: Aquí deberíamos validar que el vendor existe y tiene role 'vendor'
    // Pero como no queremos tocar otros módulos, dejamos el TODO para futuras mejoras
    
    const product = new Product(
      new Types.ObjectId(),
      new Types.ObjectId(createProductDto.vendorId),
      createProductDto.name,
      createProductDto.description,
      createProductDto.imageURL,
      createProductDto.price,
      createProductDto.category,
      createProductDto.isAvailable,
      createProductDto.promotions
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

  async updateProduct(id: string, updateProductDto: UpdateProductServiceDto): Promise<Product> {
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new NotFoundException('Producto no encontrado');
    }

    // Validaciones de negocio antes de actualizar
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

  async getRestaurantMenu(vendorId: string): Promise<{ restaurant: any; products: Product[] }> {
    // Validar que vendorId sea un ObjectId válido
    if (!Types.ObjectId.isValid(vendorId)) {
      throw new BadRequestException('El vendorId debe ser un ObjectId válido');
    }

    // Obtener los productos del restaurante
    const products = await this.productRepository.findByVendorId(vendorId);

    // Obtener información del restaurante desde el servicio de usuarios
    let restaurant = null;
    try {
      const response = await firstValueFrom(
        this.httpService.get(`http://localhost:3000/users/${vendorId}`)
      );
      restaurant = response.data;
    } catch (error) {
      // Si no se puede obtener la información del restaurante, crear una básica
      restaurant = {
        id: vendorId,
        name: 'Restaurante',
        description: 'Información no disponible',
        rating: 0,
        isAvailable: true,
        schedule: 'No especificado'
      };
    }

    return { restaurant, products };
  }
}
