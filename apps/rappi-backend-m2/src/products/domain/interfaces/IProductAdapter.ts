import { ProductOfItem } from "../../../order/domain/entities/product-of-item.entity";

export interface IProductAdapter{
    getProductById(id: string): Promise<ProductOfItem | null>;
}