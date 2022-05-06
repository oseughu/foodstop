import mongoose from 'mongoose'
import Redis from 'ioredis'

export const connectToDb = () => mongoose.connect(process.env.MONGO_URL)
const redis = new Redis(process.env.REDIS_URL)

async function clearCachedData(collectionName, op) {
  const allowedCacheOps = ['find', 'findById', 'findOne']
  // if operation is insert or delete or update for any collection that exists and has cached values
  // delete its childern
  if (!allowedCacheOps.includes(op) && (await redis.exists(collectionName))) {
    redis.del(collectionName)
  }
}

export const applyMongooseCache = () => {
  const exec = mongoose.Query.prototype.exec

  mongoose.Query.prototype.exec = async function () {
    const collectionName = this.mongooseCollection.name

    if (this.cacheMe) {
      // You can't insert json straight to redis needs to be a string

      const key = JSON.stringify({
        ...this.getOptions(),
        collectionName: collectionName,
        op: this.op
      })
      const cachedResults = await redis.hget(collectionName, key)

      // getOptions() returns the query and this.op is the method which in our case is "find"

      if (cachedResults) {
        // if you found cached results return it;
        const result = JSON.parse(cachedResults)
        return result
      }
      //else
      // get results from Database then cache it
      const result = await exec.apply(this, arguments)

      redis.hset(
        collectionName,
        key,
        JSON.stringify(result),
        'EX',
        this.cacheTime
      )

      return result
    }

    clearCachedData(collectionName, this.op)
    return exec.apply(this, arguments)
  }
}
