const wolfram = require(__dirname  + '/../wolfram.js');

exports.name                = 'wolframAlpha';
exports.aliasList           = ['wf'];
exports.description         = 'asks wolfram a question';
exports.call                = wolfram;
exports.requiredPermissions = ['ADMINISTRATOR'];