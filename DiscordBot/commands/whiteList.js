const utils	  = require(global.rDir + '/utils.js');

const req			= utils.req;
const log     = utils.log('whiteList.js');

const whiteListUser = function whiteListUser(message){
	//TODO
};

exports.name        = `whitelist`;
exports.aliasList   = ['wl', 'white', 'enable'];
exports.description = `allows user to use a command`;
exports.call        = whiteListUser;