const utils = require(__dirname  + '/../utils.js');
const logger = require(__dirname  + '/../logger.js');
const addReactionCommand = function addReactionCommand(message){
	//TODO prevent duplicates
	//TODO allow direct image upload
	//TODO allow lists/mass additions
	//TODO reply with confirmation of images added
	let reactions = global.reactions || utils.readJSON(__dirname  + '/../reactions.json');

	let count = 0;
	const args = message.content.split(' ');
  if(args.length < 3){
    message.reply(`you did it wrong.`);
    return;
  };
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
	for(let i = 2; i < args.length; i++){
    //group words wrapped in "
    if(args[i].startsWith('"')){
      let str = "";
      str += args[i].substr(1) + ' ';
      i += 1;

      while(!args[i].endsWith('"') && i < args.length){
        str += args[i] + ' ';
        i += 1;
      }
      
      str += args[i].slice(0, args[i].length-1);;
      i += 1;
      
      logger.info("str");
      logger.info(str);
      reactions[key].push(str);
      count += 1;
      continue;
    }
		reactions[key].push(args[i]);
		console.log(args[i]);
		count += 1;
	}
	// reactions[key].push(reaction);
	utils.writeJSON(__dirname  + '/../reactions.json', reactions);
	global.reactions = utils.readJSON(__dirname  + '/../reactions.json');
	message.reply(`added ${count} to ${key}`);
	console.log(`${message.author} added ${count} to ${key}`);
};

exports.aliasList   = ['ar', 'newReaction'];
exports.name        = `addreaction`;
exports.description = `adds a new reaction option\n usage: ${global.prefix}addreaction [keyword] [reaction text/image]`;
exports.call        = addReactionCommand;