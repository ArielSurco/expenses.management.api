/* eslint-disable no-console */
import 'reflect-metadata'

import { populateMockRepositories } from './__mock__/populateMockRepositories'
import AppDataSource from './db/app-source'
import { Server } from './server/Server'

const server = new Server()

AppDataSource.initialize()
  .then(() => console.log('Database initialized'))
  .catch((error: unknown) => console.error('Error initializing database', error))

server.start()

// Just for testing purposes
populateMockRepositories()
  .then(() => console.log('Mock repositories populated'))
  .catch((error: unknown) => console.error('Error populating mock repositories', error))
