import { Inject, Injectable } from "@nestjs/common";

import { PRODUCT_REPOSITORY } from "../constants/product-repository.constants";
import { IProductAdapter } from "../../domain/interfaces/IProductAdapter";
import { IProductRepository } from '../../domain/interfaces/IProductRepository';
import { ProductOfItem } from "../../domain/dtos/product-of-item.entity";

@Injectable()
export class ProductAdapter implements IProductAdapter {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository
  ) {}

  async getProductById(id: string): Promise<ProductOfItem | null> {
    const entity = await this.productRepository.findById(id);
    if (!entity) return null;
    
    return ProductOfItem.fromEntity(entity);
  }
}