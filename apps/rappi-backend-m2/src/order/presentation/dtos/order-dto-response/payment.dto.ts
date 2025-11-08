import { PaymentServiceResponse } from "../../../services/dtos/order-response/payment-service-response.dto";

export class PaymentDto {
  private readonly method: string;
  private readonly status: string;
  private readonly transactionId: string;

  constructor(method: string, status: string, transactionId: string) {
    this.method = method;
    this.status = status;
    this.transactionId = transactionId;
  }

  getMethod(): string {
    return this.method;
  }

  getStatus(): string {
    return this.status;
  }

  getTransactionId(): string {
    return this.transactionId;
  }

  static fromServiceDto(serviceDto: PaymentServiceResponse): PaymentDto {
    return new PaymentDto(serviceDto.getMethod(), serviceDto.getStatus(), serviceDto.getTransactionId());
  }
}