const utils	  = require(global.rDir + '/utils.js');

const req			= utils.req;
const log     = utils.log('whiteList.js');

const exportFunction  = (function() {
	const whiteListUser = function(message){
		log('exec');
		//todo
	}

	whiteListUser.aliasList           = ['wl', 'white', 'enable'];
	whiteListUser.description         = 'TODO: //allows user to use a command';
	whiteListUser.requiredPermissions = 'ADMINISTRATOR';

	return whiteListUser;
})();

module.exports = exportFunction;