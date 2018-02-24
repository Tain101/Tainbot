const winston = require('winston');
const path    = require('path');
const utils = require(__dirname  + '/utils.js');
require('winston-daily-rotate-file');

const logsDir     = path.join(__dirname, 'logs');
const datePattern = path.normalize('/yyyy/MM/dd/');
const bot         = global.bot;

const template = {
  dirname:     logsDir,
  datePattern: datePattern,
  localTime:   false,
  prepend:     true,
  maxDays:     15,
  timestamp:   function(){
    const now = new Date();
    return now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  },
  formatter: function(options) {
    return options.timestamp() + "[" + options.level[0] + "] " +
      (options.message ? options.message : '') +
      (options.meta && Object.keys(options.meta).length ? '\n\t'+
      JSON.stringify(options.meta) : '' );
  },
  prettyPrint: true,
  createTree:  true,
  json:        false,
  exitOnError: false
};

var logger = new (winston.Logger)({
    exitOnError: false, //don't crash on exception
    transports: [
        new (winston.transports.Console)({
          formatter: function(options) {
            const now = new Date();
            return now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "[" + options.level[0] + "] " +
              (options.message ? options.message : '') +
              (options.meta && Object.keys(options.meta).length ? '\n\t'+
              JSON.stringify(options.meta) : '' );
        }}), //always use the console
        new (winston.transports.DailyRotateFile)(Object.assign(template, { name: 'everything', filename: 'server.log' })), //log everything to the server.log
        new (winston.transports.DailyRotateFile)(Object.assign(template, { name: 'error', level: 'error', filename: 'error.log', handleExceptions: true })), //log errors and exceptions to the error.log
        new (winston.transports.DailyRotateFile)(Object.assign(template, { name: 'warn', level: 'warn', filename:'warn.log' })), //log warn to the warn.log
        new (winston.transports.DailyRotateFile)(Object.assign(template, { name: 'info', level: 'info', filename:'info.log' })) //log info to the info.log
    ]
});

logger.on('logging', function (transport, level, msg, meta) {
    // [msg] and [meta] have now been logged at [level] to [transport]
  if(level === 'warn' || level === 'error'){
    if(global.botLogger){
      bot.log(level, msg, meta);
    }
    utils.writeJSON(logsDir + "lasterr", {transport: transport, level: level, msg:msg, meta:meta});
  }
});
logger.on('error', function(error){
  if(global.botLogger){
      bot.log(error);
    }
    utils.writeJSON(logsDir + "lasterr", {error: error});
});

module.exports = logger;