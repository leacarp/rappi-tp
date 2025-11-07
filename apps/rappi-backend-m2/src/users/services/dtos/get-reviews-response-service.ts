import { RatingReview } from '../../domain/entities/rating-review.entity';

export class ReviewItemService {
  private readonly _reviewerId: string;
  private readonly _score: number;
  private readonly _date: Date;
  private readonly _comment?: string;

  constructor(
    reviewerId: string,
    score: number,
    date: Date,
    comment?: string
  ) {
    this._reviewerId = reviewerId;
    this._score = score;
    this._date = date;
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

  getDate(): Date {
    return this._date;
  }

  static fromEntity(entity: RatingReview): ReviewItemService {
    return new ReviewItemService(
      entity.getReviewerId(),
      entity.getScore(),
      entity.getDate(),
      entity.getComment()
    );
  }
}

export class GetReviewsResponseService {
  private readonly _items: ReviewItemService[];
  private readonly _averageScore: number;
  private readonly _total: number;
  
  constructor(
    items: ReviewItemService[],
    averageScore: number,
    total: number
  ) {
    this._items = items;
    this._averageScore = averageScore;
    this._total = total;
  }

  getItems(): ReviewItemService[] {
    return this._items;
  }

  getAverageScore(): number {
    return this._averageScore;
  }

  getTotal(): number {
    return this._total;
  }

  static fromEntities(entities: RatingReview[]): GetReviewsResponseService {
    const items = entities.map(ReviewItemService.fromEntity);
    const total = items.length;
    const averageScore = total > 0 ? entities.reduce((acc, r) => acc + r.getScore(), 0) / total : 0;
    return new GetReviewsResponseService(items, Number(averageScore.toFixed(2)), total);
  }
}