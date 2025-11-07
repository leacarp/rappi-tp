import { RatingReview } from '../../domain/entities/rating-review.entity';

export class CreateReviewRequestService {
  private readonly _reviewerId: string;
  private readonly _score: number;
  private readonly _comment?: string;

  constructor(reviewerId: string, score: number, comment?: string) {
    this._reviewerId = reviewerId;
    this._score = score;
    this._comment = comment;
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

  toEntity(currentDate: Date = new Date()): RatingReview {
    return new RatingReview(this._reviewerId, this._score, currentDate, this._comment);
  }
}

