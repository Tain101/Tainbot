//utils.js
const fs = require('fs-extra'); //filesystem
const path = require('path');
const {join} = require('path');
// const logger = require(__dirname + '/logger.js');
// const log = require('debug')('utils.js');

const log = function logger(namespace){
	const logger = require('debug')(namespace);
	logger.enabled = true;
	logger.log = console.log.bind(console);
	return logger;
};

const req = function smartRequire(file) {
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
			console.error('%O\n%s', err, err.stack.split('\n').slice(7).join('\n'));
			throw err;
		}
};

const writeFile = function writeFile(filename, contents){
  fs.writeFileSync(filename, contents, "utf8");
}


const getRandomItem = function getRandomItem(list){
    return list[Math.floor(Math.random() * list.length)];
};

const checkPermissions = function checkPermissions(message, requiredPermissions){

    if(!requiredPermissions){
        return true;
    }
    if(!message.member){
        return false;
    }

    // log.crit(requiredPermissions);
    // log.info(requiredPermissions);
    try{
        return message.member.hasPermission(requiredPermissions, false, true, true);
    }catch(err){
        return log(err);
    }
}

const readJSON = function readJSON(jsonFile){

  try{
    const data  = fs.readFileSync(jsonFile, "utf8");
    return JSON.parse(data);
  }catch(err){
    log(`could not read jsonFile ${jsonFile}`);
    log(`${err.stack}`);
  }

}

const writeJSON = function writeJSON(jsonFile, data){
    const string = JSON.stringify(data, undefined, '\t');
    fs.writeFileSync(jsonFile, string, "utf8");
}

module.exports.checkPermissions = checkPermissions;
module.exports.getRandomItem    = getRandomItem;
module.exports.writeFile        = writeFile;
module.exports.readJSON         = readJSON;
module.exports.writeJSON        = writeJSON;
module.exports.log        = log;
module.exports.req        = req;