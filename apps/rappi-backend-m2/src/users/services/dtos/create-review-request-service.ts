import { RatingReview } from '../../domain/entities/rating-review.entity';

export class CreateReviewRequestService {
  private readonly reviewerId: string;
  private readonly score: number;
  private readonly comment?: string;

  constructor(reviewerId: string, score: number, comment?: string) {
    this.reviewerId = reviewerId;
    this.score = score;
    this.comment = comment;
  }

  getReviewerId(): string {
    return this.reviewerId;
  }

  getScore(): number {
    return this.score;
  }

  getComment(): string | undefined {
    return this.comment;
  }

  toEntity(currentDate: Date = new Date()): RatingReview {
    return new RatingReview(this.reviewerId, this.score, currentDate, this.comment);
  }
}

