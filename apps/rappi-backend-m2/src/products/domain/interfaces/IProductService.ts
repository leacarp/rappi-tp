import { CreateProductServiceDto } from '../../services/dtos/create-product-service.dto';
import { UpdateProductServiceDto } from '../../services/dtos/update-product-service.dto';
import { ProductResponseService } from '../../services/dtos/product-response-service.dto';
import { ProductsResponseService } from '../../services/dtos/products-response-service.dto';
import { MenuResponseService } from '../../services/dtos/menu-response-service.dto';

export interface IProductService {
  createProduct(createProductDto: CreateProductServiceDto): Promise<ProductResponseService>;
  getProductById(id: string): Promise<ProductResponseService>;
  getAllProducts(): Promise<ProductsResponseService>;
  getProductsByVendor(vendorId: string): Promise<ProductsResponseService>;
  getProductsByCategory(category: string): Promise<ProductsResponseService>;
  getVendorMenu(vendorId: string): Promise<MenuResponseService>;
  updateProduct(id: string, updateProductDto: UpdateProductServiceDto): Promise<ProductResponseService>;
  deleteProduct(id: string): Promise<void>;
  applyPromotionToProduct(id: string, discountedPrice: number): Promise<ProductResponseService>;
  removePromotionFromProduct(id: string): Promise<ProductResponseService>;
}