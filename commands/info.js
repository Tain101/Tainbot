const logger = require(__dirname  + '/../logger.js');
const copyUser = function(user){
  let bot = user.client.user;
  bot.setAvatar(user.displayAvatarURL);
  bot.setUsername(user.username);
};

const printMessageInfo = function printMessageInfo(message){
	logger.info(message);
  // let str = message.content.split(' ')[1];
  // let user = message.client.fetchUser(str).then((user) => {logger.info(user); copyUser(user);});
  // logger.info(user);
}

exports.name                = 'info';
exports.aliasList           = [];
exports.description         =  `logs the message object`,
exports.call                = printMessageInfo;
exports.requiredPermissions = false;