module.exports = class MessageForwarder {
    constructor(logger, boltApp, webApp) {
        this._logger = logger
        this._forwardMessage(boltApp, webApp)
    }

    _forwardMessage(boltApp, webApp) {
        boltApp.message(async ({message}) => {
            this._logger.info(`Message received:`, message)
            await webApp.sendMessage(message)
        })
    }
}
