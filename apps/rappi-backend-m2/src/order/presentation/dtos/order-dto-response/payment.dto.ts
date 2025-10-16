import { Payment } from "../../../domain/entities/payment.entity";

export class PaymentDto{
    constructor(private readonly _method : string, private readonly _status: string, private readonly _transactionId : string){}
    

    getMethod() : string{
        return this._method;
    }

    getStatus() : string{
        return this._status;
    }

    getTransactionId() : string{
        return this._transactionId;
    }

    static fromEntity(payment : Payment) : PaymentDto{
        return new PaymentDto(payment.getMethod(), payment.getStatus(), payment.getTransactionId())
    }
}