export class RatingReview {
  private _reviewerId: string;
  private _score: number;
  private _comment?: string;
  private _date: Date;

  constructor(reviewerId: string, score: number, date: Date, comment?: string) {
    this._reviewerId = reviewerId;
    this._score = score;
    this._comment = comment;
    this._date = date;
  }

  getReviewerId(): string {
    return this._reviewerId;
  }

  getScore(): number {
    return this._score;
  }

  getComment(): string | undefined {
    return this._comment;
  }

  getDate(): Date {
    return this._date;
  }
}