const utils	  = require(global.rDir + '/utils.js');

const req			= utils.req;
const log     = utils.log('info.js');

const printMessageInfo = function printMessageInfo(message){
	logger.info(message);
}

exports.name                = 'info';
exports.aliasList           = [];
exports.description         =  `logs the message object`,
exports.call                = printMessageInfo;
exports.requiredPermissions = false;