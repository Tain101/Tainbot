//TODO not working currently

"use strict";
let commands = require('./Commands.js');
let logger   = require('./logger.js');

let bot = global.bot;

let daily = function(message, args) {
    if(!args[0] || !args[1]){
        bot.sendMessage("Try again!");
        return false;
    }

    let dailyArg = args[1].toLowerCase();
    logger.log("daily.dailyArg: " + dailyArg);
    switch(dailyArg){
        case("add"):
            addDaily();
            break;
        case("list"):
            listDailies();
            break;
        case("set"):
            setDaily();
            break;
        case("hist"):
            getDailyHist();
            break;
        default:
            bot.sendMessage("Try again!");
            return false;
    }

    function addDaily(){
        let dailyString = getDailyString();
        let dailyFreq = getDailyFreq();
        let dailyOffset = args[args.length - 1];

        newDaily = {
            "id": dailyID++;
            "name": dailyString,
            "frequency": dailyFreq,
            "offset": dailyOffset
        }
    };

    function getDailyString(){
        let dailyString = "";
        if(args[2][0] !== "\""){
            bot.sendMessage("invalid addDailyString!");
            return false;
        }
        for (var i = 2; i < args.length; i++) {
            dailyString += args[i];
            if(args[i][args[i].length-1] === "\""){
                return dailyString;
            }
        }
        bot.sendMessage("invalid addDailyString!");
        return false;
    };
    function listDailies(){
    };
    function setDaily(){
    };
    function getDailyHist(){

    };




};
this.daily = daily;
