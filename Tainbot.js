//running using 'nodemon' package
//nodemon Tainbot.js
"use strict";
let colors    = require('colors/safe');

global.bot    = require('./bot.js');
let Auth      = require('./auth.json');
let reminders = require('./reminders.js');
let utils     = require('./utils.js');
let logger    = require('./logger.js');


Error.stackTraceLimit = Infinity;
let INTER_TIME        = 3600000; // One Hour

logger.title("Starting Tainbot");

let bot = global.bot;
bot.loginWithToken(Auth.token);

setInterval(function checkUpdateInterval() {
    utils.checkForStatsUpdate();
    reminders.loadReminders();
    Commands.Commands["setGame"].call();
}, INTER_TIME);//once an hour * minute * milli

bot.on("ready", function botReadyFunc(){
    utils.checkForStatsUpdate();
    reminders.loadReminders();
    logger.log("ready!\n");
});

bot.on("message", function botMessageFunc(message) {
    if (message.content[0] !== "!" ||   //if 1st char isn't '!' return
        message.author.bot) {           //or if sender is a bot
        return;
    }
    utils.evaluateCommand(message);
});

bot.on("error", logger.error);