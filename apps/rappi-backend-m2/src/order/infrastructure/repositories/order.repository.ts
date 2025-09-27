import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IOrderRepository } from '../../domain/interfaces/IOrderRepository';
import {Order as OrderEntity} from '../../domain/entities/order.entity';
import { Order, OrderDocument } from '../schemas/order.schema';
import { PickUpLocation } from '../../domain/entities/pickup-location.entity';
import { DeliveryLocation } from '../../domain/entities/deliveryLocation.entity';
import { Items } from '../../domain/entities/items.entity';
import { Summary } from '../../domain/entities/summary.entity';
import { Payment } from '../../domain/entities/payment.entity';

@Injectable()
export class OrderRepository implements IOrderRepository{
    constructor(
        @InjectModel(Order.name) private orderModel : Model<OrderDocument>
    ){}

     async create(order: OrderEntity): Promise<OrderEntity> {
          const createdOrder = new this.orderModel({
          customerId: order.getCustomerId(),
          vendorId: order.getVendorId(),
          driverId: order.getDriverId(),
          status: order.getStatus(),
          pickUpLocation: order.getPickupLocation(),
          deliveryLocation: order.getDeliveryLocation(),
          items: order.getItems(),
          summary: order.getSummary(),
          payment: order.getPayment(),
          trackingNumber: order.getTrackingNumber(),
          notes: order.getNotes(),
          });
    
        const savedOrder = await createdOrder.save();
        return this.toEntity(savedOrder);
      }

    async findById(id: string): Promise<OrderEntity | null> {
        if (!Types.ObjectId.isValid(id)) {
          return null;
        }
        const order = await this.orderModel.findById(id)
        .populate('customerId')
        .populate('vendorId')
        .populate('driverId')
        .exec();
        return order ? this.toEntity(order) : null;
      }

   

    // Chequea si está poblado o no(Documento con datos o ObjectId)
    private getId<T extends { _id: Types.ObjectId }>(ref: Types.ObjectId | T): Types.ObjectId {
        return ref instanceof Types.ObjectId ? ref : ref._id;
    }

    // Convierte documento de MongoDB a entidad del dominio
    private toEntity(orderDoc: OrderDocument): OrderEntity {
        return new OrderEntity(
            orderDoc.id as Types.ObjectId,
            this.getId(orderDoc.customerId),
            this.getId(orderDoc.vendorId),
            this.getId(orderDoc.driverId),
            orderDoc.status,
            new PickUpLocation(orderDoc.pickUpLocation.latitude, orderDoc.pickUpLocation.longitude),
            new DeliveryLocation(orderDoc.deliveryLocation.latitude, orderDoc.deliveryLocation.longitude),
            orderDoc.items.map(
                item => new Items(item.productId.toString(), item.name, item.quantity, item.price)
            ),
            new Summary(
                        orderDoc.summary.subtotal, 
                        orderDoc.summary.shippingCost,  
                        orderDoc.summary.taxes,
                        orderDoc.summary.discount,
                        orderDoc.summary.total
            ),
            new Payment(orderDoc.payment.method, orderDoc.payment.status, orderDoc.payment.transactionId),
            orderDoc.trackingNumber,
            orderDoc.notes,
            orderDoc.createdAt
        );
    }
}