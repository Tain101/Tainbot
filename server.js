const { join }          = require('path');
global.__rootDir = __dirname;
global.req = function(file){
	return require(join(global.__rootDir, file));
};

//enable debuggers asap
require('debug').enable('*');

//staying online thanks to uptimerobot.com
//handles requests and displays homepage so that uptimerrobot.com correctly displays 'online' status
require(__dirname + '/routing.js');
//discord bot
require(__dirname  + '/discordBot.js');


