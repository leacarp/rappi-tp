import { IsMongoId, IsInt, Min, Max, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { CreateReviewRequestService } from '../../services/dtos/create-review-request-service';

export class CreateReviewRequest {
  @ApiProperty({ type: String })
  @IsMongoId()
  reviewerId!: string;

  @ApiProperty({ type: Number })
  @IsInt()
  @Min(1)
  @Max(5)
  score!: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  comment?: string;

  toServiceDto(): CreateReviewRequestService {
    return new CreateReviewRequestService(this.reviewerId, this.score, this.comment);
  }
}