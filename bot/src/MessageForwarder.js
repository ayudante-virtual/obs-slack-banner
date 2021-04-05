module.exports = class MessageForwarder {
    constructor(logger, boltApp, webApp) {
        this._logger = logger
        this._forwardMessage(boltApp, webApp)
    }

    _forwardMessage(boltApp, webApp) {
        boltApp.message(async ({message}) => {
            this._logger.info(`Message received:`, message)
            if(message?.subtype === 'message_changed' && message?.message.subtype === 'bot_message') {
                this._logger.debug(`Message with ts ${message.ts} ignored`)
                return
            }

            await webApp.sendMessage(message)
        })
    }
}
