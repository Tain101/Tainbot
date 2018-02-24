const moment = require('moment');
const commands = require(__dirname + '/commands.js');
const logger = require(__dirname + '/logger.js');

const updateInterval            = moment.duration(5, 'minutes');
const updateGameInterval        = moment.duration(1, 'minutes');
const updateStatsInterval       = moment.duration(16, 'hours');
const updateImpersonateInterval = moment.duration(1, 'days');

let curTick = moment();
let pastTick = null;

let gameIter = curTick.startOf('day');
let statsIter = curTick.startOf('day');
let impersonateIter = curTick.startOf('day');

let interval = null;

const updateGame = function(){
  logger.info('updating Game!');
  commands.runCommand('setGame');
}

const updateStats = function(){
  //TODO 
  logger.info('update stats doesnt do anyting yet!');
}

const updateImpersonate = function(){
  commands.runCommand('impersonate');  
}

const checkUpdates = function(){
  logger.info('checkUpdates');
  pastTick = curTick;
  curTick = moment();
  logger.info('pastTick:        ' + pastTick);
  logger.info('curTick:         ' + curTick);
  logger.info('gameIter:        ' + gameIter);
  logger.info('statsIter:       ' + statsIter);
  logger.info('impersonateIter: ' + impersonateIter);
  while(gameIter < pastTick) gameIter.add(updateGameInterval);
  while(statsIter < pastTick) statsIter.add(updateStatsInterval);
  while(impersonateIter < pastTick) impersonateIter.add(updateImpersonateInterval);
  logger.info('gameIter:        ' + gameIter);
  logger.info('statsIter:       ' + statsIter);
  logger.info('impersonateIter: ' + impersonateIter);

  if(pastTick < gameIter < curTick) updateGame();
  if(pastTick < statsIter < curTick) updateStats();
  if(pastTick < impersonateIter < curTick) updateImpersonate();

};

const start = function(duration = updateInterval){
  checkUpdates();
  interval = setInterval(checkUpdates, duration);
};

const stop = function(){
  clearInterval(interval);
};

module.exports.checkUpdates   = checkUpdates;
module.exports.start    = start;
module.exports.stop  = stop;