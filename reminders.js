"use strict";
let MIN_TIMEOUT_DUR = 93600000;//26*60*60*1000 hours * minutes * millliseconds
let REMINDER_FILE   = "reminders.json";

let fs     = require('fs');
let chrono = require('chrono-node');

let bot          = global.bot;
let reminderList = [];

let Reminder = function (time, message, channel, verify) {
    this.time    = time;
    this.message = message;
    this.channel = channel;
    this.verify  = verify || false;
    this.timeout = null;

    this.checkSetTimeout = function () {
        let now = new Date().getTime();
        let duration = this.time - now;
        if(duration < MIN_TIMEOUT_DUR && !timeout){
            timeout = setTimeout(this.trigger, duration);
        }
    };

    this.trigger = function () {
        bot.sendMessage(this.message, this.channel);
        deleteReminder(this);
    };

    this.copy = function (reminder) {
        this.time    = reminder.time;
        this.message = reminder.message;
        this.channel = reminder.channel;
        this.verify  = reminder.verify;
        this.timeout = reminder.timeout;
    }

}

function saveReminder(reminder){
    deleteReminder(reminder);//delete all previous entries for this reminder so user can upDate().
    reminderList.push(reminder);
    console.log("writing:");
    console.log(reminderList);
    fs.writeFileSync(REMINDER_FILE, JSON.stringify(reminderList), "utf8");
}

//returns string based on elements surrounded by ""
let getMessage = function (stringArr) {
    let startIndex = -1;
    let endIndex   = -1;

    for (var i = 0; i < stringArr.length; i++) {
        if(stringArr[i] === "\""){
            break;
        }
    }
    startIndex = i;

    for (var i = startIndex+1; i < stringArr.length; i++) {
        if(stringArr[i] === "\""){
            break;
        }
    }
    endIndex = i;

    if(startIndex === -1 ||
        endIndex === -1){
        return null;
    }
    let rtnStr = stringArr.slice(startIndex, endIndex+1).replace(",","");
    return rtnStr;

}

let createReminder = function (message, args) {
    if(!args){
        return false;
    }
    args = args.join();
    var remindTime    = chrono.parse(args);
    var remindMessage = getMessage(args);
    var remindChannel = message.channel.id;
    /*TODO:
    var remindVerify  = if(message.contains("-verify"));
    */
    if(!remindChannel){
        console.log("Ive messed up and this doesnt make sense, no channel");
        return false;
    }
    if(!remindTime){
        console.log("I coulnd't parse that time!");
        return false;
    }
    if(!remindMessage){
        console.log("I coulding find the message you wanted me to remind u");
        return false;
    }

    var reminder      = new Reminder(remindTime, remindMessage, remindChannel);
    saveReminder(reminder);
    reminder.checkSetTimeout();
}
this.createReminder = createReminder;

this.loadReminders = function () {
    let data             = fs.readFileSync(REMINDER_FILE, "utf8");
    let reminderListJSON = JSON.parse(data);
    reminderList         = [];

    for(var reminder in reminderListJSON){
        let newRem = new Reminder();
        newRem.copy(reminder);
        reminderList.push(newRem);
        newRem.checkSetTimeout();
    }

}

let deleteReminder = function (reminder) {
    let index = reminderList.findIndex(function (element) {
        return (reminder.time       === element.time &&
                reminder.message    === element.message &&
                reminder.channel    === element.channel);
    });

    reminderList.splice(index, 1);
    fs.writeFileSync(REMINDER_FILE, JSON.stringify(reminderList), "utf8");

}