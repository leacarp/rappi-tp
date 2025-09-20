import { Address } from './address.entity';
import { VendorInfo } from './vendor-info.entity';
import { DriverInfo } from './driver-info.entity';

export class Profile {
  private _name: string;
  private _phone?: string;
  private _addresses: Address[];
  private _vendorInfo?: VendorInfo;
  private _driverInfo?: DriverInfo;

  constructor(
    name: string,
    addresses: Address[],
    vendorInfo?: VendorInfo,
    driverInfo?: DriverInfo,
    phone?: string
  ) {
    this._name = name;
    this._phone = phone;
    this._addresses = addresses;
    this._vendorInfo = vendorInfo;
    this._driverInfo = driverInfo;
  }

  getName(): string {
    return this._name;
  }

  getPhone(): string | undefined {
    return this._phone;
  }

  getAddresses(): Address[] {
    return this._addresses;
  }

  setAddresses(addresses: Address[]): void {
    this._addresses = addresses;
  }

  addAddress(address: Address): void {
    if (address.getIsFavorite()) {
      this._addresses.forEach(addr => addr.makeAsNotFavorite());
    }
    
    this._addresses.push(address);
  }

  updateAddress(addressId: string, updatedAddress: Address): void {
    const index = this._addresses.findIndex(addr => addr.getId() === addressId);
    if (index === -1) {
      throw new Error('Dirección no encontrada');
    }

    if (updatedAddress.getIsFavorite()) {
      this._addresses.forEach(addr => addr.makeAsNotFavorite());
    }

    this._addresses[index] = updatedAddress;
  }

  removeAddress(addressId: string): void {
    const index = this._addresses.findIndex(addr => addr.getId() === addressId);
    if (index === -1) {
      throw new Error('Dirección no encontrada');
    }
    
    this._addresses.splice(index, 1);
  }

  getVendorInfo(): VendorInfo | undefined {
    return this._vendorInfo;
  }

  getDriverInfo(): DriverInfo | undefined {
    return this._driverInfo;
  }
}
