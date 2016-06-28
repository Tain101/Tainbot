"use strict";
require('./owStats.js')(); //http://stackoverflow.com/a/28066576

var Discord = require("discord.js");
var Auth    = require('./auth.json');
// var owStats = owStats || {};
var mybot = new Discord.Client();
mybot.loginWithToken(Auth.token);

mybot.on("ready", function() {
    console.log("ready!\n");
});

mybot.on("message", function(message) {
    let str = message.content;
    if (str[0] !== "!") { //if 1st char isn't '!' return
        return;
    }
    str = str.substr(1);//remove '!'
    let strArray = str.split(' '); //make array of words
    let key      = strArray.shift(); //first word is key
    let args     = getArgs(strArray); // the rest are arguments
    console.log(key);
    console.log(args + '\n');

    switch (key) {
        case "ping":
            //TODO return bot's ping
            mybot.sendMessage(message, "!pong");
            break;
        case "game":
            moveUsersToGame(message);
            break;
        case "owStat":
            var messageToSend = owStats(message, args);
            if(str){
                mybot.sendMessage(message, messageToSend);
            }
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

function moveUsersToGame(message) {
    let messageToSend = ""; // message to send in response
    let game = message.author.game; // game user is playing

    if (game !== null) {

        messageToSend += message.author + " is currently playing: " + game.name + "\n";
        messageToSend += "These players are  playing " + game.name + ":\n";
        messageToSend += "```" + "\n";

        let userList = mybot.users.getAll("game", game);
        for (let i = 0; i < userList.length; i++) {
            messageToSend += userList[i].name;
        }

        messageToSend += "```" + "\n";

        let gameChannel = mybot.channels.get("name", game.name);
        if (gameChannel !== null) {
            messageToSend += "I found this channel: " + gameChannel + "\n";
            for (let i = 0; i < userList.length; i++) {
                mybot.moveMember(userList[i], gameChannel, (function(err) {
                    if (err) console.error("err:" + err);
                }));
            }
        }
    } else {
        messageToSend = message.author + " is not playing anything.";
    }

    mybot.sendMessage(message, messageToSend);
}

function getArgs(stringArr) {
    for (var i = 0; i < stringArr.length; i++) {
        if (!stringArr[i] || stringArr[i] === "") {
            stringArr.splice(i, 1);
        }
    }
    if (stringArr.length === 0) {
        return false;
    }
    return stringArr;
}
