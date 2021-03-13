const axios = require("axios")

module.exports = class WebApp {
    constructor(url) {
        this._url = url
    }

    async sendMessage(message) {
        await axios.post(`${this._url}/messages`, message)
    }
}
