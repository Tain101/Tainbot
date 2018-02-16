const Discord     = require('discord.js');
const client      = new Discord.Client({autoReconnect:true});
const commands = require(__dirname  + '/commands.js');
const utils = require(__dirname  + '/utils.js');
const logger = require(__dirname  + '/logger.js');


client.on('ready', () => {
	logger.info(`Logged in as ${client.user.tag}!`);
  try{
	commands.loadCommands();
  }catch(err){
    logger.crit('error loading commands:');
    logger.crit(err.stack);
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
	logger.crit(error);
	client.destroy();
});

client.login(process.env.DISCORD_BOT_TOKEN);


//https://glitch.com/edit/#!/deltabot
process.on('uncaughtException', function (err) {
	logger.info(`${client ? 'SH ' + client.id + ' ' : ''}Fatal Error!\n`, err)
	if (client) {
		// client.broadcastEval('process.exit()')
		// client.sent('kill')
	}
	process.exit()
})