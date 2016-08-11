//running using 'forever' package
//TODO let x = fun
//  or fun x() ?


"use strict";
var Discord   = require("discord.js");
global.bot = new Discord.Client({autoReconnect:true});

var Auth      = require('./auth.json');
var Commands  = require('./Commands.js');//http://stackoverflow.com/a/28066576
var owStats   = require('./owStats.js');
let reminders = require('./reminders.js');


let bot    = global.bot;
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
    let commList = Commands.Commands;
    console.log("handleMessage:")
    console.log("key: " + key);
    console.log("args: " + args);

    if(commList[key]){
        if(Commands.checkPermissions(message, message.author, commList[key].permissionLevel)){
                commList[key].call(message, args);
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
    owStats.checkForStatsUpdate();
    reminders.loadReminders();
}, 60*60*1000);//once an hour * minute * milli
