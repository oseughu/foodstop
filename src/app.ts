import { applyMongooseCache, connectDb } from '#config/db'
import routes from '#routes'
import 'dotenv/config'
import express, { Application, json, Request, Response, urlencoded } from 'express'

const port = process.env.PORT || 8000

connectDb()
applyMongooseCache()

const createServer = () => {
  const app: Application = express()

  app.use(urlencoded({ extended: true }))
  app.use(json())
  app.use(routes)

  return app
}

const app = createServer()

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Welcome to the Foodstop API!' })
})

app.listen(port, async () => {
  console.log(`Server running on port ${port}`)
})

export default createServer

// tickets sold
// createDate begin and end slicing wrongly
// profit and loss
