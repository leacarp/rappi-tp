import { Items } from "../../../domain/entities/items.entity";
import { ProductOfItemDtoService } from "./productOfItem.dto";

export class ItemsDtoService{
    constructor(
        private readonly _productOfItem : ProductOfItemDtoService,
        private readonly _quantity : number,
    ) {}

    getProduct() : ProductOfItemDtoService{
        return this._productOfItem;
    }

    getQuantity() : number{
        return this._quantity;
    }

    static fromEntity(item : Items) : ItemsDtoService{
        return new ItemsDtoService(ProductOfItemDtoService.fromEntity(item.getProduct()), item.getQuantity())
    }
} 