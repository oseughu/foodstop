import { User } from '#models/user.model'
import { Request, Response } from 'express'

export const createUser = async (req: Request, res: Response) => {
  const { fullName, email, password, phone, address } = req.body

  try {
    const user = await User.create({
      fullName,
      email,
      password,
      phone,
      address
      // @ts-ignore
    }).cache()

    res.status(201).json(user) //201 because a resource was created
  } catch (error) {
    res.status(403).json({
      message: 'User already exists.'
    })
  }
}

export const getUsers = async (_: Request, res: Response) => {
  try {
    // @ts-ignore
    const allUsers = await User.find().cache()
    res.json(allUsers)
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong.' })
  }
}

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    // @ts-ignore
    const user = await User.findOne({ _id: id }).cache()
    res.json(user)
  } catch (error) {
    res.status(404).json({ error: 'User not found.' })
  }
}

export const editUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const { fullName, email, password, phone, address } = req.body

  try {
    // @ts-ignore
    const user = await User.updateOne(
      { _id: id },
      { fullName, email, password, phone, address }
      // @ts-ignore
    ).cache()

    res.status(204).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong.' })
  }
}
