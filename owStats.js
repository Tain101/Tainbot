//TODO: make this work with username as a string instead of @name
//http://masteroverwatch.com/profile/pc/us/Tain-1600

"use strict";
let STAT_FILE = "owStatsJson.json";

let fs        = require('fs'); //filesystem
let request   = require('request');

let bot = global.bot;

let owStats = function(message, args) {
    if (args[0] === "set") {
        if (!args[1]) {
            bot.sendMessage("you need to give me your bnet! try again.");
            return false;
        } else {
            setOwStats(message.author, args[1]);
            bot.sendMessage("your bnet has been saved!");
            return true;
        }

    } else {
        var owStatsJson = null;
        var data        = fs.readFileSync(STAT_FILE, "utf8");
        owStatsJson     = JSON.parse(data);
        var user        = args[0] || message.author;

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
    var owStatsJson = null;
    var data        = fs.readFileSync(STAT_FILE, "utf8");
    owStatsJson     = JSON.parse(data);
    console.log(owStatsJson);

    bnet                = bnet.replace("#", "-");
    owStatsJson[author] = bnet;

    fs.writeFileSync(STAT_FILE, JSON.stringify(owStatsJson), "utf8");

}

this.updateOwStats = function() {
    console.log("time to update stats!");
    var owStatsJson = null;
    var data        = fs.readFileSync(STAT_FILE, "utf8");
    owStatsJson     = JSON.parse(data);

    for (var user in owStatsJson) {
        request.post("https://www.overbuff.com/players/pc/" + owStatsJson[user] + "/refresh", function callback(err, httpResponse, body) {
            console.log(httpResponse.statusCode);
            if(err){
                console.log("err: " + err);
                console.log("body: " + body);
            }
        });
        request.post("http://masteroverwatch.com/profile/pc/us/" + owStatsJson[user] + "/update", function callback(err, httpResponse, body) {
            console.log(httpResponse.statusCode);
            if(err){
                console.log("err: " + err);
                console.log("body: " + body);
            }
        });
    }

    now = Date.now();
}

 //returns true once a day
function checkForStatsUpdate() {
    var date = new Date();
    if (date.getUTCHours() === 11) {

        updateOwStats();
    }
}
