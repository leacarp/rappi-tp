import { Summary } from "../../../domain/entities/summary.entity";
export class SummaryDto{
    constructor(
        private readonly _subtotal : number, 
        private readonly _shippingCost : number, 
        private readonly _taxes : number, 
        private readonly _discount : number, 
        private readonly _total : number)
        {}

        getSubtotal() : number{
            return this._subtotal;
        }

        getShippingCost() : number{
            return this._shippingCost;
        }

        getTaxes() : number{
            return this._taxes;
        }

        getDiscount() : number{
            return this._discount;
        }

        getTotal() : number{
            return this._total;
        }

        static fromEntity(summary : Summary) : SummaryDto{
            return new SummaryDto(summary.getSubTotal(), summary.getShippingCost(),
                    summary.getTaxes(), summary.getDiscount(), summary.getTotal())
        }
    
}