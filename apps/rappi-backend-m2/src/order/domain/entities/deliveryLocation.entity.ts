export class DeliveryLocation{
    private _latitude: number;
    private _longitude: number;

    constructor(latitude: number, longitude: number){
        this._latitude = latitude;
        this._longitude = longitude
    }

    getLongitude(): number {
        return this._longitude;
    }

    getLatitude(): number {
        return this._latitude;
    }
}