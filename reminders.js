"use strict";
let MIN_TIMEOUT_DUR = 93600000;//26*60*60*1000 hours * minutes * millliseconds
let REMINDER_FILE   = "reminders.json";

let fs     = require('fs');
let chrono = require('chrono-node');

let bot          = global.bot;
let reminderList = [];

let Reminder = function (time, message, channel, verify = false) {
    let time    = time;
    let message = message;
    let channel = channel;
    let verify  = verify;
    let timeout = null;

    this.checkSetTimeout = function () {
        let now = new Date.getTime();
        if(time - now < MIN_TIMEOUT_DUR && !timeout){
            timeout = setTimeout(this.trigger, time-now);
        }
    };

    this.trigger = function () {
        bot.sendMessage(message, channel);
        deleteReminder(this);
    };

    this.save = function () {
        deleteReminder(this);//delete all previous entries for this reminder so user can update.
        reminderList.push(this);
        fs.writeFileSync(REMINDER_FILE, JSON.stringify(reminderList), "utf8");
    }
}

let createReminder = function (message, args) {
    var remindTime    = chrono.parse(args);
    var remindMessage = getMessage(args);
    var remindChannel = message;
    /*TODO:
    var remindVerify  = if(message.contains("-verify"));
    */
    var reminder      = new Reminder(remindTime, remindMessage, remindChannel);
    reminder.save();
    reminder.checkSetInterval();
}


let loadReminders = function () {
    let data             = fs.readFileSync(REMINDER_FILE, "utf8");
    let reminderListJSON = JSON.parse(data);
    reminderList         = [];

    for(var reminder in reminderListJSON){
        reminderList.push(reminder);
        reminder.checkSetTimeout();
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