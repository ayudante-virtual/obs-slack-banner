const Message = require("../domain/Message")

module.exports = class MessagesController {
    constructor(logger, app, messagesRepo) {
        this._logger = logger
        this._path = '/messages'
        this._messagesRepo = messagesRepo
        this._post(app)
        this._get(app)
    }

    _post(app) {
        app.post(this._path, (req, res) => {
            this._logger.info(`Post in ${this._path} received:`, req.body)
            const message = new Message({text: req.body.text})
            this._messagesRepo.save(message)

            res.send(message);
        })
    }

    _get(app) {
        app.get(this._path, async (req, res) => {
            this._logger.info(`Get in ${this._path} received`)
            const messages = await Message.lastests(this._messagesRepo)
            res.send(messages);
        })
    }
}

