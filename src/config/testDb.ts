import mongoose from 'mongoose'

// tells mongoose to use ES6 implementation of promises
mongoose.Promise = global.Promise

export const connectToTestDb = () => mongoose.connect(process.env.MONGO_TEST)

export const disconnectFromTestDb = () => {
  mongoose.disconnect()
  mongoose.connection.close()
}

export const beforeEachTest = done => {
  mongoose.connection.collections.users.drop(() => {
    done()
  })
}
