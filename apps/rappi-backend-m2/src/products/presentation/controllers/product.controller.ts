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
import { ProductService } from '../../application/product.service';
import { CreateProductRequestDto } from '../dtos/create-product-request.dto';
import { UpdateProductRequestDto } from '../dtos/update-product-request.dto';
import { ProductResponseDto } from '../dtos/product-response.dto';
import { RestaurantMenuResponseDto, RestaurantInfoDto } from '../dtos/restaurant-menu-response.dto';

@Controller('products')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() createProductDto: CreateProductRequestDto): Promise<ProductResponseDto> {
    const serviceDto = createProductDto.toServiceDto();
    const product = await this.productService.createProduct(serviceDto);
    return ProductResponseDto.fromEntity(product);
  }

  @Get()
  async getAllProducts(): Promise<ProductResponseDto[]> {
    const products = await this.productService.getAllProducts();
    return products.map(product => ProductResponseDto.fromEntity(product));
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<ProductResponseDto> {
    const product = await this.productService.getProductById(id);
    return ProductResponseDto.fromEntity(product);
  }

  @Get('vendor/:vendorId')
  async getProductsByVendor(@Param('vendorId') vendorId: string): Promise<ProductResponseDto[]> {
    const products = await this.productService.getProductsByVendor(vendorId);
    return products.map(product => ProductResponseDto.fromEntity(product));
  }

  @Get('restaurant/:vendorId/menu')
  async getRestaurantMenu(@Param('vendorId') vendorId: string): Promise<RestaurantMenuResponseDto> {
    const { restaurant, products } = await this.productService.getRestaurantMenu(vendorId);
    
    const restaurantInfo = RestaurantInfoDto.fromEntity(restaurant);
    const menuItems = products.map(product => ProductResponseDto.fromEntity(product));
    const categories = [...new Set(products.map(product => product.category))];
    
    return new RestaurantMenuResponseDto(restaurantInfo, menuItems, categories);
  }

  @Get('category/:category')
  async getProductsByCategory(@Param('category') category: string): Promise<ProductResponseDto[]> {
    const products = await this.productService.getProductsByCategory(category);
    return products.map(product => ProductResponseDto.fromEntity(product));
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductRequestDto
  ): Promise<ProductResponseDto> {
    const serviceDto = updateProductDto.toServiceDto();
    const product = await this.productService.updateProduct(id, serviceDto);
    return ProductResponseDto.fromEntity(product);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProduct(@Param('id') id: string): Promise<void> {
    await this.productService.deleteProduct(id);
  }

  @Put(':id/promotion')
  async applyPromotion(
    @Param('id') id: string,
    @Body() body: { discountedPrice: number }
  ): Promise<ProductResponseDto> {
    const product = await this.productService.applyPromotionToProduct(id, body.discountedPrice);
    return ProductResponseDto.fromEntity(product);
  }

  @Delete(':id/promotion')
  async removePromotion(@Param('id') id: string): Promise<ProductResponseDto> {
    const product = await this.productService.removePromotionFromProduct(id);
    return ProductResponseDto.fromEntity(product);
  }
}
