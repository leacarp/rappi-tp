import { EarningsDetail } from './earnings-detail.entity';

export class Earnings {
  private _total: number;
  private _details: EarningsDetail[];

  constructor(total: number, details: EarningsDetail[]) {
    this._total = total;
    this._details = details;
  }

  getTotal(): number {
    return this._total;
  }

  getDetails(): EarningsDetail[] {
    return this._details;
  }
}