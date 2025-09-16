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
} from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { CreateAddressRequestService } from '../../services/dtos/create-address-request-service';
import { CreateAddressRequest } from '../dtos/create-address-request';
import { GetAddressResponse } from '../dtos/get-address-response';
import { AddressItem, GetAddressesResponse } from '../dtos/get-addresses-response';
import { UpdateAddressRequest } from '../dtos/update-address-request';
import { UpdateAddressRequestService } from '../../services/dtos/update-address-request-service';

@Controller('users')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId/addresses')
  async getAddresses(@Param('userId') userId: string): Promise<GetAddressesResponse> {
    const addresses = await this.userService.getAddresses(userId);
    const lala = addresses.getAddresses();

    const addressesResponse = lala.map(address => new AddressItem(
      address.getId(),
      address.getStreet(),
      address.getCity(),
      address.getZipCode(),
      address.getIsFavorite()
    ));

    const addressesResponse1 = new GetAddressesResponse(addressesResponse);

    return addressesResponse1;
  }

  @Get(':userId/addresses/:addressId')
  async getAddress(@Param('userId') userId: string, @Param('addressId') addressId: string): Promise<GetAddressResponse> {
    const address = await this.userService.getAddress(userId, addressId);

    const addressResponse = new GetAddressResponse(
      address.getId(),
      address.getStreet(),
      address.getCity(),
      address.getZipCode(),
      address.getIsFavorite()
    );

    return addressResponse;
  }

  @Post(':userId/addresses')
  @HttpCode(HttpStatus.CREATED)
  async addAddress(@Param('userId') userId: string, @Body() body: CreateAddressRequest): Promise<void> {
    const requestService = new CreateAddressRequestService(
      body.getStreet(),
      body.getCity(),
      body.getZipCode(),
      body.getIsFavorite()
    );

    await this.userService.addAddress(userId, requestService);
  }

  @Put(':userId/addresses/:addressId')
  async updateAddress(@Param('userId') userId: string, @Param('addressId') addressId: string, @Body() body: UpdateAddressRequest): Promise<void> {
    const requestService = new UpdateAddressRequestService(
      addressId,
      body.getStreet(),
      body.getCity(),
      body.getZipCode(),
      body.getIsFavorite()
    );

    await this.userService.updateAddress(userId, requestService);
  }

  @Delete(':userId/addresses/:addressId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAddress(@Param('userId') userId: string, @Param('addressId') addressId: string) {
    await this.userService.deleteAddress(userId, addressId);
  }
}
