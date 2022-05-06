import mongoose from 'mongoose'
import Redis from 'ioredis'

export const connectToDb = () => mongoose.connect(process.env.MONGO_URL)

export const applyMongooseCache = () => {
  const redis = new Redis(process.env.REDIS_URL)
  const exec = mongoose.Query.prototype.exec

  mongoose.Query.prototype.exec = async function () {
    const key = JSON.stringify({
      ...this.getQuery(),
      collection: this.mongooseCollection.name,
      op: this.op,
      options: this.options
    })

    const cacheValue = await redis.get(key)

    cacheValue && JSON.parse(cacheValue)

    const result = await exec.apply(this, arguments)

    result && redis.set(key, JSON.stringify(result))

    return result
  }
}
