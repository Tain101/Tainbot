/**
 * init.js
 *
 * sets global variables & turns on debuggers.
 */

const log = require('debug')('init');
const { join } = require('path');

const init = function init() {
	/* eslint-disable */
	global.rDir = __dirname;
	global.req = function(file) {
		let err = false;
		try{
			return require(file);
		} catch(e1){
			// log('%O\n%s', e1, e1.stack.split('\n').slice(7).join('\n'));
			err = e1;
		}
		try{
			return require(join(global.rDir, file));
		} catch(e2){
			// log('%O\n%s', e2, e2.stack.split('\n').slice(7).join('\n'));
			err = e2;
		}

		if(err){
			log('%O\n%s', err, err.stack.split('\n').slice(7).join('\n'));
			throw err;
		}
	};

	// enable debuggers asap
	require('debug').enable('*');
	/* eslint-enable */
};

module.exports = init;
