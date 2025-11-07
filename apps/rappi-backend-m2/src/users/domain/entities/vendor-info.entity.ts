export class VendorInfo {
  private _restaurantName: string;
  private _description: string;
  private _schedule: string;
  private _rating: number;
  private _isAvailable: boolean;

  constructor(
    restaurantName: string,
    description: string,
    schedule: string,
    rating: number,
    isAvailable: boolean
  ) {
    this._restaurantName = restaurantName;
    this._description = description;
    this._schedule = schedule;
    this._rating = rating;
    this._isAvailable = isAvailable;
  }

  getRestaurantName(): string {
    return this._restaurantName;
  }

  getDescription(): string {
    return this._description;
  }

  getSchedule(): string {
    return this._schedule;
  }

  getRating(): number {
    return this._rating;
  }

  getIsAvailable(): boolean {
    return this._isAvailable;
  }

  setRestaurantName(restaurante: string): void {
    if (!restaurante || restaurante.trim().length === 0) {
      throw new Error('El nombre del restaurante es requerido');
    }
    this._restaurantName = restaurante;
  }

  setSchedule(schedule:string): void {
    if (!schedule || schedule.trim().length === 0) {
      throw new Error('El horario es requerido');
    }
    this._schedule = schedule
  }
}