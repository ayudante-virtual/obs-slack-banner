const PgConnection = require("./infra/PgConnection");
const WebApp = require("./infra/WebApp");
const MessageForwarder = require("./MessageForwarder");
const {App} = require('@slack/bolt');
const SecretsRepo = require('./infra/SecretsRepo')

const logger = console

const secretsRepo = new SecretsRepo(PgConnection, logger)

const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    stateSecret: 'my-state-secret',
    scopes: ['channels:history'],
    installationStore: {
        storeInstallation: async installation => {
            if (installation.isEnterpriseInstall) {
                // support for org wide app installation
                return await secretsRepo.save(installation.enterprise.id, installation);
            }
            // single team app installation
            return await secretsRepo.save(installation.team.id, installation);
        },
        fetchInstallation: async installQuery => {
            // change the line below so it fetches from your database
            if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
                // org wide app installation lookup
                return await secretsRepo.get(installQuery.enterpriseId);
            }
            if (installQuery.teamId !== undefined) {
                // single team app installation lookup
                return await secretsRepo.get(installQuery.teamId);
            }
            throw new Error('Failed fetching installation');
        }
    }
});

const webapp = new WebApp(logger, `http://${process.env.WEBAPP_HOSTNAME}:${process.env.WEBAPP_PORT}`)
new MessageForwarder(logger, app, webapp);

(async () => {
    // Start the app
    await app.start(process.env.BOT_PORT || 3000);

    logger.info('⚡️ Bolt app is running!');
})();
