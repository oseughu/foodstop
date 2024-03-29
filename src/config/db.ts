import Redis from 'ioredis'
import mongoose from 'mongoose'

mongoose.set('strictQuery', true)

const connectDb = () => mongoose.connect(process.env.MONGO_URI)
const redis = new Redis(process.env.REDIS_URI)

async function clearCachedData(collectionName, op) {
  const allowedCacheOps: string[] = ['find', 'findById', 'findOne']
  // if operation is insert or delete or update for any collection that exists and has cached values
  // delete its children
  if (!allowedCacheOps.includes(op) && (await redis.exists(collectionName))) {
    redis.del(collectionName)
  }
}

// @ts-ignore
mongoose.Query.prototype.cache = function (time = 60 * 60) {
  this.cacheMe = true
  this.cacheTime = time
  return this
}

function applyMongooseCache() {
  mongoose.Query.prototype.exec = async function () {
    const exec = mongoose.Query.prototype.exec
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

      redis.hset(collectionName, key, JSON.stringify(result), 'EX', this.cacheTime)

      return result
    }

    clearCachedData(collectionName, this.op)
    return exec.apply(this, arguments)
  }
}

export { connectDb, applyMongooseCache }
