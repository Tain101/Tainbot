//running using 'forever' package
// Object   -> let x = fun
// function -> fun x()
// public   -> this.foo = foo;

"use strict";
let INTER_TIME = 3600000; // One Hour

let Discord   = require("discord.js");
global.bot = new Discord.Client({autoReconnect:true});

let Auth      = require('./auth.json');
let owStats   = require('./owStats.js');
let reminders = require('./reminders.js');
let utils     = require('./utils.js');

let bot    = global.bot;
bot.loginWithToken(Auth.token);

bot.on("ready", function() {
    reminders.loadReminders();
    console.log("ready!\n");
});

bot.on("message", function(message) {
    if (message.content[0] !== "!" ||   //if 1st char isn't '!' return
        message.author.bot) {           //or if sender is a bot
        return;
    }
    utils.evaluateCommand(message);
});

setInterval(function () {
    owStats.checkForStatsUpdate();
    reminders.loadReminders();
}, INTER_TIME);//once an hour * minute * milli