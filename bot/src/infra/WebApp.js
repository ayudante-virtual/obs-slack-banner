const axios = require("axios")

module.exports = class WebApp {
    constructor(logger, url) {
        this._url = url
        this._logger = logger
    }

    async sendMessage(message) {
        this._logger.debug('Sending message to webapp:', message)
        try {
            const response = await axios.post(`${this._url}/messages`, message)
            this._logger.debug('Response of webapp with status:', response.status, 'and body:', response.data)
        } catch (e) {
            this._logger.error('Error when sending message to webapp:', e)
        }
    }
}
