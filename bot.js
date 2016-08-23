"use strict";
let Discord    = require("discord.js");
let discordBot = new Discord.Client({autoReconnect:true});

let loginWithToken = function (token, email, password, callback) {
    discordBot.loginWithToken(token, email, password, callback);
};

let on = function (event, call) {
    discordBot.on(event, call);
};

let sendMessage = function (channel, content, options, callback) {
    console.log("sending message!");
    console.log("channel: " + channel);
    console.log("content:\n" + content);

    discordBot.sendMessage(channel, content, options, callback);
};

let moveMember = function (user, channel, callback) {
    discordBot.moveMember(user, channel, callback);
};

let setPlayingGame = function (game, callback) {
    discordBot.setPlayingGame(game, callback);
};

let addMemberToRole = function (member, role, callback) {
    discordBot.addMemberToRole(member, role, callback);
};

let removeMemberFromRole = function (member, role, callback) {
    discordBot.removeMemberFromRole(member, role, callback);
};

this.discordBot           = discordBot;
this.loginWithToken       = loginWithToken;
this.on                   = on;
this.sendMessage          = sendMessage;
this.moveMember           = moveMember;
this.setPlayingGame       = setPlayingGame;
this.addMemberToRole      = addMemberToRole;
this.removeMemberFromRole = removeMemberFromRole;