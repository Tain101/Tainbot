const Discord     = require('discord.js');
const client      = new Discord.Client({autoReconnect:true});
const commandList = require(__dirname  + '/commandList.js');
const commands = require(__dirname  + '/commands.js');
const utils = require(__dirname  + '/utils.js');

// import { commandList } from (__dirname  + '/commandList.js');
// console.log(commandList);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {


	commands.evaluate(message);
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
