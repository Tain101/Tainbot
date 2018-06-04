//staying online thanks to uptimerobot.com
//handles requests and displays homepage so that uptimerrobot.com correctly displays 'online' status
require('./init')();

const utils	  = require(global.rDir + '/utils.js');

const req			= utils.req;
const log     = utils.log('main.js');

log('starting glitch server');

if(true){
  log('starting GitHubHooks ' + '========================================' + 'app is listening' );
  req('/GitHubHooks');
}

if(true){
  log('starting Routing ' + '============================================' + 'app is listening' );
  req('/Routing');
}

if(true){
  log('starting DiscordBot ' + '=========================================' + 'app is listening' );
  req('/DiscordBot');
};

