import cors from 'cors'
import express from 'express'

import { ENV } from '../shared/constants/env'

import { ErrorHandler } from './ErrorHandler'
import { routes } from './routes'

export class Server {
  private port: number
  private app: express.Application

  constructor() {
    this.port = Number(ENV.PORT)

    this.app = express()

    this.middlewares()
    this.routes()
    this.errorHandler()
  }

  public start() {
    this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server started on port ${String(this.port)}`)
    })
  }

  private routes() {
    routes.forEach(({ basePath, router }) => {
      this.app.use(basePath, router)
    })

    this.app.get('*', (_req, res) => {
      res.status(404).send('Not found')
    })
  }

  private middlewares() {
    this.app.use(express.json())
    this.app.use(cors())
  }

  private errorHandler() {
    this.app.use(ErrorHandler)
  }
}
