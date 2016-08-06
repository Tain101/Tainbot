
module.exports = function() {
    // "use strict";

    this.gameRole = function(mybot, message, args) {
        if(!args[0] || !args[1]){
            return "Try again!";
        }

        var server = message.server;
        var channel = message.channel;
        var roles = server.roles;
        var roleString = args[1].toLowerCase();
        var role = null;
        for (var i = 0; i < roles.length; i++) {
            if(roles[i].name.toLowerCase() === roleString){
                role = roles[i];
                break;
            }
        }
        if(!role){
            return "I couldn't find that role!";
        }
        var userPerms = channel.permissionsOf(message.author);

        if(!checkPermissions(userPerms, role)){
            return "You aren't powerful enough for this role!";
        }
        if(args[0] === "join"){
            mybot.addMemberToRole(message.author, role, function(error){
                console.log(error);
                console.log(args + ":" + roles + ":" + role);
            });
        } else if(args[0] === "leave"){
            mybot.removeMemberFromRole(message.author, role, function(error){
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
            return message;
        } else {
            return "You need to let me know if you want to leave or join!";
        }

    };

    //returns true if perms1 >= perms2
    function checkPermissions (perms1, perms2) {

        var PERMISSION_CONSTANTS = [
        // general
        "administrator",
        "createInstantInvite",
        "kickMembers",
        "banMembers",
        "manageRoles",
        "managePermissions",
        "manageChannels",
        "manageChannel",
        "manageServer",
        "changeNickname",
        "manageNicknames",
        // text
        "readMessages",
        "sendMessages",
        "sendTTSMessages",
        "manageMessages",
        "embedLinks",
        "attachFiles",
        "readMessageHistory",
        "mentionEveryone",
        // voice
        "voiceConnect",
        "voiceSpeak",
        "voiceMuteMembers",
        "voiceDeafenMembers",
        "voiceMoveMembers",
        "voiceUseVAD"
        ];

        for (var i = 0; i < PERMISSION_CONSTANTS.length; i++) {
            if(perms2.hasPermission(PERMISSION_CONSTANTS[i]) &&
                !perms1.hasPermission(PERMISSION_CONSTANTS[i])){
                return false;
            }
        }

        return true;
    }
};
