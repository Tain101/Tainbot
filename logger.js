"use strict";
let fs       = require('fs-extra');
let colors   = require('colors/safe');
let cliTable = require('cli-table');

let langList = {
    blue              : "brainfuck",
    blueFirstEachLine : "haskell",
    greenFirstEachLine: "apache",
    green             : "css",
    greenFirstOneLine : "nginx",
};

let LOG_LEVEL     = {ERROR:0, WARNING:1, LOG:2};
let LOG_STYLE     = {0:colors.red, 1:colors.yellow, 2:colors.blue};
let WRITE_LEVEL   = LOG_LEVEL.LOG;
let CONSOLE_LEVEL = LOG_LEVEL.LOG;

function log(message) {
    message = " Log: " + message;
    internalLog(message, LOG_LEVEL.LOG);
};

function warn(message) {
    message = " Warn: " + message;
    internalLog(message, LOG_LEVEL.WARNING);
};

function error(message, error) {
    error = error || new Error();
    message = message;
    internalLog(message, LOG_LEVEL.ERROR);
    internalLog(error.stack, LOG_LEVEL.WARNING);
};

function table(data, columnTitles, level) {
    let tableToLog = new cliTable({head: columnTitles});
    columnTitles   = columnTitles || null;
    level          = level || LOG_LEVEL.LOG;

    for (var i = 0; i < data.length; i++) {
        tableToLog.push(data[i]);
    };

    internalLog(tableToLog);
};

function title(title) {
    clear();
    console.log(colors.green.bold.underline(title));
};

function clear() {
    process.stdout.write('\x1Bc');
};

function internalLog(message, level) {
    if(!message) return;
    if(CONSOLE_LEVEL >= level){
        console.log(LOG_STYLE[level](message));
    }
    if(WRITE_LEVEL >= level){
        write(new Date().toISOString() + message);
    }
};

function write(log) {
    let date     = new Date();
    let fileName = "log-" + date.getUTCFullYear() + "-" + date.getUTCMonth() + "-" + date.getUTCDate() + ".log"
    let fileDir  = "logs/" + date.getUTCFullYear() + "/" + date.getUTCMonth() + "/";
    let logFile  = fileDir + fileName;

    fs.outputFile(logFile, log, function (err) {
        if(err) console.log("error writing log!: " + err);
    });
};

this.log   = log;
this.warn  = warn;
this.error = error;
this.table = table;
this.clear = clear;
this.title = title;