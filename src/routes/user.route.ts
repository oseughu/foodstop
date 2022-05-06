import { Router } from 'express'
import {
  createUser,
  getUsers,
  getUser,
  editUser
} from '#controllers/user.controller'

export const userRouter = Router()

userRouter.post('/users', createUser)
userRouter.get('/users', getUsers)
userRouter.get('/users/:id', getUser)
userRouter.put('/users/:id', editUser)
