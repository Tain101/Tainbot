var winston = require('winston');

// set default log level.
var logLevel = 'info';

// Set up logger
const myCustomLevels = {
	levels: {
		fatal: 0,
		crit: 1,
		warn: 2,
		info: 3,
		debug: 4,
		trace: 5
	},
	colors: {
		trace: 'white',
		debug: 'green',
		info: 'blue',
		warn: 'yellow',
		crit: 'red',
		fatal: 'red'
	}
};

const timestamp = () => (new Date()).toISOString();
const logger = new (winston.Logger)({
	level: logLevel,
	levels: myCustomLevels.levels,
	transports: [
		new (winston.transports.Console)({
			timestamp,
			level: 'info'
		}),
		new (winston.transports.File)({
			filename: 'winston.log',
			timestamp,
			level: 'trace'
		})
	],
	exceptionHandlers: [
	new winston.transports.File({ filename: 'winstonException.log' })
	]
});

winston.addColors(myCustomLevels);

// LOGGER EXAMPLES
	// var log = require('./log.js')
	// logger.trace('trace');
	// logger.debug('debug');
	// logger.info('info');
	// logger.warn('warn');
	// logger.crit('crit');
	// logger.fatal('fatal');


	module.exports = logger;
