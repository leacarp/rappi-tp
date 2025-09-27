export class Items{
    private _productId: string;
    private _name: string;
    private _quantity: number;
    private _price: number;


    constructor(productId: string, name: string, quantity: number, price: number){
        this._productId = productId;
        this._name = name;
        this._quantity = quantity;
        this._price = price;
    }

    getProductId(): string{
        return this._productId;
    }   

    getName(): string {
        return this._name;
    }

    getQuantity(): number{
        return this._quantity;
    }

    getPrice(): number{
        return this._price;
    }

}