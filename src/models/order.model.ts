import { IUser } from '#models/user.model'
import mongoose, { Schema, model } from 'mongoose'

interface IOrder extends mongoose.Document {
  items: string[]
  testId: string
  deliveryFee: number
  total: number
  user: IUser
  createdAt: Date
  updatedAt: Date
}

const orderSchema = new Schema<IOrder>(
  {
    items: { type: [String], required: true },
    testId: String,
    deliveryFee: { type: Number, required: true },
    total: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true
  }
)

export const Order = model<IOrder>('Order', orderSchema)
