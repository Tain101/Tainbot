"use strict";
var Discord   = require("discord.js");

let owStats   = require('./owStats.js');
let gameRoles = require('./gameRoles.js');
let reminders = require('./reminders.js');
let Test      = require('./Test.js');

let bot = global.bot;

var Commands = {
        "help": {
            description: "You're lookin' at it.",
            call: function(message, args){ helpMessageFunc()},
        },
        "owStat": {
            description: "get overbuff page for a user. \n" +
                         "use @user to request a given user.\n" +
                         "use set bnet#0000 to link your account.\n" +
                         "linking you account will update your overbuff page daily!",
            call: function(message, args){ owStats.owStats()},
        },
        "remind": {
            description: "HEAVY WIP!!!! \n" +
                         "returns a message to the user at a given time.",
            call: function(message, args){ reminders.createReminder()},

        },
        "role": {
            description: "!role join -  join the role!\n" +
                         "!role leave - leave the role!\n" +
                         "!role list - list the members!",
            call: function(message, args){ gameRoles.gameRole()},
        },
        "game": {
            description: "move you and players to apropriate voice channel (WIP)",
            permissionLevel: "Mod",
            call: function(message, args){ moveUsersToGame()},
        },
        "ping": {
            description: "pong",
            permissionLevel: "Admin",
            call: function(message, args){
                bot.sendMessage(message, "!pong");
                console.log("!pong");
                return true;
            },
        },
        "updateOW": {
            description: "forces update of overbuff pages",
            permissionLevel: "Admin",
            call: function(message, args){ owStats.updateOwStats()},
        },
        "setGame": {
            description: "set's the game I play!",
            permissionLevel: "Admin",
            call: function(message, args){
                args = args || "Tetris or something"; //TODO: random funny games
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
        "!Test":{
            description: "runs all commands",
            permissionLevel: "Admin",
            call: function(message, args){
                console.log("Test");
                Test.runTests(message, args);
            },
        }
    };
this.Commands = Commands;

function helpMessageFunc(message, args) {
    let helpMessage = "";
    if(!args){
        for (var command in Commands) {
            if (checkPermissions(message, message.author, Commands[command].permissionLevel)) {
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
                checkPermissions(message, message.author, Commands[args[i]].permissionLevel))
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
};


/**
 * checks if user has permissions for a command based on role level.
 */

function checkPermissions(message, user, role) {
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
        if( roleHasPerm && !userHasPerm){
            return false;
        }
    }

    return true;
}

this.checkPermissions = checkPermissions;

/**
 * Moves all users who are playing same game as author, to voice channel of that name.
 *     todo:move to more apropriate location
 *
 * @param  {Message} message Message containing "!game"
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
                bot.moveMember(userList[i], gameChannel, (function(err) {
                    if (err) console.error("err: \n     " + err);
                }));
            }
        }
    } else {
        messageToSend = message.author + " is not playing anything.";
    }

    bot.sendMessage(message, messageToSend);
}