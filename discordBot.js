const Discord     = require('discord.js');

const client      = new Discord.Client({autoReconnect:true});

const chalk = require('chalk');

const commands = require(__dirname  + '/commands.js');
const utils = require(__dirname  + '/utils.js');
const logger = require(__dirname  + '/logger.js');
const intervals = require(__dirname  + '/intervals.js');


client.on('ready', () => {
  logger.info(!!chalk.supportsColor.stdout);
	logger.info(chalk.blue(`Logged in as ${client.user.tag}!`));
  global.bot = client;
  try{
	  commands.loadCommands();
    //wait 15 seconds before stuff
    setTimeout(intervals.start, 1000);
  }catch(err){
    logger.error('error loading commands:');
    logger.error(err.stack);
  }
});

client.on('message', (message) => {
	commands.evaluate(message);
});

client.on('disconnected', function botDiscFunc() {
	// utils.writeFile(__dirname + `/logs/${Date.now()}.txt`, 'disconnected');
	client.destroy();
})

client.on('error', function botErrorFunc(error){
	// utils.writeFile(__dirname + `/logs/${Date.now()}.txt`, error);
	logger.error(error);
	client.destroy();
});

client.login(process.env.DISCORD_BOT_TOKEN);


//https://glitch.com/edit/#!/deltabot
process.on('uncaughtException', function (err) {
	logger.info(`${client ? 'SH ' + client.id + ' ' : ''}Fatal Error!\n`, err);
  logger.info('+++++++++++=');
  logger.info(err.stack);
	if (client) {
		// client.broadcastEval('process.exit()')
		// client.sent('kill')
	}
	process.exit()
})