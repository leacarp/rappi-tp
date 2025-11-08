/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { IProductRepository } from '../domain/interfaces/IProductRepository';
import { PRODUCT_REPOSITORY } from '../infrastructure/constants/product-repository.constants';
import { Product } from '../domain/entities/product.entity';
import { Types } from 'mongoose';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: jest.Mocked<IProductRepository>;

  beforeEach(async () => {
    const mockProductRepository = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: PRODUCT_REPOSITORY, useValue: mockProductRepository },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get(PRODUCT_REPOSITORY);
  });

  it('debería retornar un producto existente', async () => {
    const productId = new Types.ObjectId().toString();
    const mockProduct = new Product(
      new Types.ObjectId(productId),
      new Types.ObjectId(),
      'Pizza Margarita',
      'Deliciosa pizza con mozzarella',
      'https://example.com/pizza.jpg',
      1500,
      'Pizza',
      true,
      { isOnPromotion: false, discountedPrice: 0 }
    );

    productRepository.findById.mockResolvedValue(mockProduct);

    const result = await service.getProductById(productId);

    expect(productRepository.findById).toHaveBeenCalledWith(productId);
    expect(productRepository.findById).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result.getName()).toBe('Pizza Margarita');
    expect(result.getPrice()).toBe(1500);
  });

  it('debería lanzar NotFoundException cuando el producto no existe', async () => {
    const productId = new Types.ObjectId().toString();

    productRepository.findById.mockResolvedValue(null);

    await expect(service.getProductById(productId)).rejects.toThrow(NotFoundException);
    await expect(service.getProductById(productId)).rejects.toThrow('Producto no encontrado');
    expect(productRepository.findById).toHaveBeenCalledWith(productId);
  });
});

