const Message = require("../domain/Message")
const LatestMessageNotSet = require("../infra/errors/LatestMessageNotSet")

const path = '/messages'
const latestPath = `${path}/latest`

module.exports = class MessagesController {
    constructor(logger, app, messagesRepo) {
        this._logger = logger
        this._messagesRepo = messagesRepo
        this._post(app)
        this._get(app)
        this._setLatest(app)
        this._getLatest(app)
    }

    _post(app) {
        app.post(path, (req, res) => {
            this._logger.info(`POST in ${path} received:`, req.body)
            const message = new Message({text: req.body.text})
            this._messagesRepo.save(message)

            res.send(message);
        })
    }

    _get(app) {
        app.get(path, async (req, res) => {
            this._logger.info(`GET in ${path} received`)
            const messages = await Message.lastests(this._messagesRepo)
            res.send(messages);
        })
    }

    _setLatest(app) {
        app.put(latestPath, (req, res) => {
            this._logger.info(`PUT in ${latestPath} received:`, req.body)
            const message = new Message(req.body)
            this._messagesRepo.setLatest(message)
            res.send(message);
        })
    }

    _getLatest(app) {
        app.get(latestPath, async (req, res) => {
            this._logger.info(`GET in ${latestPath} received`)
            try {
                const message = await this._messagesRepo.getLatest()
                res.send(message);
            } catch (e) {
                if(e instanceof LatestMessageNotSet)
                    res.send(new Message({text: 'No latest message was set yet'}))
                throw e
            }
        })
    }
}

