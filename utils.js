//utils.js
const fs = require('fs-extra'); //filesystem


const LISTS_JSON = __dirname  + '/lists.json';
const data       = fs.readFileSync(LISTS_JSON, "utf8");
const lists      = JSON.parse(data);

const updateLists = function updateLists(){
	fs.writeFileSync(LISTS_JSON, JSON.stringify(lists), "utf8");
}

const writeFile = function writeFile(filename, contents){
  fs.writeFileSync(filename, contents, "utf8");
}

const getLists = function getLists(){
  return lists;
};

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

    console.error(requiredPermissions);
    console.log(requiredPermissions);
    try{
        return message.member.hasPermission(requiredPermissions, false, true, true);
    }catch(err){
        return console.log(err);
    }
}

module.exports.checkPermissions = checkPermissions;
module.exports.getLists         = getLists;
module.exports.getRandomItem    = getRandomItem;
module.exports.writeFile        = writeFile;