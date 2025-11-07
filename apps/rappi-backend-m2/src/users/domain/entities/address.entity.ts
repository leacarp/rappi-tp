export class Address {
  private _id: string;
  private _street: string;
  private _city: string;
  private _zipCode: string;
  private _isFavorite: boolean;

  constructor(
    id: string,
    street: string,
    city: string,
    zipCode: string,
    isFavorite: boolean
  ) {
    this._id = id;
    this._street = street;
    this._city = city;
    this._zipCode = zipCode;
    this._isFavorite = isFavorite;

    this.validateProperties();
  }

  private validateProperties(): void {
    this.validateId();
    this.validateStreet();
    this.validateCity();
    this.validateZipCode();
    this.validateIsFavorite();
  }

  private validateId(): void {
    if (!this._id || this._id.trim().length === 0) {
      throw new Error('El ID de la dirección es requerido');
    }
  }

  private validateStreet(): void {
    if (!this._street || this._street.trim().length === 0) {
      throw new Error('La calle es requerida');
    }
  }

  private validateCity(): void {
    if (!this._city || this._city.trim().length === 0) {
      throw new Error('La ciudad es requerida');
    }
  }

  private validateZipCode(): void {
    if (!this._zipCode || this._zipCode.trim().length === 0) {
      throw new Error('El código postal es requerido');
    }

    const zipCodeRegex = /^[0-9]{4}$/;
    if (!zipCodeRegex.test(this._zipCode)) {
      throw new Error('El código postal debe tener exactamente 4 números');
    }
  }

  private validateIsFavorite(): void {
    if (typeof this._isFavorite !== 'boolean') {
      throw new Error('isFavorite debe ser un valor booleano');
    }
  }

  getId(): string {
    return this._id;
  }

  getStreet(): string {
    return this._street;
  }

  setStreet(street: string): void {
    this._street = street;
    this.validateStreet();
  }

  getCity(): string {
    return this._city;
  }

  setCity(city: string): void {
    this._city = city;
    this.validateCity();
  }

  getZipCode(): string {
    return this._zipCode;
  }

  setZipCode(zipCode: string): void {
    this._zipCode = zipCode;
    this.validateZipCode();
  }

  getIsFavorite(): boolean {
    return this._isFavorite;
  }

  setIsFavorite(isFavorite: boolean): void {
    this._isFavorite = isFavorite;
    this.validateIsFavorite();
  }

  makeAsFavorite(): void {
    this._isFavorite = true;
    this.validateIsFavorite();
  }

  makeAsNotFavorite(): void {
    this._isFavorite = false;
    this.validateIsFavorite();
  }
}