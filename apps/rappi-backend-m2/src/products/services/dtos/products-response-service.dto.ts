import { Product } from '../../domain/entities/product.entity';
import { ProductResponseService } from './product-response-service.dto';

export class ProductsResponseService {
  private readonly _products: ProductResponseService[];

  constructor(products: ProductResponseService[]) {
    this._products = products;
  }

  getProducts(): ProductResponseService[] {
    return this._products;
  }

  static fromEntities(products: Product[]): ProductsResponseService {
    const productDtos = products.map(product => ProductResponseService.fromEntity(product));
    return new ProductsResponseService(productDtos);
  }
}