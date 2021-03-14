module.exports = class LatestMessageNotSet extends Error {
    constructor(message) {
        super(message)
        this.name = 'LatestMessageNotSet'
    }
}

