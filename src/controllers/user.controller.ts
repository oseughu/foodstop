import { Request, Response } from 'express'
import { User } from '#models/user.model'

export const createUser = async (req: Request, res: Response) => {
  const { fullName, email, password, phone, address } = req.body

  try {
    const user = new User({
      fullName,
      email,
      password,
      phone,
      address
    })
    await user.save()
    res.status(201).json(user) //201 because a resource was created
  } catch (error) {
    res.status(403).json({
      message: 'User already exists.'
    })
  }
}

export const getUsers = async (_: Request, res: Response) => {
  try {
    const allUsers = await User.find()
    res.json(allUsers)
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong.' })
    console.log(error)
  }
}

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const user = await User.findOne({ _id: id })
    res.json(user)
  } catch (error) {
    res.status(404).json({ error: 'User not found.' })
    console.log(error)
  }
}

export const editUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const { fullName, email, password, phone, address } = req.body

  try {
    const user = await User.updateOne(
      { _id: id },
      { fullName, email, password, phone, address }
    )

    res.status(204).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong.' })
    console.log(error)
  }
}
