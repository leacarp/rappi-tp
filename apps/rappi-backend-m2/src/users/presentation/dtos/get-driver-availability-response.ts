export class GetDriverAvailabilityResponse {
  private readonly isAvailable: boolean;

  constructor(isAvailable: boolean) {
    this.isAvailable = isAvailable;
  }

  getIsAvailable(): boolean {
    return this.isAvailable;
  }

  static fromServiceDto(isAvailable: boolean): GetDriverAvailabilityResponse {
    return new GetDriverAvailabilityResponse(isAvailable);
  }
}