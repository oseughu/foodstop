import dotenv from 'dotenv'
import express, { json, urlencoded } from 'express'
import { applyMongooseCache, connectToDb } from '#config/db'
import { routes } from '#routes'

const port = process.env.PORT || 3000

dotenv.config()
connectToDb()
applyMongooseCache()

export const createServer = () => {
  const app = express()

  app.use(urlencoded({ extended: true }))
  app.use(json())
  app.use(routes)

  return app
}

const app = createServer()

app.listen(port, async () => {
  console.log('Server started successfully. ')
})
