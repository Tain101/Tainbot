//https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
const utils     = require(__dirname  + '/utils.js');
// let reactions = utils.readJSON(__dirname  + '/reactions.json');

const commandList = {
  'help':{
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

      embed.title = 'Reactions';
      embed.description = 'the following commands will reply with a random reaction based on the given keyword.\n';
      embed.fields = [];
      for (const react in global.reactions){
        embed.description += `**${react}**, `;
      }

      message.channel.send({embed});

    },
  },
  'ping':{
    description: 'pong!',
    call: (message) => {message.reply('Pong!');}
  },
  'setgame':{
    description: 'set\'s the game I play!',
    requiredPermissions: ['ADMINISTRATOR'],
    call: (message) => {
      const gameList = [
        "Tetris or something",
        "Pong or something",
        "Something funny in binary",
        ":(){ :|:& };:",
        "Cool kids use me.",
        "//Autogenerated",
        "Worlds #0 discord bot.",
        "TODO: write something clever.",
        "Half life 3",
        "skynet.exe",
        "With your harddrive",
        "With your bits",
        "With your bytes",
        "Destroy all humans",
        "hello world!",
        "rm -rf /",
        "feature",
        "git push --force",
        "for(;;)",
        "#define true (math.rand() > 0.5)",
        ""
      ];

      const gameName = utils.getRandomItem(gameList);
      console.log(gameName);
      message.client.user.setPresence({game:{name:gameName}});
    },
  },
  'addreaction':{
    description: `adds a new reaction option\n usage: ${global.prefix}addreaction [keyword] [reaction text/image]`,
    requiredPermissions: ['ADMINISTRATOR'],
    call: (message) => {
      //TODO prevent duplicates
      //TODO allow direct image upload
      //TODO allow lists/mass additions
      //TODO reply with confirmation of images added
      let reactions = global.reactions || utils.readJSON(__dirname  + '/reactions.json');

      let count = 0;
      const args = message.content.split(' ');
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
      for(let i = 2; i<args.length; i++){
        reactions[key].push(args[i]);
        console.log(args[i]);
        count += 1;
      }
      // reactions[key].push(reaction);
      utils.writeJSON('reactions.json', reactions);
      global.reactions = utils.readJSON(__dirname  + '/reactions.json');
      message.reply(`added ${count} to ${key}`);
      console.log(`${message.author} added ${count} to ${key}`);
    }
  },
  'info':{
    // description: `adds a new reaction option\n usage: ${global.prefix}addreaction [keyword] [reaction text/image]`,
    // requiredPermissions: ['ADMINISTRATOR'],
    call: (message) => {}
  },
  'wf':{
    description: `asks wolfram a question`,
    // requiredPermissions: ['ADMINISTRATOR'],
    call: (message) => {}
  }
};

module.exports = commandList;
// export default commandList;