import { GetOrderResponseDto } from './get-order-response.dto';

export class ConfirmOrderResponseDto {
  private readonly order: GetOrderResponseDto;
  private readonly whatsappLink: string;

  constructor(order: GetOrderResponseDto, whatsappLink: string) {
    this.order = order;
    this.whatsappLink = whatsappLink;
  }

  getOrder(): GetOrderResponseDto {
    return this.order;
  }

  getWhatsappLink(): string {
    return this.whatsappLink;
  }

  static of(order: GetOrderResponseDto, whatsappLink: string): ConfirmOrderResponseDto {
    return new ConfirmOrderResponseDto(order, whatsappLink);
  }
}