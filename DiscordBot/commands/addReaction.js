const utils	  = require(global.rDir + '/utils.js');

const req			= utils.req;
const log     = utils.log('addReaction.js');

const reactionHandler = req('DiscordBot/reactions');

const exportFunction  = (function() {
	const addReaction = function(message){
		log('exec');
		let words = message.content.split(' ');
		let reaction = words[1];
		let entries = words.slice(2);
		reactionHandler.addReactionEntries(reaction, entries);
		message.reply('added reaction');
	}

	addReaction.aliasList           = ['ar', 'addR', 'addReact'];
	addReaction.description         = `adds a new reaction!`;
	addReaction.requiredPermissions = null;

	return addReaction;
})();

module.exports = exportFunction;