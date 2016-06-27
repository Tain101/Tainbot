var Discord = require("discord.js");
var Auth    = require('./auth.json');

var mybot = new Discord.Client();
mybot.loginWithToken(Auth.token);


mybot.on("message", function(message) {
    switch(message.content){
        case "!ping":
            mybot.sendMessage(message, "!pong");
            break;
        case "!game":
            moveUsersToGame(message);
            break;
        default:
    }

});

/**
 * Moves all users who are playing same game as author, to voice channel of that name.
 *
 * @param  {Message} message Message containing "!game"
 *
 * @return {null}
 */

function moveUsersToGame (message) {
    "use strict";
    var messageToSend = "";// message to send in response
    var game = message.author.game; // game user is playing

    if(game !== null){

        messageToSend += message.author + " is currently playing: " + game.name + "\n";
        messageToSend += "These players are  playing " + game.name + ":\n";
        messageToSend += "```" + "\n";

        var userList = mybot.users.getAll("game", game);
        for (var i = 0; i < userList.length; i++) {
            messageToSend += userList[i].name;
        }

        messageToSend += "```" + "\n";

        var gameChannel = mybot.channels.get("name", game.name);
        if(gameChannel !== null){
            messageToSend += "I found this channel: " + gameChannel + "\n";
            for (var i = 0; i < userList.length; i++) {
                mybot.moveMember(userList[i], gameChannel, (function (err){
                    if(err) console.error("err:" + err);
                }));
            }
        }
    }
    else{
        messageToSend = message.author + " is not playing anything.";
    }

    mybot.sendMessage(message, messageToSend);
}