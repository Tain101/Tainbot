const utils	  = require(global.rDir + '/utils.js');

const req			= utils.req;
const log     = utils.log('listReaction.js');

const reactionHandler = req('DiscordBot/reactions');

const exportFunction  = (function() {
	const listReaction = function(message){
		log('exec');
		let reaction = message.content.split(' ')[1];
		message.reply(reactionHandler.getReactionEntries(reaction).map((item) => { return '<' + item + '>'}));
	}

	listReaction.aliasList           = ['lr', 'listR', 'listReact'];
	listReaction.description         = `lists the entries of a reaction`;
	listReaction.requiredPermissions = null;

	return listReaction;
})();

module.exports = exportFunction;