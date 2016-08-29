//http://masteroverwatch.com/profile/pc/us/Tain-1600
"use strict";
let fs      = require('fs-extra'); //filesystem
let request = require('request');
let logger  = require('./logger.js');

let STAT_FILE = "owStatsJson.json";

let bot = global.bot;

/**
 * "get overbuff page for a user. \n" +
 * "use @user to request a given user.\n" +
 * "use set bnet#0000 to link your account.\n" +
 * "linking you account will update your overbuff page daily!",
 *
 * todo:
 * add kill for removing self from list
 * add kill @user for removing user from list [admin only]
 * make work with string search instead of @user
 *
 * @param  {message} message message calling command
 * @param  {String[]} args   array of arguments
 *
 * @return {Boolean}         returns if command s
 */

function owStats(message, args) {
    if (args[0] === "set") {
        if (!args[1]) {
            bot.sendMessage("you need to give me your bnet! try again.");
            return false;
        } else {
            setOwStats(message.author, args[1]);
            bot.sendMessage("your bnet has been saved! \n" +
                            "here is your link: \n" +
                            "https://www.overbuff.com/players/pc/" + args[1].replace("#", "-"));
            return true;
        }

    } else {
        let data        = fs.readFileSync(STAT_FILE, "utf8");
        let owStatsJson = JSON.parse(data);
        let user        = args[0] || message.author;

        if (owStatsJson.hasOwnProperty(user)) { //check if user already has linked their bnet
            bot.sendMessage("https://www.overbuff.com/players/pc/" + owStatsJson[user]);
            return true;
        } else {
            bot.sendMessage("you havent set up your bnet! try !owStat set [bnet]");
            return false;
        }
    }
};

function setOwStats(author, bnet) {
    let data        = fs.readFileSync(STAT_FILE, "utf8");
    let owStatsJson = JSON.parse(data);

    bnet                = bnet.replace("#", "-");
    owStatsJson[author] = bnet;

    fs.writeFileSync(STAT_FILE, JSON.stringify(owStatsJson), "utf8");
};

function updateOwStats() {
    logger.log("time to update stats!");
    let owStatsJson = null;
    let data        = fs.readFileSync(STAT_FILE, "utf8");
    owStatsJson     = JSON.parse(data);

    for (let user in owStatsJson) {
        request.post("https://www.overbuff.com/players/pc/" + owStatsJson[user] + "/refresh", function callback(err, httpResponse, body) {
            logger.log("response: " + httpResponse.statusCode);
            if(err){
                logger.error("err: "  + err, err);
                logger.error("body: " + body);
            }
        });
        request.post("http://masteroverwatch.com/profile/pc/us/" + owStatsJson[user] + "/update", function callback(err, httpResponse, body) {
            logger.log("response: " + httpResponse.statusCode);
            if(err){
                logger.error("err: "  + err, err);
                logger.error("body: " + body);
            }
        });
    }
};

this.owStats       = owStats;
this.updateOwStats = updateOwStats;
