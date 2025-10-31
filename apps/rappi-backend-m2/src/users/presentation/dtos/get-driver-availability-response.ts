export class GetDriverAvailabilityResponse {
  isAvailable: boolean;

  constructor(isAvailable: boolean) {
    this.isAvailable = isAvailable;
  }

  static fromServiceDto(isAvailable: boolean): GetDriverAvailabilityResponse {
    return new GetDriverAvailabilityResponse(isAvailable);
  }
}

