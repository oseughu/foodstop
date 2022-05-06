import { Router } from 'express'
import { createOrder, getOrders, getOrder } from '#controllers/order.controller'

export const orderRouter = Router()

orderRouter.post('/orders', createOrder)
orderRouter.get('/orders', getOrders)
orderRouter.get('/orders/:id', getOrder)
