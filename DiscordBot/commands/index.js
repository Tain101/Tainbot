const utils	  = require(global.rDir + '/utils.js');

const req			= utils.req;
const log     = utils.log('commands.js');

const fs = require('fs');
// const utils = require(__dirname  + '/utils.js');
// const logger = require(__dirname  + '/logger.js');
// const log = require('debug')('commands.js');
// const commands  = require(__dirname  + '/commandList.js');
global.reactions = utils.readJSON(__dirname  + '/reactions.json');

global.whitelist = utils.readJSON(__dirname + '/whitelist.json');
let whitelist = global.whitelist;
global.prefix = '.';
const prefix = global.prefix;
let commandList = {};


const loadCommands = function(){
	// directory();
	let files = fs.readdirSync(__dirname);
	for(const file in files){
		log(files[file]);
		const command = require(__dirname + '/' + files[file]);
		commandList[command.name] = command;
	}
};

const evaluate = function evaluate(message){
	if(!message.content.startsWith(prefix)) return;
	if(message.author.bot) return;

	//key is the first word of the message, without the prefix character
	const key = message.content.split(' ')[0].slice(prefix.length).toLowerCase();
	let reactions = global.reactions;
	if(reactions[key]){
		react(message, reactions[key]);
		return;
	}

	const command = commandList[key];
	const permissionsNeeded = command.requiredPermissions;
	if(!checkPermissions(message, permissionsNeeded)) return;

	command.call(message);
};

//https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
const checkPermissions = function checkPermissions(message, requiredPermissions){

	//owner overrides everything
	if(message.author.id === process.env.OWNER_ID){
		return true;
	}

	if(!message.member){
		return false;
	}



	const command = message.content.split(' ')[0];
	if(!requiredPermissions
		|| whitelist.global[command]
		|| whitelist.channels[message.channel.id][command]
		|| whitelist.users[message.user.id][command]){
			return true;
	}

	//equivalent to 'whitelist only'
	if(requiredPermissions === false){
		return false;
	}

	try{
		return message.member.hasPermission(requiredPermissions, false, false, false);
	}catch(err){
		log("error" + err);
		return false;

	}
};

const react = function replyFromList(message, list){
	let str = '';
	const mentionList = message.mentions.members.array();
	//reply to all users mentioned
	if(mentionList.length){
		for(const user in mentionList){
			str += `${mentionList[user]} `;
			log(`${mentionList[user]}`);
		}
	}else{
		//if nobody is mentioned reply to the author
		str += `${message.author} `;
	}

	const replyText = utils.getRandomItem(list);
	str += `${replyText}`;
	message.channel.send(str);
};

module.exports.evaluate = evaluate;
module.exports.loadCommands = loadCommands;