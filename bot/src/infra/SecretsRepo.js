module.exports = class SecretsRepo {
    _pg;

    constructor(pg, logger) {
        this._pg = pg;
        this._logger = logger
    }

    async save(id, installation) {
        this._logger.info(`Saving installation from ${id}.`)
        const previousInstallation = await this.get(id)
        if (previousInstallation) {
            await this._pg.query('UPDATE "slackTokens" SET installation = $2 WHERE id = $1', [
                id, installation
            ])
        } else {
            await this._pg.query('INSERT INTO "slackTokens"(id, installation) VALUES($1, $2)', [
                id, installation
            ])
        }
    }

    async get(id) {
        this._logger.info(`Retrieving installation from ${id}.`)
        const result = await this._pg.query('SELECT (installation) FROM "slackTokens" WHERE id = $1', [
            id
        ])
        return result?.rows[0]?.installation
    }
}
