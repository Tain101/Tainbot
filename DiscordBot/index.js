const utils	  = require(global.rDir + '/utils.js');

const req			= utils.req;
const log     = utils.log('DiscordBot');

const Discord  = require('discord.js');
const client   = new Discord.Client({autoReconnect:true});
const commandHandler = require(__dirname  + '/commands');
const reactionHandler = require(__dirname  + '/reactions');

const parseMessage = function parseMessage(message){
	let messageObject = message;
	log('\tParseMessage');
	const prefix = '.';
	if(!message.content.startsWith(prefix)
		|| message.author.bot){
		return false;
	}
	// const messageObject = {
	// 	author: message.author,
	// 	key: message.content.split(' ')[0].slice(prefix.length).toLowerCase(),
	// };
	messageObject.key = message.content.split(' ')[0].slice(prefix.length).toLowerCase();
	return messageObject;
}

client.on('ready', () => {
	log(`Logged in as ${client.user.tag}!`);
	const commandCount = commandHandler.commandList.length;
	log(`loaded ${commandCount} commands!`);
	// log('loaded: %o', reactionHandler.reactionList);
});

client.on('message', (message) => {
	log('OnMessage');
	const messageObject = parseMessage(message);
	if(!messageObject){
		return messageObject;
	}

	return commandHandler.evaluate(messageObject)
			|| reactionHandler.evaluate(messageObject)
			|| evaluateMeta(messageObject);

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
});
