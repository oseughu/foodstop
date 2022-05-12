import { Request, Response } from 'express'
import { Order } from '#models/order.model'

export const createOrder = async (req: Request, res: Response) => {
  const { userId, items, deliveryFee, totalAmount } = req.body

  try {
    const order = await Order.create({
      items,
      deliveryFee,
      totalAmount,
      user: userId
      // @ts-ignore
    }).cache()

    res.status(201).json(order) //201 because a resource was created
  } catch (error) {
    res.status(404).json({ error: 'User not found.' })
  }
}

export const getOrder = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    // @ts-ignore
    const order = await Order.findOne({ _id: id }).cache()
    res.json(order)
  } catch (error) {
    res.status(500).json({ error: 'Order not found.' })
  }
}

export const getOrders = async (_: Request, res: Response) => {
  try {
    // @ts-ignore
    const allOrders = await Order.find().cache()
    res.json(allOrders)
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong.' })
  }
}

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params
  const { status } = req.body

  try {
    // @ts-ignore
    const order = await Order.findOneAndUpdate({ _id: id }, { status }).cache()
    res.json(order)
  } catch (error) {
    res.status(404).json({ error: 'Order not found.' })
  }
}
