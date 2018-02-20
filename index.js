const Botgram = require('botgram');
const figlet = require('figlet');

const { TELEGRAM_BOT_TOKEN } = process.env;

if (!TELEGRAM_BOT_TOKEN) {
  console.error('Seems like you forgot to pass Telegram Bot Token. I can not proceed...');
  process.exit(1);
}

const bot = new Botgram(TELEGRAM_BOT_TOKEN);

function onMessage(msg, reply) {
  figlet(msg.text, (err, data) => {
    if (err) {
      reply.text('An error occured. Probably text format is not correct.').then();
      return;
    }
    const markdownResult = `${'```\n'}${data}${'\n```'}`;
    reply.markdown(markdownResult).then();
  });
}

bot.text(onMessage);
