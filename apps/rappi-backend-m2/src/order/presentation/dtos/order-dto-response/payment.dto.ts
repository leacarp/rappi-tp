import { Payment } from "../../../domain/entities/payment.entity";

export class PaymentDto {
  private readonly _method: string;
  private readonly _status: string;
  private readonly _transactionId: string;

  constructor(method: string, status: string, transactionId: string) {
    this._method = method;
    this._status = status;
    this._transactionId = transactionId;
  }

  getMethod(): string {
    return this._method;
  }

  getStatus(): string {
    return this._status;
  }

  getTransactionId(): string {
    return this._transactionId;
  }

  static fromEntity(payment: Payment): PaymentDto {
    return new PaymentDto(payment.getMethod(), payment.getStatus(), payment.getTransactionId());
  }
}