const utils	  = require(global.rDir + '/utils.js');

const req			= utils.req;
const log     = utils.log('info.js');

const exportFunction  = (function() {
	const info = function(message){
		log('exec');
		log(message);
	}

	info.aliasList           = [];
	info.description         =  `logs the message object`,
	info.requiredPermissions = false;

	return info;
})();

module.exports = exportFunction;