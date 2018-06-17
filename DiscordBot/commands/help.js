const utils						= require(global.rDir + '/utils.js');

const req							= utils.req;
const log							= utils.log('help.js');
const commandHandler = req('DiscordBot/commands');
// const commandHandler = require(__dirname  + '/commands');

const exportFunction  = (function() {
	const help = function(message){
		log('exec');
		log(commandHandler);
		log(commandHandler.commandList);
		commandList = commandHandler.commandList;
		let embed = {
			"title": "Available Commands:",
			"color": 7729478,
			'fields': []
		};

		for (const command in commandList){
			if(utils.checkPermissions(message, commandList[command].requiredPermissions)){
				embed.fields.push({'name': command, 'value': commandList[command].description});
			}
		}
		message.reply('', {embed});

		// embed.title = 'Reactions';
		// embed.description = 'the following commands will reply with a random reaction based on the given keyword.\n';
		// embed.fields = [];
		// for (const react in global.reactions){
			// embed.description += `**${react}**, `;
		// }
//
		// message.channel.send({embed});
	}

	help.name                = 'help';
	help.aliasList           = ['h', 'halp'];
	help.description         = 'You\'re lookin\' at it.',
	help.requiredPermissions = null;

	return help;
})();

module.exports = exportFunction;