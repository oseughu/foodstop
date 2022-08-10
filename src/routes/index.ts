import { orderRouter } from '#routes/order.route'
import { userRouter } from '#routes/user.route'
import { Router } from 'express'

export const routes = Router()

routes.use(userRouter)
routes.use(orderRouter)
