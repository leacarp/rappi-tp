import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IProductRepository } from '../../domain/interfaces/IProductRepository';
import { Product as ProductEntity } from '../../domain/entities/product.entity';
import { Product, ProductDocument } from '../schemas/product.schema';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) {}

  async create(product: ProductEntity): Promise<ProductEntity> {
    const createdProduct = new this.productModel({
      _vendorId: product.vendorId,
      name: product.name,
      description: product.description,
      imageURL: product.imageURL,
      price: product.price,
      category: product.category,
      isAvailable: product.isAvailable,
      promotions: product.promotions
    });

    const savedProduct = await createdProduct.save();
    return this.toEntity(savedProduct);
  }

  async findById(id: string): Promise<ProductEntity | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    const product = await this.productModel.findById(id).exec();
    return product ? this.toEntity(product) : null;
  }

  async findAll(): Promise<ProductEntity[]> {
    const products = await this.productModel.find().exec();
    return products.map(product => this.toEntity(product));
  }

  async findByVendorId(vendorId: string): Promise<ProductEntity[]> {
    const products = await this.productModel.find({ vendorId: new Types.ObjectId(vendorId) }).exec();
    return products.map(product => this.toEntity(product));
  }

  async findByCategory(category: string): Promise<ProductEntity[]> {
    const products = await this.productModel.find({ category }).exec();
    return products.map(product => this.toEntity(product));
  }

  async update(id: string, updateData: Partial<ProductEntity>): Promise<ProductEntity | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    ).exec();

    return updatedProduct ? this.toEntity(updatedProduct) : null;
  }

  async delete(id: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(id)) {
      return false;
    }

    const result = await this.productModel.findByIdAndDelete(id).exec();
    return result !== null;
  }

  // Convierte documento de MongoDB a entidad del dominio
  private toEntity(productDoc: ProductDocument): ProductEntity {
    return new ProductEntity(
      productDoc._id as Types.ObjectId,
      (productDoc as any).vendorId || productDoc._vendorId,
      productDoc.name,
      productDoc.description,
      productDoc.imageURL,
      productDoc.price,
      productDoc.category,
      productDoc.isAvailable,
      productDoc.promotions
    );
  }
}
