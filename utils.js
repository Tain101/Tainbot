/* utils.js -
    collection of misc functions.
    functions should:
        not need includes
        do a single action
        not belong in any other file
 */
"use strict";
let Commands  = require('./Commands.js');
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
    console.log("evaluateCommand:")
    console.log("key: " + key);
    console.log("args: " + args);

    if(commList[key]){
        if(Commands.checkPermissions(message, message.author, commList[key].permissionLevel)){
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
    if (Date().getUTCHours() === 11) {
        updateOwStats();
    }
};

this.evaluateCommand = evaluateCommand;