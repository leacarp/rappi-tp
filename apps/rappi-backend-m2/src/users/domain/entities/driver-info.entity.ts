import { Location } from './location.entity';
import { Earnings } from './earnings.entity';

export class DriverInfo {
  private _vehicle: string;
  private _isAvailable: boolean;
  private _currentLocation?: Location;
  private _earnings: Earnings;

  constructor(
    vehicle: string,
    isAvailable: boolean,
    earnings: Earnings,
    currentLocation?: Location
  ) {
    this._vehicle = vehicle;
    this._isAvailable = isAvailable;
    this._currentLocation = currentLocation;
    this._earnings = earnings;
  }

  getVehicle(): string {
    return this._vehicle;
  }

  getIsAvailable(): boolean {
    return this._isAvailable;
  }

  getCurrentLocation(): Location | undefined {
    return this._currentLocation;
  }

  getEarnings(): Earnings {
    return this._earnings;
  }

  setIsAvailable(isAvailable: boolean): void {
    if (isAvailable === undefined || isAvailable === null) {
      throw new Error('El estado de disponibilidad es requerido');
    }
    this._isAvailable = isAvailable;
  }
}