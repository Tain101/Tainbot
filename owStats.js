//TODO: make this work with username as a string instead of @name

module.exports = function() {
    // "use strict";
    var fs = require('fs'); //filesystem
    var request = require('request');

    this.owStats = function(message, args) {
        if (args[0] === "set") {
            if (!args[1]) {
                return "you need to give me your bnet! try again.";
            }else{
                setOwStats(message.author, args[1]);
                return "your bnet has been saved!";
            }

        } else {
            var owStatsJson = null;
            var data = fs.readFileSync("owStatsJson.json", "utf8");
            owStatsJson = JSON.parse(data);


            var user = args[0] || message.author;
            if (owStatsJson.hasOwnProperty(user)) { //check if user already has linked their bnet
                return "https://www.overbuff.com/players/pc/" + owStatsJson[user];
            } else {
                return "you havent set up your bnet! try !owStat set [bnet]";
            }
        }
    };

    function setOwStats(author, bnet) {
        var owStatsJson = null;
        var data = fs.readFileSync("owStatsJson.json", "utf8");
        owStatsJson = JSON.parse(data);
        console.log(owStatsJson);

        bnet = bnet.replace("#", "-");
        owStatsJson[author] = bnet;

        fs.writeFileSync("owStatsJson.json", JSON.stringify(owStatsJson), "utf8");

    }

    this.updateOwStats = function (){
        var owStatsJson = null;
        var data = fs.readFileSync("owStatsJson.json", "utf8");
        owStatsJson = JSON.parse(data);

        for (var obj in owStatsJson){
            request.post("https://www.overbuff.com/players/pc/" + owStatsJson[user]  + "/refresh", function callback(err, httpResponse, body){
                if(err){
                    console.log("err: " + err);
                    console.log("httpResponse: " + httpResponse);
                    console.log("body: " + body);
                }
            });
        }

        now = Date.now();
    }
};
