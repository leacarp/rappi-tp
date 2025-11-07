import { PaymentServiceResponse } from "../../../services/dtos/order-response/payment-service-response.dto";

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

  static fromServiceDto(serviceDto: PaymentServiceResponse): PaymentDto {
    return new PaymentDto(serviceDto.getMethod(), serviceDto.getStatus(), serviceDto.getTransactionId());
  }
}