import { createServer } from '#src/app'
import { User } from '#models/user.model'
import mongoose from 'mongoose'
import supertest from 'supertest'
import { expect } from 'chai'

const app = createServer()
const testId = new mongoose.Types.ObjectId().toString()
const userPayload = {
  fullName: 'John Doe',
  testId,
  email: 'test@test.com',
  password: '123456789',
  phone: '123456789',
  address: '123 Test Street'
}

describe('User', () => {
  describe('get user', () => {
    beforeEach(done => {
       mongoose.connection.collections.users.drop(() => {
         done()
       })
    })
    describe('given user does not exist', () => {
      it('should return a 404', done => {
        supertest(app).get('/users/5e9whuwehwe').expect(404)
        done()
      })
    })

    describe('given user exists', () => {
      it('should return a 200 and json', done => {
        const newUser = new User(userPayload)

        newUser.save().then(() => {
          supertest(app).get(`/users/${newUser.testId}`).expect(200)
          expect(newUser.testId).to.equal(testId)

          done()
        })
      })
    })
  })

  describe('get users', () => {
    it('should return a 200 and json', done => {
      supertest(app).get('/users').expect(200)
      done()
    })
  })

  describe('create user', () => {
    describe('given user already exists', () => {
      it('should return a 403', done => {
        supertest(app)
          .post('/users')
          .send(userPayload)
          .set('Accept', 'application/json')
          .expect(403)

        done()
      })
    })

    describe('given user does not exist', () => {
      it('should return a 201 and json', done => {
        supertest(app)
          .post('/users')
          .send({
            fullName: 'Jackie Chan',
            testId,
            email: 'new@user.com',
            password: '123456789',
            phone: '123456789',
            address: '123 Test Street'
          })
          .set('Accept', 'application/json')
          .expect(201)

        done()
      })
    })
  })

  describe('Edit user details', () => {
    it('should return a 204 and json', done => {
      const newUser = new User({
        fullName: 'An Unedited User',
        email: 'notedited@user.com',
        password: '123456789',
        phone: '123456789',
        address: '123 Test Street'
      })

      newUser.save().then(() => {
        supertest(app)
          .put(`/users/${newUser.testId}`)
          .send({
            fullName: 'An Edited User',
            email: 'edited@user.com',
            password: '123456789',
            phone: '123456789',
            address: '123 Test Street'
          })
          .set('Accept', 'application/json')
          .expect(204)

        done()
      })
    })
  })
})
