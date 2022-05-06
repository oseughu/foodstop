import { createServer } from '#src/app'
import { User } from '#models/user.model'
import { Order } from '#models/order.model'
import mongoose from 'mongoose'
import supertest from 'supertest'

const app = createServer()
const testId = new mongoose.Types.ObjectId().toString()
const userPayload = {
  fullName: 'Jack Glutton',
  testId,
  email: 'testOrder@test.com',
  password: '123456789',
  phone: '123456789',
  address: '123 Test Street'
}

const orderPayload = {
  items: ['Jollof Rice', 'Eba', 'Fried Plantain'],
  testId,
  deliveryFee: 2500,
  total: 5000,
  user: userPayload.testId
}

describe('Order', () => {
  beforeEach(done => {
    mongoose.connection.collections.orders.drop(() => {
      done()
    })
  })
  describe('create order', () => {
    describe('given user does not exist', () => {
      it('should return a 404', done => {
        supertest(app).get('/users/5e9whuwehwe').expect(404)
        done()
      })
    })

    describe('given user exists', () => {
      it('should return a 201 and json', done => {
        const newUser = new User(userPayload)

        newUser.save().then(() => {
          supertest(app).post('/orders').send(orderPayload).expect(201)

          done()
        })
      })
    })
  })

  describe('get orders', () => {
    it('should return a 200 and json', done => {
      supertest(app).get('/orders').expect(200)
      done()
    })
  })

  describe('get order', () => {
    it('should return a 200 and json', done => {
      const newOrder = new Order(orderPayload)

      newOrder.save().then(() => {
        supertest(app).get(`/orders/${newOrder.testId}`).expect(200)
        done()
      })
    })
  })

  describe('get orders from user', () => {
    it('should return a 200 and json', done => {
      const newUser = new User(userPayload)

      newUser.save().then(() => {
        const newOrder = new Order(orderPayload)

        newOrder.save().then(() => {
          supertest(app).get(`/orders/${newUser.testId}`).expect(200)
          done()
        })
      })
    })
  })
})
