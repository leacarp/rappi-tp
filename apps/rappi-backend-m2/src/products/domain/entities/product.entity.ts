import { Types } from 'mongoose';

export class Product {
  constructor(
    public readonly id: Types.ObjectId,
    public readonly vendorId: Types.ObjectId,
    public name: string,
    public description: string,
    public imageURL: string,
    public price: number,
    public category: string,
    public isAvailable: boolean,
    public promotions: {
        isOnPromotion: boolean,
        discountedPrice: number
    }
  ) {
    this.validateBusinessRules();
  }

  // Reglas de negocio del dominio
  private validateBusinessRules(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('El nombre del producto es obligatorio');
    }

    if (this.price <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }

    if (this.promotions.isOnPromotion && this.promotions.discountedPrice >= this.price) {
      throw new Error('El precio con descuento debe ser menor al precio original');
    }

    if (this.promotions.isOnPromotion && this.promotions.discountedPrice <= 0) {
      throw new Error('El precio con descuento debe ser mayor a 0');
    }
  }

  // Métodos de negocio
  public updatePrice(newPrice: number): void {
    if (newPrice <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }
    this.price = newPrice;
    
    // Si estaba en promoción, validamos que el descuento siga siendo válido
    if (this.promotions.isOnPromotion && this.promotions.discountedPrice >= newPrice) {
      this.removePromotion();
    }
  }

  public makeAvailable(): void {
    this.isAvailable = true;
  }

  public makeUnavailable(): void {
    this.isAvailable = false;
  }

  public applyPromotion(discountedPrice: number): void {
    if (discountedPrice <= 0) {
      throw new Error('El precio con descuento debe ser mayor a 0');
    }
    if (discountedPrice >= this.price) {
      throw new Error('El precio con descuento debe ser menor al precio original');
    }
    
    this.promotions.isOnPromotion = true;
    this.promotions.discountedPrice = discountedPrice;
  }

  public removePromotion(): void {
    this.promotions.isOnPromotion = false;
    this.promotions.discountedPrice = 0;
  }

  public getFinalPrice(): number {
    return this.promotions.isOnPromotion ? this.promotions.discountedPrice : this.price;
  }

  public getDiscountPercentage(): number {
    if (!this.promotions.isOnPromotion) {
      return 0;
    }
    return Math.round(((this.price - this.promotions.discountedPrice) / this.price) * 100);
  }

  public isValidForSale(): boolean {
    return this.isAvailable && this.price > 0;
  }
}
