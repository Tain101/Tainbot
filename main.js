//staying online thanks to uptimerobot.com
//handles requests and displays homepage so that uptimerrobot.com correctly displays 'online' status
global.rDir = __dirname;
const {log, req} = require('./utils');

req('/Routing');
req('/DiscordBot');
req('/GitHubHooks');
