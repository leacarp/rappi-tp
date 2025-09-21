import { Controller, Post, Get, Param, Body, UsePipes, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { CreateReviewRequest } from '../dtos/create-review-request';
import { GetReviewsResponse } from '../dtos/get-reviews-response';

@Controller('vendors')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class VendorsController {
  constructor(private readonly userService: UserService) {}

  @Post(':vendorId/reviews')
  @HttpCode(HttpStatus.CREATED)
  async addReview(
    @Param('vendorId') vendorId: string,
    @Body() body: CreateReviewRequest
  ): Promise<void> {
    const dto = body.toServiceDto();
    await this.userService.addVendorReview(vendorId, dto);
  }

  @Get(':vendorId/reviews')
  async getReviews(@Param('vendorId') vendorId: string): Promise<GetReviewsResponse> {
    const serviceResp = await this.userService.getVendorReviews(vendorId);
    return GetReviewsResponse.fromServiceDto(serviceResp);
  }
}
