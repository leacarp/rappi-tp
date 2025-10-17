import { Controller, Post, Put, Get, Param, Body, UsePipes, ValidationPipe, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { CreateReviewRequest } from '../dtos/create-review-request';
import { GetReviewsResponse } from '../dtos/get-reviews-response';
import { SearchRestaurantsResponse } from '../dtos/search-restaurants-response';
import { GetVendorProfileResponse } from '../dtos/get-vendor-profile-response'
import { UpdateVendorProfileRequest } from '../dtos/update-vendor-profile-request'

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

  @Put(':vendorId/profile')
  async updateProfile(@Param('vendorId') vendorId: string, @Body() body: UpdateVendorProfileRequest): Promise<void> {
    const dto = body.toServiceDto();
    await this.userService.updateVendorProfile(vendorId, dto);
  }

  @Get(':vendorId/profile')
  async getProfile(@Param('vendorId') vendorId: string): Promise<GetVendorProfileResponse> {
    const serviceResp = await this.userService.getVendorProfile(vendorId);
    return GetVendorProfileResponse.fromServiceDto(serviceResp);
  }

  @Get(':vendorId/reviews')
  async getReviews(@Param('vendorId') vendorId: string): Promise<GetReviewsResponse> {
    const serviceResp = await this.userService.getVendorReviews(vendorId);
    return GetReviewsResponse.fromServiceDto(serviceResp);
  }

  @Get('searchRestaurants')
  async searchRestaurants(@Query('name') restaurantName: string): Promise<SearchRestaurantsResponse> {
    const serviceResponse = await this.userService.searchRestaurantsByName(restaurantName);
    return SearchRestaurantsResponse.fromServiceDto(serviceResponse);
  }
}
