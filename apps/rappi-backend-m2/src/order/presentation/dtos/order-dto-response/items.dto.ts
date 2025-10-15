import { Items } from "../../../domain/entities/items.entity";
import { ProductOfItemDto } from "./productOfItem.dto";

export class ItemsDto{
    constructor(
        private readonly _productOfItem : ProductOfItemDto,
        private readonly _quantity : number,
    ) {}

    getProduct() : ProductOfItemDto{
        return this._productOfItem;
    }

    getQuantity() : number{
        return this._quantity;
    }

    static fromEntity(item : Items) : ItemsDto{
        return new ItemsDto(ProductOfItemDto.fromEntity(item.getProduct()), item.getQuantity())
    }
} 