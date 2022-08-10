import {
  createOrder,
  getOrder,
  getOrders,
  updateOrderStatus
} from '#controllers/order.controller'
import { Router } from 'express'

export const orderRouter = Router()

orderRouter.post('/orders', createOrder)
orderRouter.get('/orders', getOrders)
orderRouter.get('/orders/:id', getOrder)
orderRouter.put('/orders/:id', updateOrderStatus)
