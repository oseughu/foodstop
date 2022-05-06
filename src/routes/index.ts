import { Router } from 'express'
import { userRouter } from '#routes/user.route'
import { orderRouter } from '#routes/order.route'

export const routes = Router()

routes.use(userRouter)
routes.use(orderRouter)
