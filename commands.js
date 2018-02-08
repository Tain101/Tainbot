const utils = require(__dirname  + '/utils.js');
const logger = require(__dirname  + '/logger.js');


const commands  = require(__dirname  + '/commandList.js');
global.reactions = utils.readJSON(__dirname  + '/reactions.json');
global.whitelist = utils.readJSON(__dirname + '/whitelist.json');
let whitelist = global.whitelist;
// console.log('reactions loaded');
// console.log(global.reactions);
global.prefix = '.';
const prefix = global.prefix;
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

  const command = commands[key];
    if(!command) return;

  const authorID = message.author.id;
  if(authorID === process.env.OWNER_ID){
    command.call(message);
    return;
  }
  
  if(whitelist[authorID] && whitelist[authorID][key]){
    command.call(message);
    return;
  }

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


  // console.log(requiredPermissions);
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
      str += `${mentionList[user]} `;
      logger.info(`${mentionList[user]}`);
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