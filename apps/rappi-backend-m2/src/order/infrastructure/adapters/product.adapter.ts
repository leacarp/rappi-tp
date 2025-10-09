import { Inject, Injectable } from "@nestjs/common";
import { PRODUCT_REPOSITORY } from '@rappi/order/infrastructure/constants/product-repository.constants'
import { IProductAdapter } from "@rappi/order/domain/interfaces/IProductAdapter";
import { ProductOfItem } from "@rappi/order/domain/entities/product-of-item.entity";
import { IProductRepository } from '@rappi/products/domain/interfaces/IProductRepository';
import { Product } from "@rappi/products/domain/entities/product.entity";

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