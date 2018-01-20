const Discord     = require('discord.js');
const client      = new Discord.Client({autoReconnect:true});
const commandList = require(__dirname  + '/commandList.js');
const utils = require(__dirname  + '/utils.js');
const prefix = '!';
// import { commandList } from (__dirname  + '/commandList.js');
// console.log(commandList);

const checkPermissions = function checkPermissions(message, requiredPermissions){

	if(!requiredPermissions){
		return true;
	}
	if(!message.member){
		return false;
	}

	console.error(requiredPermissions);
	console.log(requiredPermissions);
	try{
	return message.member.hasPermission(requiredPermissions, false, true, true);
	}catch(err){
		return console.log(err);
	}
}

const evaluateCommand = function evaluateCommand(message){
	const key = message.content.split(' ')[0];
	if (
		commandList[key]
		&& checkPermissions(message, commandList[key].permissionLevel)
	) {
		commandList[key].call(message);
	}
};

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
	// if 1st char isn't '!' or if sender is a bot return;
	
  if (message.content.toLowerCase() === 'ping'
     || message.content.toLowerCase() === '!ping') {
    commandList['!ping'].call(message);
  }
  if (message.content[0] !== prefix || message.author.bot) {    
		return;
	}
	evaluateCommand(message);
});

client.on('disconnected', function botDiscFunc() {
  utils.writeFile(`logs/${Date.now()}.log`);
	client.destroy();
})

client.on('error', function botErrorFunc(error){
  utils.writeFile(`logs/${Date.now()}.log`);
	console.error(error);
	client.destroy();
});

client.login(process.env.DISCORD_BOT_TOKEN);
