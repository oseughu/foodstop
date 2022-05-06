import 'dotenv/config'
import express, { json, urlencoded, Application } from 'express'
import compression from 'compression'
import { connectToDb } from '#config/db'
import { routes } from '#routes'

const port = process.env.PORT || 3000

export const createServer = () => {
  const app: Application = express()

  app.use(compression)
  app.use(urlencoded({ extended: true }))
  app.use(json())
  app.use(routes)

  app.get('/', (req, res) => {
    console.log('hello')
  })

  return app
}

const app = createServer()
connectToDb()

app.listen(port, () => {
  console.log('Server started successfully. ')
})
