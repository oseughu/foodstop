import { applyMongooseCache, connectDb } from '#config/db'
import routes from '#routes'
import 'dotenv/config'
import express, { json, urlencoded } from 'express'

const port = process.env.PORT || 8000

connectDb()
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
  console.log(`Server running on port ${port}`)
})

// tickets sold
// createDate begin and end slicing wrongly
// profit and loss
