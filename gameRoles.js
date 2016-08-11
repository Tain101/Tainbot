"use strict";
let bot = global.bot;

let gameRole = function(message, args) {
    if(!args[0] || !args[1]){
        bot.sendMessage("Try again!");
        return false;
    }

    var server     = message.server;
    var channel    = message.channel;
    var roles      = server.roles;
    var roleString = args[1].toLowerCase();
    var role       = null;
    var userPerms  = null;

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
    if(!checkPermissions(message, user, role)){
        bot.sendMessage("You aren't powerful enough for this role!");
        return false;
    }

    //Execute
    if(args[0] === "join"){
        bot.addMemberToRole(message.author, role, function(error){
            console.log(error);
            console.log(args + ":" + roles + ":" + role);
        });
    } else if(args[0] === "leave"){
        bot.removeMemberFromRole(message.author, role, function(error){
            console.log(error);
            console.log(args + roles + role);
        });
    } else if(args[0] === "list"){
        var message = "users in: `"+ role.name +"` \n" + "```\n";
        var userList = server.usersWithRole(role);
        console.log(args + ":" + role.name + ":" + userList);
        for (var i = 0; i < userList.length; i++) {
            message += userList[i].name + '\n';
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
