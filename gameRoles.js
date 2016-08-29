//TODO not working currently

"use strict";
let commands = require('./Commands.js');
let colors   = require('colors/safe');

let bot = global.bot;

let gameRole = function(message, args) {
    if(!args[0] || !args[1]){
        bot.sendMessage("Try again!");
        return false;
    }

    let server     = message.server;
    let roles      = server.roles;
    logger.log("gameRole.roles.length: " + roles.length);
    let roleString = args[1].toLowerCase();
    logger.log("gameRole.roleString: " + roleString);
    let role       = null;
    let userPerms  = message.author;
    logger.log("gameRole.message.author.username: " + message.author.username);

    //get role
    for (var i = 0; i < roles.length; i++) {
        if(roles[i].name.toLowerCase() === roleString){
            role = roles[i];
            break;
        }
    }
    if(!role){
        bot.sendMessage("I couldn't find that role!");
        return false;
    }

    //verify user's permissions
    if(!commands.checkPermissions(message, userPerms, role)){
        bot.sendMessage("You aren't powerful enough for this role!");
        return false;
    }

    //Execute
    if(args[0] === "join"){
        bot.addMemberToRole(message.author, role, function(error){
            if(error){
                logger.error("Join error: " + error + "\n" + error.stack);
                logger.warnd(message.author);
                logger.warnd(role);
            }
        });
    } else if(args[0] === "leave"){
        bot.removeMemberFromRole(message.author, role, function(error){
            if(error){
                logger.error("leave error: " + error);
                logger.warn("args + roles + role: " + args + ":" + roles + ":" + role);
            }
        });
    } else if(args[0] === "list"){
        let message = "users in: `"+ role.name +"` \n" + "```\n";
        let userList = server.usersWithRole(role);
        logger.log("args + role.name: " + args + ":" + role.name);
        logger.log("userList:");
        logger.log(userList);
        for (var userObj in userList) {
            logger.log(userObj);
            message += userList[userObj].username + '\n';
        }

        message += "```\n";
        bot.sendMessage(message);
        return true;
    } else {
        bot.sendMessage("You need to let me know if you want to leave or join!");
        return false;

    }
};
this.gameRole = gameRole;
