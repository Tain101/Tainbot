const utils	  = require(global.rDir + '/utils.js');

const req			= utils.req;
const log     = utils.log('commands.js');

const fs = require('fs');

//https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
const checkPermissions = function checkPermissions(message, requiredPermissions){
	log('checkPermissions');

	//owner overrides everything
	if(message.author.id === process.env.OWNER_ID){
		log('owner')
		return true;
	}
	//must be a member of the server sent from
	if(!message.member){
		log('!member')
		return false;
	}
	//if there are no permissions
	if(!requiredPermissions){
		log('no perms')
		return true;
	}

	//TODO whitelist

	//equivalent to 'whitelist only'
	if(requiredPermissions === false){
		log('wlist only')
		return false;
	}

	try{
		log('hasPermission()')
		return message.member.hasPermission(requiredPermissions, false, false, false);
	}catch(err){
		log("error" + err);
		return false;
	}
};

// const react = function replyFromList(message, list){
// 	let str = '';
// 	const mentionList = message.mentions.members.array();
// 	//reply to all users mentioned
// 	if(mentionList.length){
// 		for(const user in mentionList){
// 			str += `${mentionList[user]} `;
// 			log(`${mentionList[user]}`);
// 		}
// 	}else{
// 		//if nobody is mentioned reply to the author
// 		str += `${message.author} `;
// 	}

// 	const replyText = utils.getRandomItem(list);
// 	str += `${replyText}`;
// 	message.channel.send(str);
// };

// module.exports.evaluate = evaluate;
// module.exports.loadCommands = loadCommands;

class CommandHandler {
	constructor(){
		this.commandList	= this.loadCommands();
		this.aliasList		= this.loadAliasList();
	}

	loadCommands(){
		log('loading commands')
		let files = fs.readdirSync(__dirname);
		let commands = {};
		for(const file in files){
			if(files[file] === 'index.js'){
				continue;
			}
			log(files[file]);
			const command = require(__dirname + '/' + files[file]);
			commands[command.name] = command;
		}
		log(Object.keys(commands));
		log('\tdoneloading comamnds!');
		return commands;
	}

	loadAliasList(){
		log('loading alias');
		let aliasList = {};
		const commKeyList = Object.keys(this.commandList);
		for(let i = 0; i < commKeyList.length; i++){
			const key = commKeyList[i];
			const command = this.commandList[key];
			for(let j = 0; j < command.aliasList.length; j++){
				const alias = command.aliasList[j];
				aliasList[alias] = command;
			}
		}
		log(Object.keys(aliasList));
		log('\tdoneloading comamnds!');
		return aliasList;
	}

  evaluate(messageObject){
  	log('\t\tcommandEvaluate');
  	const command = this.commandList[messageObject.key] || this.aliasList[messageObject.key];
  	log(this.commandList[messageObject.key]);
  	log(this.aliasList[messageObject.key]);
  	log(command);
  	log('this.commandList:%O', Object.keys(this.commandList));
  	log('this.aliasList:%O', Object.keys(this.aliasList));
  	log('messageObject.key:%o', messageObject.key);
  	// log(!checkPermissions(messageObject, command.permissions));
  	if(  !command
  		|| !checkPermissions(messageObject, command.permissions)){
  		return false;
  	}
  	log('commandEvaluate');
  	// log(command());
  	command(messageObject);
  	return true;
  }
}

module.exports = new CommandHandler();