const utils	  = require(global.rDir + '/utils.js');

const req			= utils.req;
const log     = utils.log('setGame.js');

const setBotGame = function setBotGame(message){
	const gameList = [
	"Tetris or something",
	"Pong or something",
	"Something funny in binary",
	":(){ :|:& };:",
	"Cool kids use me.",
	"//Autogenerated",
	"Worlds #0 discord bot.",
	"TODO: write something clever.",
	"Half life 3",
	"skynet.exe",
	"With your harddrive",
	"With your bits",
	"With your bytes",
	"Destroy all humans",
	"hello world!",
	"rm -rf /",
	"feature",
	"git push --force",
	"for(;;)",
	"#define true (math.rand() > 0.5)",
	""
	];

	const gameName = utils.getRandomItem(gameList);
	console.log(gameName);
	message.client.user.setPresence({game:{name:gameName}});
}

exports.name                = 'setGame';
exports.aliasList           = [];
exports.description         =  `set's the game I play`,
exports.call                = setBotGame;
exports.requiredPermissions = false;