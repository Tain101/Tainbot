// let wolfram = require('wolfram-alpha').createClient(process.env.WOLFRAM_APP_ID);
const logger = require(__dirname + '/logger.js');

let Client = require('node-wolfram');
let wolfram = new Client(process.env.WOLFRAM_APP_ID);


const wfQuery = function wfQuery(message){
  const key = 'wf';
  const args = message.content.split(' ');
  const question = message.content.slice(message.content.indexOf(key)).slice(key.length).trim();
  const tmpMsg = message.reply("asking wolframAlpha...");
  logger.info(tmpMsg);
  wolfram.query(question, function(err, result) {
    if(err){
      logger.warn(err);
      return;
    }
    let response = "";
    if(result.queryresult.$.success == "true"){
      logger.info(tmpMsg);
      for(const c in tmpMsg){
        logger.info(c);
        logger.info(tmpMsg[c]);
      }
      logger.info("=========");
      // tmpMsg.Message.delete();

      if(result.queryresult.hasOwnProperty("warnings")){
        for(var i in result.queryresult.warnings){
          for(var j in result.queryresult.warnings[i]){
            if(j != "$"){
              try {
                message.channel.sendMessage(result.queryresult.warnings[i][j][0].$.text);
              } catch(e){
                logger.warn("WolframAlpha: failed displaying warning:\n"+e.stack());
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
                message.channel.sendMessage(`Assuming ${result.queryresult.assumptions[i][j][0].$.word} is ${result.queryresult.assumptions[i][j][0].value[0].$.desc}`);
              } catch(e) {
                logger.warn("WolframAlpha: failed displaying assumption:\n"+e.stack());
              }
            }
          }
        }
      }

      for(var a=0; a<result.queryresult.pod.length; a++){

        var pod = result.queryresult.pod[a];
        response += "**"+pod.$.title+"**:\n";
        for(var b=0; b<pod.subpod.length; b++){
          var subpod = pod.subpod[b];
          //can also display the plain text, but the images are prettier
          /*for(var c=0; c<subpod.plaintext.length; c++)
          {
          response += '\t'+subpod.plaintext[c];
          }*/
          for(var d=0; d<subpod.img.length;d++){
            response += "\n" + subpod.img[d].$.src;
            message.channel.sendMessage(response);
            response = "";
          }
        }
        response += "\n";
      }

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