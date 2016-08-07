<<<<<<< Updated upstream
//running using 'forever' package

"use strict";
require('./owStats.js')(); //http://stackoverflow.com/a/28066576
require('./gameRoles.js')();

var Discord = require("discord.js");
var Auth    = require('./auth.json');

var mybot   = new Discord.Client({autoReconnect:true});
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
        case "help":
            break;
        case "ping":
            //TODO return bot's ping
            if(message.author.id === "108322020822913024"){
                mybot.sendMessage(message, "!pong");
                console.log("!pong");
            }
            break;

        case "updateOW":
            if(message.author.id === "108322020822913024"){
                updateOwStats();
            }
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
        case "role":
            var messageToSend = gameRole(mybot, message, args);
            if(str){
                mybot.sendMessage(message, messageToSend);
            }
            break;
        case "setGame":

            console.log(message.author.id);

            if(message.author.id === "108322020822913024"){
                console.log("setGame " + args.join(' '));

                mybot.setPlayingGame(args.join(' '), function (err) {
                    if(err){console.log("err: \n    " + err);}
                });
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
    let server = message.server;

    if (game !== null) {

        messageToSend += message.author + " is currently playing: " + game.name + "\n";
        messageToSend += "These players are  playing " + game.name + ":\n";
        messageToSend += "```" + "\n";
        let userList = [];
        for (var i = 0; i < server.members.length; i++) {
            if(server.members[i].game){
                if(game.name === server.members[i].game.name){
                    userList.push(server.members[i]);
                    messageToSend += server.members[i].name + "\n";
                }
            }
        }

        messageToSend += "```" + "\n";

        let gameChannels = server.channels.getAll("name", game.name.toLowerCase());
        let gameChannel = gameChannels.get("type", "voice");
        if (gameChannel !== null) {
            messageToSend += "I found this channel: `" + gameChannel.name + "`\n";
            for (let i = 0; i < userList.length; i++) {
                mybot.moveMember(userList[i], gameChannel, (function(err) {
                    if (err) console.error("err: \n     " + err);
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

function checkForUpdate() {
    //returns true once a day
    var date = new Date();
    if(date.getUTCHours() === 11){

        updateOwStats();
    }
}

=======
//running using 'forever' package

"use strict";
require('./owStats.js')(); //http://stackoverflow.com/a/28066576
require('./gameRoles.js')();

var Discord = require("discord.js");
var Auth    = require('./auth.json');

var mybot   = new Discord.Client({autoReconnect:true});
mybot.loginWithToken(Auth.token);

mybot.on("ready", function() {
    console.log("ready!\n");
});

mybot.on("message", function(message) {
    if (message.content[0] !== "!") { //if 1st char isn't '!' return
        return;
    }
    handleMessage(message);
}

function handleMessage(message) {
    let strArray = message.content.split(' '); //make array of words
    let key      = strArray.shift(); //first word is key
    let args     = getArgs(strArray); // the rest are arguments
    console.log(key);
    console.log(args + '\n');

    for (var command in CommandList){
        if(command.key === key){
            if(command.checkPermissions(message.author)){
                return command.call(message, key, args);
            }
        }
    }
    return false;
}
{
    switch (key) {
        case "help":
            break;
        case "ping":
            //TODO return bot's ping
            if(message.author.id === "108322020822913024"){
                mybot.sendMessage(message, "!pong");
                console.log("!pong");
            }
            break;

        case "updateOW":
            if(message.author.id === "108322020822913024"){
                updateOwStats();
            }
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
        case "role":
            var messageToSend = gameRole(mybot, message, args);
            if(str){
                mybot.sendMessage(message, messageToSend);
            }
            break;
        case "setGame":

            console.log(message.author.id);

            if(message.author.id === "108322020822913024"){
                console.log("setGame " + args.join(' '));

                mybot.setPlayingGame(args.join(' '), function (err) {
                    if(err){console.log("err: \n    " + err);}
                });
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
    let server = message.server;

    if (game !== null) {

        messageToSend += message.author + " is currently playing: " + game.name + "\n";
        messageToSend += "These players are  playing " + game.name + ":\n";
        messageToSend += "```" + "\n";
        let userList = [];
        for (var i = 0; i < server.members.length; i++) {
            if(server.members[i].game){
                if(game.name === server.members[i].game.name){
                    userList.push(server.members[i]);
                    messageToSend += server.members[i].name + "\n";
                }
            }
        }

        messageToSend += "```" + "\n";

        let gameChannels = server.channels.getAll("name", game.name.toLowerCase());
        let gameChannel = gameChannels.get("type", "voice");
        if (gameChannel !== null) {
            messageToSend += "I found this channel: `" + gameChannel.name + "`\n";
            for (let i = 0; i < userList.length; i++) {
                mybot.moveMember(userList[i], gameChannel, (function(err) {
                    if (err) console.error("err: \n     " + err);
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

function checkForUpdate() {
    //returns true once a day
    var date = new Date();
    if(date.getUTCHours() === 11){

        updateOwStats();
    }
}

>>>>>>> Stashed changes
setInterval(function () {checkForUpdate();}, 1000*60*60);