export class Payment{
    private _method : string;
    private _status: string;
    private _transactionId: string;

    constructor(method: string, status: string, transactionId: string){
        this._method = method;
        this._status = status;
        this._transactionId = transactionId;
    }

    getMethod(): string{
        return this._method;
    }

    getStatus(): string{
        return this._status;
    }

    getTransactionId(): string{
        return this._transactionId;
    }

}