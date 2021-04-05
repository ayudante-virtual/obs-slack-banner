module.exports = class Message {
    text;

    constructor({text}) {
        this.text = text;
    }

    static async lastests(repo) {
        return await repo.get({limit: 20})
    }
}
