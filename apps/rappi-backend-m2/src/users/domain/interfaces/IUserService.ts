import { GetVendorProfile } from '../../services/dtos/get-vendor-profile-service';
import { UpdateVendorProfile } from '../../services/dtos/update-vendor-profile-service';
import { CreateAddressRequestService } from '../../services/dtos/create-address-request-service';
import { GetAddressesResponseService } from '../../services/dtos/get-addresses-response-service';
import { GetAddressResponseService } from '../../services/dtos/get-address-response-service';
import { UpdateAddressRequestService } from '../../services/dtos/update-address-request-service';
import { CreateReviewRequestService } from '../../services/dtos/create-review-request-service';
import { GetReviewsResponseService } from '../../services/dtos/get-reviews-response-service';
import { SearchRestaurantsResponseService } from '../../services/dtos/search-restaurants-response-service';
import { AddCartItemRequestService } from '../../services/dtos/add-cart-item-request-service';
import { SetCartItemQuantityRequestService } from '../../services/dtos/set-cart-item-quantity-request-service';
import { GetCartResponseService } from '../../services/dtos/get-cart-response-service';

export interface IUserService {
  getVendorProfile(vendorId: string): Promise<GetVendorProfile>;
  updateVendorProfile(vendorId: string, editedVendorProfile: UpdateVendorProfile): Promise<void>;
  getAddresses(userId: string): Promise<GetAddressesResponseService>;
  getAddress(userId: string, addressId: string): Promise<GetAddressResponseService>;
  addAddress(userId: string, newAddress: CreateAddressRequestService): Promise<void>;
  updateAddress(userId: string, editedAddress: UpdateAddressRequestService): Promise<void>;
  deleteAddress(userId: string, addressId: string): Promise<void>;
  addReview(userId: string, request: CreateReviewRequestService): Promise<void>;
  getReviews(userId: string): Promise<GetReviewsResponseService>;
  addVendorReview(vendorId: string, request: CreateReviewRequestService): Promise<void>;
  getVendorReviews(vendorId: string): Promise<GetReviewsResponseService>;
  searchRestaurantsByNameOrCategory(param: string): Promise<SearchRestaurantsResponseService>;
  hashPassword(password: string): Promise<string>;
  verifyPassword(password: string, hash: string): Promise<boolean>;
  addCartItem(userId: string, req: AddCartItemRequestService): Promise<void>;
  setCartItemQuantity(userId: string, req: SetCartItemQuantityRequestService): Promise<void>;
  getCart(userId: string): Promise<GetCartResponseService>;
  getDriverAvailability(userId: string): Promise<boolean>;
  updateDriverAvailability(userId: string, isAvailable: boolean): Promise<void>;
}