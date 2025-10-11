import { Types } from "mongoose";
import { ProductOfItem } from "./product-of-item.entity";

export class Items{
    private _product: ProductOfItem;
    private _quantity: number;

    constructor(product: ProductOfItem, quantity: number){
        this._product = product;
        this._quantity = quantity;
    }

    getProductId(): Types.ObjectId{
        return this._product.getId();
    }   

    getName(): string {
        return this._product.getName();
    }

    getQuantity(): number{
        return this._quantity;
    }

    getPrice(): number{
        return this._product.getPrice();
    }

}