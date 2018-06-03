//staying online thanks to uptimerobot.com
//handles requests and displays homepage so that uptimerrobot.com correctly displays 'online' status
const utils	  = require(global.rDir + '/utils.js');

const req			= utils.req;
const log     = utils.log('main.js');
log('starting init');
require('./init')();

log('starting GitHubHooks');
require('/GitHubHooks');

log('starting Routing');
require('/Routing');

log('starting DiscordBot');
require('/DiscordBot');


