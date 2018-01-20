const utils = require(__dirname  + '/utils.js');

const commands  = require(__dirname  + '/commandList.js');
global.reactions = utils.readJSON(__dirname  + '/reactions.json');
console.log('reactions loaded');
console.log(reactions["bully"]);
global.prefix = '.';
const prefix = global.prefix;
const evaluate = function evaluate(message){
	if(!message.content.startsWith(prefix)) return;
	if(message.author.bot) return;

	//key is the first word of the message, without the prefix character
	const key = message.content.split(' ')[0].slice(prefix.length).toLowerCase();

	if(reactions[key]){
		react(message, reactions[key]);
		return;
	}

	const command = commands[key];
    if(!command) return;

	const permissionsNeeded = command.permissions;
	if(!checkPermissions(message, permissionsNeeded)) return;

	command.call(message);
};

//https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
const checkPermissions = function checkPermissions(message, requiredPermissions){

	if(!requiredPermissions){
		return true;
	}
	if(!message.member){
		return false;
	}

	// console.error(requiredPermissions);
	console.log(requiredPermissions);
	try{
		return message.member.hasPermission(requiredPermissions, false, true, true);
	}catch(err){
		return console.error(err);
	}
};

const react = function replyFromList(message, list){
	let str = '';
	const mentionList = message.mentions.members.array();
  //reply to all users mentioned
  if(mentionList.length){
  	for(const user in mentionList){
  		str += `${mentionList[user]} `;
  		console.log(`${mentionList[user]}`);
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