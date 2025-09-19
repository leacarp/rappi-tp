import { Product } from '../entities/product.entity';

export interface IProductRepository {
  // CREATE
  create(product: Product): Promise<Product>;

  // READ
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  findByVendorId(vendorId: string): Promise<Product[]>;
  findByCategory(category: string): Promise<Product[]>;

  // UPDATE
  update(id: string, product: Partial<Product>): Promise<Product | null>;

  // DELETE
  delete(id: string): Promise<boolean>;
}
