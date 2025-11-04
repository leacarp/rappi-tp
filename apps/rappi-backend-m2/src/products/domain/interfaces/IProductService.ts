import { Product } from '../entities/product.entity';
import { CreateProductServiceDto } from '../../services/dtos/create-product-service.dto';
import { UpdateProductServiceDto } from '../../services/dtos/update-product-service.dto';

export interface IProductService {
  createProduct(createProductDto: CreateProductServiceDto): Promise<Product>;
  getProductById(id: string): Promise<Product>;
  getAllProducts(): Promise<Product[]>;
  getProductsByVendor(vendorId: string): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  updateProduct(id: string, updateProductDto: UpdateProductServiceDto): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
  applyPromotionToProduct(id: string, discountedPrice: number): Promise<Product>;
  removePromotionFromProduct(id: string): Promise<Product>;
}