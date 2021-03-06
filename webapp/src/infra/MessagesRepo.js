const key = "messages"
const latestKey = "messages-latest"
const maxMessages = 100
const { promisify } = require("util")
const Message = require("../domain/Message")
const LatestMessageNotSet = require("./errors/LatestMessageNotSet")

module.exports = class MessagesRepo {
    _redis;

    constructor(redis) {
        this._redis = redis;
    }

    save(message) {
        this._redis.lpush(key, JSON.stringify(message))
        this._redis.ltrim(key, 0, maxMessages - 1)
    }

    async get({limit=5}) {
        return (await promisify(this._redis.lrange).bind(this._redis)(key, 0, limit - 1))
            .map(JSON.parse)
            .map(message => new Message(message))
    }

    setLatest(message) {
        console.log('message', message)
        this._redis.set(latestKey, JSON.stringify(message))
    }

    async getLatest() {
        const message = (await promisify(this._redis.get).bind(this._redis)(latestKey))
        console.log('message', message)
        if(!message)
            throw new LatestMessageNotSet()
        return new Message(JSON.parse(message))
    }
}
