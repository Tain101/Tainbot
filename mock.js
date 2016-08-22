"use strict";
let Cache = require('./node_modules/discord.js/lib/Util/Cache.js');

let Role = function(){
    this.name = "test";
};

let Channel = function(){
    this.id            = -1;
    this.permissionsOf = function(userOrRole) {
        let perms = {
            createInstantInvite: true,
            readMessages       : true,
            sendMessages       : true,
            embedLinks         : true,
            attachFiles        : true,
            readMessageHistory : true,
            mentionEveryone    : true,
            voiceConnect       : true,
            voiceSpeak         : true,
            voiceUseVAD        : true,
        };
        switch(userOrRole.username){
            case "admin":
            perms["administrator"]    = true;
            case "mod":
            perms["voiceMoveMembers"] = true;
        }

        return {
            hasPermission: function (perm) {
                return perms[perm];
            }
        };
    };
};

let User = function(){
    this.username = "mock user";
    this.id       = -1;
    this.bot      = false;
    this.status   = "online";
    this.game     = "mock game";
};

let Server = function(){
    this.users = {
        get: function (string, user) {
            return new User;
        },
    };
    this.roles = new Cache();
    this.roles.add(new Role());
    this.usersWithRole = function (role) {
        let arr = [];
        arr.push(new User());
        return arr;
    }
};

let Message = function(){
    this.author  = new User;
    this.channel = new Channel;
    this.content = "!mock content";
    this.server  = new Server;
};

this.Role    = Role;
this.Channel = Channel;
this.User    = User;
this.Server  = Server;
this.Message = Message;
