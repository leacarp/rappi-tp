import { IsMongoId, IsInt, Min, Max, IsOptional, IsString } from 'class-validator';

import { CreateReviewRequestService } from '../../services/dtos/create-review-request-service';

export class CreateReviewRequest {
  @IsMongoId()
  reviewerId!: string;

  @IsInt()
  @Min(1)
  @Max(5)
  score!: number;

  @IsOptional()
  @IsString()
  comment?: string;

  toServiceDto(): CreateReviewRequestService {
    return new CreateReviewRequestService(this.reviewerId, this.score, this.comment);
  }
}