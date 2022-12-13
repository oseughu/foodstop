import { createUser, editUser, getUser, getUsers } from '#controllers/user.controller'
import { Router } from 'express'

const userRouter = Router()

userRouter.post('/users', createUser)
userRouter.get('/users', getUsers)
userRouter.get('/users/:id', getUser)
userRouter.put('/users/:id', editUser)

export default userRouter
