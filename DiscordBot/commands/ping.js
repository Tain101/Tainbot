const utils	  = require(global.rDir + '/utils.js');

const req			= utils.req;
const log     = utils.log('ping.js');

const exportFunction  = (function() {
	const ping = function(message){
		log('exec');
		if(!message) return;
		message.reply('Pong!')
	}

	ping.aliasList           = [];
	ping.description         = `pong!`;
	ping.requiredPermissions = null;

	return ping;
})();

module.exports = exportFunction;