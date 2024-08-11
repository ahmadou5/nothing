import express from 'express'
import http from 'http'
import 'reflect-metadata' // Used so that we can run this script directly from ts-node
import { injectMiddleWares } from './middlewares'
import { registerRoutes } from './routes'
import { runInitialScripts } from './scripts'
import { env } from './utils/constants/env.constants'
import { appLogger } from './utils/logger.util'

let server: http.Server

/**
 * The `bootstrap` function initializes a server using Express, initializes a database using Sequelize,
 * sets up middleware, registers routes, and starts the server listening on a specified port.
 */
const bootstrap = async () => {
  const app = express()

  const PORT = env.PORT || 5000

  injectMiddleWares(app)
  registerRoutes(app)

  server = app.listen(PORT, () => {
    appLogger.log('info', `Server running at PORT: ${PORT}`)
  })

  server.on('error', (error) => {
    // gracefully handle error
    throw new Error(error.message)
  })

  // run initial scripts
  runInitialScripts()
}

bootstrap()

/* This code block is checking if the Node environment is set to 'production'. If it is, then it sets
up a listener for the 'SIGTERM' signal. When a 'SIGTERM' signal is received, it logs a message
indicating that the signal was received and proceeds to close the HTTP server gracefully. This
ensures that the server shuts down properly when the 'SIGTERM' signal is sent, which is a common way
to gracefully stop a Node.js process in a production environment. */
if (process.env.NODE_ENV === 'production')
  process.on('SIGTERM', () => {
    appLogger.log('info', 'SIGTERM signal received: closing HTTP server')
    server.close(() => {
      appLogger.log('info', 'HTTP server closed')
    })
  })
