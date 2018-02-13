const utils = require(__dirname  + '/../utils.js');
const commandList = global.commandList;

const helpCommand = function helpCommand(message){
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

	embed.title = 'Reactions';
	embed.description = 'the following commands will reply with a random reaction based on the given keyword.\n';
	embed.fields = [];
	for (const react in global.reactions){
		embed.description += `**${react}**, `;
	}

	message.channel.send({embed});
}

exports.name                = 'help';
exports.aliasList           = [];
exports.description         =  `You're lookin' at it.`,
exports.call                = helpCommand;
exports.requiredPermissions = null;