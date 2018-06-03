//utils.js
const fs = require('fs-extra'); //filesystem
const path = require('path');
// const logger = require(__dirname + '/logger.js');
const log = require('debug')('utils.js');

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

    // logger.crit(requiredPermissions);
    // logger.info(requiredPermissions);
    try{
        return message.member.hasPermission(requiredPermissions, false, true, true);
    }catch(err){
        return logger.info(err);
    }
}

const readJSON = function readJSON(jsonFile){

  try{
    const data  = fs.readFileSync(jsonFile, "utf8");
    return JSON.parse(data);
  }catch(err){
    logger.warn(`could not read jsonFile ${jsonFile}`);
    logger.warn(`${err.stack}`);
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