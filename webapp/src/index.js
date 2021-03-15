const redis = require('redis')
const express = require("express")
const cors = require('cors')
const MessagesController = require("./controllers/MessagesController")
const MessagesRepo = require("./infra/MessagesRepo")

/**
 * Logger
 * @type {Console}
 */
const logger = console

/**
 * Redis client
 * @type {RedisClient}
 */
const redisClient = redis.createClient({host: process.env.REDIS_HOSTNAME})

/**
 * Express app
 * @type {*|Express}
 */
const app = express()
app.use(express.json());
app.use(cors({origin: JSON.parse(process.env.CORS_DOMAINS)}))

/**
 * Repositories
 * @type {module.MessagesRepo}
 */
const messagesRepo = new MessagesRepo(redisClient)

/**
 * Controllers
 */
new MessagesController(logger, app, messagesRepo)

/**
 * Start app.
 */
const port = process.env.WEBAPP_PORT || 3000
app.listen(port, () => {
    logger.info(`Webapp listening at port ${port}`)
})

