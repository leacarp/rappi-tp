import { DeliveryLocation } from "../../../domain/entities/deliveryLocation.entity";

export class DeliveryLocationDtoService{
   constructor(private readonly _latitude : number, private readonly _longitude: number){}

   getLatitude() : number{
    return this._latitude;
   }

   getLongitude() : number{
    return this._longitude;
   }

   static fromEntity(deliveryLocation: DeliveryLocation): DeliveryLocationDtoService {
         return new DeliveryLocationDtoService(deliveryLocation.getLatitude(), deliveryLocation.getLongitude());
   }
}