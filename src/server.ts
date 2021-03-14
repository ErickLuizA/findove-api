import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

import routes from './routes'  // eslint-disable-line

const app = express()

const port = process.env.PORT ?? 3333

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(routes)

app.use((request: Request, response: Response, next: NextFunction) => {
  const error: any = new Error('Not found')
  error.status = 404

  return next(error)
})

app.use((error: any, request: Request, response: Response, next: NextFunction) => {
  response.status(error.status ?? 500)

  return response.json({ error: error.message })
})

app.listen(port, () => console.log(`Server running on ${port}`))
