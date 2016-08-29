/* utils.js -
    collection of misc functions.
    functions should:
        not need includes
        do a single action
        not belong in any other file
 */
"use strict";
let Commands  = require('./Commands.js');
let reminders = require('./reminders.js');
let owStats   = require('./owStats.js');

let colorList = {
    lightBlue         : "brainfuck",
    blueFirstEachLine : "haskell",
    greenFirstEachLine: "apache",
    green             : "css",
    greenFirstWord    : "nginx",
};
let RUN_TESTS_ON_READY = true;
/**
 * Checks if message is a valid command
 *     splits message into key, args[]
 *     checks if key is command
 *     checks if message.author is allowed command
 *     calls command
 *
 * todo: message args should be parsed differently?
 *
 * @param  {message} message message object from user
 *
 */
function evaluateCommand(message) {
    let strArray = message.content.split(' '); //make array of words
    let key      = strArray.shift().substr(1); //first word is key
    let args     = getArgs(strArray); // the rest are arguments
    let commList = Commands.Commands;
    logger.log("evaluateCommand:")
    logger.log("key            : " + key);
    logger.log("args           : " + args);
    logger.log("=========================")

    if(commList[key]){
        logger.log("checkPermissions for " + key);
        if(Commands.checkPermissions(message, message.author, commList[key].permissionLevel)){
                logger.log("   executing command : " + key);
                logger.log("   with args         : " + args);
                commList[key].call(message, args);
        }
    }
};

/**
 * Takes array of strings, removes empty indexes and returns result.
 * returns false if array is empty
 *
 * @param  {String[]} stringArr Array of strings to be parsed
 *
 * @return {String[]}           parsed array || false
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
};

//returns true once a day
function checkForStatsUpdate() {
    let date = new Date();
    if (date.getUTCHours() === 11) {
        owStats.updateOwStats();
    }
};

this.evaluateCommand     = evaluateCommand;
this.checkForStatsUpdate = checkForStatsUpdate;
