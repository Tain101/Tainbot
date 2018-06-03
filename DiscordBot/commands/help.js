const utils	  = require(global.rDir + '/utils.js');

const req			= utils.req;
const log     = utils.log('help.js');

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
exports.call                = queryWolfram;
exports.requiredPermissions = null;