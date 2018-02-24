const logger = require(__dirname  + '/../logger.js');
const copyUser = function(user){
  
  global.bot.user.setAvatar(user.displayAvatarURL);
  global.bot.user.setUsername(user.username);
};

const printMessageInfo = function printMessageInfo(message = process.env.IMPERSONATE_ID){
  let str = message;
  if(message.content){
    str = message.content.split(' ')[1];
  }
  let user = global.bot.fetchUser(str).then((user) => {logger.info(user); copyUser(user);});
  // logger.info(user);
}

exports.name                = 'impersonate';
exports.aliasList           = [];
exports.description         =  `logs the message object`,
exports.call                = printMessageInfo;
exports.requiredPermissions = false;