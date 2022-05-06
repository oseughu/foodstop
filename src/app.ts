import 'dotenv/config'
import express, { json, urlencoded } from 'express'
import { applyMongooseCache, connectToDb } from '#config/db'
import { routes } from '#routes'

const port = process.env.PORT || 3000

export const createServer = () => {
  const app = express()

  app.use(urlencoded({ extended: true }))
  app.use(json())
  app.use(routes)

  return app
}

const app = createServer()

app.listen(port, async () => {
  await connectToDb()
  applyMongooseCache()
  console.log('Server started successfully. ')
})
