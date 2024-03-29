import { IUser } from '#models/user.model'
import mongoose, { model, Schema } from 'mongoose'

export enum Status {
  pending = 'pending',
  delivered = 'delivered',
  cancelled = 'cancelled'
}

interface IOrder extends mongoose.Document {
  items: string[]
  testId: string
  deliveryFee: number
  total: number
  user: IUser
  status: Status
  createdAt: Date
  updatedAt: Date
}

const orderSchema = new Schema<IOrder>(
  {
    items: { type: [String], required: true },
    testId: String,
    deliveryFee: { type: Number, required: true },
    total: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: Status,
      required: true,
      default: Status.pending
    }
  },
  {
    timestamps: true
  }
)

const Order = model<IOrder>('Order', orderSchema)

export default Order
