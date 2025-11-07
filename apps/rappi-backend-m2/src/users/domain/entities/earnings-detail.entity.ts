import { EarningsBreakdown } from './earnings-breakdown.entity';

export class EarningsDetail {
  private _deliveryId: string;
  private _amount: number;
  private _breakdown: EarningsBreakdown;

  constructor(
    deliveryId: string,
    amount: number,
    breakdown: EarningsBreakdown
  ) {
    this._deliveryId = deliveryId;
    this._amount = amount;
    this._breakdown = breakdown;
  }

  getDeliveryId(): string {
    return this._deliveryId;
  }

  getAmount(): number {
    return this._amount;
  }

  getBreakdown(): EarningsBreakdown {
    return this._breakdown;
  }
}