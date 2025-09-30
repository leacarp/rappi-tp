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

@Controller('products')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() createProductDto: CreateProductRequestDto): Promise<ProductResponseDto> {
    const product = await this.productService.createProduct(
      createProductDto.vendorId,
      createProductDto.name,
      createProductDto.description,
      createProductDto.imageURL,
      createProductDto.price,
      createProductDto.category,
      createProductDto.isAvailable ?? true,
      createProductDto.promotions ?? { isOnPromotion: false, discountedPrice: 0 }
    );

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
    const product = await this.productService.updateProduct(id, updateProductDto);
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
