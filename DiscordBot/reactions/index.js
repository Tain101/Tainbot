const utils	  = require(global.rDir + '/utils.js');

const req			= utils.req;
const log     = utils.log('addReaction.js');

exports.name        = `addreaction`;
exports.description = `adds a new reaction option\n usage: ${global.prefix}addreaction [keyword] [reaction text/image]`;
exports.call        = addReactionCommand;

class reactionHandler {
	constructor(){
		this.reactionList = utils.readJSON('./reactions.json');
	}

	updateReactionList(){
		utils.writeJSON('./reactions.json', this.reactionList);
	}

	createReaction(reaction) {
		this.reactionList[reaction] = [];
		updateReactionList();
	}

	deleteReaction(reaction) {
		this.reactionList[reaction] = null;
		updateReactionList();
	}

	addReactionEntry(reaction, entry) {
		const r = this.reactionList[reaction] || this.createReaction(reaction);
		r.push(entry);
		updateReactionList();
	}

	getReactionEntries(reaction) {
		return this.reactionList[reaction] || 'invalid reaction';
	}

	removeReactionEntry(reaction, entry) {
		const r = this.reactionList[reaction];
	}

	getReaction(reaction){
		const list = this.reactionList[reaction] || ['invalid reaction'];
		const i = Math.floor(Math.random() * list.length);
		return list[i];
	}

}

module.exports = reactionHandler;