const Discord  = require('discord.js');
const client   = new Discord.Client({autoReconnect:true});
const commands = require(__dirname  + '/commands.js');
const utils    = require(__dirname  + '/utils.js');
const log      = require('debug')('discordBot.js');
const error    = require('debug')('discordBot.js:error');
error.log      = console.error.bind(console);


client.on('ready', () => {
	log(`Logged in as ${client.user.tag}!`);
	const commandCount = commands.loadCommands();
	log(`loaded ${commandCount} commands!`);
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
	error(error);
	client.destroy();
});

client.login(process.env.DISCORD_BOT_TOKEN);


//https://glitch.com/edit/#!/deltabot
process.on('uncaughtException', function (err) {
	log(`${client ? 'SH ' + client.id + ' ' : ''}Fatal Error!\n`, err)
	if (client) {
		// client.broadcastEval('process.exit()')
		// client.sent('kill')
	}
	process.exit()
})