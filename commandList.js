//https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
const utils = require(__dirname  + '/utils.js');


const commandList = {
    '!help':{
        description: 'You\'re lookin\' at it.',
        call: (message) => { 
            let embed = {
              "title": "Available Commands:",
              "color": 7729478,
              'fields': []
            };

            for (const command in commandList){
                if(utils.checkPermissions(message, commandList[command].requiredPermissions)){
                    embed.fields.push({'name': command, 'value': commandList[command].description});
                }
            }
        message.reply('', {embed});

      // channel.send({ embed });
  },
},
'!ping':{
    description: 'pong!',
    call: (message) => {message.reply('Pong!');}
},
'!setGame':{
    description: 'set\'s the game I play!',
    requiredPermissions: ['ADMINISTRATOR'],
    call: (message) => {
        const gameList = utils.getLists().games; 

        const gameName = utils.getRandomItem(gameList);
        console.log(gameName);
        message.client.user.setPresence({game:{name:gameName}});
    },
},
'!bully':{
    description: 'bully @ a user if you are a meanie',
    call: (message) => {
      
      let str = "";
      const mentionList = message.mentions.members.array();
      if(mentionList.length){
        for(const user in mentionList){
          str += `${mentionList[user]} `;
          console.log(`${mentionList[user]}`);
        }
      }else{
        str += `${message.author} `;
      }
      
      const bullyList = utils.getLists().bully;
      const bullyText = utils.getRandomItem(bullyList);
      str += `${bullyText}`;
      message.channel.send(str);
      
      
      
    }
},
'!nobully':{
    description: '@ a user if they should stop being a bully',
    call: (message) => {
        let str = "";
      const mentionList = message.mentions.members.array();
      if(mentionList.length){
        for(const user in mentionList){
          str += `${mentionList[user]} `;
          console.log(`${mentionList[user]}`);
        }
      }else{
        str += `${message.author} `;
      }
      
      const noBullyList = utils.getLists().noBully;
      const noBullyText = utils.getRandomItem(noBullyList);
      str += `${noBullyText}`;
      message.channel.send(str);
      
    }
}
};

module.exports = commandList;
// export default commandList;