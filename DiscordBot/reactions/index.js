const utils	  = require(global.rDir + '/utils.js');

const req			= utils.req;
const log     = utils.log('reactions.js');

// exports.name        = `addreaction`;
// exports.description = `adds a new reaction option\n usage: ${global.prefix}addreaction [keyword] [reaction text/image]`;
// exports.call        = addReactionCommand;

class ReactionHandler {
	constructor(){
		this.reactionList = [];
		this.loadReactions();
		// log(this.reactionList);
	}

	async loadReactions(){
		log('loading reactions');
		let reactionList;
		reactionList = await utils.readJSON(require('path').join(__dirname, 'reactions.json'));
		log("%o", Object.keys(reactionList));
		log(Object.keys(reactionList).length);
		log('reactions loaded!');
		this.reactionList = reactionList;
		return reactionList;
	}

	evaluate(messageObject){
		log('\t\t reactionEvaluate');
		const reaction = this.getReaction(messageObject.key);
		messageObject.reply(reaction);
		return reaction;
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

	addReactionEntries(reaction, entries) {
		for(let i = 0; i < entries.length; i++){
			this.addReactionEntry(reaction, entry[i]);
		}
	}

	getReactionEntries(reaction) {
		return this.reactionList[reaction] || 'invalid reaction';
	}

	removeReactionEntry(reaction, entry) {
		const r = this.reactionList[reaction];
		this.reactionList[reaction] = null;
		updateReactionList();
	}

	getReaction(reaction){
		// log('this.reactionList:%o', this.reactionList);
		log('reaction:%o', reaction);
		log('this.reactionList[reaction]:%o', this.reactionList[reaction]);
		const reactionEntry = utils.getRandomItem(this.reactionList[reaction]) || ['invalid reaction'];
		log(reactionEntry);
		// const i = Math.floor(Math.random() * list.length);
		return reactionEntry;
	}

}

module.exports = new ReactionHandler();