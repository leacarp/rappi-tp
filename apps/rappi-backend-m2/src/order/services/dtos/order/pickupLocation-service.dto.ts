import { PickUpLocation } from "../../../domain/entities/pickup-location.entity";

export class PickupLocationDtoService{
    constructor(private readonly _latitude : number, private readonly _longitude: number){}

   getLatitude() : number{
    return this._latitude;
   }

   getLongitude() : number{
    return this._longitude;
   }
   
   static fromEntity(pickup: PickUpLocation): PickupLocationDtoService {
        return new PickupLocationDtoService(pickup.getLatitude(), pickup.getLongitude());
   }
}