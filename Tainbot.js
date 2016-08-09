//running using 'forever' package

"use strict";
var Discord = require("discord.js");
var Auth    = require('./auth.json');

var mybot   = new Discord.Client({autoReconnect:true});
mybot.loginWithToken(Auth.token);

require('./Commands.js')();//http://stackoverflow.com/a/28066576
require('./owStats.js')();
require('./gameRoles.js')();

mybot.on("ready", function() {
    console.log("ready!\n");
});

mybot.on("message", function(message) {
    if (message.content[0] !== "!" ||   //if 1st char isn't '!' return
        message.author.bot) {                  //or if sender is a bot
        return;
    }
    handleMessage(message);
});

function handleMessage(message) {
    let strArray = message.content.split(' '); //make array of words
    let key      = strArray.shift().substr(1); //first word is key
    let args     = getArgs(strArray); // the rest are arguments
    console.log(key);
    console.log(args + '\n');

    for (var command in Commands){
        if(key === command){
            if(checkPermissions(mybot, message, message.author, Commands[command].permissionLevel)){
                return Commands[command].call(mybot, message, args);
            }
        }
    }
    return false;
}

function checkPermissions(bot, message, user, role) {
    console.log("checking Permissions of: " + user);
    console.log("against role: " + role);
    if(role === undefined){
        return true;
    }
    if(!user){
        return false;
    }
    if(typeof(user) === "string"){
        user = message.server.users.get("id", user);
    }
    if(typeof(role) === "string"){
        role = message.server.roles.get("name", role);
    }

    user = message.channel.permissionsOf(message.author);
    console.log(user.serialize());
    for (var perm in Discord.Constants.Permissions) {
        let roleHasPerm = role.hasPermission(perm);
        let userHasPerm = user.hasPermission(perm);
        console.log(perm);
        if( roleHasPerm && !userHasPerm){
            return false;
        }
    }

    return true;
}


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

setInterval(function () {checkForUpdate();}, 1000*60*60);

var Commands = {
        "help": {
            description: "You're lookin' at it.",
            call: function(bot, message, args) {
                let helpMessage = "";
                if(!args){
                    for (var command in Commands) {
                        if (checkPermissions(mybot, message, message.author, Commands[command].permissionLevel)) {
                            helpMessage += "!" + command + " -\n";
                            if(Commands[command].description){
                                helpMessage += "``` " + Commands[command].description + " ```\n";
                            }
                        }
                    }
                }
                else{
                    for (var i = 0; i < args.length; i++) {
                        if(Commands[args[i]] &&
                            checkPermissions(mybot, message, message.author, Commands[args[i]].permissionLevel))
                        {
                            helpMessage += "!" + args[i] + " -\n";
                            if(Commands[args[i]].description){
                                helpMessage += "```" + Commands[args[i]].description + "```\n";
                            }
                        }
                        else{
                            helpMessage += "invalid command!";
                        }
                    }
                }

                bot.sendMessage(message.channel, helpMessage);
                return true;
            },
        },
        "owStat": {
            description: "get overbuff page for a user. \n" +
                         "use @user to request a given user.\n" +
                         "use set bnet#0000 to link your account.\n" +
                         "linking you account will update your overbuff page daily!",
            call: function(bot, message, args) {
                return owStats(message, args);
            },
        },
        "role": {
            description: "!role join -  join the role!\n" +
                         "!role leave - leave the role!\n" +
                         "!role list - list the members!",
            call: function(bot, message, args) {
                return gameRole(bot, message, args);
            },
        },
        "game": {
            description: "move you and players to apropriate voice channel (WIP)",
            permissionLevel: "Mod",
            call: function(bot, message, args) {
                return moveUsersToGame(message);
            },
        },
        "ping": {
            description: "pong",
            permissionLevel: "Admin",
            call: function(bot, message, args) {
                bot.sendMessage(message, "!pong");
                console.log("!pong");
                return true;
            },
        },
        "updateOW": {
            description: "forces update of overbuff pages",
            permissionLevel: "Admin",
            call: function(bot, message, args) {
                return updateOwStats();
            },
        },
        "setGame": {
            description: "set's the game I play!",
            permissionLevel: "Admin",
            call: function(bot, message, args) {
                console.log(message.author.id);
                console.log("setGame " + args.join(' '));
                let flag = true;

                bot.setPlayingGame(args.join(' '), function(err) {
                    if (err) {
                        console.log("err:{ \n    " + err);
                        flag = false;
                    }
                });

                return flag;
            },
        },
    };