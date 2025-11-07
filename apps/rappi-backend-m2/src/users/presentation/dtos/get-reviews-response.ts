import { GetReviewsResponseService, ReviewItemService } from '../../services/dtos/get-reviews-response-service';

export class ReviewItemResponse {
  private readonly reviewerId: string;
  private readonly score: number;
  private readonly date: Date;
  private readonly comment?: string;

  constructor(
    reviewerId: string,
    score: number,
    date: Date,
    comment?: string
  ) {
    this.reviewerId = reviewerId;
    this.score = score;
    this.date = date;
    this.comment = comment;
  }

  getReviewerId(): string {
    return this.reviewerId;
  }

  getScore(): number {
    return this.score;
  }

  getDate(): Date {
    return this.date;
  }

  getComment(): string | undefined {
    return this.comment;
  }

  static fromService(item: ReviewItemService): ReviewItemResponse {
    return new ReviewItemResponse(
      item.getReviewerId(),
      item.getScore(),
      item.getDate(),
      item.getComment()
    );
  }
}

export class GetReviewsResponse {
  private readonly items: ReviewItemResponse[];
  private readonly averageScore: number;
  private readonly total: number;

  constructor(items: ReviewItemResponse[], averageScore: number, total: number) {
    this.items = items;
    this.averageScore = averageScore;
    this.total = total;
  }
  
  getItems(): ReviewItemResponse[] {
    return this.items;
  }

  getAverageScore(): number {
    return this.averageScore;
  }

  getTotal(): number {
    return this.total;
  }

  static fromServiceDto(serviceDto: GetReviewsResponseService): GetReviewsResponse {
    const items = serviceDto.getItems().map(ReviewItemResponse.fromService);
    return new GetReviewsResponse(items, serviceDto.getAverageScore(), serviceDto.getTotal());
  }
}