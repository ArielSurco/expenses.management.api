import { populateMockRepositories } from './__mock__/populateMockRepositories'
import { Server } from './server/Server'

const server = new Server()

server.start()

// Just for testing purposes
populateMockRepositories()
  // eslint-disable-next-line no-console
  .then(() => console.log('Mock repositories populated'))
  // eslint-disable-next-line no-console
  .catch((error: unknown) => console.error('Error populating mock repositories', error))
