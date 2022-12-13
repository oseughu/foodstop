import orderRouter from '#routes/order.route'
import userRouter from '#routes/user.route'
import { Router } from 'express'

const routes = Router()

routes.use(userRouter, orderRouter)

export default routes
