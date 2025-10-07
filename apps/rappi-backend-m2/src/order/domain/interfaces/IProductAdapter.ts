import { ProductOfItem } from "../entities/product-of-item.entity";

export interface IProductAdapter{
    getProductById(id: string): Promise<ProductOfItem>;
}