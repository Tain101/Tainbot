const utils	  = require(global.rDir + '/utils.js');

const req			= utils.req;
const log     = utils.log('removeReaction.js');

const reactionHandler = req('DiscordBot/reactions');

const exportFunction  = (function() {
	const removeReaction = function(message){
		log('exec');
		let words = message.content.split(' ');
		let reaction = words[1];
		let entries = words[2];
		reactionHandler.removeReactionEntry(reaction, entry);
		message.reply(reactionHandler.getReactionEntries(reaction).map((item) => { return '<' + item + '>'}));
	}

	removeReaction.aliasList           = ['remR', 'remReact'];
	removeReaction.description         = `removes a reaction from the list`;
	removeReaction.requiredPermissions = 'ADMINISTRATOR';

	return removeReaction;
})();

module.exports = exportFunction;