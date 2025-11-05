import { GetOrderResponseDto } from './get-order-response.dto';

export class ConfirmOrderResponseDto {
  private readonly _order: GetOrderResponseDto;
  private readonly _whatsappLink: string;

  constructor(order: GetOrderResponseDto, whatsappLink: string) {
    this._order = order;
    this._whatsappLink = whatsappLink;
  }

  get order(): GetOrderResponseDto {
    return this._order;
  }

  get whatsappLink(): string {
    return this._whatsappLink;
  }

  static of(order: GetOrderResponseDto, whatsappLink: string): ConfirmOrderResponseDto {
    return new ConfirmOrderResponseDto(order, whatsappLink);
  }
}