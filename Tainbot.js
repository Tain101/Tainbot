//running using 'forever' package
// Object   -> let x = fun
// function -> fun x()
// public   -> this.foo = foo;

"use strict";
Error.stackTraceLimit = Infinity;
let INTER_TIME        = 3600000; // One Hour

global.bot    = require('./bot.js');
let Auth      = require('./auth.json');
let owStats   = require('./owStats.js');
let reminders = require('./reminders.js');
let utils     = require('./utils.js');
let colors    = require('colors/safe');

process.stdout.write('\x1Bc');
console.log(colors.green("~~~starting Tainbot~~~"));

let bot = global.bot;
bot.loginWithToken(Auth.token);

setInterval(function () {
    utils.checkForStatsUpdate();
    reminders.loadReminders();
}, INTER_TIME);//once an hour * minute * milli

bot.on("ready",   function () {utils.botReadyFunc();});
bot.on("message", function (message) {utils.botMessageFunc(message);});