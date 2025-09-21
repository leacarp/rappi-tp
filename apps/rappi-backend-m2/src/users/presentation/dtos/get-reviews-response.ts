import { GetReviewsResponseService, ReviewItemService } from '../../services/dtos/get-reviews-response-service';

export class ReviewItemResponse {
  constructor(
    public reviewerId: string,
    public score: number,
    public date: Date,
    public comment?: string
  ) {}

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
  constructor(
    public items: ReviewItemResponse[],
    public averageScore: number,
    public total: number
  ) {}

  static fromServiceDto(serviceDto: GetReviewsResponseService): GetReviewsResponse {
    const items = serviceDto.getItems().map(ReviewItemResponse.fromService);
    return new GetReviewsResponse(items, serviceDto.getAverageScore(), serviceDto.getTotal());
  }
}