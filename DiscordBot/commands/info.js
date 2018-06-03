const printMessageInfo = function printMessageInfo(message){
	logger.info(message);
}

exports.name                = 'info';
exports.aliasList           = [];
exports.description         =  `logs the message object`,
exports.call                = printMessageInfo;
exports.requiredPermissions = false;