import { ProductOfItem } from "../dtos/product-of-item.entity";

export interface IProductAdapter {
  getProductById(id: string): Promise<ProductOfItem | null>;
}