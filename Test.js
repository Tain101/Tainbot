"use strict";
let Commands = require('./Commands.js');
let fs       = require('fs');

//TODO MOCKS
let mockMessages = {
    default: {

    },
    admin: {

    },
    mod: {

    },
    nothing: {

    },
}
let mocks = {
    "help":{
        default: {
            message: mockMessages.default,
            args: ["help", "owStat", "ping"]
        },
        admin: {
            message: mockMessages.admin,
            args: ["help", "owStat", "ping"]
        },
    },
    "owStat":{},
    "remind":{},
    "role":{},
    "game":{},
    "ping":{},
    "updateOW":{},
    "setGame":{},
    "!Test":{},
}

function runTests(message, args) {
    let commList = Commands.Commands;
    let log      = "\n";
    let count    = 0;

    log += "Tesing all commands:" + "\n";

    log += "==============================" + "\n";
    for(var command in commList){
        log += "    Testing:" + command + "\n";
        if(command !== "!Test" &&
            command !== "help"){

            try{
                commList[command].call(message, ["test"]);
            }catch(err){
                log += "    " + err.stack + "\n";
            }

            log += "====================" + "\n";
        }
        count++;
        if(count > 20){
            break;
        }
    }
    log += "There are this many commands: " + count + "\n";

    console.log(log);
    fs.writeFileSync("Test.js.log", log, "utf8");
}

this.runTests = runTests;
