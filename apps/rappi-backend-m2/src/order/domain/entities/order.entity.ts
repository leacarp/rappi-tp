import { DeliveryLocation } from "./deliveryLocation.entity";
import { Items } from "./items.entity";
import { Payment } from "./payment.entity";
import { PickUpLocation } from "./pickup-location.entity";
import { Summary } from "./summary.entity";
import { Types } from 'mongoose';
import { OrderStatus } from "../enum/order-status";
import { BadRequestException } from "@nestjs/common";
import { UserBasicEntity } from "./user-basic";


export class OrderEntity{
    private readonly _id: Types.ObjectId;
    private readonly _customerId: Types.ObjectId;
    private readonly _vendorId : Types.ObjectId;
    private readonly _driverId: Types.ObjectId;
    private _status: OrderStatus;
    private _createdAt: Date;
    private _pickupLocation: PickUpLocation;
    private _deliveryLocation: DeliveryLocation;
    private _items: Items[];
    private _summary : Summary;
    private _payment: Payment;
    private _trackingNumber: string;
    private _notes: string;
    private _customer?: UserBasicEntity;
    private _vendor?: UserBasicEntity;
    private _driver?: UserBasicEntity;

    constructor(
        id: Types.ObjectId, 
        customerId: Types.ObjectId, 
        vendorId: Types.ObjectId, 
        driverId: Types.ObjectId, 
        status: OrderStatus, 
        pickupLocation: PickUpLocation, 
        deliveryLocation: DeliveryLocation, 
        items: Items[], 
        summary: Summary, 
        payment: Payment, 
        trackingNumber: string, 
        notes: string,
        createdAt?: Date,
        customerData?: UserBasicEntity,
        vendorData?: UserBasicEntity,
        driverData?: UserBasicEntity
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

    getStatus(): OrderStatus{
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

    getCustomer(): UserBasicEntity | undefined{
        return this._customer;
    }

    getVendor(): UserBasicEntity | undefined{
        return this._vendor;
    }

    getDriver(): UserBasicEntity | undefined{
        return this._driver;
    }




    private validateBusinessRules(): void{
         const validStatuses = [
            OrderStatus.Pending,
            OrderStatus.Accepted,
            OrderStatus.Preparing,
            OrderStatus.ReadyForPickup,
            OrderStatus.InTransit,
            OrderStatus.Delivered,
            OrderStatus.Canceled
        ];
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

    private readonly validTransitions: Record<OrderStatus, OrderStatus[]> = {
        [OrderStatus.Pending]: [OrderStatus.Accepted, OrderStatus.Canceled],
        [OrderStatus.Accepted]: [OrderStatus.Preparing, OrderStatus.Canceled],
        [OrderStatus.Preparing]: [OrderStatus.ReadyForPickup, OrderStatus.Canceled],
        [OrderStatus.ReadyForPickup]: [OrderStatus.InTransit, OrderStatus.Canceled],
        [OrderStatus.InTransit]: [OrderStatus.Delivered, OrderStatus.Canceled],
        [OrderStatus.Delivered]: [],
        [OrderStatus.Canceled]: [],
    };

    changeStatus(newStatus: OrderStatus): void {
    const currentStatus = this._status;

    if (!this.validTransitions[currentStatus].includes(newStatus)) 
        throw new BadRequestException(`No se puede cambiar el estado de '${currentStatus}' a '${newStatus}'`);
    
        this._status = newStatus;
    }
}