const utils	  = require(global.rDir + '/utils.js');

const req			= utils.req;
const log     = utils.log('ping.js');

exports.name                = 'ping';
exports.aliasList           = [];
exports.description         = `pong!`;
exports.call                = (message) => {message.reply(`Pong!`)};
exports.requiredPermissions = null;