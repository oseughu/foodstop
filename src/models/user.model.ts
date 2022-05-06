import mongoose, { Schema, model } from 'mongoose'

export interface IUser extends mongoose.Document {
  fullName: string
  testId: string
  email: string
  password: string
  phone: string
  address: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    testId: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

export const User = model<IUser>('User', userSchema)
