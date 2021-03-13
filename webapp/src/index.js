const redis = require('redis')
const express = require("express")
const MessagesController = require("./controllers/MessagesController")
const MessagesRepo = require("./infra/MessagesRepo")

const redisClient = redis.createClient({
    host: process.env.REDIS_HOSTNAME
})


const app = express()
app.use(express.json());

const messagesRepo = new MessagesRepo(redisClient)

const logger = console
new MessagesController(logger, app, messagesRepo)

const port = process.env.WEBAPP_PORT || 3000
app.listen(port, () => {
    logger.info(`Webapp listening at port ${port}`)
})
