import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { CreateAddressRequest } from '../dtos/create-address-request';
import { GetAddressResponse } from '../dtos/get-address-response';
import { GetAddressesResponse } from '../dtos/get-addresses-response';
import { UpdateAddressRequest } from '../dtos/update-address-request';
import { CreateReviewRequest } from '../dtos/create-review-request';
import { GetReviewsResponse } from '../dtos/get-reviews-response';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { AddCartItemRequest } from '../dtos/add-cart-item-request';
import { SetCartItemQuantityRequest } from '../dtos/set-cart-item-quantity-request';
import { GetCartResponse } from '../dtos/get-cart-response';
import { UpdateDriverAvailabilityRequest } from '../dtos/update-driver-availability-request';

@Controller('users')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId/addresses')
  async getAddresses(@Param('userId') userId: string): Promise<GetAddressesResponse> {
    const userAddressesData = await this.userService.getAddresses(userId);
    return GetAddressesResponse.fromServiceDto(userAddressesData);
  }

  @Get(':userId/addresses/:addressId')
  async getAddress(@Param('userId') userId: string, @Param('addressId') addressId: string): Promise<GetAddressResponse> {
    const address = await this.userService.getAddress(userId, addressId);

    return GetAddressResponse.fromServiceDto(address);
  }

  @Post(':userId/addresses')
  @HttpCode(HttpStatus.CREATED)
  async addAddress(@Param('userId') userId: string, @Body() body: CreateAddressRequest): Promise<void> {
    const requestService = body.toServiceDto();

    await this.userService.addAddress(userId, requestService);
  }

  @Put(':userId/addresses/:addressId')
  async updateAddress(@Param('userId') userId: string, @Param('addressId') addressId: string, @Body() body: UpdateAddressRequest): Promise<void> {
    const requestService = body.toServiceDto(addressId);

    await this.userService.updateAddress(userId, requestService);
  }

  @Delete(':userId/addresses/:addressId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAddress(@Param('userId') userId: string, @Param('addressId') addressId: string) {
    await this.userService.deleteAddress(userId, addressId);
  }

  @Post(':userId/reviews')
  @HttpCode(HttpStatus.CREATED)
  async addReview(
    @Param('userId') userId: string,
    @Body() body: CreateReviewRequest
  ): Promise<void> {
    const serviceDto = body.toServiceDto();
    await this.userService.addReview(userId, serviceDto);
  }

  @Get(':userId/reviews')
  async getReviews(
    @Param('userId') userId: string
  ): Promise<GetReviewsResponse> {
    const serviceResponse = await this.userService.getReviews(userId);
    return GetReviewsResponse.fromServiceDto(serviceResponse);
  }

  
  @Get(':userId/cart')
  async getCart(@Param('userId') userId: string): Promise<GetCartResponse> {
    const serviceDto = await this.userService.getCart(userId);
    return GetCartResponse.fromServiceDto(serviceDto);
  }

  
  @Post(':userId/cart/items')
  @HttpCode(HttpStatus.CREATED)
  async addCartItem(
    @Param('userId') userId: string,
    @Body() body: AddCartItemRequest
  ): Promise<void> {
    const serviceDto = body.toServiceDto();
    await this.userService.addCartItem(userId, serviceDto);
  }

  
  @Put(':userId/cart/items/:productId')
  async setCartItemQuantity(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body() body: SetCartItemQuantityRequest
  ): Promise<void> {
    const serviceDto = body.toServiceDto(productId);
    await this.userService.setCartItemQuantity(userId, serviceDto);
  }

  @Put(':userId/driver/availability')
  async updateDriverAvailability(
    @Param('userId') userId: string,
    @Body() body: UpdateDriverAvailabilityRequest
  ): Promise<void> {
    await this.userService.updateDriverAvailability(userId, body.isAvailable);
  }
}
