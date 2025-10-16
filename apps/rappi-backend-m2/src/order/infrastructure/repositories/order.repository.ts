import { BadRequestException, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IOrderRepository } from '../../domain/interfaces/IOrderRepository';
import {OrderEntity as OrderEntity} from '../../domain/entities/order.entity';
import { Order, OrderDocument } from '../schemas/order.schema';
import { PickUpLocation } from '../../domain/entities/pickup-location.entity';
import { DeliveryLocation } from '../../domain/entities/deliveryLocation.entity';
import { Items } from '../../domain/entities/items.entity';
import { Summary } from '../../domain/entities/summary.entity';
import { Payment } from '../../domain/entities/payment.entity';
import { ProductOfItem } from '../../domain/entities/product-of-item.entity';
import { OrderStatus } from '../../domain/enum/order-status';
import { UserBasicEntity } from '../../domain/entities/user-basic';
interface PopulatedUser {
  _id: Types.ObjectId;
  email: string;
  profile?: {
    name: string;
  };
}


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
          pickUpLocation: {
            latitude: order.getPickupLocation().getLatitude(),
            longitude: order.getPickupLocation().getLongitude()
          },
          deliveryLocation: {
            latitude: order.getDeliveryLocation().getLatitude(),
            longitude: order.getDeliveryLocation().getLongitude()
          },
          items: order.getItems().map(item => ({
            productId: item.getProductId(),
            name: item.getName(),
            quantity: item.getQuantity(),
            price: item.getQuantity()
          })),
          summary: {
            subtotal: order.getSummary().getSubTotal(),
            shippingCost: order.getSummary().getShippingCost(),
            taxes: order.getSummary().getTaxes(),
            discount: order.getSummary().getDiscount(),
            total: order.getSummary().getTotal()
          },
          payment: {
            method: order.getPayment().getMethod(),
            status: order.getPayment().getStatus(),
            transactionId: order.getPayment().getTransactionId()
          },
          trackingNumber: order.getTrackingNumber(),
          notes: order.getNotes(),
          });
    
        const savedOrder = await createdOrder.save();
        const populatedOrder = await this.orderModel.findById(savedOrder.id)
          .populate('customerId', 'email profile')
          .populate('vendorId', 'email profile')
          .populate('driverId', 'email profile')
          .exec();
        return this.toEntity(populatedOrder);
      }

    async findById(id: string): Promise<OrderEntity | null> {
        
        if (!Types.ObjectId.isValid(id)) {
          return null;
        }
        const order = await this.orderModel.findById(id)
        .populate('customerId', 'email profile.name')
        .populate('vendorId', 'email profile.name')
        .populate('driverId', 'email profile.name')
        .exec();
    
        return order ? this.toEntity(order) : null;
    }

    
    
   async findByField(field: string, value: string): Promise<OrderEntity[]> {
      const orders = await this.orderModel.find({ [field]: new Types.ObjectId(value) }).exec();
      return orders.map(order => this.toDomain(order));
   }


  async updateStatus(orderId: string, newStatus: OrderStatus): Promise<void> {
      if(!Types.ObjectId.isValid(orderId)) throw new BadRequestException('Id no válido');
      const result = await this.orderModel.updateOne(
        { _id: orderId },
        { $set: { status: newStatus } }
      );

      if (result.matchedCount === 0) {
        throw new BadRequestException('Orden no encontrada');
      }
  }

  

  private mapUser(user: Types.ObjectId | PopulatedUser | null | undefined): UserBasicEntity | undefined {;
      if (!user || typeof user === 'string') return undefined;
      const populated = user as PopulatedUser;
      const id = populated._id;
      const email = populated.email;
      const name = populated.profile?.name ?? 'Desconocido';
      
      if (!id || !email) return undefined;

    return new UserBasicEntity(id, name, email);
  }

  


  private toEntity(orderDoc: OrderDocument): OrderEntity {
        const items: Items[] = orderDoc.items.map(i =>
          new Items(new ProductOfItem(i.productId, i.name, i.price), i.quantity)
        );

        const customerData = this.mapUser(orderDoc.customerId);
        const vendorData = this.mapUser(orderDoc.vendorId);
        const driverData = this.mapUser(orderDoc.driverId);

        return new OrderEntity(
          orderDoc._id as Types.ObjectId,
          customerData?.getId() ?? orderDoc.customerId as Types.ObjectId,
          vendorData?.getId() ?? orderDoc.vendorId as Types.ObjectId,
          driverData?.getId() ?? orderDoc.driverId as Types.ObjectId,
          orderDoc.status,
          new PickUpLocation(orderDoc.pickUpLocation.latitude, orderDoc.pickUpLocation.longitude),
          new DeliveryLocation(orderDoc.deliveryLocation.latitude, orderDoc.deliveryLocation.longitude),
          items,
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
          orderDoc.createdAt,
          customerData,
          vendorData,
          driverData
        );
    }


    private toDomain(order: OrderDocument): OrderEntity {
      const items: Items[] = order.items.map(i =>
          new Items(
          new ProductOfItem(i.productId, i.name, i.price),
            i.quantity
          )
        );
      return new OrderEntity(
        order.id as Types.ObjectId,
        order.customerId,
        order.vendorId,
        order.driverId,
        order.status,
        new PickUpLocation(order.pickUpLocation.latitude, order.pickUpLocation.longitude),
        new DeliveryLocation(order.deliveryLocation.latitude, order.deliveryLocation.longitude),
        items,
        new Summary(
                        order.summary.subtotal, 
                        order.summary.shippingCost,  
                        order.summary.taxes,
                        order.summary.discount,
                        order.summary.total
            ),
        new Payment(order.payment.method, order.payment.status, order.payment.transactionId),
        order.trackingNumber,
        order.notes,
        order.createdAt,
      );
    }
}