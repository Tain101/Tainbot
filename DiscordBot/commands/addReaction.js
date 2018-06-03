const utils	  = require(global.rDir + '/utils.js');

const req			= utils.req;
const log     = utils.log('addReaction.js');

const addReactionCommand = function addReactionCommand(message){
	//TODO prevent duplicates
	//TODO allow direct image upload
	//TODO allow lists/mass additions
	//TODO reply with confirmation of images added
	let reactions = global.reactions || utils.readJSON(__dirname  + '/reactions.json');

	let count = 0;
	const args = message.content.split(' ');
	const key = args[1].toLowerCase();
	let attachmentsArray = message.attachments.array();
	// const reaction = message.content.slice(message.content.indexOf(key)).slice(key.length).trim();
	//str.slice(str.indexOf("welcome")).slice("welcome".length);
	// console.log(`${message.author} added a ${key} reaction: ${reaction}`)
	if(!reactions[key]){
		reactions[key] = [];
	}
	for(const attachment in attachmentsArray){
		reactions[key].push(attachment.url);
		console.log(attachment.url);
		count += 1;
	}
	for(let i = 2; i<args.length; i++){
		reactions[key].push(args[i]);
		console.log(args[i]);
		count += 1;
	}
	// reactions[key].push(reaction);
	utils.writeJSON('reactions.json', reactions);
	global.reactions = utils.readJSON(__dirname  + '/reactions.json');
	message.reply(`added ${count} to ${key}`);
	console.log(`${message.author} added ${count} to ${key}`);
};

exports.name        = `addreaction`;
exports.description = `adds a new reaction option\n usage: ${global.prefix}addreaction [keyword] [reaction text/image]`;
exports.call        = addReactionCommand;