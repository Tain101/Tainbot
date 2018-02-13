const utils = require(__dirname  + '/../utils.js');
const listReaction = function listReaction(message){
  
	let reactions = global.reactions || utils.readJSON(__dirname  + '/../reactions.json');
  const args = message.content.split(' ');
  
  if(args.length !== 2){
    message.reply(`you did it wrong.`);
    return;
  };
	
  const key = args[1].toLowerCase();
  if(reactions[key]){
    let str = '\n';
    for(let i = 0; i < reactions[key].length; i++){
      str += '<' + reactions[key][i] + '>\n';
    }
    message.reply(str);
    return;
  }
  
  message.reply('i dont think thats a reaction');
};

exports.aliasList   = ['lr'];
exports.name        = `listreaction`;
exports.description = `adds a new reaction option\n usage: ${global.prefix}addreaction [keyword] [reaction text/image]`;
exports.call        = listReaction;