//staying online thanks to uptimerobot.com
//handles requests and displays homepage so that uptimerrobot.com correctly displays 'online' status
const utils	  = require('./utils.js');

const req			= utils.req;
const log     = utils.log('main.js');
log('starting init');
req('./init')();

log('starting GitHubHooks');
req('/GitHubHooks');

log('starting Routing');
req('/Routing');

log('starting DiscordBot');
req('/DiscordBot');


