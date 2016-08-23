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
    console.log(roles.length);
    let roleString = args[1].toLowerCase();
    console.log("roleString");
    console.log(roleString);
    let role       = null;
    let userPerms  = message.author;
    console.log("message.author");
    console.log(message.author.username);

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
                console.log(colors.red("Join error: " + error));
                console.log(colors.red(error.stack));
                console.log(colors.yellow(message.author));
                console.log(colors.yellow(role));
            }
        });
    } else if(args[0] === "leave"){
        bot.removeMemberFromRole(message.author, role, function(error){
            if(error){
                console.log("leave error: " + error);
                console.log(args + roles + role);
            }
        });
    } else if(args[0] === "list"){
        let message = "users in: `"+ role.name +"` \n" + "```\n";
        let userList = server.usersWithRole(role);
        console.log(args + ":" + role.name);
        console.log(userList);
        for (var userObj in userList) {
            console.log(userObj);
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
