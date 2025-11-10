import { Controller, Get, Post, Put, Delete, Body, Param, Query, UsePipes, ValidationPipe, HttpCode, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { IProductService } from '../../domain/interfaces/IProductService';
import { PRODUCT_SERVICE } from '../../infrastructure/constants/product-service.constants';
import { CreateProductRequestDto } from '../dtos/create-product-request.dto';
import { UpdateProductRequestDto } from '../dtos/update-product-request.dto';
import { ProductResponseDto } from '../dtos/product-response.dto';
import { MenuResponseDto } from '../dtos/menu-response.dto';

@ApiTags('products')
@ApiBearerAuth('JWT-auth')
@Controller('products')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productService: IProductService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateProductRequestDto })
  @ApiResponse({ status: 201, type: ProductResponseDto })
  async createProduct(@Body() createProductDto: CreateProductRequestDto): Promise<ProductResponseDto> {
    const serviceDto = createProductDto.toServiceDto();
    const productServiceDto = await this.productService.createProduct(serviceDto);
    return ProductResponseDto.fromServiceDto(productServiceDto);
  }

  @Get()
  async getAllProducts(): Promise<ProductResponseDto[]> {
    const productsServiceDto = await this.productService.getAllProducts();
    return productsServiceDto.getProducts().map(productService => 
      ProductResponseDto.fromServiceDto(productService)
    );
  }
  
  @Get('search')
  async searchProducts(@Query('category') category: string): Promise<ProductResponseDto[]> {
    const productsServiceDto = await this.productService.getProductsByCategory(category);
    return productsServiceDto.getProducts().map(productService => 
      ProductResponseDto.fromServiceDto(productService)
    );
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<ProductResponseDto> {
    const productServiceDto = await this.productService.getProductById(id);
    return ProductResponseDto.fromServiceDto(productServiceDto);
  }

  @Get('vendor/:vendorId')
  async getProductsByVendor(@Param('vendorId') vendorId: string): Promise<ProductResponseDto[]> {
    const productsServiceDto = await this.productService.getProductsByVendor(vendorId);
    return productsServiceDto.getProducts().map(productService => 
      ProductResponseDto.fromServiceDto(productService)
    );
  }

  @Get('category/:category')
  async getProductsByCategory(@Param('category') category: string): Promise<ProductResponseDto[]> {
    const productsServiceDto = await this.productService.getProductsByCategory(category);
    return productsServiceDto.getProducts().map(productService => 
      ProductResponseDto.fromServiceDto(productService)
    );
  }

  @Get('vendor/:vendorId/menu')
  async getVendorMenu(@Param('vendorId') vendorId: string): Promise<MenuResponseDto> {
    const menuServiceDto = await this.productService.getVendorMenu(vendorId);
    return MenuResponseDto.fromServiceDto(menuServiceDto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateProductRequestDto })
  @ApiResponse({ status: 200, type: ProductResponseDto })
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductRequestDto
  ): Promise<ProductResponseDto> {
    const serviceDto = updateProductDto.toServiceDto();
    const productServiceDto = await this.productService.updateProduct(id, serviceDto);
    return ProductResponseDto.fromServiceDto(productServiceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProduct(@Param('id') id: string): Promise<void> {
    await this.productService.deleteProduct(id);
  }

  @Put(':id/promotion')
  @ApiBody({ schema: { type: 'object', properties: { discountedPrice: { type: 'number' } } } })
  @ApiResponse({ status: 200, type: ProductResponseDto })
  async applyPromotion(
    @Param('id') id: string,
    @Body() body: { discountedPrice: number }
  ): Promise<ProductResponseDto> {
    const productServiceDto = await this.productService.applyPromotionToProduct(id, body.discountedPrice);
    return ProductResponseDto.fromServiceDto(productServiceDto);
  }

  @Delete(':id/promotion')
  async removePromotion(@Param('id') id: string): Promise<ProductResponseDto> {
    const productServiceDto = await this.productService.removePromotionFromProduct(id);
    return ProductResponseDto.fromServiceDto(productServiceDto);
  }
}
