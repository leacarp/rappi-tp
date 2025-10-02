import { DeliveryLocation } from "./deliveryLocation.entity";
import { Items } from "./items.entity";
import { Payment } from "./payment.entity";
import { PickUpLocation } from "./pickup-location.entity";
import { Summary } from "./summary.entity";
import { Types } from 'mongoose';

export class OrderEntity{
    private readonly _id: Types.ObjectId;
    private readonly _customerId: Types.ObjectId;
    private readonly _vendorId : Types.ObjectId;
    private readonly _driverId: Types.ObjectId;
    private _status: string;
    private _createdAt: Date;
    private _pickupLocation: PickUpLocation;
    private _deliveryLocation: DeliveryLocation;
    private _items: Items[];
    private _summary : Summary;
    private _payment: Payment;
    private _trackingNumber: string;
    private _notes: string;
    private _customer?: { id: Types.ObjectId; name: string; email: string };
    private _vendor?: { id: Types.ObjectId; name: string; email: string };
    private _driver?: { id: Types.ObjectId; name: string; email: string };

    constructor(
        id: Types.ObjectId, 
        customerId: Types.ObjectId, 
        vendorId: Types.ObjectId, 
        driverId: Types.ObjectId, 
        status: string, 
        pickupLocation: PickUpLocation, 
        deliveryLocation: DeliveryLocation, 
        items: Items[], 
        summary: Summary, 
        payment: Payment, 
        trackingNumber: string, 
        notes: string,
        createdAt?: Date,
        customerData?: { id: Types.ObjectId; name: string; email: string },
        vendorData?: { id: Types.ObjectId; name: string; email: string },
        driverData?: { id: Types.ObjectId; name: string; email: string },
    ){
        this._id = id;
        this._customerId = customerId;
        this._vendorId = vendorId;
        this._driverId = driverId;
        this._status = status;
        this._pickupLocation = pickupLocation;
        this._deliveryLocation = deliveryLocation;
        this._items = items;
        this._summary = summary;
        this._payment = payment;
        this._trackingNumber = trackingNumber;
        this._notes = notes;
        this._createdAt = createdAt ?? new Date();
        this._customer = customerData;
        this._vendor = vendorData;
        this._driver = driverData;

        this.validateBusinessRules();
    }

    getId(): Types.ObjectId{
        return this._id;
    }

    getCustomerId(): Types.ObjectId{
        return this._customerId;
    }

    getVendorId(): Types.ObjectId{
        return this._vendorId;
    }

    getDriverId(): Types.ObjectId{
        return this._driverId;
    }

    getStatus(): string{
        return this._status;
    }

    getCreatedAt(): Date {
        return this._createdAt;
    }

    getPickupLocation(): PickUpLocation{
        return this._pickupLocation;
    }

    getDeliveryLocation(): DeliveryLocation{
        return this._deliveryLocation;
    }

    getItems(): Items[]{
        return this._items;
    }

    getSummary(): Summary{
        return this._summary;
    }

    getPayment(): Payment{
        return this._payment;
    }

    getTrackingNumber(): string{
        return this._trackingNumber;
    }

    getNotes(): string{
        return this._notes;
    }

    addItem(item: Items): void {
        this._items.push(item);
    }

    markAsDelivered(): void {
        this._status = 'delivered';
    }

    getCustomer(): { id: Types.ObjectId; name: string; email: string } | undefined {
        return this._customer;
    }

    getVendor(): { id: Types.ObjectId; name: string; email: string } | undefined {
        return this._vendor;
    }

    getDriver(): { id: Types.ObjectId; name: string; email: string } | undefined {
        return this._driver;
    }




    private validateBusinessRules(): void{
        const validStatuses = ['pending', 'accepted', 'preparing', 'delivered', 'canceled'];
        if (!validStatuses.includes(this._status)) {
        throw new Error(`Estado inválido: ${this._status}`);
        }

        if (!this._items || this._items.length === 0) {
        throw new Error('Una orden debe tener al menos un item');
        }

        if(!this._trackingNumber || this._trackingNumber.trim().length === 0){
            throw new Error('Debe contener un número de seguimiento');
        }

    }

}