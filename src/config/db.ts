import mongoose from 'mongoose'

export const connectToDb = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('connected to db'))
}
