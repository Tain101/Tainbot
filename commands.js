const fs = require('fs');
const isURL = require('is-url');
const readDir = require('fs-readdir-recursive');

const utils = require(__dirname  + '/utils.js');
const logger = require(__dirname  + '/logger.js');

// const commands  = require(__dirname  + '/commandList.js');
global.reactions = utils.readJSON(__dirname  + '/reactions.json');

global.whitelist = utils.readJSON(__dirname + '/whitelist.json');
let whitelist = global.whitelist;
global.prefix = '.';
const prefix = global.prefix;


const isImage = function(url){
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

const loadFolder = function(folder){
  
};

const loadCommands = function(){
	// directory();
  let commandList = {};
	let files = fs.readdirSync(__dirname + '/commands/');
  files = readDir(__dirname + '/commands/');
  logger.info(files);
	for(const file in files){
    try{
      const command = require(__dirname + '/commands/' + files[file]);
      commandList[command['name'].toLowerCase()] = command;
      logger.info(`loaded command: ${command['name'].toLowerCase()}`);
    }catch(err){
      logger.warn('could not load file:  ' + files[file]);
    }
	}
  global.commandList = commandList;
  return commandList;
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
  
	let command = global.commandList[key];
  
  //check for an alias
	if(!command){
    for(const com in global.commandList){
      if(global.commandList[com].aliasList){
        for(let i = 0; i < global.commandList[com].aliasList.length; i++){
          if(global.commandList[com].aliasList[i].toLowerCase() === key){
            command = global.commandList[com];
          }
        }
      }
    }
  }

	const permissionsNeeded = command.requiredPermissions;
	if(!checkPermissions(message, permissionsNeeded)) return;
  try{
	  command.call(message);
  }catch(err){
    logger.warn(`${message.author.id} tried to call ${command.name}`);
    logger.warn(err.stack);
  }
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
	if(requiredPermissions === undefined
    || requiredPermissions.length === 0
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
		logger.warn("error" + err);
		return false;

	}
};

const react = function replyFromList(message, list){
	let str = '';
	const mentionList = message.mentions.members.array();
	//reply to all users mentioned
	if(mentionList.length){
		for(const user in mentionList){
			// str += `${mentionList[user]} `;
			logger.info(`${mentionList[user]}`);
		}
	}else{
		//if nobody is mentioned reply to the author
		// str += `${message.author} `;
	}

	const replyText = utils.getRandomItem(list);
	str += `${replyText}`;
  if(isURL(str) && isImage(str)){
    const embed = {
      "color": message.channel.members.find('id', message.author.id).displayColor,
      "image": {
        "url": str
      }
    }
    message.channel.send({embed});
  }else{
	  message.channel.send(str);
  }
};

const runCommand = function runCommand(commandName){
  global.commandList = global.commandList || loadCommands();
  
  commandName = commandName.toLowerCase();
  let command = global.commandList[commandName];
  
  //check for an alias
	if(!command){
    for(const com in global.commandList){
      if(global.commandList[com].aliasList){
        for(let i = 0; i < global.commandList[com].aliasList.length; i++){
          if(global.commandList[com].aliasList[i].toLowerCase() === commandName){
            command = global.commandList[com];
          }
        }
      }
    }
  }
  
  try{
	  command.call();
  }catch(err){
    logger.warn(`commands.runCommand()`);
    logger.warn(err.stack);
  }
}

module.exports.evaluate = evaluate;
module.exports.loadCommands = loadCommands;
module.exports.runCommand = runCommand;