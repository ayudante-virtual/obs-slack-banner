const WebApp = require("./infra/WebApp");
const MessageForwarder = require("./MessageForwarder");
const { App } = require('@slack/bolt');

const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
});


const logger = console
const webapp = new WebApp(logger, `http://${process.env.WEBAPP_HOSTNAME}:${process.env.WEBAPP_PORT}`)
new MessageForwarder(logger, app, webapp);

(async () => {
    // Start the app
    await app.start(process.env.BOT_PORT || 3000);

    logger.info('⚡️ Bolt app is running!');
})();
