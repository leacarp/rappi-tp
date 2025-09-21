import { RatingReview } from '../../domain/entities/rating-review.entity';

export class ReviewItemService {
  constructor(
    private readonly reviewerId: string,
    private readonly score: number,
    private readonly date: Date,
    private readonly comment?: string
  ) {}

  getReviewerId(): string {
    return this.reviewerId;
  }

  getScore(): number {
    return this.score;
  }

  getComment(): string | undefined {
    return this.comment;
  }

  getDate(): Date {
    return this.date;
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
  constructor(
    private readonly items: ReviewItemService[],
    private readonly averageScore: number,
    private readonly total: number
  ) {}

  getItems(): ReviewItemService[] {
    return this.items;
  }

  getAverageScore(): number {
    return this.averageScore;
  }

  getTotal(): number {
    return this.total;
  }

  static fromEntities(entities: RatingReview[]): GetReviewsResponseService {
    const items = entities.map(ReviewItemService.fromEntity);
    const total = items.length;
    const averageScore = total > 0 ? entities.reduce((acc, r) => acc + r.getScore(), 0) / total : 0;
    return new GetReviewsResponseService(items, Number(averageScore.toFixed(2)), total);
  }
}

