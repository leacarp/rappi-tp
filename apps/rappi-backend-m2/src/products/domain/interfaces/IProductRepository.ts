import { Product } from '../entities/product.entity';

export interface IProductRepository {
  create(product: Product): Promise<Product>;

  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  findByVendorId(vendorId: string): Promise<Product[]>;
  findByCategory(category: string): Promise<Product[]>;

  update(id: string, product: Partial<Product>): Promise<Product | null>;

  delete(id: string): Promise<boolean>;
}
