import 'dotenv/config'
import express, { json, urlencoded } from 'express'
import { connectToDb } from '#config/db'
import { routes } from '#routes'

const port = process.env.PORT || 3000

export const createServer = () => {
  const app = express()

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
