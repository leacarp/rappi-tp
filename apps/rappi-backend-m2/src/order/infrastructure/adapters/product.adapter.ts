import { Inject, Injectable } from "@nestjs/common";
import { PRODUCT_REPOSITORY } from "../constants/product-repository.constants";
import { IProductAdapter } from "../../domain/interfaces/IProductAdapter";
import { ProductOfItem } from "../../domain/entities/product-of-item.entity";
import { IProductRepository } from '../../../products/domain/interfaces/IProductRepository';
import { Product } from "../../../products/domain/entities/product.entity";

@Injectable()
export class ProductAdapter implements IProductAdapter {
    constructor(
        @Inject(PRODUCT_REPOSITORY)
        private readonly productRepository: IProductRepository
    ) { }

    async getProductById(id: string): Promise<ProductOfItem | null> {
        const entity = await this.productRepository.findById(id);
        if(!entity) return null;
        return fromEntity(entity);
    }
}



    function fromEntity(entity: Product): ProductOfItem {
        return new ProductOfItem(entity.id, entity.name, entity.price);
    }