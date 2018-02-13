// let wolfram = require('wolfram-alpha').createClient(process.env.WOLFRAM_APP_ID);
const logger = require(__dirname + '/logger.js');

let Client = require('node-wolfram');
let wolfram = new Client(process.env.WOLFRAM_APP_ID);


const wfQuery = function wfQuery(message){
  const key = 'wf';
  const args = message.content.split(' ');
  const question = message.content.slice(message.content.indexOf(key)).slice(key.length).trim();
  const tmpMsg = message.reply('asking swolfram alpha..');

  let embed = {
    "title": "Available Commands:",
    "color": 7729478,
    'fields': []
  };

  wolfram.query(question, function(err, result) {
    if(err){
      logger.warn(err);
      return;
    }

    let response = "";
    if(result.queryresult.$.success == "true"){
      // tmpMsg.Message.delete();

      if(result.queryresult.hasOwnProperty("warnings")){
        for(var i in result.queryresult.warnings){
          for(var j in result.queryresult.warnings[i]){
            if(j != "$"){
              try {
                embed.fields.push({
                  'name':'warnings',
                  'value':result.queryresult.warnings[i][j][0].$.text
                });
              // channel.sendMessage(result.queryresult.warnings[i][j][0].$.text);
              } catch(e){
                logger.info("WolframAlpha: failed displaying warning:\n"+e.stack());
              }
            }
          }
        } 
      }

      if(result.queryresult.hasOwnProperty("assumptions")){
        for(var i in result.queryresult.assumptions){
          for(var j in result.queryresult.assumptions[i]){
            if(j == "assumption"){
              try {
                embed.fields.push({
                  'name':'assumptions',
                  'value':result.queryresult.warnings[i][j][0].$.text
                });
                // channel.sendMessage(`Assuming ${result.queryresult.assumptions[i][j][0].$.word} is ${result.queryresult.assumptions[i][j][0].value[0].$.desc}`);
              } catch(e) {
                logger.info("WolframAlpha: failed displaying assumption:\n"+e.stack());
              }
            }
          }
        }
      }

      for(var a=0; a<result.queryresult.pod.length; a++){
        var pod = result.queryresult.pod[a];
        // response += "**"+pod.$.title+"**:\n";
        for(var b=0; b<pod.subpod.length; b++){
          var subpod = pod.subpod[b];
          //can also display the plain text, but the images are prettier
          for(var c=0; c<subpod.plaintext.length; c++){
            embed.fields.push({
              'name':pod.$.title,
              'value':subpod.plaintext[c]
            });
            // response += '\t'+subpod.plaintext[c];
          }
          // for(var d=0; d<subpod.img.length;d++){
          //   response += "\n" + subpod.img[d].$.src;
          //   channel.sendMessage(response);
          //   response = "";
          // }
        }
        response += "\n";
      }
      tmpMsg.edit('', {embed});
    } else {
      if(result.queryresult.hasOwnProperty("didyoumeans")){
        var msg = [];
        for(var i in result.queryresult.didyoumeans){
          for(var j in result.queryresult.didyoumeans[i].didyoumean) {
            msg.push(result.queryresult.didyoumeans[i].didyoumean[j]._);
          }
        }
        tmpMsg.edit("Did you mean: " + msg.join(" "));
      } else {
        tmpMsg.edit("No results from Wolfram Alpha :(");
      }
    }
  });
};

module.exports = wfQuery;