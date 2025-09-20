export class EarningsBreakdown {
  private _baseFee: number;
  private _tips: number;
  private _bonuses: number;

  constructor(baseFee: number, tips: number, bonuses: number) {
    this._baseFee = baseFee;
    this._tips = tips;
    this._bonuses = bonuses;
  }

  getBaseFee(): number {
    return this._baseFee;
  }

  getTips(): number {
    return this._tips;
  }

  getBonuses(): number {
    return this._bonuses;
  }
}
