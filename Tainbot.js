//running using 'forever' package

"use strict";
var Discord  = require("discord.js");
var Auth     = require('./auth.json');
var Commands = require('./Commands.js');//http://stackoverflow.com/a/28066576

global.bot = new Discord.Client({autoReconnect:true});
let bot = global.bot;
bot.loginWithToken(Auth.token);

bot.on("ready", function() {
    reminders.loadReminders();
    console.log("ready!\n");
});

bot.on("message", function(message) {
    if (message.content[0] !== "!" ||   //if 1st char isn't '!' return
        message.author.bot) {                  //or if sender is a bot
        return;
    }
    handleMessage(message);
});

/**
 * Parses message to get the command key and puts the rest of the args in an array.
 *     todo: message args should be parsed differently?
 *
 * @param  {message} message message object from user
 *
 */
function handleMessage(message) {
    let strArray = message.content.split(' '); //make array of words
    let key      = strArray.shift().substr(1); //first word is key
    let args     = getArgs(strArray); // the rest are arguments
    console.log(key);
    console.log(args + '\n');

    for (var command in Commands){
        if(key === command){
            if(checkPermissions(bot, message, message.author, Commands[command].permissionLevel)){
                Commands[command].call(bot, message, args);
            }
        }
    }
}

/**
 * returns array of arguemts from string.
 */

function getArgs(stringArr) {
    for (var i = 0; i < stringArr.length; i++) {
        if (!stringArr[i] || stringArr[i] === "") {
            stringArr.splice(i, 1);
        }
    }
    if (stringArr.length === 0) {
        return false;
    }
    return stringArr;
}


setInterval(function () {
    checkForStatsUpdate();
    loadReminders();
}, 60*60*1000);//once an hour * minute * milli
