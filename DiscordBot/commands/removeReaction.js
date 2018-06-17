const utils	  = require(global.rDir + '/utils.js');

const req			= utils.req;
const log     = utils.log('removeReaction.js');

const reactionHandler = req('DiscordBot/reactions');

const exportFunction  = (function() {
	const removeReaction = function(message){
		log('exec');
		let words = message.content.split(' ');
		let reaction = words[1];
		let entry = words[2];
		log('removing entry: %s , from:%s', entry, reaction);
		reactionHandler.removeReactionEntry(reaction, entry);
		log('done removing', entry);
		const newList = reactionHandler.getReactionEntries(reaction);
		log(newList);

		// message.reply(reactionHandler.getReactionEntries(reaction).map((item) => { return '<' + item + '>'}));
		message.reply(newList.map((item) => { return '<' + item + '>'}));
	}

	removeReaction.aliasList           = ['remr', 'remreact'];
	removeReaction.description         = `removes a reaction from the list`;
	removeReaction.requiredPermissions = 'ADMINISTRATOR';

	return removeReaction;
})();

module.exports = exportFunction;